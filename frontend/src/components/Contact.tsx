import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  message: string
}

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    setIsSubmitted(true)
    reset()
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-200/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-primary-200/30 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-max relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-accent-100/80 backdrop-blur-sm border border-accent-200/50 rounded-full text-sm font-semibold text-accent-800 mb-8 shadow-lg">
            <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 animate-pulse"></span>
            Let's Build Something Amazing
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Ready to Start</span>
            <br />
            <span className="text-primary-900">Your Project?</span>
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into reality. Our team of experts is ready to help you build the future.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                    📧
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900">Email Us</h3>
                    <p className="text-primary-600">contact@drakonic-systems.com</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                    📞
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900">Call Us</h3>
                    <p className="text-primary-600">+1 (703) 679-7259</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                    ⏰
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900">Availability</h3>
                    <p className="text-primary-600">Mon - Fri, 9 AM - 6 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="glass-card p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6 shadow-lg">
                      ✓
                    </div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-4">Thank You!</h3>
                    <p className="text-primary-600 text-lg">
                      We've received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-primary-800 mb-2">Name *</label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          type="text"
                          className="w-full px-4 py-4 bg-white/50 border border-primary-200/50 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300 placeholder-primary-400"
                          placeholder="Your name"
                        />
                        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-primary-800 mb-2">Email *</label>
                        <input
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                          })}
                          type="email"
                          className="w-full px-4 py-4 bg-white/50 border border-primary-200/50 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300 placeholder-primary-400"
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-800 mb-2">Tell us about your project *</label>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        rows={6}
                        className="w-full px-4 py-4 bg-white/50 border border-primary-200/50 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300 placeholder-primary-400 resize-none"
                        placeholder="Describe your project, timeline, and goals..."
                      />
                      {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-accent text-lg py-4"
                    >
                      Send Message →
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact