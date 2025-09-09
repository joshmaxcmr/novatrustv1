'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const navigation = [
    { name: 'Accueil', href: '/' },
    {
      name: 'Services',
      href: '/services',
      submenu: [
        { name: 'Crédit', href: '/services/credit' },
        { name: 'Épargne', href: '/services/epargne' },
        { name: 'Transfert d\'argent', href: '/services/transfert' },
        { name: 'Assurance', href: '/services/assurance' },
      ],
    },
    { name: 'À propos', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-nova-blue text-white py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <a href="tel:+237600000000" className="flex items-center gap-1 hover:text-nova-gold transition">
              <Phone size={14} />
              +237 600 000 000
            </a>
            <a href="mailto:contact@novatrust.com" className="flex items-center gap-1 hover:text-nova-gold transition">
              <Mail size={14} />
              contact@novatrust.com
            </a>
          </div>
          <div className="hidden md:flex gap-4">
            <Link href="/appointment" className="hover:text-nova-gold transition">
              Prendre RDV
            </Link>
            <Link href="/account/open" className="hover:text-nova-gold transition">
              Ouvrir un compte
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-nova-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">NT</span>
            </div>
            <div>
              <h1 className="text-nova-blue font-bold text-xl leading-tight">Nova Trust</h1>
              <p className="text-xs text-gray-600">Finance Corporation</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      className="flex items-center gap-1 text-gray-700 hover:text-nova-blue font-medium transition"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.name}
                      <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                    </button>
                    {openDropdown === item.name && (
                      <div
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                        onMouseEnter={() => setOpenDropdown(item.name)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-nova-blue-20 hover:text-nova-blue transition"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-nova-blue font-medium transition"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-nova-blue font-medium hover:text-nova-blue-60 transition">
              Connexion
            </Link>
            <Link href="/account/open" className="btn-primary">
              Ouvrir un compte
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-nova-blue transition"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            {navigation.map((item) => (
              <div key={item.name} className="mb-2">
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="w-full flex justify-between items-center py-2 text-gray-700 hover:text-nova-blue font-medium transition"
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block py-1 text-gray-600 hover:text-nova-blue transition"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-nova-blue font-medium transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t space-y-3">
              <Link
                href="/login"
                className="block text-center py-2 text-nova-blue font-medium hover:text-nova-blue-60 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link
                href="/account/open"
                className="block btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Ouvrir un compte
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}