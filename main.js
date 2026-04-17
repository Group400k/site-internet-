import './style.css'

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn')
const mobileMenu = document.getElementById('mobile-menu')

menuBtn?.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden')
  mobileMenu.classList.toggle('hidden')
  menuBtn.setAttribute('aria-expanded', String(!isOpen))
})

// Close mobile menu on nav link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden')
    menuBtn?.setAttribute('aria-expanded', 'false')
  })
})

// Navbar scroll shadow
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar?.classList.add('shadow-xl')
  } else {
    navbar?.classList.remove('shadow-xl')
  }
}, { passive: true })
