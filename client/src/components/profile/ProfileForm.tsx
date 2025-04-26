import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Use extending schema pattern to build on top of backend schema
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  motherTongue: z.string().min(1, "Mother tongue is required"),
  religion: z.string().min(1, "Religion is required"),
  caste: z.string().optional(),
  maritalStatus: z.string().min(1, "Marital status is required"),
  height: z.string().min(1, "Height is required"),
  education: z.string().min(1, "Education is required"),
  profession: z.string().min(1, "Profession is required"),
  location: z.string().min(1, "Location is required"),
  about: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  profilePic: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user?: User;
  isCreating?: boolean;
}

const ProfileForm = ({ user, isCreating = false }: ProfileFormProps) => {
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set up the form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          motherTongue: user.motherTongue,
          religion: user.religion,
          caste: user.caste || "",
          maritalStatus: user.maritalStatus,
          height: user.height,
          education: user.education,
          profession: user.profession,
          location: user.location,
          about: user.about || "",
          email: user.email,
          phone: user.phone,
          profilePic: user.profilePic || "",
        }
      : {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          motherTongue: "",
          religion: "",
          caste: "",
          maritalStatus: "",
          height: "",
          education: "",
          profession: "",
          location: "",
          about: "",
          email: "",
          phone: "",
          profilePic: "",
        },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      if (isCreating || !user) {
        // Creating a new profile (completing registration)
        await apiRequest("PUT", `/api/users/${user?.id}`, values);
        toast({
          title: "Profile created successfully",
          description: "Your profile is now live and visible to potential matches",
        });
      } else {
        // Updating existing profile
        await apiRequest("PUT", `/api/users/${user.id}`, values);
        toast({
          title: "Profile updated",
          description: "Your profile information has been updated successfully",
        });
      }

      // Invalidate queries to refetch profile data
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      if (user) {
        queryClient.invalidateQueries({ queryKey: [`/api/users/${user.id}`] });
      }

      // Redirect
      if (isCreating) {
        navigate("/search");
      } else {
        navigate(`/profile/${user?.id}`);
      }
    } catch (error) {
      console.error("Profile form submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Personal Information</h3>
          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select height" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"4'6\""}>4&apos;6&quot;</SelectItem>
                      <SelectItem value={"4'7\""}>4&apos;7&quot;</SelectItem>
                      <SelectItem value={"4'8\""}>4&apos;8&quot;</SelectItem>
                      <SelectItem value={"4'9\""}>4&apos;9&quot;</SelectItem>
                      <SelectItem value={"4'10\""}>4&apos;10&quot;</SelectItem>
                      <SelectItem value={"4'11\""}>4&apos;11&quot;</SelectItem>
                      <SelectItem value={"5'0\""}>5&apos;0&quot;</SelectItem>
                      <SelectItem value={"5'1\""}>5&apos;1&quot;</SelectItem>
                      <SelectItem value={"5'2\""}>5&apos;2&quot;</SelectItem>
                      <SelectItem value={"5'3\""}>5&apos;3&quot;</SelectItem>
                      <SelectItem value={"5'4\""}>5&apos;4&quot;</SelectItem>
                      <SelectItem value={"5'5\""}>5&apos;5&quot;</SelectItem>
                      <SelectItem value={"5'6\""}>5&apos;6&quot;</SelectItem>
                      <SelectItem value={"5'7\""}>5&apos;7&quot;</SelectItem>
                      <SelectItem value={"5'8\""}>5&apos;8&quot;</SelectItem>
                      <SelectItem value={"5'9\""}>5&apos;9&quot;</SelectItem>
                      <SelectItem value={"5'10\""}>5&apos;10&quot;</SelectItem>
                      <SelectItem value={"5'11\""}>5&apos;11&quot;</SelectItem>
                      <SelectItem value={"6'0\""}>6&apos;0&quot;</SelectItem>
                      <SelectItem value={"6'1\""}>6&apos;1&quot;</SelectItem>
                      <SelectItem value={"6'2\""}>6&apos;2&quot;</SelectItem>
                      <SelectItem value={"6'3\""}>6&apos;3&quot;</SelectItem>
                      <SelectItem value={"6'4\""}>6&apos;4&quot;</SelectItem>
                      <SelectItem value={"6'5\""}>6&apos;5&quot;</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Never Married">Never Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                      <SelectItem value="Separated">Separated</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Cultural Background</h3>
          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="motherTongue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother Tongue</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mother tongue" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Telugu">Telugu</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                      <SelectItem value="Kannada">Kannada</SelectItem>
                      <SelectItem value="Malayalam">Malayalam</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Marathi">Marathi</SelectItem>
                      <SelectItem value="Bengali">Bengali</SelectItem>
                      <SelectItem value="Gujarati">Gujarati</SelectItem>
                      <SelectItem value="Punjabi">Punjabi</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Hindu">Hindu</SelectItem>
                      <SelectItem value="Muslim">Muslim</SelectItem>
                      <SelectItem value="Christian">Christian</SelectItem>
                      <SelectItem value="Sikh">Sikh</SelectItem>
                      <SelectItem value="Buddhist">Buddhist</SelectItem>
                      <SelectItem value="Jain">Jain</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caste"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caste (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Education & Career</h3>
          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highest Education</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Contact Information</h3>
          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    City, State, Country
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profilePic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a URL for your profile picture
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">About You</h3>
          <Separator className="my-4" />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Yourself</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Tell potential matches about yourself, your interests, and what you're looking for..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-primary hover:bg-primary-dark" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isCreating ? "Create Profile" : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
