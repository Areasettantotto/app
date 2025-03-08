import siteConfig from '../config/siteConfig.json' // Importa il file JSON con le info dell'attività
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        {/* Colonna sinistra: Icone Social */}
        <div className="flex space-x-6 mb-4 sm:mb-0">
          <a
            href={siteConfig.facebook_link}
            className="text-2xl hover:text-accent transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href={siteConfig.instagram_link}
            className="text-2xl hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href={siteConfig.twitter_link}
            className="text-2xl hover:text-accent transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Colonna destra: Info */}
        <div className="text-sm text-center sm:text-left mt-4 sm:mt-0">
          <p>
            &copy; {new Date().getFullYear()} - Ristorante {siteConfig.name} -{' '}
            {siteConfig.address} - {siteConfig.city}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
