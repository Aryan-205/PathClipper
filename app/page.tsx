import React from 'react'
import HeroSection from '@/components/hero-section'
import FooterOne from '@/components/footer-one'

export default function page() {
  return (
    <div className='w-full min-h-screen bg-black flex flex-col'>
      <HeroSection />

      <FooterOne />
    </div>
  )
}
