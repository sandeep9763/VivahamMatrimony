import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User profile table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  gender: text("gender").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  motherTongue: text("mother_tongue").notNull(),
  religion: text("religion").notNull(),
  caste: text("caste"),
  maritalStatus: text("marital_status").notNull(),
  height: text("height").notNull(),
  education: text("education").notNull(),
  profession: text("profession").notNull(),
  location: text("location").notNull(),
  about: text("about"),
  profilePic: text("profile_pic"),
  profileCreatedAt: timestamp("profile_created_at").defaultNow(),
  lastActive: timestamp("last_active").defaultNow(),
});

export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  ageMin: integer("age_min").notNull(),
  ageMax: integer("age_max").notNull(),
  heightMin: text("height_min"),
  heightMax: text("height_max"),
  maritalStatus: text("marital_status"),
  motherTongue: text("mother_tongue"),
  religion: text("religion"),
  caste: text("caste"),
  education: text("education"),
  profession: text("profession"),
  location: text("location"),
});

export const interests = pgTable("interests", {
  id: serial("id").primaryKey(),
  fromUserId: integer("from_user_id").notNull().references(() => users.id),
  toUserId: integer("to_user_id").notNull().references(() => users.id),
  status: text("status").notNull(), // "pending", "accepted", "declined"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  fromUserId: integer("from_user_id").notNull().references(() => users.id),
  toUserId: integer("to_user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  read: boolean("read").default(false),
});

export const successStories = pgTable("success_stories", {
  id: serial("id").primaryKey(),
  user1Id: integer("user1_id").notNull().references(() => users.id),
  user2Id: integer("user2_id").notNull().references(() => users.id),
  marriageDate: text("marriage_date").notNull(),
  story: text("story").notNull(),
  photo: text("photo"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas for Zod validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  profileCreatedAt: true,
  lastActive: true,
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
});

export const insertInterestSchema = createInsertSchema(interests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
  read: true,
});

export const insertSuccessStorySchema = createInsertSchema(successStories).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type UserPreference = typeof userPreferences.$inferSelect;
export type InsertUserPreference = z.infer<typeof insertUserPreferencesSchema>;

export type Interest = typeof interests.$inferSelect;
export type InsertInterest = z.infer<typeof insertInterestSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type SuccessStory = typeof successStories.$inferSelect;
export type InsertSuccessStory = z.infer<typeof insertSuccessStorySchema>;
