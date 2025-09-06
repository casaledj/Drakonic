
const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Leading the <span className="text-primary-600">AI Revolution</span>
            </h2>
            <p className="text-lg text-secondary-600 mb-6">
              At Drakonic Systems, we're not just building software – we're architecting the future. 
              Our team of AI specialists and software engineers combines cutting-edge generative AI 
              technology with robust cloud infrastructure to deliver solutions that transform businesses.
            </p>
            <p className="text-lg text-secondary-600 mb-8">
              From concept to deployment, we ensure every solution is scalable, secure, and 
              strategically aligned with your business objectives.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-secondary-500">AI Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">99.9%</div>
                <div className="text-secondary-500">Uptime Guarantee</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 transform rotate-2 shadow-lg">
              <div className="bg-white rounded-lg p-6 transform -rotate-2 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    <span className="text-secondary-700">Generative AI Integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    <span className="text-secondary-700">Cloud-Native Architecture</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    <span className="text-secondary-700">Enterprise Security</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    <span className="text-secondary-700">24/7 Support & Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About