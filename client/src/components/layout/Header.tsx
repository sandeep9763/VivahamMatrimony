import { useState } from "react";
import { Link, useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { User } from "@shared/schema";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";

interface HeaderProps {
  user: User | null | undefined;
  isLoading: boolean;
}

const Header = ({ user, isLoading }: HeaderProps) => {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      // Invalidate the user query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      // Show success toast
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
        variant: "default",
      });
      // Navigate to auth page
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary font-heading text-3xl font-bold">Vivaham</span>
              <span className="ml-2 text-neutral-700 font-heading text-xl">Matrimony</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link href="/" className={`text-neutral-700 hover:text-primary font-medium ${location === "/" ? "text-primary" : ""}`}>
              Home
            </Link>
            <Link href="/search" className={`text-neutral-700 hover:text-primary font-medium ${location === "/search" ? "text-primary" : ""}`}>
              Search
            </Link>
            <Link href="/success-stories" className={`text-neutral-700 hover:text-primary font-medium ${location === "/success-stories" ? "text-primary" : ""}`}>
              Success Stories
            </Link>
            <Link href="/about" className={`text-neutral-700 hover:text-primary font-medium ${location === "/about" ? "text-primary" : ""}`}>
              About
            </Link>
            <Link href="/contact" className={`text-neutral-700 hover:text-primary font-medium ${location === "/contact" ? "text-primary" : ""}`}>
              Contact
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          {!isLoading && (
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/messages">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Messages
                    </Button>
                  </Link>
                  <Link href={`/profile/${user.id}`}>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      My Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="default" 
                    className="bg-primary text-white hover:bg-primary-dark"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <Button 
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button 
                      variant="default" 
                      className="bg-primary text-white hover:bg-primary-dark"
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <SheetClose asChild>
                    <Link href="/" className="text-neutral-700 hover:text-primary font-medium px-2 py-1">Home</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/search" className="text-neutral-700 hover:text-primary font-medium px-2 py-1">Search</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/success-stories" className="text-neutral-700 hover:text-primary font-medium px-2 py-1">Success Stories</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/about" className="text-neutral-700 hover:text-primary font-medium px-2 py-1">About</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/contact" className="text-neutral-700 hover:text-primary font-medium px-2 py-1">Contact</Link>
                  </SheetClose>
                  
                  {!isLoading && (
                    <>
                      {user ? (
                        <>
                          <SheetClose asChild>
                            <Link href="/messages" className="text-neutral-700 hover:text-primary font-medium px-2 py-1">Messages</Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href={`/profile/${user.id}`} className="text-neutral-700 hover:text-primary font-medium px-2 py-1">My Profile</Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button 
                              variant="default" 
                              className="w-full bg-primary text-white hover:bg-primary-dark"
                              onClick={handleLogout}
                            >
                              Logout
                            </Button>
                          </SheetClose>
                        </>
                      ) : (
                        <div className="flex flex-col space-y-2">
                          <SheetClose asChild>
                            <Link href="/auth" className="w-full">
                              <Button 
                                variant="outline" 
                                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                              >
                                Login
                              </Button>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/auth" className="w-full">
                              <Button 
                                variant="default" 
                                className="w-full bg-primary text-white hover:bg-primary-dark"
                              >
                                Register
                              </Button>
                            </Link>
                          </SheetClose>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
      <RegisterModal open={registerModalOpen} onOpenChange={setRegisterModalOpen} />
    </header>
  );
};

export default Header;
