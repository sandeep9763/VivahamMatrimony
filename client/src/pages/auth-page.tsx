import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const AuthPage = () => {
  const { user, isLoading } = useAuth();
  const [_, navigate] = useLocation();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleLoginSuccess = () => {
    navigate('/');
  };

  const handleRegisterSuccess = () => {
    navigate('/create-profile');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
        {/* Left Column - Form */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-2 text-center">Welcome to Vivaham Matrimony</h1>
          <p className="text-muted-foreground mb-6 text-center">Find your perfect life partner</p>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm onLoginSuccess={handleLoginSuccess} />
              
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account? 
                  <TabsTrigger value="register" className="text-primary underline ml-2 p-0 bg-transparent">
                    Create one now
                  </TabsTrigger>
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
              
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account? 
                  <TabsTrigger value="login" className="text-primary underline ml-2 p-0 bg-transparent">
                    Login here
                  </TabsTrigger>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column - Hero Section */}
        <div className="text-center md:text-left order-first md:order-last">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent">
            Find Your Perfect Match
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Join thousands of happy couples who found love on our platform
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Verified Profiles</h3>
                <p className="text-gray-600">All our profiles are manually verified for authenticity</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Smart Matching</h3>
                <p className="text-gray-600">Our algorithm helps you find compatible partners</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Privacy Controls</h3>
                <p className="text-gray-600">You control who can see your information</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <TabsTrigger value="register" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              Join Now
            </TabsTrigger>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;