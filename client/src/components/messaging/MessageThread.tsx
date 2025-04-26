import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@shared/schema";
import { Send, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageThreadProps {
  otherUserId: string;
}

interface Message {
  id: number;
  fromUserId: number;
  toUserId: number;
  content: string;
  createdAt: string;
  read: boolean;
}

const MessageThread = ({ otherUserId }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fetch current user
  const { data: currentUser } = useQuery({
    queryKey: ['/api/auth/me'],
  });

  // Fetch the other user
  const { data: otherUser, isLoading: otherUserLoading, error: otherUserError } = useQuery({
    queryKey: [`/api/users/${otherUserId}`],
    enabled: !!otherUserId,
  });

  // Fetch message thread
  const { data: messages, isLoading: messagesLoading, error: messagesError } = useQuery({
    queryKey: ['/api/messages', otherUserId],
    queryFn: async () => {
      const response = await fetch(`/api/messages/${otherUserId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      return response.json();
    },
    enabled: !!otherUserId && !!currentUser,
    refetchInterval: 5000, // Polling every 5 seconds for new messages
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      await apiRequest("POST", "/api/messages", {
        fromUserId: currentUser.id,
        toUserId: parseInt(otherUserId),
        content,
      });
    },
    onSuccess: () => {
      // Clear the input and refetch messages
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ['/api/messages', otherUserId] });
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessageMutation.mutate(newMessage);
  };

  // Handle pressing Enter to send
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (otherUserLoading || messagesLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <Skeleton className={`h-16 w-2/3 rounded-lg`} />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <Skeleton className="h-20 w-full" />
        </CardFooter>
      </Card>
    );
  }

  if (otherUserError || messagesError) {
    return (
      <Card className="h-full">
        <CardContent className="p-8 flex flex-col items-center justify-center h-full">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Error Loading Messages</h3>
          <p className="text-neutral-600 text-center mb-4">
            There was a problem loading this conversation. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="border-b py-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={otherUser?.profilePic} />
            <AvatarFallback>
              {otherUser?.firstName?.charAt(0) || ''}
              {otherUser?.lastName?.charAt(0) || ''}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg font-medium">
            {otherUser?.firstName} {otherUser?.lastName}
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-4">
          {messages && messages.length > 0 ? (
            messages.map((message: Message) => (
              <div 
                key={message.id} 
                className={`flex ${message.fromUserId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.fromUserId === currentUser?.id 
                      ? 'bg-primary text-white' 
                      : 'bg-neutral-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p 
                    className={`text-xs mt-1 ${
                      message.fromUserId === currentUser?.id 
                        ? 'text-primary-foreground/70' 
                        : 'text-neutral-500'
                    }`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-neutral-500">
                No messages yet. Start the conversation!
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <div className="flex w-full items-end gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={3}
            className="flex-1 resize-none min-h-[80px]"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sendMessageMutation.isPending}
            className="bg-primary hover:bg-primary-dark"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MessageThread;
