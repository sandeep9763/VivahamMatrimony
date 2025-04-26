import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import MessageList from "@/components/messaging/MessageList";
import MessageThread from "@/components/messaging/MessageThread";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";

interface MessagesProps {
  selectedUserId?: string;
}

const Messages = ({ selectedUserId }: MessagesProps) => {
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
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-64" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
                <Skeleton className="h-full w-full" />
                <Skeleton className="h-full w-full md:col-span-2" />
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
        <title>Messages | Vivaham Matrimony</title>
        <meta name="description" content="Connect with potential matches through our messaging system on Vivaham Matrimony." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
                {/* Message List */}
                <div className="md:border-r pr-0 md:pr-4">
                  <MessageList selectedUserId={selectedUserId} />
                </div>
                
                {/* Message Thread */}
                <div className="md:col-span-2 h-full">
                  {selectedUserId ? (
                    <MessageThread otherUserId={selectedUserId} />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <MessageSquare className="h-12 w-12 text-neutral-300 mb-4" />
                      <h3 className="text-lg font-medium text-neutral-700 mb-2">No Conversation Selected</h3>
                      <p className="text-neutral-500 text-center max-w-md">
                        Select a conversation from the list to view messages, or start a new conversation by expressing interest in profiles.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Messages;
