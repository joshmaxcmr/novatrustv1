import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import Statistics from '@/components/home/Statistics'
import Testimonials from '@/components/home/Testimonials'
import CTA from '@/components/home/CTA'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Statistics />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}