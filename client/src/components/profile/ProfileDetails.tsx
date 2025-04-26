import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { User } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Languages, 
  User as UserIcon,
  Heart, 
  MessageSquare, 
  Edit, 
  Mail,
  Phone
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProfileDetailsProps {
  profile: User;
  isCurrentUser: boolean;
}

const ProfileDetails = ({ profile, isCurrentUser }: ProfileDetailsProps) => {
  const [showContact, setShowContact] = useState(false);
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  // Check if current user has sent interest to this profile
  const { data: interestData } = useQuery({
    queryKey: ['/api/interests'],
    enabled: !isCurrentUser,
  });

  const hasSentInterest = interestData?.some(
    (interest: any) => 
      interest.toUserId === profile.id && 
      interest.status !== 'declined'
  );

  // Interest mutation
  const interestMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/interests", {
        fromUserId: queryClient.getQueryData(['/api/auth/me'])?.id,
        toUserId: profile.id,
        status: "pending"
      });
    },
    onSuccess: () => {
      toast({
        title: "Interest sent",
        description: "Your interest has been sent successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/interests'] });
    },
    onError: () => {
      toast({
        title: "Failed to send interest",
        description: "There was a problem sending your interest. Please try again.",
        variant: "destructive",
      });
    }
  });

  const sendInterest = () => {
    interestMutation.mutate();
  };

  const startConversation = () => {
    navigate(`/messages/${profile.id}`);
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3">
              <Avatar className="w-full h-auto aspect-square rounded-md">
                <AvatarImage 
                  src={profile.profilePic || `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}&background=random`} 
                  alt={`${profile.firstName} ${profile.lastName}`} 
                />
                <AvatarFallback className="text-4xl">{profile.firstName.charAt(0)}{profile.lastName.charAt(0)}</AvatarFallback>
              </Avatar>
              
              {!isCurrentUser && (
                <div className="mt-4 space-y-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary-dark"
                    onClick={() => setShowContact(!showContact)}
                  >
                    View Contact Info
                  </Button>
                  
                  <Button 
                    className="w-full"
                    onClick={sendInterest}
                    disabled={hasSentInterest || interestMutation.isPending}
                    variant={hasSentInterest ? "secondary" : "default"}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    {interestMutation.isPending 
                      ? "Sending..." 
                      : hasSentInterest 
                        ? "Interest Sent" 
                        : "Express Interest"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={startConversation}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              )}
              
              {isCurrentUser && (
                <div className="mt-4">
                  <Link href="/edit-profile">
                    <Button className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-2xl font-bold font-heading">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-neutral-500">
                    {calculateAge(profile.dateOfBirth)} yrs, {profile.height}
                  </p>
                </div>
              </div>
              
              {showContact && !isCurrentUser && (
                <Card className="mb-4 bg-neutral-50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="py-3">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-neutral-500" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-neutral-500" />
                        <span>{profile.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                  <TabsTrigger value="background">Background</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">About {profile.firstName}</h3>
                      <p className="text-neutral-600">{profile.about || "No information provided."}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Location</h3>
                      <div className="flex items-center text-neutral-600">
                        <MapPin className="h-4 w-4 mr-2 text-neutral-500" />
                        {profile.location}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="basic-info" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-500">Age</p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-neutral-500" />
                        <p>{calculateAge(profile.dateOfBirth)} years</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-500">Gender</p>
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2 text-neutral-500" />
                        <p>{profile.gender}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-500">Marital Status</p>
                      <p>{profile.maritalStatus}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-500">Height</p>
                      <p>{profile.height}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-500">Education</p>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-neutral-500" />
                        <p>{profile.education}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-500">Profession</p>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-neutral-500" />
                        <p>{profile.profession}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="background" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-500">Mother Tongue</p>
                      <div className="flex items-center">
                        <Languages className="h-4 w-4 mr-2 text-neutral-500" />
                        <p>{profile.motherTongue}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-500">Religion</p>
                      <p>{profile.religion}</p>
                    </div>
                    
                    {profile.caste && (
                      <div className="space-y-1">
                        <p className="text-sm text-neutral-500">Caste</p>
                        <p>{profile.caste}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetails;
