import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, MessageSquare } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">How Vivaham Matrimony Works</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">Simple steps to find your perfect life partner.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-6">
              <UserPlus className="h-8 w-8" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3">Register</h3>
            <p className="text-neutral-600">
              Create your profile with details about yourself, your family, and your partner preferences.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3">Search</h3>
            <p className="text-neutral-600">
              Browse profiles based on your preferences and find potential matches that interest you.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3">Connect</h3>
            <p className="text-neutral-600">
              Express interest and begin conversations with potential partners to find your perfect match.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link href="/create-profile">
            <Button className="px-8 py-3 bg-primary text-white hover:bg-primary-dark text-lg">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
