import { Navigation } from '@/components/Navigation';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { Realisations } from '@/sections/Realisations';
import { AvisClients } from '@/sections/AvisClients';
import { About } from '@/sections/About';
import { Contact } from '@/sections/Contact';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Realisations />
        <AvisClients />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
