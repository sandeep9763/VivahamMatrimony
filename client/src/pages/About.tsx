import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Shield, Award } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Vivaham Matrimony</title>
        <meta name="description" content="Learn about Vivaham Matrimony, our mission, values, and how we help people find their perfect life partner." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-heading mb-6">About Vivaham Matrimony</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            We're on a mission to help people find their perfect life partner through a trusted, secure, and personalized matchmaking experience.
          </p>
        </div>
        
        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-3xl font-bold font-heading mb-6">Our Story</h2>
            <div className="space-y-4 text-neutral-600">
              <p>
                Founded in 2010, Vivaham Matrimony began with a simple idea: to create a platform that combines traditional matchmaking values with modern technology.
              </p>
              <p>
                Over the years, we've helped thousands of individuals find their perfect life partners, creating countless success stories and happy marriages across India and beyond.
              </p>
              <p>
                Our deep understanding of cultural nuances, traditions, and modern relationship expectations allows us to provide a matchmaking service that respects traditional values while embracing contemporary lifestyles.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Traditional Wedding Ceremony" 
              className="rounded-lg shadow-md max-h-96 object-cover"
            />
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-heading mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-neutral-50 border-none">
              <CardContent className="p-6 text-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full inline-flex justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Meaningful Connections</h3>
                <p className="text-neutral-600">
                  We focus on creating meaningful matches based on compatibility, values, and life goals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-50 border-none">
              <CardContent className="p-6 text-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full inline-flex justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Trust & Safety</h3>
                <p className="text-neutral-600">
                  We verify profiles and maintain strict privacy measures to ensure a safe experience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-50 border-none">
              <CardContent className="p-6 text-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full inline-flex justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Inclusive Community</h3>
                <p className="text-neutral-600">
                  We welcome people from all backgrounds, respecting cultural and personal preferences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-50 border-none">
              <CardContent className="p-6 text-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full inline-flex justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Service</h3>
                <p className="text-neutral-600">
                  We're committed to providing a high-quality, user-friendly experience for all members.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-heading mb-8 text-center">Our Team</h2>
          <p className="text-center text-neutral-600 max-w-3xl mx-auto mb-10">
            Vivaham Matrimony is powered by a dedicated team of professionals who are passionate about helping people find love and happiness.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="Rajesh Kumar" 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Rajesh Kumar</h3>
              <p className="text-primary mb-2">Founder & CEO</p>
              <p className="text-neutral-600">
                With over 15 years of experience in matchmaking, Rajesh founded Vivaham Matrimony with a vision to blend tradition with technology.
              </p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="Priya Sharma" 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Priya Sharma</h3>
              <p className="text-primary mb-2">Chief Matchmaking Officer</p>
              <p className="text-neutral-600">
                Priya leads our matchmaking team, ensuring that our algorithm and human expertise work hand in hand to create perfect matches.
              </p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="Vijay Reddy" 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Vijay Reddy</h3>
              <p className="text-primary mb-2">Head of Technology</p>
              <p className="text-neutral-600">
                Vijay ensures our platform remains secure, responsive, and innovative, constantly improving the user experience.
              </p>
            </div>
          </div>
        </div>
        
        {/* Join Us CTA */}
        <div className="bg-primary rounded-lg p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Begin Your Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy couples who found their perfect match on Vivaham Matrimony. Your success story is waiting to be written.
          </p>
          <button className="px-8 py-3 bg-white text-primary font-semibold rounded-md hover:bg-neutral-100 transition duration-300">
            Create Your Free Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default About;
