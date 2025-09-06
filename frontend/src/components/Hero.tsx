
const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToServices = () => {
    const element = document.getElementById('services')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container-max relative z-10">
        <div className="text-center">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200/50 rounded-full text-sm font-semibold text-primary-800 mb-8 shadow-lg">
              <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 animate-pulse"></span>
              Trusted by Forward-Thinking Companies
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Drakonic</span>
              <br />
              <span className="text-primary-900">Systems</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-3xl text-primary-700 mb-6 font-light max-w-4xl mx-auto leading-relaxed">
              Next-Generation AI Solutions
              <br />
              <span className="text-primary-600">for Modern Enterprises</span>
            </p>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-primary-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              We build intelligent, scalable software solutions that transform businesses through cutting-edge AI technology and exceptional engineering.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button onClick={scrollToContact} className="btn-primary text-lg">
                Start Building →
              </button>
              <button onClick={scrollToServices} className="btn-secondary text-lg">
                Explore Solutions
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-primary-900 mb-2">99.9%</div>
                <div className="text-primary-600">System Uptime</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-primary-900 mb-2">50+</div>
                <div className="text-primary-600">AI Models Deployed</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-primary-900 mb-2">24/7</div>
                <div className="text-primary-600">Support Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero