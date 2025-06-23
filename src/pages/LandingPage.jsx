// src/pages/LandingPage.jsx
import HeroSection from "../components/HeroSection";
import CallToActionButtons from "../components/CallToActonButtons";
import AuthButtons from "../components/AuthButtons";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-sky-800 to-blue-900 min-h-screen flex flex-col items-center justify-center text-center px-4">
      <HeroSection />
      <CallToActionButtons />
      <AuthButtons />
    </div>
  );
};

export default LandingPage;
