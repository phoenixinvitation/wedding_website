import { LanguageProvider } from "@/lib/LanguageContext";
import Petals from "@/components/Petals";
import TopBar from "@/components/TopBar";
import Hero from "@/components/sections/Hero";
import Couple from "@/components/sections/Couple";
import Events from "@/components/sections/Events";
import Venue from "@/components/sections/Venue";
import Gallery from "@/components/sections/Gallery";
import Countdown from "@/components/sections/Countdown";
import Blessings from "@/components/sections/Blessings";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-background">
        <Petals />
        <TopBar />
        <main className="relative z-10">
          <Hero />
          <Couple />
          <Events />
          <Venue />
          <Gallery />
          <Countdown />
          <Blessings />
          <Footer />
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
