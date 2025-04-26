import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Search = () => {
  const [location] = useLocation();
  const queryParams = new URLSearchParams(location.split("?")[1] || "");
  
  // Check if there are any filters applied
  const hasFilters = Array.from(queryParams.entries()).length > 0;
  
  // Check for active search parameters to generate a title
  const gender = queryParams.get("gender");
  const ageMin = queryParams.get("ageMin");
  const ageMax = queryParams.get("ageMax");
  const motherTongue = queryParams.get("motherTongue");
  
  let searchTitle = "Browse All Profiles";
  
  if (hasFilters) {
    searchTitle = `${gender === "Male" ? "Groom" : gender === "Female" ? "Bride" : "Profile"} Search Results`;
    if (ageMin && ageMax) {
      searchTitle += ` (${ageMin}-${ageMax} yrs)`;
    }
    if (motherTongue) {
      searchTitle += ` - ${motherTongue}`;
    }
  }

  return (
    <>
      <Helmet>
        <title>Search Profiles | Vivaham Matrimony</title>
        <meta name="description" content="Search for your perfect match based on your preferences. Filter by age, religion, caste, profession and more." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-heading mb-8">Find Your Perfect Match</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters />
          </div>
          
          {/* Search results */}
          <div className="lg:col-span-3">
            <Card className="mb-8">
              <CardHeader className="pb-3">
                <CardTitle>{searchTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <SearchResults />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
