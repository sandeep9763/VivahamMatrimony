import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Link } from "wouter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon, MessageSquareOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MessageListProps {
  selectedUserId?: string;
}

const MessageList = ({ selectedUserId }: MessageListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const userId = Number(selectedUserId);

  // Fetch all messages for current user
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/messages'],
  });

  // Fetch current user
  const { data: currentUser } = useQuery({
    queryKey: ['/api/auth/me'],
  });

  if (messagesLoading) {
    return (
      <div className="space-y-4">
        <Input
          placeholder="Search conversations..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={true}
        />
        {Array(5).fill(0).map((_, index) => (
          <Card key={index} className="cursor-pointer hover:bg-neutral-50">
            <CardContent className="p-4 flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-4 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Process messages to get unique conversations
  const conversations = messages ? getUniqueConversations(messages, currentUser?.id) : [];

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(convo => 
    convo.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredConversations.length === 0 && !searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <MessageSquareOff className="h-12 w-12 text-neutral-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Messages Yet</h3>
        <p className="text-neutral-600 text-sm mb-4">
          You haven't started any conversations yet. 
          Express interest in profiles to start connecting.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search conversations..."
        className="w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        prefix={<SearchIcon className="h-4 w-4 text-neutral-500" />}
      />

      {filteredConversations.length === 0 && searchQuery ? (
        <div className="text-center py-8">
          <p className="text-neutral-600">No conversations match your search.</p>
        </div>
      ) : (
        filteredConversations.map((conversation) => (
          <Link key={conversation.userId} href={`/messages/${conversation.userId}`}>
            <Card className={cn(
              "cursor-pointer hover:bg-neutral-50 transition-colors",
              userId === conversation.userId && "bg-neutral-100"
            )}>
              <CardContent className="p-4 flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={conversation.profilePic} />
                  <AvatarFallback>{conversation.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium">{conversation.userName}</h4>
                  <p className="text-sm text-neutral-500 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                <div className="text-xs text-neutral-500">
                  {formatMessageTime(conversation.timestamp)}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

// Helper functions
function getUniqueConversations(messages: any[], currentUserId: number) {
  const userMap = new Map();
  
  // Sort messages by timestamp (newest first)
  const sortedMessages = [...messages].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  sortedMessages.forEach(message => {
    // Determine which user is the other party in the conversation
    const otherUserId = message.fromUserId === currentUserId 
      ? message.toUserId 
      : message.fromUserId;
    
    // Only add if this user's conversation isn't already in the map
    if (!userMap.has(otherUserId)) {
      userMap.set(otherUserId, {
        userId: otherUserId,
        userName: message.fromUserId === currentUserId 
          ? `User ${message.toUserId}` // placeholder, would need to fetch user details
          : `User ${message.fromUserId}`,
        lastMessage: message.content,
        timestamp: message.createdAt,
        profilePic: '', // Would need to be fetched from user details
      });
    }
  });
  
  return Array.from(userMap.values());
}

function formatMessageTime(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
}

export default MessageList;
