import { 
  users, 
  userPreferences, 
  interests, 
  messages, 
  successStories,
  type User, 
  type InsertUser, 
  type UserPreference, 
  type InsertUserPreference,
  type Interest,
  type InsertInterest,
  type Message,
  type InsertMessage,
  type SuccessStory,
  type InsertSuccessStory
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User>;
  searchUsers(filters: any): Promise<User[]>;
  getFeaturedProfiles(limit: number): Promise<User[]>;
  
  // Preferences methods
  getUserPreferences(userId: number): Promise<UserPreference | undefined>;
  createUserPreferences(preferences: InsertUserPreference): Promise<UserPreference>;
  updateUserPreferences(id: number, preferences: Partial<UserPreference>): Promise<UserPreference>;
  
  // Interest methods
  getInterests(userId: number): Promise<Interest[]>;
  getInterestById(id: number): Promise<Interest | undefined>;
  createInterest(interest: InsertInterest): Promise<Interest>;
  updateInterestStatus(id: number, status: string): Promise<Interest>;
  
  // Message methods
  getMessages(userId: number): Promise<Message[]>;
  getMessageThread(userId1: number, userId2: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message>;
  
  // Success Story methods
  getSuccessStories(limit?: number): Promise<SuccessStory[]>;
  getSuccessStoryById(id: number): Promise<SuccessStory | undefined>;
  createSuccessStory(story: InsertSuccessStory): Promise<SuccessStory>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userPrefs: Map<number, UserPreference>;
  private userInterests: Map<number, Interest>;
  private userMessages: Map<number, Message>;
  private userSuccessStories: Map<number, SuccessStory>;
  
  private currentUserId: number;
  private currentPrefId: number;
  private currentInterestId: number;
  private currentMessageId: number;
  private currentStoryId: number;
  
  constructor() {
    this.users = new Map();
    this.userPrefs = new Map();
    this.userInterests = new Map();
    this.userMessages = new Map();
    this.userSuccessStories = new Map();
    
    this.currentUserId = 1;
    this.currentPrefId = 1;
    this.currentInterestId = 1;
    this.currentMessageId = 1;
    this.currentStoryId = 1;
    
    // Add some initial sample data
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    // Sample profiles
    const sampleProfiles: InsertUser[] = [
      {
        username: "priya_s",
        password: "password123",
        email: "priya@example.com",
        phone: "9876543210",
        firstName: "Priya",
        lastName: "Sharma",
        gender: "Female",
        dateOfBirth: "1995-05-15",
        motherTongue: "Telugu",
        religion: "Hindu",
        caste: "Reddy",
        maritalStatus: "Never Married",
        height: "5'4\"",
        education: "MBA, Finance",
        profession: "Investment Banker",
        location: "Hyderabad, Telangana",
        about: "I am a hardworking professional who values family traditions. Looking for a life partner with similar values.",
        profilePic: "https://images.unsplash.com/photo-1596436889106-be35e843f974",
      },
      {
        username: "rahul_k",
        password: "password123",
        email: "rahul@example.com",
        phone: "9876543211",
        firstName: "Rahul",
        lastName: "Kumar",
        gender: "Male",
        dateOfBirth: "1992-08-22",
        motherTongue: "Telugu",
        religion: "Hindu",
        caste: "Kamma",
        maritalStatus: "Never Married",
        height: "5'11\"",
        education: "B.Tech, Computer Science",
        profession: "Software Engineer",
        location: "Bangalore, Karnataka",
        about: "I'm a tech enthusiast who loves to travel. Looking for a partner who shares my interests.",
        profilePic: "https://images.unsplash.com/photo-1589642774083-7677b65606ad",
      },
      {
        username: "ananya_m",
        password: "password123",
        email: "ananya@example.com",
        phone: "9876543212",
        firstName: "Ananya",
        lastName: "Mishra",
        gender: "Female",
        dateOfBirth: "1996-03-10",
        motherTongue: "Telugu",
        religion: "Hindu",
        caste: "Brahmin",
        maritalStatus: "Never Married",
        height: "5'6\"",
        education: "MBBS",
        profession: "Doctor",
        location: "Chennai, Tamil Nadu",
        about: "I'm a dedicated doctor who loves helping others. Looking for someone understanding and supportive.",
        profilePic: "https://images.unsplash.com/photo-1610438235354-a6ae5528385c",
      },
      {
        username: "karthik_v",
        password: "password123",
        email: "karthik@example.com",
        phone: "9876543213",
        firstName: "Karthik",
        lastName: "Venkat",
        gender: "Male",
        dateOfBirth: "1990-11-25",
        motherTongue: "Telugu",
        religion: "Hindu",
        caste: "Naidu",
        maritalStatus: "Never Married",
        height: "5'10\"",
        education: "MBA, Marketing",
        profession: "Marketing Manager",
        location: "Mumbai, Maharashtra",
        about: "I enjoy building brands and creating campaigns. Looking for a life partner who is ambitious and family-oriented.",
        profilePic: "https://images.unsplash.com/photo-1611022574783-366013583738",
      }
    ];
    
    // Create sample users
    sampleProfiles.forEach(profile => {
      this.createUser(profile);
    });
    
    // Sample success stories
    const sampleSuccessStories: InsertSuccessStory[] = [
      {
        user1Id: 1,
        user2Id: 2,
        marriageDate: "2022-06-12",
        story: "We connected on Vivaham Matrimony in March 2021. After getting to know each other for a few months, we knew we were meant to be together. Thanks to this platform for bringing us together!",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
      {
        user1Id: 3,
        user2Id: 4,
        marriageDate: "2021-11-28",
        story: "Finding the right person can be challenging, but Vivaham Matrimony made it easy. We connected instantly and our families approved. We're grateful for this platform.",
        photo: "https://images.unsplash.com/photo-1537633552985-df8429e8048b",
      }
    ];
    
    // Create sample success stories
    sampleSuccessStories.forEach(story => {
      this.createSuccessStory(story);
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const newUser: User = { 
      ...user, 
      id,
      profileCreatedAt: now,
      lastActive: now 
    };
    this.users.set(id, newUser);
    return newUser;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    
    const updatedUser = { ...user, ...userData, lastActive: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async searchUsers(filters: any): Promise<User[]> {
    let filteredUsers = Array.from(this.users.values());
    
    if (filters.gender) {
      filteredUsers = filteredUsers.filter(user => user.gender === filters.gender);
    }
    
    if (filters.ageMin && filters.ageMax) {
      const currentYear = new Date().getFullYear();
      filteredUsers = filteredUsers.filter(user => {
        const birthYear = new Date(user.dateOfBirth).getFullYear();
        const age = currentYear - birthYear;
        return age >= filters.ageMin && age <= filters.ageMax;
      });
    }
    
    if (filters.motherTongue && filters.motherTongue !== "Any") {
      filteredUsers = filteredUsers.filter(user => user.motherTongue === filters.motherTongue);
    }
    
    if (filters.religion) {
      filteredUsers = filteredUsers.filter(user => user.religion === filters.religion);
    }
    
    if (filters.maritalStatus) {
      filteredUsers = filteredUsers.filter(user => user.maritalStatus === filters.maritalStatus);
    }
    
    if (filters.location) {
      filteredUsers = filteredUsers.filter(user => user.location.includes(filters.location));
    }
    
    return filteredUsers;
  }
  
  async getFeaturedProfiles(limit: number): Promise<User[]> {
    return Array.from(this.users.values()).slice(0, limit);
  }
  
  // Preferences methods
  async getUserPreferences(userId: number): Promise<UserPreference | undefined> {
    return Array.from(this.userPrefs.values()).find(
      (pref) => pref.userId === userId
    );
  }
  
  async createUserPreferences(preferences: InsertUserPreference): Promise<UserPreference> {
    const id = this.currentPrefId++;
    const newPref: UserPreference = { ...preferences, id };
    this.userPrefs.set(id, newPref);
    return newPref;
  }
  
  async updateUserPreferences(id: number, prefData: Partial<UserPreference>): Promise<UserPreference> {
    const pref = this.userPrefs.get(id);
    if (!pref) {
      throw new Error(`Preference with id ${id} not found`);
    }
    
    const updatedPref = { ...pref, ...prefData };
    this.userPrefs.set(id, updatedPref);
    return updatedPref;
  }
  
  // Interest methods
  async getInterests(userId: number): Promise<Interest[]> {
    return Array.from(this.userInterests.values()).filter(
      (interest) => interest.fromUserId === userId || interest.toUserId === userId
    );
  }
  
  async getInterestById(id: number): Promise<Interest | undefined> {
    return this.userInterests.get(id);
  }
  
  async createInterest(interest: InsertInterest): Promise<Interest> {
    const id = this.currentInterestId++;
    const now = new Date();
    const newInterest: Interest = { 
      ...interest, 
      id,
      createdAt: now,
      updatedAt: now 
    };
    this.userInterests.set(id, newInterest);
    return newInterest;
  }
  
  async updateInterestStatus(id: number, status: string): Promise<Interest> {
    const interest = this.userInterests.get(id);
    if (!interest) {
      throw new Error(`Interest with id ${id} not found`);
    }
    
    const updatedInterest = { 
      ...interest, 
      status,
      updatedAt: new Date() 
    };
    this.userInterests.set(id, updatedInterest);
    return updatedInterest;
  }
  
  // Message methods
  async getMessages(userId: number): Promise<Message[]> {
    return Array.from(this.userMessages.values()).filter(
      (message) => message.fromUserId === userId || message.toUserId === userId
    );
  }
  
  async getMessageThread(userId1: number, userId2: number): Promise<Message[]> {
    return Array.from(this.userMessages.values()).filter(
      (message) => 
        (message.fromUserId === userId1 && message.toUserId === userId2) ||
        (message.fromUserId === userId2 && message.toUserId === userId1)
    ).sort((a, b) => {
      // Sort by date (assuming createdAt is a Date)
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }
  
  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const newMessage: Message = { 
      ...message, 
      id,
      createdAt: new Date(),
      read: false 
    };
    this.userMessages.set(id, newMessage);
    return newMessage;
  }
  
  async markMessageAsRead(id: number): Promise<Message> {
    const message = this.userMessages.get(id);
    if (!message) {
      throw new Error(`Message with id ${id} not found`);
    }
    
    const updatedMessage = { ...message, read: true };
    this.userMessages.set(id, updatedMessage);
    return updatedMessage;
  }
  
  // Success Story methods
  async getSuccessStories(limit?: number): Promise<SuccessStory[]> {
    const stories = Array.from(this.userSuccessStories.values());
    return limit ? stories.slice(0, limit) : stories;
  }
  
  async getSuccessStoryById(id: number): Promise<SuccessStory | undefined> {
    return this.userSuccessStories.get(id);
  }
  
  async createSuccessStory(story: InsertSuccessStory): Promise<SuccessStory> {
    const id = this.currentStoryId++;
    const newStory: SuccessStory = { 
      ...story, 
      id,
      createdAt: new Date()
    };
    this.userSuccessStories.set(id, newStory);
    return newStory;
  }
}

export const storage = new MemStorage();
