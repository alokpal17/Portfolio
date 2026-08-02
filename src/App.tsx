import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useScrollReveal, useActiveSection } from '@/hooks/useScrollReveal';

function App() {
  const ref = useScrollReveal<HTMLDivElement>();
  useActiveSection(['about', 'skills', 'projects', 'education', 'contact']);

  return (
    <div ref={ref} className="min-h-screen bg-bg text-text-main">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
