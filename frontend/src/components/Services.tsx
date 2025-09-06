
const Services = () => {
  const services = [
    {
      icon: '🤖',
      title: 'AI & Machine Learning',
      description: 'Deploy cutting-edge AI models that transform your business operations.',
      features: ['Custom ML Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: '☁️',
      title: 'Cloud Infrastructure',
      description: 'Scalable, secure cloud solutions that grow with your business.',
      features: ['Multi-Cloud Architecture', 'Serverless Computing', 'Auto-scaling Solutions', 'DevOps Integration'],
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: '🎯',
      title: 'Strategic Consulting',
      description: 'Expert guidance to accelerate your digital transformation.',
      features: ['Technology Strategy', 'Architecture Planning', 'Team Training', 'ROI Optimization'],
      gradient: 'from-purple-500 to-pink-600'
    }
  ]

  return (
    <section id="services" className="section-padding gradient-bg relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-100/50 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl translate-x-1/2"></div>
      </div>
      
      <div className="container-max relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200/50 rounded-full text-sm font-semibold text-primary-800 mb-8 shadow-lg">
            <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 animate-pulse"></span>
            Enterprise-Grade Solutions
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Powerful Solutions</span>
            <br />
            <span className="text-primary-900">for Every Challenge</span>
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
            From AI-powered automation to cloud-native architectures, we deliver solutions that scale with your ambitions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.slice(0, 2).map((service, index) => (
            <div key={index} className="glass-card p-8 card-hover group">
              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-900 mb-3 group-hover:text-accent-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-primary-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-primary-700">
                        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Strategic Consulting card */}
        <div className="flex justify-center mb-16">
          <div className="glass-card p-8 card-hover group max-w-2xl w-full">
            <div className="flex items-start space-x-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${services[2].gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {services[2].icon}
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-primary-900 mb-3 group-hover:text-accent-600 transition-colors duration-300">
                  {services[2].title}
                </h3>
                <p className="text-primary-600 mb-6 leading-relaxed">
                  {services[2].description}
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {services[2].features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-primary-700">
                      <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="glass-card inline-block p-8">
            <h3 className="text-2xl font-bold text-primary-900 mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-primary-600 mb-6 max-w-md">
              Let's discuss how our solutions can accelerate your growth and innovation.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-accent text-lg"
            >
              Start Your Journey →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services