import Image from "next/image";
import {Header} from "@/components/header";
import {HeroSection} from "@/components/hero-section";
import {AboutSection} from "@/components/about-section";
import {ProjectsSection} from "@/components/projects-section";
import {ContactSection} from "@/components/contact-section";
import {Footer} from "@/components/footer";

export default function Home() {
  return (
      <main className="min-h-screen bg-background">
        <Header/>
        <HeroSection/>
        <AboutSection/>
        <ProjectsSection/>
        <ContactSection/>
        <Footer/>
      </main>
  );
}
