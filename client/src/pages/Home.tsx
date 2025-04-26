import Hero from "@/components/home/Hero";
import QuickSearch from "@/components/home/QuickSearch";
import FeaturedProfiles from "@/components/home/FeaturedProfiles";
import HowItWorks from "@/components/home/HowItWorks";
import SuccessStories from "@/components/home/SuccessStories";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Vivaham Matrimony - Find Your Perfect Life Partner</title>
        <meta name="description" content="Join Vivaham Matrimony to find your perfect life partner. Browse profiles, connect with potential matches, and begin your journey to a lifelong commitment." />
      </Helmet>
      
      <Hero />
      <QuickSearch />
      <FeaturedProfiles />
      <HowItWorks />
      <SuccessStories />
      <Features />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
