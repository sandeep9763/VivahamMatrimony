import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  image: string;
  content: string;
}

const TestimonialCard = ({ name, location, image, content }: TestimonialCardProps) => {
  return (
    <Card className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400">
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4 fill-current" />
        </div>
      </div>
      <p className="text-neutral-600 mb-6">{content}</p>
      <div className="flex items-center">
        <Avatar className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-neutral-500">{location}</p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
