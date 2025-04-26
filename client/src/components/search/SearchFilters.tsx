import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  FilterX, 
  Search 
} from "lucide-react";

const SearchFilters = () => {
  const [location, navigate] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  
  // State for all filters
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [ageRange, setAgeRange] = useState<[number, number]>([
    parseInt(searchParams.get("ageMin") || "18"),
    parseInt(searchParams.get("ageMax") || "60")
  ]);
  const [motherTongue, setMotherTongue] = useState(searchParams.get("motherTongue") || "");
  const [religion, setReligion] = useState(searchParams.get("religion") || "");
  const [maritalStatus, setMaritalStatus] = useState(searchParams.get("maritalStatus") || "");
  const [education, setEducation] = useState(searchParams.get("education") || "");
  const [profession, setProfession] = useState(searchParams.get("profession") || "");
  const [locationFilter, setLocationFilter] = useState(searchParams.get("location") || "");

  // Handle search
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (gender) params.append("gender", gender);
    params.append("ageMin", ageRange[0].toString());
    params.append("ageMax", ageRange[1].toString());
    if (motherTongue) params.append("motherTongue", motherTongue);
    if (religion) params.append("religion", religion);
    if (maritalStatus) params.append("maritalStatus", maritalStatus);
    if (education) params.append("education", education);
    if (profession) params.append("profession", profession);
    if (locationFilter) params.append("location", locationFilter);
    
    navigate(`/search?${params.toString()}`);
  };

  // Reset filters
  const resetFilters = () => {
    setGender("");
    setAgeRange([18, 60]);
    setMotherTongue("");
    setReligion("");
    setMaritalStatus("");
    setEducation("");
    setProfession("");
    setLocationFilter("");
    navigate("/search");
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Search Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="mb-2 block">I am looking for</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Groom</SelectItem>
              <SelectItem value="Female">Bride</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Age Range: {ageRange[0]} - {ageRange[1]}</Label>
          <Slider
            value={ageRange}
            min={18}
            max={70}
            step={1}
            onValueChange={(value: [number, number]) => setAgeRange(value)}
            className="my-4"
          />
        </div>

        <Separator />

        <div>
          <Label className="mb-2 block">Mother Tongue</Label>
          <Select value={motherTongue} onValueChange={setMotherTongue}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
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

        <div>
          <Label className="mb-2 block">Religion</Label>
          <Select value={religion} onValueChange={setReligion}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="Hindu">Hindu</SelectItem>
              <SelectItem value="Muslim">Muslim</SelectItem>
              <SelectItem value="Christian">Christian</SelectItem>
              <SelectItem value="Sikh">Sikh</SelectItem>
              <SelectItem value="Buddhist">Buddhist</SelectItem>
              <SelectItem value="Jain">Jain</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Marital Status</Label>
          <Select value={maritalStatus} onValueChange={setMaritalStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="Never Married">Never Married</SelectItem>
              <SelectItem value="Divorced">Divorced</SelectItem>
              <SelectItem value="Widowed">Widowed</SelectItem>
              <SelectItem value="Separated">Separated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <Label className="mb-2 block">Education</Label>
          <Input 
            value={education} 
            onChange={(e) => setEducation(e.target.value)} 
            placeholder="Any education"
          />
        </div>

        <div>
          <Label className="mb-2 block">Profession</Label>
          <Input 
            value={profession} 
            onChange={(e) => setProfession(e.target.value)} 
            placeholder="Any profession"
          />
        </div>

        <div>
          <Label className="mb-2 block">Location</Label>
          <Input 
            value={locationFilter} 
            onChange={(e) => setLocationFilter(e.target.value)} 
            placeholder="Any location"
          />
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button 
            onClick={handleSearch}
            className="w-full bg-primary hover:bg-primary-dark"
          >
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
          <Button 
            onClick={resetFilters}
            variant="outline" 
            className="w-full"
          >
            <FilterX className="mr-2 h-4 w-4" /> Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
