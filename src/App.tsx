import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './App.css'
import lafreshLogo from './assets/lafresh-logo.png'

// ─── Static data ──────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Divisions', href: '#divisions' },
  { label: 'Markets', href: '#markets' },
  { label: 'Seasons', href: '#seasons' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Contact', href: '#contact' },
]

const DIVISIONS = [
  {
    id: 'crops',
    title: 'Seasonal Crops',
    image: '/slides/maize.jpg',
    tagline: 'Farm-fresh staples, every season',
    description:
      'We cultivate high-yield seasonal crops aligned with market demand and growing conditions, ensuring year-round supply to homes, retailers, and processors.',
    examples: ['Maize', 'Rice', 'Beans', 'Tomatoes', 'Groundnuts'],
    accent: 'amber' as const,
    catalogLabel: 'Seasonal Catalogy',
  },
  {
    id: 'horticulture',
    title: 'Horticulture',
    image: '/slides/horticulture.jpg',
    tagline: 'Premium fruits, flowers & vegetables',
    description:
      'Using precision farming and greenhouse techniques, we grow export-grade fruits, exotic vegetables, and cut flowers that meet international phytosanitary standards.',
    examples: ['Mangoes', 'Chilies', 'Avocados', 'Cut Flowers', 'Exotic Herbs'],
    accent: 'emerald' as const,
    catalogLabel: 'Horticulture Catalogy',
  },
  {
    id: 'livestock',
    title: 'Livestock',
    image: '/slides/cattle.jpg',
    tagline: 'Ethically raised, naturally better',
    description:
      'Our livestock operations follow humane and ethical standards — open grazing, natural feed, and zero growth hormones — delivering premium meat, dairy, and poultry.',
    examples: ['Free-range Poultry', 'Goat Farming', 'Dairy Cattle', 'Organic Eggs'],
    accent: 'stone' as const,
    catalogLabel: 'Livestock Catalogy',
  },
]

const SEASONS = [
  {
    name: 'Rainy Season',
    image: '/images/rain.jpg',
    months: 'November – March',
    crops: ['Maize', 'Groundnuts', 'Sorghum', 'Sunflowers'],
    horticulture: 'Mangoes & Chilies',
    bg: 'bg-gradient-to-br from-teal-50 to-cyan-100',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-900 border border-teal-200',
    heading: 'text-teal-800',
    dot: 'bg-teal-400',
  },
  {
    name: 'Winter',
    image: '/images/winter.jpg',
    months: 'May – August',
    crops: ['Wheat', 'Barley', 'Potatoes', 'Tomatoes'],
    horticulture: 'Cut Flowers & Herbs',
    bg: 'bg-gradient-to-br from-violet-50 to-indigo-100',
    border: 'border-violet-200',
    badge: 'bg-violet-100 text-violet-900 border border-violet-200',
    heading: 'text-violet-800',
    dot: 'bg-violet-400',
  },
  {
    name: 'Spring (Hot Dry)',
    image: '/images/spring.jpg',
    months: 'September – October',
    crops: ['Beans', 'Cowpeas', 'Sorghum'],
    horticulture: 'Avocados & Citrus',
    bg: 'bg-gradient-to-br from-amber-50 to-orange-100',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-900 border border-amber-200',
    heading: 'text-amber-800',
    dot: 'bg-amber-400',
  },
]

const PILLARS = [
  {
    image: '/images/water.jpg',
    title: 'Water Conservation',
    body: 'Drip irrigation and rainwater harvesting reduce water consumption by up to 40% compared to conventional methods.',
  },
  {
    image: '/images/organic.jpg',
    title: 'Chemical-Free Farming',
    body: 'Certified organic fertilizers and integrated pest management protect soil health, consumers, and local ecosystems.',
  },
  {
    image: '/slides/cattle.jpg',
    title: 'Ethical Livestock',
    body: 'Open-grazing practices, natural feed, and zero growth hormones ensure animal welfare and superior product quality.',
  },
  {
    image: '/images/compost.jpg',
    title: 'Zero-Waste Goal',
    body: 'Crop residues are composted and returned to the soil, closing the nutrient loop and reducing landfill dependence.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'Lafresh has been supplying our restaurant chain with the freshest produce for two consecutive seasons. Their consistency and quality are simply unmatched in the local market.',
    name: 'Tendai Moyo',
    role: 'Head Buyer, Harare Grand Hotels & Suites',
    tag: 'Domestic Partner',
    initials: 'TM',
    color: 'emerald' as const,
  },
  {
    quote:
      "We export Lafresh's premium horticultural products across Europe. Their rigorous adherence to international phytosanitary standards makes them one of our most reliable partners.",
    name: 'Kofi Mensah',
    role: 'Director, AfroCrop International Exports',
    tag: 'Export Partner',
    initials: 'KM',
    color: 'amber' as const,
  },
]

const SEASONAL_PRODUCTS = [
  {
    name: "Beans",
    image: "/slides/Beans.png",
    harvestDate: "May 4, 2026",
    description: "Fresh, protein-rich beans harvested at peak ripeness",
    availability: "In Stock",
    price: "$1.50",
    unit: "kg"
  },
  {
    name: "Rice",
    image: "/slides/rice.png",
    harvestDate: "May 4, 2026",
    description: "Premium long-grain rice, sustainably grown",
    availability: "Limited Stock",
    price: "$2.00",
    unit: "kg"
  },
  {
    name: "Tomatoes",
    image: "/slides/tomatos.png",
    harvestDate: "May 4, 2026",
    description: "Vine-ripened, sweet and juicy tomatoes",
    availability: "In Stock",
    price: "$2.50",
    unit: "kg"
  },
  {
    name: "Groundnuts",
    image: "/slides/groundnuts.png",
    harvestDate: "May 4, 2026",
    description: "Nutritious groundnuts, perfect for snacking",
    availability: "Pre-order",
    price: "$3.00",
    unit: "kg"
  }
]

const HORTICULTURE_PRODUCTS = [
  {
    name: "Mangoes",
    image: "/slides/mango.png",
    harvestDate: "May 4, 2026",
    description: "Sweet, sun-ripened mangoes ready for export",
    availability: "In Stock",
    price: "$2.00",
    unit: "kg"
  },
  {
    name: "Chillis",
    image: "/slides/chillis.png",
    harvestDate: "May 4, 2026",
    description: "Hot and flavourful chillis, freshly picked",
    availability: "In Stock",
    price: "$1.80",
    unit: "kg"
  },
  {
    name: "Roses",
    image: "/slides/roses.png",
    harvestDate: "May 4, 2026",
    description: "Premium cut roses, export-grade quality",
    availability: "Limited Stock",
    price: "$5",
    unit: "bunch"
  },
  {
    name: "Herbs",
    image: "/slides/herbs.png",
    harvestDate: "May 4, 2026",
    description: "Fresh exotic herbs, certified to meet international standards",
    availability: "In Stock",
    price: "$1.20",
    unit: "kg"
  }
]

const LIVESTOCK_PRODUCTS = [
  {
    name: "Chickens",
    image: "/slides/chickens.png",
    harvestDate: "May 4, 2026",
    description: "Free-range chickens, naturally raised with no growth hormones",
    availability: "In Stock",
    price: "$5.00",
    unit: "bird"
  },
  {
    name: "Mbudzi",
    image: "/slides/mbudzi.png",
    harvestDate: "May 4, 2026",
    description: "Healthy goats raised on open pastures, supplying premium chevon",
    availability: "In Stock",
    price: "$80.00",
    unit: "head"
  },
  {
    name: "Eggs",
    image: "/slides/eggs.png",
    harvestDate: "May 4, 2026",
    description: "Fresh organic eggs from free-range hens",
    availability: "In Stock",
    price: "$2.50",
    unit: "dozen"
  },
  {
    name: "Dairy Products",
    image: "/slides/dairy products.png",
    harvestDate: "May 4, 2026",
    description: "Fresh milk and dairy from ethically raised dairy cattle",
    availability: "Limited Stock",
    price: "$1.00",
    unit: "litre"
  }
]

const HERO_SLIDES = [
  {
    id: 'cattle',
    tag: 'Livestock',
    title: 'Premium Beef Cattle',
    subtitle: 'Purebred strength, superior quality',
    statement:
      'Our Brahman cattle are raised on open pastures — bred for hardiness, heat tolerance, and exceptional beef quality. Supplying premium cuts to local buyers and export markets across the region.',
    image: '/slides/cattle.jpg',
    fallback: 'linear-gradient(135deg, #1c1917 0%, #3c3530 35%, #57534e 65%, #292524 100%)',
    overlay: 'rgba(5, 8, 3, 0.52)',
  },
  {
    id: 'roadrunners',
    tag: 'Farm Produce',
    title: "Nature's Full Bounty",
    subtitle: 'Every colour, every flavour',
    statement:
      'From sun-ripened tropical fruits to crisp garden vegetables — Lafresh grows an abundant variety of fresh farm produce for domestic markets and international export, all year round.',
    image: '/slides/roadrunners.jpg',
    fallback: 'linear-gradient(135deg, #14532d 0%, #065f46 35%, #0f766e 65%, #134e4a 100%)',
    overlay: 'rgba(5, 15, 5, 0.48)',
  },
  {
    id: 'goats',
    tag: 'Livestock',
    title: 'Goat Farming',
    subtitle: 'Well-kept, naturally healthy',
    statement:
      'Our goats are raised with care in well-managed pens and open pastures — healthy, well-fed, and humanely kept. Supplying premium chevon, fresh milk, and live animals to local buyers and traders.',
    image: '/slides/goats.jpg',
    fallback: 'linear-gradient(135deg, #365314 0%, #4d7c0f 35%, #65a30d 65%, #3f6212 100%)',
    overlay: 'rgba(5, 12, 3, 0.50)',
  },
  {
    id: 'horticulture',
    tag: 'Horticulture',
    title: 'Fresh Green Produce',
    subtitle: 'Crisp, clean and export-ready',
    statement:
      'Crunchy cucumbers, sweet corn, broccoli, green peppers, chilies and spring onions — our horticulture division delivers the freshest greens, grown with care and certified to meet export standards.',
    image: '/slides/horticulture.jpg',
    fallback: 'linear-gradient(135deg, #052e16 0%, #064e3b 35%, #065f46 65%, #14532d 100%)',
    overlay: 'rgba(3, 15, 5, 0.48)',
  },
]

// ─── Preloader ────────────────────────────────────────────────────────────────

function Preloader({ onDone }: { onDone: () => void }) {
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 2200)
    const t2 = setTimeout(onDone, 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 select-none"
      style={{
        background: 'linear-gradient(160deg, #32CD32 0%, #064e3b 40%, #32CD32 100%)',
        animation: hiding ? 'preloader-out 0.6s ease-out forwards' : undefined,
      }}
    >
      {/* Sprout graphic */}
      <div className="relative flex-shrink-0" style={{ width: '110px', height: '155px' }}>
        {/* Soil bar */}
        <div
          className="absolute bottom-0 inset-x-0 rounded-full"
          style={{
            height: '16px',
            background: 'linear-gradient(90deg, #713f12 0%, #a16207 45%, #92400e 75%, #713f12 100%)',
          }}
        />

        {/* Stem */}
        <div
          className="absolute"
          style={{
            bottom: '14px',
            left: '50%',
            marginLeft: '-2.5px',
            width: '5px',
            height: '90px',
            background: 'linear-gradient(to top, #32CD32 0%, #10b981 45%, #32CD32 100%)',
            borderRadius: '3px 3px 2px 2px',
            transformOrigin: 'bottom center',
            animation: 'preloader-stem 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
        />

        {/* Left leaf */}
        <div
          className="absolute"
          style={{
            bottom: '56px',
            left: '8px',
            width: '40px',
            height: '24px',
            background: 'linear-gradient(135deg, #32CD32 0%, #32CD32 100%)',
            borderRadius: '50% 0 50% 50%',
            transformOrigin: 'right center',
            animation: 'preloader-leaf-l 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s both',
          }}
        />

        {/* Right leaf */}
        <div
          className="absolute"
          style={{
            bottom: '76px',
            right: '8px',
            width: '40px',
            height: '24px',
            background: 'linear-gradient(225deg, #32CD32 0%, #32CD32 100%)',
            borderRadius: '0 50% 50% 50%',
            transformOrigin: 'left center',
            animation: 'preloader-leaf-r 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.95s both',
          }}
        />

        {/* Top bud */}
        <div
          className="absolute"
          style={{
            top: '6px',
            left: '50%',
            marginLeft: '-11px',
            width: '22px',
            height: '28px',
            background: 'radial-gradient(ellipse at 35% 25%, #a7f3d0 0%, #10b981 55%, #32CD32 100%)',
            borderRadius: '50% 50% 50% 0',
            animation: 'preloader-bud 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.25s both',
          }}
        />
      </div>

      {/* Brand */}
      <div
        className="text-center"
        style={{ animation: 'preloader-fade-in 0.7s ease-out 0.9s both' }}
      >
        <p className="text-2xl font-bold text-white tracking-tight mb-0.5">Lafresh</p>
        <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-emerald-400">
          Private Limited
        </p>
      </div>

      {/* Loading dots */}
      <div
        className="flex items-center gap-2"
        style={{ animation: 'preloader-fade-in 0.5s ease-out 1.3s both' }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-full bg-emerald-500"
            style={{
              width: '6px',
              height: '6px',
              animation: `preloader-dot 1.2s ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <img
              src={lafreshLogo}
              alt="Lafresh logo"
              className="w-[100px] h-[100px] object-cover drop-shadow-md rounded-full overflow-hidden bg-white mt-[19px]"
            />
            <div className="leading-none">
              <span
                className={`font-bold text-base tracking-tight block transition-colors duration-300 ${
                  scrolled ? 'text-stone-900' : 'text-white'
                }`}
              >
                Lafresh
              </span>
              <span
                className={`text-[15px] font-medium transition-colors duration-300 ${
                  scrolled ? 'text-emerald-700' : 'text-emerald-300'
                }`}
              >
                Private Limited
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? 'text-stone-600 hover:text-emerald-700'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className={`hidden lg:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              scrolled
                ? 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm'
                : 'bg-white text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            Partner With Us
          </a>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-stone-700 hover:bg-stone-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-stone-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 text-sm font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 mt-3 border-t border-stone-100">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-5 py-3 rounded-full bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), 4800)
    return () => clearInterval(id)
  }, [paused])

  const prev = () => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  const next = () => setCurrent((c) => (c + 1) % HERO_SLIDES.length)

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide track */}
      <div
        style={{
          display: 'flex',
          transform: `translateX(${-current * 100}vw)`,
          transition: 'transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {HERO_SLIDES.map((s) => (
          <div
            key={s.id}
            style={{
              width: '100vw',
              minHeight: '100vh',
              flexShrink: 0,
              position: 'relative',
              backgroundImage: `url(${s.image}), ${s.fallback}`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Dark overlay for text readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: s.overlay }}
            />

            {/* Slide content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-40 flex flex-col items-center justify-center text-center min-h-screen">
              {/* Text */}
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold tracking-widest uppercase mb-5">
                {s.tag}
              </span>
              <p className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase mb-2">
                Lafresh Private Limited
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-3">
                {s.title}
              </h1>
              <p className="text-lg text-white/55 font-medium italic mb-5">{s.subtitle}</p>
              <p className="text-white/70 text-base leading-relaxed mb-10 max-w-2xl">{s.statement}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#divisions"
                  className="px-8 py-4 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                  style={{ background: '#32CD32' }}
                >
                  Explore Our Produce
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 rounded-full border border-white/30 bg-white/10 text-white font-semibold text-sm hover:bg-white/15 hover:border-white/50 transition-all duration-200"
                >
                  Partner With Us →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/20 border border-white/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/20 border border-white/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide counter */}
      <div className="absolute bottom-24 right-5 sm:right-8 z-20 text-white/40 text-xs font-mono tabular-nums">
        {String(current + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}: ${s.title}`}
            className="rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.30)',
              width: i === current ? '28px' : '10px',
              height: '10px',
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 w-44 h-0.5 bg-white/15 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-400 rounded-full transition-all duration-700"
          style={{ width: `${((current + 1) / HERO_SLIDES.length) * 100}%` }}
        />
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-14 fill-stone-50">
          <path d="M0,36 C480,72 960,0 1440,36 L1440,72 L0,72 Z" />
        </svg>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const stats = [
    { value: '10+', label: 'Years of farming' },
    { value: '200+', label: 'Acres cultivated' },
    { value: '10+', label: 'Export destinations' },
    { value: '400+', label: 'Local partners' },
  ]

  return (
    <section id="about" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-widest uppercase mb-6">
              About Lafresh
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-6">
              Rooted in the land,{' '}
              <span className="text-[#32CD32]">growing for the world</span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-5">
              Lafresh Private Limited is an agro-based company committed to sustainable farming practices,
              quality produce, and responsible trade. We cultivate seasonal crops, premium horticulture
              products, and maintain ethical livestock operations across our farms.
            </p>
            <p className="text-stone-500 text-base leading-relaxed mb-10">
              Our model bridges the gap between local food security and international export demand —
              delivering fresh, traceable, and certified produce to retailers, hotels, and global buyers alike.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#divisions"
                className="btn-flash px-6 py-3 rounded-full bg-[#32CD32] text-white font-semibold text-sm hover:bg-[#2DBD2D] transition-colors"
              >
                Our Divisions
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 font-semibold text-sm hover:border-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right — visual + stats */}
          <div className="space-y-5">
            {/* Hero visual card */}
            <div className="relative rounded-3xl overflow-hidden h-52">
              <img
                src="/images/farm.jpg"
                alt="Lafresh farm"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(4, 120, 87, 0.62)' }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="text-emerald-200 font-medium text-sm">Sustainably grown · Responsibly traded</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl font-bold text-[#32CD32] mb-1">{s.value}</div>
                  <div className="text-sm text-stone-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Core Divisions ───────────────────────────────────────────────────────────

const DIVISION_STYLES = {
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    tag: 'bg-amber-500 text-white',
    ring: 'hover:ring-amber-200',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800',
    tag: 'bg-emerald-600 text-white',
    ring: 'hover:ring-emerald-200',
  },
  stone: {
    bg: 'bg-stone-50',
    border: 'border-stone-200',
    badge: 'bg-stone-100 text-stone-700',
    tag: 'bg-stone-600 text-white',
    ring: 'hover:ring-stone-200',
  },
}

type Product = {
  name: string; image: string; harvestDate: string
  description: string; availability: string; price: string; unit: string
}

const AVAILABILITY_STYLES: Record<string, string> = {
  'In Stock':      'bg-green-100 text-green-800',
  'Limited Stock': 'bg-yellow-100 text-yellow-800',
  'Sold Out':      'bg-red-100 text-red-800',
  'Pre-order':     'bg-blue-100 text-blue-800',
}

function CatalogModal({ title, subtitle, products, onClose }: {
  title: string; subtitle: string; products: Product[]; onClose: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white rounded-t-3xl px-8 pt-8 pb-4 border-b border-stone-100 flex items-center justify-between z-10">
          <div>
            <h3 className="text-2xl font-bold text-stone-900">{title}</h3>
            <p className="text-stone-500 text-sm mt-1">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors text-lg font-bold"
          >
            ✕
          </button>
        </div>
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-stone-100 overflow-hidden flex flex-col"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <h4 className="text-lg font-bold text-stone-900 mb-1">{product.name}</h4>
                <p className="text-xs text-stone-500 mb-2">Harvested: {product.harvestDate}</p>
                <p className="text-stone-500 text-sm mb-3">{product.description}</p>
                <span className={`self-start px-3 py-1 rounded-full text-xs font-semibold ${AVAILABILITY_STYLES[product.availability] ?? 'bg-gray-100 text-gray-800'}`}>
                  {product.availability}
                </span>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="text-base font-bold text-[#32CD32]">{product.price}/{product.unit}</span>
                  <button
                    onClick={() => alert(`Added ${product.name} to cart!`)}
                    className="btn-shimmer p-3 rounded-full bg-[#32CD32] text-white hover:bg-[#2DBD2D] transition-colors"
                    aria-label="Add to cart"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}

function CoreDivisions() {
  const [selectedCatalog, setSelectedCatalog] = useState<string | null>(null)

  const CATALOGS: Record<string, { title: string; subtitle: string; products: Product[] }> = {
    crops:        { title: 'Seasonal Crops Catalog',  subtitle: 'Fresh produce from our seasonal crops division',                       products: SEASONAL_PRODUCTS },
    horticulture: { title: 'Horticulture Catalog',    subtitle: 'Premium fruits, flowers & vegetables from our horticulture division',   products: HORTICULTURE_PRODUCTS },
    livestock:    { title: 'Livestock Catalog',        subtitle: 'Ethically raised livestock and animal products',                        products: LIVESTOCK_PRODUCTS },
  }

  const handleCatalogClick = (divisionTitle: string) => {
    const key = divisionTitle === 'Seasonal Crops' ? 'crops'
              : divisionTitle === 'Horticulture'   ? 'horticulture'
              : divisionTitle === 'Livestock'       ? 'livestock'
              : null
    if (key) setSelectedCatalog(key)
    else alert(`Product Catalog for ${divisionTitle} - Coming soon!`)
  }

  return (
    <section id="divisions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-widest uppercase mb-4">
            What We Grow & Raise
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">Our Core Divisions</h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Three integrated divisions working in harmony to deliver quality farm products — from field to
            table, and farm to world.
          </p>
        </div>

        {selectedCatalog && CATALOGS[selectedCatalog] && (
          <CatalogModal
            {...CATALOGS[selectedCatalog]}
            onClose={() => setSelectedCatalog(null)}
          />
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {DIVISIONS.map((div) => {
            const s = DIVISION_STYLES[div.accent]
            return (
              <div
                key={div.id}
                className={`rounded-3xl border ${s.border} ${s.bg} p-8 flex flex-col hover:shadow-xl hover:-translate-y-1 hover:ring-4 ${s.ring} transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-7">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm">
                    <img src={div.image} alt={div.title} className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.tag}`}>Division</span>
                </div>

                <h3 className="text-2xl font-bold text-stone-900 mb-1">{div.title}</h3>
                <p className="text-sm font-medium text-stone-400 mb-4">{div.tagline}</p>
                <p className="text-stone-600 text-sm leading-relaxed mb-7 flex-1">{div.description}</p>

                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                    Key Products
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {div.examples.map((ex) => (
                      <span key={ex} className={`px-3 py-1 rounded-full text-xs font-semibold ${s.badge}`}>
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleCatalogClick(div.title)}
                  className={`btn-pulse mt-6 w-full px-6 py-3 rounded-full text-white font-semibold text-sm transition-colors hover:shadow-lg cursor-pointer ${s.tag}`}
                >
                  {div.catalogLabel || 'Product Catalog'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Market Focus ─────────────────────────────────────────────────────────────

function MarketFocus() {
  return (
    <section id="markets" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-widest uppercase mb-4">
            Where We Serve
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">Domestic & Export Focus</h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            From local farm gates to international ports — Lafresh is built to serve both markets with
            equal commitment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Domestic */}
          <div className="bg-white rounded-3xl p-10 border border-stone-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 shadow-sm">
              <img src="/images/market.jpg" alt="Local market" className="w-full h-full object-cover" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Local Market
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">Serving Local Communities</h3>
            <p className="text-stone-500 leading-relaxed mb-7">
              We supply fresh, seasonal produce to local retailers, supermarkets, hotels, restaurants, and
              urban markets — ensuring food security and supporting local economies.
            </p>
            <ul className="space-y-3">
              {[
                'Local grocery stores & supermarkets',
                'Hotels and restaurant chains',
                'Urban fresh produce markets',
                'Food processors & distributors',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-stone-600">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Export */}
          <div
            className="rounded-3xl p-10 text-white hover:shadow-xl hover:shadow-emerald-900/20 transition-shadow"
            style={{ background: 'linear-gradient(135deg, #32CD32 0%, #047857 50%, #32CD32 100%)' }}
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 shadow-sm">
              <img src="/images/export.jpg" alt="International export" className="w-full h-full object-cover" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-5 border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              International Export
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Export-Ready & Certified</h3>
            <p className="text-emerald-100/75 leading-relaxed mb-7">
              Our products meet international phytosanitary standards, enabling reliable exports to buyers
              across Europe, Asia, and the Middle East — with full traceability and documentation.
            </p>
            <ul className="space-y-3">
              {[
                'Phytosanitary certified produce',
                'Cold-chain logistics support',
                'Custom export packaging',
                'Direct long-term buyer contracts',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-emerald-100">
                  <span className="w-5 h-5 rounded-full bg-emerald-600/50 flex items-center justify-center text-emerald-200 flex-shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Seasonal Calendar ────────────────────────────────────────────────────────

function SeasonalCalendar() {
  return (
    <section id="seasons" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-widest uppercase mb-4">
            Seasonal Availability
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">What's in Season</h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Our produce availability aligns with natural growing cycles. Plan your procurement with our
            seasonal calendar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SEASONS.map((s) => (
            <div
              key={s.name}
              className={`rounded-3xl border ${s.border} ${s.bg} p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-center mb-7">
                <div className="w-12 h-12 rounded-2xl overflow-hidden mx-auto mb-3 shadow-sm">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <h3 className={`text-2xl font-bold ${s.heading} mb-1`}>{s.name}</h3>
                <p className="text-xs text-stone-400 font-medium tracking-wide">{s.months}</p>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2.5">
                    Main Crops
                  </p>
                  <div className="flex flex-col gap-2">
                    {s.crops.map((crop) => (
                      <div key={crop} className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                        <span className="text-sm font-medium text-stone-700">{crop}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2.5">
                    Horticulture
                  </p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${s.badge}`}>
                    {s.horticulture}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Sustainability ───────────────────────────────────────────────────────────

function Sustainability() {
  return (
    <section
      id="sustainability"
      className="py-24"
      style={{ background: 'linear-gradient(160deg, #32CD32 0%, #064e3b 30%, #32CD32 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/60 text-emerald-300 text-xs font-semibold tracking-widest uppercase mb-4 border border-emerald-700/40">
            Our Commitment
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Sustainability at Our Core</h2>
          <p className="text-emerald-200/60 text-lg max-w-2xl mx-auto">
            We believe good farming is responsible farming. Every decision considers the long-term health of
            the land, the people, and the planet.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="bg-emerald-900/40 rounded-3xl p-8 border border-emerald-800/50 hover:bg-emerald-800/50 hover:border-emerald-600/60 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl overflow-hidden mb-6 shadow-sm">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
              <p className="text-emerald-200/55 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-widest uppercase mb-4">
            What Partners Say
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Trusted by Buyers & Exporters
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Real partnerships, proven quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-10 border border-stone-100 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="text-6xl text-emerald-200 font-serif leading-none mb-4 select-none">"</div>
              <p className="text-stone-700 text-base leading-relaxed mb-8 italic">{t.quote}</p>
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0 ${
                    t.color === 'emerald' ? 'bg-emerald-700' : 'bg-amber-700'
                  }`}
                >
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 text-sm">{t.name}</p>
                  <p className="text-stone-400 text-xs truncate">{t.role}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                    t.color === 'emerald'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: 'domestic', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const showStatus = (ok: boolean, text: string) => {
    setStatusMsg({ ok, text })
    setTimeout(() => setStatusMsg(null), 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showStatus(false, 'Name, email, and message are required.')
      return
    }
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        showStatus(false, data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      showStatus(false, 'Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow'

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — info */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-widest uppercase mb-6">
              Get In Touch
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 leading-tight">
              Ready to partner
              <br />
              with Lafresh?
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-10">
              Whether you're a local retailer looking for fresh daily supply or an international buyer seeking
              certified export products — we're ready to talk.
            </p>

            <div className="space-y-3">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  ),
                  label: 'General Inquiries', value: 'infor@lafresh.co.zw',
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                    </svg>
                  ),
                  label: 'Export Partnerships', value: 'infor.exports@lafresh.co.zw',
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  label: 'Headquarters', value: 'Harare, Zimbabwe',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-medium">{item.label}</p>
                    <p className="text-stone-700 font-semibold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-stone-50 rounded-3xl p-8 border border-stone-100">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">Message Received!</h3>
                <p className="text-stone-500 text-sm">
                  Our team will get back to you within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full border border-stone-300 text-stone-600 text-sm font-medium hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-stone-900 mb-6">Send us a message</h3>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Inquiry Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    className={inputClass}
                  >
                    <option value="domestic">Domestic Supply</option>
                    <option value="export">International Export</option>
                    <option value="partnership">General Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us about your requirements..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {statusMsg && (
                  <p className={`text-sm font-medium ${statusMsg.ok ? 'text-emerald-600' : 'text-red-600'}`}>
                    {statusMsg.text}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-shimmer w-full py-3.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition-colors hover:shadow-lg hover:shadow-emerald-700/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="text-white" style={{ background: '#166534' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={lafreshLogo} alt="Lafresh" className="w-9 h-9 rounded-full object-cover" />
              <div className="leading-none">
                <span className="font-bold text-white block">Lafresh</span>
                <span className="text-xs text-emerald-400">Private Limited</span>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-4 max-w-xs">
              Sustainable agro-farming for local markets and global export. Fresh from the farm — for home
              and the world.
            </p>
            <p className="text-emerald-400 text-sm font-medium">infor@lafresh.co.zw</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-stone-400 text-sm hover:text-emerald-400 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-5">Our Business</h4>
            <ul className="space-y-3">
              {[
                { src: '/slides/maize.jpg', label: 'Seasonal Crops' },
                { src: '/slides/horticulture.jpg', label: 'Horticulture' },
                { src: '/slides/cattle.jpg', label: 'Livestock' },
                { src: '/images/market.jpg', label: 'Domestic Supply' },
                { src: '/images/export.jpg', label: 'International Export' },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-stone-400 text-sm">
                  <img src={item.src} alt={item.label} className="w-5 h-5 rounded object-cover flex-shrink-0" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm">
            © {year} Lafresh Private Limited. All rights reserved.
          </p>
          <p className="text-stone-600 text-xs text-center">
            Sustainable farming · Quality produce · Global standards
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <div className="min-h-screen font-sans">
        <Navbar />
        <Hero />
        <About />
        <CoreDivisions />
        <MarketFocus />
        <SeasonalCalendar />
        <Sustainability />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
