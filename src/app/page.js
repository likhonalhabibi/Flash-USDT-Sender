'use client'

import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import App from '@/components/App'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const AppWithNoSSR = dynamic(() => import('@/components/App'), { ssr: false })

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main>
      <Hero onOpen={openModal} />
      <AppWithNoSSR isOpen={isModalOpen} onOpen={openModal} onClose={closeModal} />
      <Features />
      <HowItWorks />
      <Pricing onOpen={openModal} />
    </main>
  )
}