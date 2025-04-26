import { 
  ShieldCheck, 
  Filter, 
  Lock, 
  Users, 
  Headphones, 
  Smartphone 
} from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck />,
      title: "Verified Profiles",
      description: "We verify all profiles to ensure authenticity and provide a safe matchmaking experience."
    },
    {
      icon: <Filter />,
      title: "Advanced Matching",
      description: "Our sophisticated algorithm suggests matches based on your preferences and compatibility."
    },
    {
      icon: <Lock />,
      title: "Privacy Control",
      description: "You have complete control over your profile visibility and who can contact you."
    },
    {
      icon: <Users />,
      title: "Community Trust",
      description: "Trusted by thousands of families across India for finding the perfect match."
    },
    {
      icon: <Headphones />,
      title: "Dedicated Support",
      description: "Our customer support team is available to assist you throughout your journey."
    },
    {
      icon: <Smartphone />,
      title: "Mobile Access",
      description: "Access your account and search for matches on the go with our mobile-friendly platform."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Why Choose Vivaham Matrimony</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover the features that make us the preferred choice for matrimonial services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
