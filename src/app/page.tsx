import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import PriceList from '@/components/PriceList';
import Calculator from '@/components/Calculator';
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
        <Calculator />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
