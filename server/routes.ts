import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertUserPreferencesSchema, 
  insertInterestSchema, 
  insertMessageSchema,
  insertSuccessStorySchema
} from "@shared/schema";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";
import session from "express-session";
import MemoryStore from "memorystore";

const SessionStore = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "vivaham-matrimony-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
      store: new SessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );

  // Helper function to handle Zod validation errors
  const validateRequest = (schema: any, body: any) => {
    try {
      return { data: schema.parse(body), errors: null };
    } catch (error) {
      if (error instanceof ZodError) {
        return { data: null, errors: error.format() };
      }
      throw error;
    }
  };

  // Auth check middleware
  const requireAuth = (req: Request, res: Response, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    const { data, errors } = validateRequest(insertUserSchema, req.body);
    
    if (errors) {
      return res.status(400).json({ errors });
    }
    
    try {
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(data.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      // Create user with hashed password
      const user = await storage.createUser({
        ...data,
        password: hashedPassword
      });
      
      // Set session
      req.session.userId = user.id;
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    try {
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Set session
      req.session.userId = user.id;
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Auth check error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // User profile routes
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/users/:id", requireAuth, async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    
    // Check if user is updating their own profile
    if (req.session.userId !== userId) {
      return res.status(403).json({ message: "Forbidden. You can only update your own profile." });
    }
    
    try {
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Exclude password from updates through this endpoint
      const { password, ...updateData } = req.body;
      
      const updatedUser = await storage.updateUser(userId, updateData);
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Search routes
  app.get("/api/users/search", async (req: Request, res: Response) => {
    try {
      console.log("Received search request with query:", req.query);
      const filters = req.query;
      
      // Convert string number values to actual numbers
      if (filters.ageMin) filters.ageMin = parseInt(filters.ageMin as string);
      if (filters.ageMax) filters.ageMax = parseInt(filters.ageMax as string);
      
      const users = await storage.searchUsers(filters);
      console.log(`Found ${users.length} users matching the search criteria`);
      
      // If no users found, return an empty array
      if (!users || users.length === 0) {
        return res.json([]);
      }
      
      // Remove passwords from response
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error("Search users error:", error);
      // Return empty array on error instead of 500 status
      res.json([]);
    }
  });
  
  // Get featured profiles
  app.get("/api/users/featured", async (req: Request, res: Response) => {
    try {
      console.log("Getting featured profiles");
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 4;
      const profiles = await storage.getFeaturedProfiles(limit);
      
      console.log(`Found ${profiles.length} featured profiles`);
      
      // If no profiles found, return an empty array instead of error
      if (!profiles || profiles.length === 0) {
        return res.json([]);
      }
      
      // Remove passwords from response
      const profilesWithoutPasswords = profiles.map(profile => {
        const { password, ...profileWithoutPassword } = profile;
        return profileWithoutPassword;
      });
      
      res.json(profilesWithoutPasswords);
    } catch (error) {
      console.error("Get featured profiles error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // User preferences routes
  app.get("/api/preferences/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const preferences = await storage.getUserPreferences(userId);
      
      if (!preferences) {
        return res.status(404).json({ message: "Preferences not found" });
      }
      
      res.json(preferences);
    } catch (error) {
      console.error("Get preferences error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/preferences", requireAuth, async (req: Request, res: Response) => {
    const { data, errors } = validateRequest(insertUserPreferencesSchema, req.body);
    
    if (errors) {
      return res.status(400).json({ errors });
    }
    
    // Ensure user is creating preferences for themselves
    if (req.session.userId !== data.userId) {
      return res.status(403).json({ message: "Forbidden. You can only create preferences for yourself." });
    }
    
    try {
      // Check if preferences already exist
      const existingPrefs = await storage.getUserPreferences(data.userId);
      
      if (existingPrefs) {
        return res.status(400).json({ message: "Preferences already exist. Use PUT to update." });
      }
      
      const preferences = await storage.createUserPreferences(data);
      res.status(201).json(preferences);
    } catch (error) {
      console.error("Create preferences error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/preferences/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const prefId = parseInt(req.params.id);
      const existingPrefs = await storage.getUserPreferences(req.session.userId);
      
      if (!existingPrefs || existingPrefs.id !== prefId) {
        return res.status(403).json({ message: "Forbidden. You can only update your own preferences." });
      }
      
      const updatedPrefs = await storage.updateUserPreferences(prefId, req.body);
      res.json(updatedPrefs);
    } catch (error) {
      console.error("Update preferences error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Interest routes
  app.get("/api/interests", requireAuth, async (req: Request, res: Response) => {
    try {
      const interests = await storage.getInterests(req.session.userId);
      res.json(interests);
    } catch (error) {
      console.error("Get interests error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/interests", requireAuth, async (req: Request, res: Response) => {
    const { data, errors } = validateRequest(insertInterestSchema, req.body);
    
    if (errors) {
      return res.status(400).json({ errors });
    }
    
    // Ensure user is sending interest from their own account
    if (req.session.userId !== data.fromUserId) {
      return res.status(403).json({ message: "Forbidden. You can only express interest from your own account." });
    }
    
    try {
      const interest = await storage.createInterest(data);
      res.status(201).json(interest);
    } catch (error) {
      console.error("Create interest error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/interests/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const interestId = parseInt(req.params.id);
      const interest = await storage.getInterestById(interestId);
      
      if (!interest) {
        return res.status(404).json({ message: "Interest not found" });
      }
      
      // User can only respond to interests sent to them
      if (req.session.userId !== interest.toUserId) {
        return res.status(403).json({ message: "Forbidden. You can only respond to interests sent to you." });
      }
      
      const { status } = req.body;
      
      if (!status || !["accepted", "declined"].includes(status)) {
        return res.status(400).json({ message: "Invalid status. Must be 'accepted' or 'declined'." });
      }
      
      const updatedInterest = await storage.updateInterestStatus(interestId, status);
      res.json(updatedInterest);
    } catch (error) {
      console.error("Update interest error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Message routes
  app.get("/api/messages", requireAuth, async (req: Request, res: Response) => {
    try {
      const messages = await storage.getMessages(req.session.userId);
      res.json(messages);
    } catch (error) {
      console.error("Get messages error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/messages/:userId", requireAuth, async (req: Request, res: Response) => {
    try {
      const otherUserId = parseInt(req.params.userId);
      const thread = await storage.getMessageThread(req.session.userId, otherUserId);
      res.json(thread);
    } catch (error) {
      console.error("Get message thread error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/messages", requireAuth, async (req: Request, res: Response) => {
    const { data, errors } = validateRequest(insertMessageSchema, req.body);
    
    if (errors) {
      return res.status(400).json({ errors });
    }
    
    // Ensure user is sending message from their own account
    if (req.session.userId !== data.fromUserId) {
      return res.status(403).json({ message: "Forbidden. You can only send messages from your own account." });
    }
    
    try {
      const message = await storage.createMessage(data);
      res.status(201).json(message);
    } catch (error) {
      console.error("Create message error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/messages/:id/read", requireAuth, async (req: Request, res: Response) => {
    try {
      const messageId = parseInt(req.params.id);
      const message = await storage.markMessageAsRead(messageId);
      
      // Ensure user is marking messages addressed to them
      if (req.session.userId !== message.toUserId) {
        return res.status(403).json({ message: "Forbidden. You can only mark messages addressed to you as read." });
      }
      
      res.json(message);
    } catch (error) {
      console.error("Mark message as read error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Success Stories routes
  app.get("/api/success-stories", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const stories = await storage.getSuccessStories(limit);
      res.json(stories);
    } catch (error) {
      console.error("Get success stories error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/success-stories/:id", async (req: Request, res: Response) => {
    try {
      const storyId = parseInt(req.params.id);
      const story = await storage.getSuccessStoryById(storyId);
      
      if (!story) {
        return res.status(404).json({ message: "Success story not found" });
      }
      
      res.json(story);
    } catch (error) {
      console.error("Get success story error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/success-stories", requireAuth, async (req: Request, res: Response) => {
    const { data, errors } = validateRequest(insertSuccessStorySchema, req.body);
    
    if (errors) {
      return res.status(400).json({ errors });
    }
    
    // Ensure user is one of the users in the success story
    if (req.session.userId !== data.user1Id && req.session.userId !== data.user2Id) {
      return res.status(403).json({ message: "Forbidden. You can only create success stories involving yourself." });
    }
    
    try {
      const story = await storage.createSuccessStory(data);
      res.status(201).json(story);
    } catch (error) {
      console.error("Create success story error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
