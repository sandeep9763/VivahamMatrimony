import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="p-6 bg-neutral-50 rounded-lg shadow-sm hover:shadow-md transition duration-300">
      <div className="w-14 h-14 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary text-2xl mb-4">
        {icon}
      </div>
      <h3 className="font-heading text-xl font-bold mb-3">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
