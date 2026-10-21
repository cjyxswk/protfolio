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
import './hero-responsive.css'
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

// Preserve links to the retired static case while using the current detail page.
if (window.location.pathname === '/case-studies/ai-image-to-video.html') {
  window.history.replaceState(null, '', '/projects/ai-image-to-video')
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
