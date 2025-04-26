import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">About Vivaham Matrimony</h3>
            <p className="text-neutral-300 mb-6">
              Vivaham Matrimony is a leading matrimonial service helping people find their perfect life partner. 
              We focus on creating meaningful connections based on compatibility and shared values.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/search" className="text-neutral-300 hover:text-white transition duration-300">
                  Search Profiles
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-neutral-300 hover:text-white transition duration-300">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-white transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">Help & Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-neutral-300 hover:text-white transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-neutral-300 hover:text-white transition duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition duration-300">
                  Safety Tips
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition duration-300">
                  Report an Issue
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-primary h-5 w-5" />
                <span className="text-neutral-300">123 Main Street, Hyderabad, Telangana, India - 500001</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-primary h-5 w-5" />
                <span className="text-neutral-300">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-primary h-5 w-5" />
                <span className="text-neutral-300">info@vivahammatrimony.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-700 text-center">
          <p className="text-neutral-400">&copy; {new Date().getFullYear()} Vivaham Matrimony. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
