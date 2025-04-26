import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SuccessStory } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";

interface SuccessStoryCardProps {
  story: SuccessStory;
}

const SuccessStoryCard = ({ story }: SuccessStoryCardProps) => {
  // Get both users in the success story
  const { data: user1 } = useQuery({
    queryKey: [`/api/users/${story.user1Id}`],
  });
  
  const { data: user2 } = useQuery({
    queryKey: [`/api/users/${story.user2Id}`],
  });
  
  if (!user1 || !user2) {
    return null; // Don't render if we don't have both users
  }
  
  const coupleNames = `${user1.firstName} & ${user2.firstName}`;
  
  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
      <div className="md:w-2/5">
        <img 
          src={story.photo || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"} 
          alt="Success Story" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="md:w-3/5 p-6">
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
          </div>
        </div>
        <h3 className="font-heading text-xl font-bold mb-2">{coupleNames}</h3>
        <p className="text-sm text-neutral-500 mb-4">Married on {formatDate(story.marriageDate)}</p>
        <p className="text-neutral-600 mb-4">{truncateText(story.story, 150)}</p>
        <a href="#" className="text-primary font-medium hover:underline">Read Full Story</a>
      </div>
    </Card>
  );
};

// Helper functions
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export default SuccessStoryCard;
