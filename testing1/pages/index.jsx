// pages/index.jsx
import Head from 'next/head';
import dynamic from 'next/dynamic';
import homeMessages from '../content/homeMessages';
import IntroSection from '../components/IntroSection';
import Layout from '../components/Layout';
import NavHeader from '../components/NavHeader';
import Tape from '../components/Tape';
import HeroSection from '../components/HeroSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ServicesSection from '../components/ServicesSection';
import Testimonials from '../components/Testimonials';
import MapAndCoverage from '../components/MapAndCoverage';
import CallToAction from '../components/CallToAction';
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });

export default function Home() {
  const m = homeMessages;
  return (
    <Layout>
      <Head>
        <title>Bs Move — Déménagement professionnel en Île-de-France</title>
        <meta name="description" content="Bs Move - déménagements en Ile-de-France. Devis gratuit, équipe pro et service sur-mesure." />
      </Head>

      <NavHeader />
      <HeroSection data={m.hero} />
      <IntroSection data={m.intro} />
      <Tape />
      <WhyChooseUs data={{ title: "Pourquoi nous choisir ?", features: m.features.map(f=>f.title ? `${f.title} — ${f.text || ''}`: f) }} />
      <ServicesSection data={{ title: m.services.title, description: '', items: m.services.items }} />
      <Testimonials data={m.testimonials} />
      <Tape />
      <MapAndCoverage data={m.coverage} />
      <CallToAction data={{ title: m.cta.title, description: m.cta.description, button: m.cta.button }} />
      <Footer />
    </Layout>
  );
}
