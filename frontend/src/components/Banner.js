import { useState, useEffect } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import lottieAnimation from '../banners/data.json'
import siteConfig from '../config/siteConfig.json' // Importa le informazioni dall'oggetto di configurazione

function Banner({
  mediaType,
  mediaSrc,
  bannerHeight,
  title,
  description,
  showLogo = true,
}) {
  // Stati per il caricamento degli elementi
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(!showLogo) // Se il logo non è richiesto, consideralo già caricato
  const [contentLoaded, setContentLoaded] = useState(false) // Contenuti statici pronti

  // Calcola lo stato generale di caricamento
  const isLoading = !(mediaLoaded && logoLoaded && contentLoaded)

  const heightClass =
    bannerHeight === '100%'
      ? 'h-screen'
      : bannerHeight === '70%'
        ? 'h-[70vh]'
        : 'h-[30vh]'

  const contentPositionClass = bannerHeight === '30%' ? 'mt-12' : 'mt-0'

  // Simula il caricamento di contenuti statici (es. testi)
  useEffect(() => {
    const timer = setTimeout(() => setContentLoaded(true), 50) // Breve ritardo simulato
    return () => clearTimeout(timer)
  }, [])

  // Handler per il caricamento di media (video, immagine, lottie)
  const handleMediaLoaded = () => setMediaLoaded(true)
  const handleLogoLoaded = () => setLogoLoaded(true)

  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden flex justify-center items-center`}
    >
      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}

      {/* Media dinamico */}
      {mediaType === 'video' && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleMediaLoaded}
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src={mediaSrc || '/videos/AdobeStock_106655152.mp4'}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}

      {mediaType === 'image' && (
        <img
          src={mediaSrc || '/images/home.png'}
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover"
          onLoad={handleMediaLoaded}
        />
      )}

      {mediaType === 'lottie' && (
        <div
          className={`absolute top-0 left-0 w-full h-full flex justify-center items-center`}
        >
          <Player
            autoplay
            loop
            src={mediaSrc || lottieAnimation}
            onEvent={(event) => {
              if (event === 'load') handleMediaLoaded()
            }}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      )}

      {/* Sfumatura */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 pointer-events-none"></div>

      {/* Contenuto del Banner */}
      <div
        className={`relative text-center text-white ${contentPositionClass} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}
      >
        {showLogo && bannerHeight !== '30%' && (
          <img
            src="/images/logo.svg"
            alt={`Logo Ristorante ${siteConfig.name}`}
            className="mx-auto w-48 md:w-64 h-auto"
            onLoad={handleLogoLoaded}
          />
        )}
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        {bannerHeight !== '30%' && (
          <p className="mt-4 text-base md:text-lg">{description}</p>
        )}
      </div>
    </div>
  )
}

export default Banner
