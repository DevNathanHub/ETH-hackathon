
import Hero from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { ArtistEmpowerment } from "@/components/ArtistEmpowerment";
import { TechStack } from "@/components/TechStack";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Hero />
      <Features />
      <HowItWorks />
      <ArtistEmpowerment />
      <TechStack />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
