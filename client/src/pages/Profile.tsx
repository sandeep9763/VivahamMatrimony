import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import ProfileDetails from "@/components/profile/ProfileDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  id: string;
}

const Profile = ({ id }: ProfileProps) => {
  const [_, navigate] = useLocation();
  
  // Fetch the profile
  const { data: profile, isLoading, error } = useQuery({
    queryKey: [`/api/users/${id}`],
  });
  
  // Fetch current user to check if viewing own profile
  const { data: currentUser } = useQuery({
    queryKey: ['/api/auth/me'],
  });
  
  // Check if viewing own profile
  const isCurrentUser = currentUser?.id === parseInt(id);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      </div>
    );
  }
  
  // Error state
  if (error || !profile) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-neutral-600 mb-8">
            The profile you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button onClick={() => navigate("/search")}>
            Go Back to Search
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{`${profile.firstName} ${profile.lastName} | Vivaham Matrimony`}</title>
        <meta name="description" content={`View ${profile.firstName}'s profile - ${profile.age} years, ${profile.profession} from ${profile.location}. Connect on Vivaham Matrimony.`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ProfileDetails profile={profile} isCurrentUser={isCurrentUser} />
        </div>
      </div>
    </>
  );
};

export default Profile;
