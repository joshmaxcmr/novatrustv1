'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marie Kamga',
    role: 'Entrepreneure',
    content: 'Grâce à Nova Trust, j\'ai pu obtenir le financement nécessaire pour lancer mon entreprise. Leur équipe est professionnelle et vraiment à l\'écoute.',
    rating: 5,
    image: '/testimonials/user1.jpg',
  },
  {
    id: 2,
    name: 'Jean-Paul Ndiaye',
    role: 'Commerçant',
    content: 'Le service de transfert d\'argent est rapide et sécurisé. Je peux envoyer de l\'argent à ma famille en toute confiance.',
    rating: 5,
    image: '/testimonials/user2.jpg',
  },
  {
    id: 3,
    name: 'Fatou Diallo',
    role: 'Enseignante',
    content: 'J\'apprécie particulièrement leur compte épargne avec des taux attractifs. Mon argent travaille pour moi!',
    rating: 5,
    image: '/testimonials/user3.jpg',
  },
  {
    id: 4,
    name: 'Amadou Traoré',
    role: 'Agriculteur',
    content: 'Nova Trust m\'a accompagné dans le développement de mon exploitation agricole. Leur soutien a été déterminant.',
    rating: 5,
    image: '/testimonials/user4.jpg',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-nova-blue mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits qui nous font confiance au quotidien.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-nova-gold-20 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-nova-gold" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentIndex].rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg md:text-xl text-gray-700 mb-8 italic">
                  "{testimonials[currentIndex].content}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-nova-blue-20 rounded-full flex items-center justify-center">
                    <span className="text-nova-blue font-bold text-xl">
                      {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-nova-blue">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full ml-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-nova-blue hover:text-white transition-colors"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full mr-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-nova-blue hover:text-white transition-colors"
            aria-label="Témoignage suivant"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-nova-blue'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}