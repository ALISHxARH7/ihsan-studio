import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import PriceList from '@/components/PriceList';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Portfolio />
        <PriceList />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
