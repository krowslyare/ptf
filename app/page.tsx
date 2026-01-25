import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Experience } from "@/components/portfolio/experience";
import { Projects } from "@/components/portfolio/projects";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { TracingBeam } from "@/components/portfolio/tracing-beam";
import { UnfocusedLoader } from "@/components/portfolio/unfocused-loader";

export default function Home() {
  return (
    <main className="min-h-screen">
      <UnfocusedLoader />
      <Header />
      <Hero />
      <TracingBeam>
        <About />
        <Experience />
        <Projects />
      </TracingBeam>
      <Contact />
      <Footer />
    </main>
  );
}
