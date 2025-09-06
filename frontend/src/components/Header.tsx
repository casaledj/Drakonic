import { useState, useEffect } from 'react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-primary-100' : 'bg-transparent'
    }`}>
      <nav className="container-max">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/drakonic-systems-logo.png" 
              alt="Drakonic Systems Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-primary-900">Drakonic Systems</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-primary-700 hover:text-accent-600 transition-colors font-semibold text-lg">
              Solutions
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn-accent text-base">
              Get Started →
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-primary-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('services')} className="block px-3 py-2 text-primary-600 hover:text-primary-800 font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 text-primary-600 hover:text-primary-800 font-medium">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header