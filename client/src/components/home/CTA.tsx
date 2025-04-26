import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const CTA = () => {
  // Check if user is authenticated
  const { data: currentUser } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Begin Your Journey to Finding Love
          </h2>
          <p className="text-white text-lg mb-8">
            Join thousands of happy couples who found their perfect match on Vivaham Matrimony.
          </p>
          
          {currentUser ? (
            <Link href="/search">
              <Button size="lg" variant="secondary" className="px-10 py-4 bg-white text-primary hover:bg-neutral-100 text-lg font-bold shadow-md">
                Find Your Match Today
              </Button>
            </Link>
          ) : (
            <Link href="/create-profile">
              <Button size="lg" variant="secondary" className="px-10 py-4 bg-white text-primary hover:bg-neutral-100 text-lg font-bold shadow-md">
                Register Now - It's Free!
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
