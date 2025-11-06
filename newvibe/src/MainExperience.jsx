import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function MainExperience() {
  const navigate = useNavigate()
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isMainContentHidden, setIsMainContentHidden] = useState(false)
  const [isClickMeButtonFalling, setIsClickMeButtonFalling] = useState(false)
  const [isVideoActive, setIsVideoActive] = useState(false)
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false)
  const [isBackButtonSlidLeft, setIsBackButtonSlidLeft] = useState(false)
  const [isGoDownButtonVisible, setIsGoDownButtonVisible] = useState(false)
  const [isNahVisible, setIsNahVisible] = useState(false)
  const [isNahjustVisible, setIsNahjustVisible] = useState(false)
  const [isNahjustkiddinVisible, setIsNahjustkiddinVisible] = useState(false)
  
  const videoRef = useRef(null)
  const slideshowIntervalRef = useRef(null)

  useEffect(() => {
    startSlideshow()
    return () => stopSlideshow()
  }, [])

  const startSlideshow = () => {
    slideshowIntervalRef.current = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % 3)
    }, 160)
  }

  const stopSlideshow = () => {
    if (slideshowIntervalRef.current) {
      clearInterval(slideshowIntervalRef.current)
    }
  }

  const handleClickMe = () => {
    stopSlideshow()
    setIsMainContentHidden(true)
    setIsClickMeButtonFalling(true)

    setTimeout(() => {
      setIsVideoActive(true)
      if (videoRef.current) {
        videoRef.current.play()
        
        // Enter fullscreen mode
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen()
        } else if (videoRef.current.webkitRequestFullscreen) { /* Safari */
          videoRef.current.webkitRequestFullscreen()
        } else if (videoRef.current.msRequestFullscreen) { /* IE11 */
          videoRef.current.msRequestFullscreen()
        }
      }
    }, 1000)
  }

  const handleVideoEnded = () => {
    // Exit fullscreen when video ends
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    
    setIsVideoActive(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }

    // Start image sequence after video fade-out
    setTimeout(() => {
      setIsNahVisible(true)
      
      setTimeout(() => {
        setIsNahVisible(false)
        setIsNahjustVisible(true)
        
        setTimeout(() => {
          setIsNahjustVisible(false)
          setIsNahjustkiddinVisible(true)
          
          setTimeout(() => {
            setIsBackButtonVisible(true)
            setIsBackButtonSlidLeft(true)
            setIsGoDownButtonVisible(true)
          }, 500)
        }, 1000)
      }, 1000)
    }, 1000)
  }

  const handleBackButton = () => {
    // Exit fullscreen if still in fullscreen mode
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    
    setIsBackButtonSlidLeft(false)
    setIsBackButtonVisible(false)
    setIsVideoActive(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    
    // Hide all sequence images
    setIsNahVisible(false)
    setIsNahjustVisible(false)
    setIsNahjustkiddinVisible(false)
    setIsGoDownButtonVisible(false)

    setTimeout(() => {
      setIsMainContentHidden(false)
      setIsClickMeButtonFalling(false)
      startSlideshow()
    }, 1000)
  }

  const handleGoDownButton = () => {
    // Navigate to 3D space
    navigate('/3d')
  }

  return (
    <>
      <div className={`main-content ${isMainContentHidden ? 'hidden' : ''}`}>
        <img src="/head.svg" className="overlay" alt="header image" />
        <img 
          src="/frame1.png" 
          className={`frame ${currentFrame === 0 ? 'active' : ''}`} 
          alt="frame 1" 
        />
        <img 
          src="/frame2.png" 
          className={`frame ${currentFrame === 1 ? 'active' : ''}`} 
          alt="frame 2" 
        />
        <img 
          src="/frame3.png" 
          className={`frame ${currentFrame === 2 ? 'active' : ''}`} 
          alt="frame 3" 
        />
      </div>

      <video 
        ref={videoRef}
        className={`video-container ${isVideoActive ? 'active' : ''}`} 
        src="/hypno_trimmed.webm" 
        muted 
        playsInline 
        controls={false}
        onEnded={handleVideoEnded}
      />

      <img 
        src="/buttonclickme.png" 
        className={`click-me-button ${isClickMeButtonFalling ? 'fall' : ''}`} 
        alt="click me button"
        onClick={handleClickMe}
      />
      
      <img 
        src="/backbutton.png" 
        className={`back-button ${isBackButtonVisible ? 'visible' : ''} ${isBackButtonSlidLeft ? 'slide-to-left' : ''}`} 
        alt="back button"
        onClick={handleBackButton}
      />
      
      {/* Sequence images */}
      <img 
        src="/nah.png" 
        className={`sequence-image ${isNahVisible ? 'visible' : ''}`} 
        alt="nah" 
      />
      <img 
        src="/nahjust.png" 
        className={`sequence-image ${isNahjustVisible ? 'visible' : ''}`} 
        alt="nah just" 
      />
      <img 
        src="/nahjustkiddin.png" 
        className={`sequence-image ${isNahjustkiddinVisible ? 'visible' : ''}`} 
        alt="nah just kiddin" 
      />
      
      <img 
        src="/godown.png" 
        className={`go-down-button ${isGoDownButtonVisible ? 'visible' : ''}`} 
        alt="go down button"
        onClick={handleGoDownButton}
      />
    </>
  )
}

export default MainExperience