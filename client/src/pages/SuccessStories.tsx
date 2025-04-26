import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import SuccessStoryCard from "@/components/ui/SuccessStoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart } from "lucide-react";

const SuccessStories = () => {
  // Fetch all success stories
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['/api/success-stories'],
  });
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <Skeleton className="h-64 md:h-full w-full" />
              </div>
              <div className="md:w-3/5 p-6">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-heading mb-4">Success Stories</h1>
          <p className="text-red-500 mb-4">Error loading success stories. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Success Stories | Vivaham Matrimony</title>
        <meta name="description" content="Read inspiring success stories of couples who found their perfect match through Vivaham Matrimony." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="inline-block bg-primary bg-opacity-10 p-3 rounded-full mb-4">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-heading mb-4">Success Stories</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Read inspiring stories from couples who found their perfect match through Vivaham Matrimony. 
            Their journeys could be your story too.
          </p>
        </div>
        
        {stories && stories.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stories.map((story: any) => (
              <SuccessStoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-neutral-600">
              No success stories available at the moment. 
              Be the first to share your story!
            </p>
          </div>
        )}
        
        <div className="mt-16 bg-neutral-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold font-heading mb-4">Share Your Success Story</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Found your perfect match through Vivaham Matrimony? 
            We'd love to hear your story and share it with others who are on the same journey.
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300">
            Submit Your Story
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessStories;
