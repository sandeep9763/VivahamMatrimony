import { Route, Switch } from "wouter";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Profile from "@/pages/Profile";
import CreateProfile from "@/pages/CreateProfile";
import EditProfile from "@/pages/EditProfile";
import Messages from "@/pages/Messages";
import SuccessStories from "@/pages/SuccessStories";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";

function App() {
  // Check if user is authenticated
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    staleTime: 300000, // 5 minutes
    retry: false,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={currentUser} isLoading={isLoading} />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/search" component={Search} />
          <Route path="/profile/:id">{params => <Profile id={params.id} />}</Route>
          <Route path="/create-profile" component={CreateProfile} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/messages" component={Messages} />
          <Route path="/messages/:id">{params => <Messages selectedUserId={params.id} />}</Route>
          <Route path="/success-stories" component={SuccessStories} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
