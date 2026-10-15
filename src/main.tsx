import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './dark.css'
import './refinements.css'
import './typography.css'
import './palette.css'
import './hero-video.css'
import './cinematic.css'
import './navbar.css'
import './layout.css'
import './button-motion.css'
import './education.css'
import './about.css'
import './portrait-skills.css'
import './experience.css'
import './works-gallery.css'
import './more-works-folder.css'
import './capabilities.css'
import './section-titles.css'
import './contact.css'
import './anchor-navigation.css'
import './project-modal.css'
import App from './App'

// Retired standalone case URLs now resolve to the current works gallery.
if (/^\/(?:projects\/ai-image-to-video\/?|case-studies\/ai-image-to-video\.html)$/.test(window.location.pathname)) {
  window.history.replaceState(null, '', '/#works')
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
