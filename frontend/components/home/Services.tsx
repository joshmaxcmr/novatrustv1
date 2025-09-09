'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CreditCard, 
  PiggyBank, 
  SendHorizontal, 
  Shield, 
  Smartphone,
  Building
} from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'Crédit Personnel',
    description: 'Des prêts flexibles adaptés à vos besoins personnels avec des taux compétitifs.',
    icon: CreditCard,
    color: 'bg-blue-100 text-blue-600',
    link: '/services/credit-personnel',
  },
  {
    id: 2,
    title: 'Épargne',
    description: 'Faites fructifier votre argent avec nos comptes d\'épargne à rendement élevé.',
    icon: PiggyBank,
    color: 'bg-green-100 text-green-600',
    link: '/services/epargne',
  },
  {
    id: 3,
    title: 'Transfert d\'argent',
    description: 'Envoyez et recevez de l\'argent rapidement et en toute sécurité.',
    icon: SendHorizontal,
    color: 'bg-purple-100 text-purple-600',
    link: '/services/transfert',
  },
  {
    id: 4,
    title: 'Assurance',
    description: 'Protégez votre famille et vos biens avec nos solutions d\'assurance.',
    icon: Shield,
    color: 'bg-red-100 text-red-600',
    link: '/services/assurance',
  },
  {
    id: 5,
    title: 'Mobile Banking',
    description: 'Gérez vos finances où que vous soyez avec notre application mobile.',
    icon: Smartphone,
    color: 'bg-yellow-100 text-yellow-600',
    link: '/services/mobile-banking',
  },
  {
    id: 6,
    title: 'Crédit PME',
    description: 'Financez votre entreprise et développez vos activités commerciales.',
    icon: Building,
    color: 'bg-indigo-100 text-indigo-600',
    link: '/services/credit-pme',
  },
]

export default function Services() {
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
            Nos Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de services financiers conçus pour répondre à tous vos besoins.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={service.link} className="block">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                    <div className={`w-14 h-14 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-nova-blue mb-3 group-hover:text-nova-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center text-nova-blue font-medium">
                      <span>En savoir plus</span>
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-primary inline-flex items-center gap-2">
            Voir tous nos services
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}