import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SuccessStoryCard from "@/components/ui/SuccessStoryCard";
import { Skeleton } from "@/components/ui/skeleton";

const SuccessStories = () => {
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['/api/success-stories'],
    queryFn: async () => {
      const res = await fetch('/api/success-stories?limit=2');
      if (!res.ok) throw new Error('Failed to fetch success stories');
      return res.json();
    }
  });

  const renderSkeletons = () => {
    return Array(2).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
        <div className="md:w-2/5">
          <Skeleton className="h-64 md:h-full w-full" />
        </div>
        <div className="md:w-3/5 p-6">
          <div className="flex items-center mb-4">
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    ));
  };

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Hear from couples who found each other through Vivaham Matrimony.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isLoading ? (
            renderSkeletons()
          ) : error ? (
            <div className="col-span-full text-center text-red-500">
              Error loading success stories. Please try again later.
            </div>
          ) : stories && stories.length > 0 ? (
            stories.map((story) => (
              <SuccessStoryCard key={story.id} story={story} />
            ))
          ) : (
            <div className="col-span-full text-center">
              No success stories available at the moment.
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/success-stories">
            <Button variant="outline" className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white text-lg">
              View More Success Stories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
