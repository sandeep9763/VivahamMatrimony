import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const QuickSearch = () => {
  const [_, navigate] = useLocation();
  const [lookingFor, setLookingFor] = useState("Bride");
  const [ageMin, setAgeMin] = useState("18");
  const [ageMax, setAgeMax] = useState("35");
  const [motherTongue, setMotherTongue] = useState("Any");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append("gender", lookingFor === "Bride" ? "Female" : "Male");
    params.append("ageMin", ageMin);
    params.append("ageMax", ageMax);
    if (motherTongue !== "Any") {
      params.append("motherTongue", motherTongue);
    }
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="heading text-3xl text-center font-bold mb-8">Find Your Match Today</h2>
          
          <div className="bg-neutral-50 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="block text-neutral-700 mb-2">I am looking for</Label>
                <Select value={lookingFor} onValueChange={setLookingFor}>
                  <SelectTrigger className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bride">Bride</SelectItem>
                    <SelectItem value="Groom">Groom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-neutral-700 mb-2">Age</Label>
                <div className="flex space-x-2">
                  <Select value={ageMin} onValueChange={setAgeMin}>
                    <SelectTrigger className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <SelectValue placeholder="Min Age" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 43}, (_, i) => i + 18).map(age => (
                        <SelectItem key={`min-${age}`} value={age.toString()}>{age}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="self-center">to</span>
                  <Select value={ageMax} onValueChange={setAgeMax}>
                    <SelectTrigger className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <SelectValue placeholder="Max Age" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 43}, (_, i) => i + 18).map(age => (
                        <SelectItem key={`max-${age}`} value={age.toString()}>{age}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="block text-neutral-700 mb-2">Mother Tongue</Label>
                <Select value={motherTongue} onValueChange={setMotherTongue}>
                  <SelectTrigger className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any">Any</SelectItem>
                    <SelectItem value="Telugu">Telugu</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                    <SelectItem value="Kannada">Kannada</SelectItem>
                    <SelectItem value="Malayalam">Malayalam</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Marathi">Marathi</SelectItem>
                    <SelectItem value="Bengali">Bengali</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleSearch}
                className="px-10 py-3 bg-primary text-white hover:bg-primary-dark text-lg shadow-md"
              >
                <Search className="mr-2 h-5 w-5" /> Search Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickSearch;
