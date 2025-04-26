import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import ProfileForm from "@/components/profile/ProfileForm";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const CreateProfile = () => {
  const [_, navigate] = useLocation();
  
  // Check if user is authenticated
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['/api/auth/me'],
  });
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate("/");
    }
  }, [currentUser, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  // If user already has a complete profile, redirect to edit profile
  useEffect(() => {
    if (currentUser && currentUser.motherTongue !== "Not Specified") {
      navigate("/edit-profile");
    }
  }, [currentUser, navigate]);
  
  return (
    <>
      <Helmet>
        <title>Complete Your Profile | Vivaham Matrimony</title>
        <meta name="description" content="Complete your profile on Vivaham Matrimony to find your perfect match. Share information about yourself to get better matches." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
              <CardDescription>
                Tell us more about yourself to help us find you the perfect match. 
                The more details you provide, the better your matches will be.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm user={currentUser} isCreating={true} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
