import Link from 'next/link'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail,
  Clock
} from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Crédit Personnel', href: '/services/credit-personnel' },
    { name: 'Épargne', href: '/services/epargne' },
    { name: 'Transfert d\'argent', href: '/services/transfert' },
    { name: 'Assurance', href: '/services/assurance' },
    { name: 'Mobile Banking', href: '/services/mobile-banking' },
  ],
  entreprise: [
    { name: 'À propos', href: '/about' },
    { name: 'Notre équipe', href: '/team' },
    { name: 'Carrières', href: '/careers' },
    { name: 'Actualités', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'Centre d\'aide', href: '/help' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Sécurité', href: '/security' },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'Conditions', href: '/terms' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/novatrust' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/novatrust' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/novatrust' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/novatrust' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-nova-gold rounded-lg flex items-center justify-center">
                <span className="text-nova-blue font-bold text-xl">NT</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl leading-tight">Nova Trust</h3>
                <p className="text-xs text-gray-400">Finance Corporation</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Votre partenaire de confiance pour des solutions de microfinance innovantes et accessibles.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-nova-gold mt-0.5" />
                <p className="text-sm text-gray-400">
                  123 Avenue de l'Indépendance<br />
                  Douala, Cameroun
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-nova-gold" />
                <a href="tel:+237600000000" className="text-sm text-gray-400 hover:text-nova-gold transition">
                  +237 600 000 000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-nova-gold" />
                <a href="mailto:contact@novatrust.com" className="text-sm text-gray-400 hover:text-nova-gold transition">
                  contact@novatrust.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-nova-gold" />
                <p className="text-sm text-gray-400">
                  Lun - Ven: 8h00 - 17h00
                </p>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-nova-gold transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.entreprise.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-nova-gold transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-nova-gold transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold text-white mb-2">Restez informé</h3>
              <p className="text-sm text-gray-400">
                Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et offres.
              </p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-nova-gold transition"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-nova-gold text-white font-semibold rounded-lg hover:bg-nova-gold-60 transition"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © 2024 Nova Trust Finance Corporation. Tous droits réservés.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-nova-gold transition"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-nova-gold transition">
                Confidentialité
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/terms" className="text-gray-500 hover:text-nova-gold transition">
                Conditions
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/cookies" className="text-gray-500 hover:text-nova-gold transition">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}