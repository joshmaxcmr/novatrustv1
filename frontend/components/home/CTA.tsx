'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export default function CTA() {
  return (
    <section className="section-padding bg-gradient-to-r from-nova-blue to-nova-blue-60 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Prêt à démarrer votre voyage financier?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits et découvrez comment Nova Trust peut transformer votre avenir financier.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account/open"
              className="btn-secondary inline-flex items-center justify-center gap-2 group"
            >
              Ouvrir un compte gratuitement
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <a
              href="tel:+237600000000"
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-white hover:text-nova-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white inline-flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Nous contacter
            </a>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="text-3xl mb-2">✓</div>
              <h3 className="font-semibold mb-1">Ouverture rapide</h3>
              <p className="text-sm text-gray-200">En moins de 5 minutes</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="text-3xl mb-2">✓</div>
              <h3 className="font-semibold mb-1">Zéro frais cachés</h3>
              <p className="text-sm text-gray-200">Transparence totale</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="text-3xl mb-2">✓</div>
              <h3 className="font-semibold mb-1">Support 24/7</h3>
              <p className="text-sm text-gray-200">Toujours à votre écoute</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}