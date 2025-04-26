import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Vivaham Matrimony</title>
        <meta name="description" content="Read our terms of service to understand the rules and guidelines for using Vivaham Matrimony." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold font-heading mb-6">Terms of Service</h1>
          <Card>
            <CardHeader>
              <CardTitle>Vivaham Matrimony Terms of Service</CardTitle>
              <p className="text-sm text-neutral-500">Last Updated: May 1, 2023</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the Vivaham Matrimony website and services, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">2. Eligibility</h2>
                <p>
                  You must be at least 18 years old to register for an account and use our services. By registering, you represent 
                  and warrant that you are at least 18 years old and that you have the right, authority, and capacity to enter into 
                  this agreement and to abide by all of the terms and conditions of this agreement.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">3. Account Registration</h2>
                <p>
                  When you register for an account, you will be asked to provide certain information such as your name, email address, 
                  phone number, date of birth, and other personal details. You agree to provide accurate, current, and complete 
                  information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                <p className="mt-2">
                  You are responsible for safeguarding your password. You agree not to disclose your password to any third party and 
                  to take sole responsibility for any activities or actions under your account, whether or not you have authorized 
                  such activities or actions.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">4. User Conduct</h2>
                <p>
                  You agree to use Vivaham Matrimony for lawful purposes only. You must not use our services to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Harass, abuse, or harm another person</li>
                  <li>Create a false identity or impersonate another person</li>
                  <li>Post false, inaccurate, misleading, or offensive content</li>
                  <li>Transmit any viruses, worms, defects, Trojan horses, or any items of a destructive nature</li>
                  <li>Collect or store personal data about other users</li>
                  <li>Attempt to access any section of our services that you are not authorized to access</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">5. Profile Content</h2>
                <p>
                  You are solely responsible for the content of your profile and any information you provide to us or other users. 
                  You grant us a non-exclusive, worldwide, royalty-free, irrevocable, sub-licensable license to use, reproduce, 
                  adapt, publish, translate, and distribute your profile content in connection with our services.
                </p>
                <p className="mt-2">
                  We reserve the right to remove any content that violates these terms or that we find objectionable for any reason.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">6. Privacy Policy</h2>
                <p>
                  Please refer to our Privacy Policy for information about how we collect, use, and disclose information about you.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend your account and access to our services at our sole discretion, 
                  without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of our 
                  services, us, or third parties, or for any other reason.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Vivaham Matrimony shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or 
                  indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">9. Changes to Terms</h2>
                <p>
                  We may modify these Terms of Service from time to time. We will notify you of any changes by posting the new Terms 
                  of Service on this page and updating the "Last Updated" date. You are advised to review these Terms of Service 
                  periodically for any changes.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="mt-2">
                  Email: support@vivahammatrimony.com<br />
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

export default TermsOfService;
