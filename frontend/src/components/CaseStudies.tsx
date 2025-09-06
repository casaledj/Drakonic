
const CaseStudies = () => {
  const caseStudies = [
    {
      title: 'E-commerce AI Assistant',
      category: 'Retail Technology',
      description: 'Developed an intelligent customer service chatbot that increased customer satisfaction by 40% and reduced support costs by 60%.',
      technologies: ['GPT-4', 'AWS Lambda', 'DynamoDB', 'React'],
      metrics: {
        improvement: '+40%',
        cost_savings: '60%',
        response_time: '2s'
      },
      image_bg: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Healthcare Data Analytics',
      category: 'Healthcare',
      description: 'Built a predictive analytics platform for patient outcome prediction, improving treatment success rates by 35%.',
      technologies: ['TensorFlow', 'Python', 'GCP', 'BigQuery'],
      metrics: {
        improvement: '+35%',
        accuracy: '94%',
        processing_time: '5min'
      },
      image_bg: 'from-green-400 to-green-600'
    },
    {
      title: 'Financial Fraud Detection',
      category: 'FinTech',
      description: 'Implemented real-time fraud detection system that reduced fraudulent transactions by 85% while maintaining user experience.',
      technologies: ['Scikit-learn', 'Apache Kafka', 'PostgreSQL', 'Docker'],
      metrics: {
        reduction: '85%',
        accuracy: '99.2%',
        latency: '<100ms'
      },
      image_bg: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Supply Chain Optimization',
      category: 'Logistics',
      description: 'Created an AI-driven supply chain management system that optimized inventory levels and reduced costs by 25%.',
      technologies: ['PyTorch', 'Redis', 'Node.js', 'MongoDB'],
      metrics: {
        cost_reduction: '25%',
        efficiency: '+30%',
        inventory_turns: '12x'
      },
      image_bg: 'from-orange-400 to-orange-600'
    }
  ]

  return (
    <section id="case-studies" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Success <span className="text-primary-600">Stories</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Real results from real projects. See how we've helped businesses transform 
            their operations with intelligent AI solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-secondary-100">
              <div className={`h-48 bg-gradient-to-br ${study.image_bg} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {study.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">{study.title}</h3>
                <p className="text-secondary-600 mb-6">{study.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-secondary-700 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-secondary-100">
                  {Object.entries(study.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-xl font-bold text-primary-600">{value}</div>
                      <div className="text-xs text-secondary-500 capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-secondary-600 mb-8">
            Ready to create your own success story?
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-lg"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies