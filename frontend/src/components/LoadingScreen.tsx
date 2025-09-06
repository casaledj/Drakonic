import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [currentText, setCurrentText] = useState('')
  const [showLogo, setShowLogo] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  
  const fullText = 'DRAKONIC SYSTEMS'
  
  useEffect(() => {
    // Show logo first
    const logoTimer = setTimeout(() => {
      setShowLogo(true)
    }, 500)

    // Start typing animation after logo appears
    const startTyping = setTimeout(() => {
      let index = 0
      const typingInterval = setInterval(() => {
        if (index <= fullText.length) {
          setCurrentText(fullText.slice(0, index))
          index++
        } else {
          clearInterval(typingInterval)
          // Wait a moment then fade out and complete
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => {
              onComplete()
            }, 800)
          }, 2000)
        }
      }, 100)

      return () => clearInterval(typingInterval)
    }, 1500)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(startTyping)
    }
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-800 ${
        isComplete ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#1a1a1a' }}
    >
      {/* Logo */}
      <div 
        className={`absolute top-20 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          showLogo ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <img 
          src="/drakonic-systems-logo.png" 
          alt="Drakonic Systems Logo" 
          className="w-64 h-64 object-contain filter brightness-0 invert"
        />
      </div>

      {/* Animated Text */}
      <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
          {currentText}
          <span className="animate-pulse">|</span>
        </h1>
        
        {/* Subtitle that appears after typing is complete */}
        {currentText === fullText && (
          <p className="text-lg md:text-xl text-primary-200 mt-4 animate-fade-in">
            Professional Software Development & AI Solutions
          </p>
        )}
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-12 w-64 h-1 bg-primary-700 rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full animate-pulse" style={{ 
          width: currentText.length === 0 ? '0%' : `${(currentText.length / fullText.length) * 100}%`,
          transition: 'width 0.1s ease-out'
        }}></div>
      </div>
    </div>
  )
}

export default LoadingScreen