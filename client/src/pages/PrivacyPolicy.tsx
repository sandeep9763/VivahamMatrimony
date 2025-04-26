import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Vivaham Matrimony</title>
        <meta name="description" content="Read our privacy policy to understand how we collect, use, and protect your personal information on Vivaham Matrimony." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold font-heading mb-6">Privacy Policy</h1>
          <Card>
            <CardHeader>
              <CardTitle>Vivaham Matrimony Privacy Policy</CardTitle>
              <p className="text-sm text-neutral-500">Last Updated: May 1, 2023</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                <p>
                  Vivaham Matrimony ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website or use our matrimony services.
                </p>
                <p className="mt-2">
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
                  please do not access the site or use our services.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
                <p>We may collect information about you in a variety of ways:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <strong>Personal Information:</strong> When you register for an account, we collect your name, email address, 
                    phone number, date of birth, gender, location, and other information you provide in your profile.
                  </li>
                  <li>
                    <strong>Profile Information:</strong> Information you provide about yourself, your preferences, and your 
                    interests to help us match you with potential partners.
                  </li>
                  <li>
                    <strong>Usage Information:</strong> Information about how you use our website, which profiles you view, 
                    and your interactions with other users.
                  </li>
                  <li>
                    <strong>Device Information:</strong> Information about your device, IP address, browser type, 
                    and operating system.
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
                <p>We may use the information we collect about you for various purposes, including:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>To create and manage your account</li>
                  <li>To provide personalized matchmaking services</li>
                  <li>To communicate with you about our services, updates, and promotional offers</li>
                  <li>To improve our website and services</li>
                  <li>To ensure the security of our platform</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">4. Information Sharing</h2>
                <p>
                  We may share your information with other users as part of the matchmaking service. 
                  We may also share your information with service providers who perform services on our behalf, 
                  such as hosting services and payment processors.
                </p>
                <p className="mt-2">
                  We do not sell your personal information to third parties for marketing purposes.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">5. Security of Your Information</h2>
                <p>
                  We use administrative, technical, and physical security measures to help protect your personal information. 
                  While we have taken reasonable steps to secure the personal information you provide to us, please be aware that 
                  despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be 
                  guaranteed against any interception or other type of misuse.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">6. Your Privacy Rights</h2>
                <p>
                  You have the right to access, update, delete your personal information, and to opt out of certain uses 
                  of your personal information. You can exercise these rights by accessing your account settings or 
                  contacting us directly.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">7. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy 
                  periodically for any changes.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
                <p>
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-2">
                  Email: privacy@vivahammatrimony.com<br />
                  Phone: +91 9876543210<br />
                  Address: 123 Main Street, Hyderabad, Telangana, India - 500001
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
