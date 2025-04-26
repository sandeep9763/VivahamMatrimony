import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { User } from "@shared/schema";

interface ProfileCardProps {
  profile: User;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="h-64 overflow-hidden">
        <img 
          src={profile.profilePic || `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}&background=random`} 
          alt={`${profile.firstName} ${profile.lastName}`} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-medium text-lg">{`${profile.firstName} ${profile.lastName.charAt(0)}.`}</h3>
          <span className="text-sm text-neutral-500">{calculateAge(profile.dateOfBirth)} yrs</span>
        </div>
        <div className="flex flex-col space-y-1 text-sm text-neutral-600 mb-4">
          <p>{profile.education}</p>
          <p>{profile.location}</p>
          <p>{profile.profession}</p>
        </div>
        <Link href={`/profile/${profile.id}`}>
          <Button className="w-full py-2 bg-primary text-white hover:bg-primary-dark">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
