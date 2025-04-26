import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import ProfileCard from "@/components/profile/ProfileCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { User } from "@shared/schema";
import { FrownIcon, SearchX } from "lucide-react";

const SearchResults = () => {
  const [location] = useLocation();
  const queryParams = new URLSearchParams(location.split("?")[1] || "");
  
  // Build the query key based on search params to ensure proper caching
  const searchParams = Object.fromEntries(queryParams.entries());
  
  // Use tanstack query to fetch data
  const { data: profiles, isLoading, error } = useQuery({
    queryKey: ['/api/users/search', searchParams],
    queryFn: async () => {
      const response = await fetch(`/api/users/search?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch profiles");
      }
      return response.json();
    },
  });

  // Render skeletons while loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
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
        ))}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center py-10">
        <SearchX className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Error Loading Results</h3>
        <p className="text-neutral-600 mb-4">
          There was a problem fetching profiles. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  // Handle empty results
  if (!profiles || profiles.length === 0) {
    return (
      <div className="text-center py-10">
        <FrownIcon className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
        <h3 className="text-xl font-bold mb-2">No Matches Found</h3>
        <p className="text-neutral-600 mb-4">
          We couldn't find any profiles matching your search criteria. 
          Try adjusting your filters for more results.
        </p>
        <Link href="/search">
          <Button>
            Clear Filters
          </Button>
        </Link>
      </div>
    );
  }

  // Display search results
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile: User) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default SearchResults;
