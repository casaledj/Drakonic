
const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-t from-primary-900 to-primary-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-max py-16 relative">
        <div className="grid md:grid-cols-3 gap-12 items-start mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src="/drakonic-systems-logo.png" 
                alt="Drakonic Systems Logo" 
                className="w-12 h-12 object-contain filter brightness-0 invert"
              />
              <div>
                <span className="text-2xl font-bold">Drakonic Systems</span>
                <p className="text-primary-200 mt-1">Next-Generation AI Solutions</p>
              </div>
            </div>
            <p className="text-primary-200 text-lg max-w-2xl leading-relaxed">
              We transform businesses through cutting-edge AI technology and exceptional engineering, 
              delivering scalable solutions that drive innovation and growth.
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">Connect With Us</h4>
              <div className="space-y-3">
                <a href="mailto:contact@drakonic-systems.com" className="flex items-center space-x-3 text-primary-200 hover:text-accent-300 transition-colors">
                  <span className="w-5 h-5 flex items-center justify-center">📧</span>
                  <span>contact@drakonic-systems.com</span>
                </a>
                <a href="tel:+15551234567" className="flex items-center space-x-3 text-primary-200 hover:text-accent-300 transition-colors">
                  <span className="w-5 h-5 flex items-center justify-center">📞</span>
                  <span>+1 (703) 679-7259</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-300 text-sm mb-4 md:mb-0">
              © {currentYear} Drakonic Systems. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-primary-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-primary-300 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-primary-300 hover:text-white text-sm transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-primary-800 hover:bg-primary-900 text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all z-40"
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  )
}

export default Footer