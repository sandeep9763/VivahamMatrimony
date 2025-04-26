import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProfileCard from "@/components/profile/ProfileCard";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProfiles = () => {
  const { data: profiles, isLoading, error } = useQuery({
    queryKey: ['/api/users/featured'],
  });

  // Create profile skeletons for loading state
  const renderSkeletons = () => {
    return Array(4).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
        <Skeleton className="h-64 w-full" />
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    ));
  };

  return (
    <section className="py-16 bg-neutral-50 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M0%200a10%2010%200%201%201%2020%200h-2a8%208%200%201%200-16%200H0z%27%20fill%3D%27%23FBD38D%27%20fill-opacity%3D%270.4%27%2F%3E%3C%2Fsvg%3E')]">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Featured Profiles</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover some of our handpicked profiles that might be the perfect match for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            renderSkeletons()
          ) : error ? (
            <div className="col-span-full text-center text-red-500">
              Error loading profiles. Please try again later.
            </div>
          ) : profiles && profiles.length > 0 ? (
            profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))
          ) : (
            <div className="col-span-full text-center">
              No featured profiles available at the moment.
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/search">
            <Button variant="outline" className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white text-lg">
              View More Profiles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfiles;
