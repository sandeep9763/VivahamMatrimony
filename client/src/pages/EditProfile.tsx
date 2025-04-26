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
import { Skeleton } from "@/components/ui/skeleton";

const EditProfile = () => {
  const [_, navigate] = useLocation();
  
  // Check if user is authenticated
  const { data: currentUser, isLoading, error } = useQuery({
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
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  if (error) {
    navigate("/");
    return null;
  }
  
  return (
    <>
      <Helmet>
        <title>Edit Your Profile | Vivaham Matrimony</title>
        <meta name="description" content="Update your profile information on Vivaham Matrimony to ensure you get the best matches." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Edit Your Profile</CardTitle>
              <CardDescription>
                Update your profile information to ensure you get the best matches. 
                The more accurate your profile, the better your chances of finding the perfect match.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm user={currentUser} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
