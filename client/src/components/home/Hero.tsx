import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const Hero = () => {
  // Check if user is authenticated
  const { data: currentUser } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  return (
    <section className="relative">
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"}}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h2 className="text-white font-script text-3xl md:text-4xl mb-2">Find your</h2>
            <h1 className="text-white font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Perfect Life Partner</h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-2xl">
              Join thousands of happy couples who found their soulmate through Vivaham Matrimony - India's trusted matchmaking service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {currentUser ? (
                <>
                  <Link href="/search">
                    <Button size="lg" className="px-8 py-3 bg-primary text-white hover:bg-primary-dark text-lg">
                      Search Profiles
                    </Button>
                  </Link>
                  <Link href={`/profile/${currentUser.id}`}>
                    <Button size="lg" variant="secondary" className="px-8 py-3 bg-white text-primary hover:bg-neutral-100 text-lg">
                      My Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/create-profile">
                    <Button size="lg" className="px-8 py-3 bg-primary text-white hover:bg-primary-dark text-lg">
                      Create Free Profile
                    </Button>
                  </Link>
                  <Link href="/search">
                    <Button size="lg" variant="secondary" className="px-8 py-3 bg-white text-primary hover:bg-neutral-100 text-lg">
                      Search Profiles
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
