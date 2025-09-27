// ===================================
// NAVIGATION MODULE
// ===================================
const Navigation = {
  init() {
    this.hamburger = document.getElementById("hamburger")
    this.navMenu = document.getElementById("nav-menu")
    this.navbar = document.getElementById("navbar")
    this.navLinks = document.querySelectorAll(".nav-link")

    this.bindEvents()
  },

  bindEvents() {
    // Mobile menu toggle
    this.hamburger.addEventListener("click", () => this.toggleMobileMenu())

    // Close mobile menu when clicking on links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMobileMenu())
    })

    // Navbar background on scroll
    window.addEventListener("scroll", () => this.handleNavbarScroll())
  },

  toggleMobileMenu() {
    this.hamburger.classList.toggle("active")
    this.navMenu.classList.toggle("active")
  },

  closeMobileMenu() {
    this.hamburger.classList.remove("active")
    this.navMenu.classList.remove("active")
  },

  handleNavbarScroll() {
    if (window.scrollY > 100) {
      this.navbar.style.background = "rgba(255, 255, 255, 0.98)"
      this.navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      this.navbar.style.background = "rgba(255, 255, 255, 0.95)"
      this.navbar.style.boxShadow = "none"
    }
  },
}

// ===================================
// SMOOTH SCROLLING MODULE
// ===================================
const SmoothScroll = {
  init() {
    this.bindEvents()
  },

  bindEvents() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => this.handleSmoothScroll(e))
    })
  },

  handleSmoothScroll(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  },
}

// ===================================
// ANIMATIONS MODULE
// ===================================
const Animations = {
  init() {
    this.setupIntersectionObserver()
    this.setupScrollAnimations()
  },

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    // Add fade-in class to elements and observe them
    const elementsToAnimate = document.querySelectorAll(
      ".about-card, .service-card, .portfolio-card, .contact-info, .contact-form",
    )

    elementsToAnimate.forEach((el) => {
      el.classList.add("fade-in")
      observer.observe(el)
    })
  },

  setupScrollAnimations() {
    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const hero = document.querySelector(".hero")
      const rate = scrolled * -0.2

      if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${rate}px)`
      }
    })
  },
}

// ===================================
// CONTACT FORM MODULE
// ===================================
const ContactForm = {
  init() {
    this.form = document.getElementById("contactForm")
    this.bindEvents()
  },

  bindEvents() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))
  },

  handleSubmit(e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this.form)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // Validate form
    if (!this.validateForm(name, email, message)) {
      return
    }

    // Create WhatsApp message
    const whatsappMessage = `Olá! Meu nome é ${name}.%0A%0AEmail: ${email}%0A%0AMensagem: ${message}`
    const whatsappURL = `https://wa.me/5511999999999?text=${whatsappMessage}`

    // Open WhatsApp
    window.open(whatsappURL, "_blank")

    // Reset form and show success message
    this.form.reset()
    this.showSuccessMessage()
  },

  validateForm(name, email, message) {
    if (!name || !email || !message) {
      alert("Por favor, preencha todos os campos.")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.")
      return false
    }

    return true
  },

  showSuccessMessage() {
    alert("Mensagem enviada! Você será redirecionado para o WhatsApp.")
  },
}

// ===================================
// CARD INTERACTIONS MODULE
// ===================================
const CardInteractions = {
  init() {
    this.setupPortfolioCards()
    this.setupServiceCards()
  },

  setupPortfolioCards() {
    document.querySelectorAll(".portfolio-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)"
      })
    })
  },

  setupServiceCards() {
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px)"
        this.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.15)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
        this.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
      })
    })
  },
}

// ===================================
// PERFORMANCE MODULE
// ===================================
const Performance = {
  init() {
    this.setupLazyLoading()
    this.setupLoadingAnimation()
  },

  setupLazyLoading() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src
            img.classList.remove("lazy")
            imageObserver.unobserve(img)
          }
        })
      })

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img)
      })
    }
  },

  setupLoadingAnimation() {
    window.addEventListener("load", () => {
      document.body.classList.add("loaded")
    })
  },
}

// ===================================
// APP INITIALIZATION
// ===================================
const App = {
  init() {
    // Initialize all modules when DOM is ready
    document.addEventListener("DOMContentLoaded", () => {
      Navigation.init()
      SmoothScroll.init()
      Animations.init()
      ContactForm.init()
      CardInteractions.init()
      Performance.init()

      console.log("Agência Digital - Landing Page carregada com sucesso!")
    })
  },
}

// Start the application
App.init()
