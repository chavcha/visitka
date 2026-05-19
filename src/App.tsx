import { useEffect, useState, type CSSProperties } from 'react'
import { CountUp } from './components/CountUp'
import { CursorSpotlight } from './components/CursorSpotlight'
import { LocaleToggle } from './components/LocaleToggle'
import { MagneticLink } from './components/MagneticLink'
import { Reveal } from './components/Reveal'
import { ScrollProgress } from './components/ScrollProgress'
import { SkillCard } from './components/SkillCard'
import { useLocale } from './i18n/LocaleContext'
import { usePointerParallax } from './hooks/usePointerParallax'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useScrollSpy } from './hooks/useScrollSpy'
import './App.css'

const SPY_SECTIONS = ['about', 'experience', 'skills', 'contact'] as const

const SKILLS = [
  { name: 'React', size: 'lg' as const },
  { name: 'JavaScript', size: 'lg' as const },
  { name: 'TypeScript', size: 'md' as const },
  { name: 'Vue.js', size: 'md' as const },
  { name: 'React Native', size: 'md' as const },
  { name: 'Redux', size: 'sm' as const },
  { name: 'Node.js', size: 'md' as const },
  { name: 'GraphQL', size: 'sm' as const },
  { name: 'Vite', size: 'sm' as const },
  { name: 'Effector', size: 'sm' as const },
  { name: 'FSD', size: 'sm' as const },
  { name: 'C# / .NET', size: 'md' as const },
  { name: 'HTML & CSS', size: 'lg' as const },
  { name: 'SQL', size: 'sm' as const },
  { name: 'Express.js', size: 'sm' as const },
  { name: 'Apollo', size: 'sm' as const },
]

const PHONES = ['+7 (918) 488-34-24', '+7 (991) 537-82-82'] as const

const TICKER_TEXT =
  'React · Vue · TypeScript · React Native · Redux · Node.js · GraphQL · Vite · FSD · C# · SEO · ' +
  'React 19 · React DOM · TypeScript · Vite 8 · HTML5 · CSS3 · ESLint ·'

const NAV_HREFS = [
  { href: '#about', key: 'about' as const },
  { href: '#experience', key: 'experience' as const },
  { href: '#skills', key: 'skills' as const },
  { href: '#contact', key: 'contact' as const },
]

function phoneHref(display: string) {
  const digits = display.replace(/\D/g, '')
  return digits.startsWith('7') ? `tel:+${digits}` : `tel:+7${digits}`
}

function App() {
  const { t } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [ready, setReady] = useState(false)
  const [activeJob, setActiveJob] = useState('01')
  const reducedMotion = usePrefersReducedMotion()
  const activeSection = useScrollSpy(SPY_SECTIONS)

  const jobs = t.experience.jobs

  usePointerParallax(!reducedMotion)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className={`page${ready ? ' page--ready' : ''}`}>
      <ScrollProgress />
      <CursorSpotlight />
      <a href="#main" className="skip">
        {t.a11y.skip}
      </a>

      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner container">
          <a className="header__logo" href="#top">
            VS
          </a>
          <nav className="header__nav" aria-label={t.a11y.nav}>
            {NAV_HREFS.map((item) => {
              const id = item.href.slice(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={activeSection === id ? 'is-active' : undefined}
                >
                  {t.nav[item.key]}
                </a>
              )
            })}
          </nav>
          <LocaleToggle />
          <MagneticLink className="header__cta btn-magnetic" href="#contact">
            {t.header.cta}
          </MagneticLink>
        </div>
      </header>

      <main id="main">
        <section
          id="top"
          className={`hero${ready ? ' hero--ready' : ''}`}
          aria-labelledby="hero-title"
        >
          <div className="hero__bg" aria-hidden="true">
            <div className="hero__orb hero__orb--1" />
            <div className="hero__orb hero__orb--2" />
            <div className="hero__grid" />
            <div className="hero__beam" />
          </div>

          <div className="hero__content container">
            <div className="hero__copy">
              <p className="hero__label">{t.hero.label}</p>
              <h1 id="hero-title" className="hero__title">
                <span className="hero__line">{t.hero.firstName}</span>
                <span className="hero__line hero__line--accent">
                  {t.hero.lastName}
                </span>
              </h1>
              <p className="hero__tagline">{t.hero.tagline}</p>
              <div className="hero__stats">
                <div className="stat">
                  <CountUp value={1} suffix="+" />
                  <span className="stat__label">{t.hero.statYears}</span>
                </div>
                <div className="stat">
                  <CountUp value={20} suffix="+" />
                  <span className="stat__label">{t.hero.statTech}</span>
                </div>
                <div className="stat">
                  <span className="stat__value">{t.hero.statUni}</span>
                  <span className="stat__label">{t.hero.statDegree}</span>
                </div>
              </div>
              <div className="hero__actions">
                <MagneticLink className="btn btn--fill btn-magnetic" href="#contact">
                  {t.hero.discuss}
                </MagneticLink>
                <MagneticLink
                  className="btn btn--outline btn-magnetic"
                  href="https://github.com/chavcha"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.hero.github}
                </MagneticLink>
              </div>
            </div>
          </div>

          <a href="#about" className="hero__scroll" aria-label={t.a11y.scrollDown}>
            <span className="hero__scroll-line" />
          </a>
        </section>

        <div className="ticker ticker--interactive" aria-hidden="true">
          <div className="ticker__track">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="ticker__group">
                {TICKER_TEXT}
              </span>
            ))}
          </div>
        </div>

        <section id="about" className="panel panel--motion" aria-labelledby="about-title">
          <div className="container panel__grid">
            <Reveal variant="blur">
              <p className="panel__eyebrow">{t.about.eyebrow}</p>
              <h2 id="about-title" className="panel__heading">
                {t.about.line1}
                <br />
                {t.about.line2}
                <br />
                <span className="text-gradient">{t.about.accent}</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="panel__body" variant="blur">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </Reveal>
          </div>
        </section>

        <section
          id="experience"
          className="panel panel--alt panel--motion"
          aria-labelledby="experience-title"
        >
          <div className="container">
            <Reveal variant="blur">
              <p className="panel__eyebrow">{t.experience.eyebrow}</p>
              <h2 id="experience-title" className="panel__heading panel__heading--sm">
                {t.experience.title}
              </h2>
            </Reveal>

            <ol className="timeline">
              {jobs.map((job, i) => (
                <li key={job.index}>
                  <Reveal delay={i * 80}>
                    <article
                      className={`timeline__card${
                        activeJob === job.index ? ' timeline__card--active' : ''
                      }`}
                      onClick={() => setActiveJob(job.index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setActiveJob(job.index)
                        }
                      }}
                    >
                      <span className="timeline__index">{job.index}</span>
                      <div className="timeline__main">
                        <header className="timeline__head">
                          <div>
                            <h3 className="timeline__title">{job.title}</h3>
                          </div>
                        </header>
                        <ul className="timeline__list">
                          {job.highlights.map((item, j) => (
                            <li
                              key={`${job.index}-${j}`}
                              style={
                                { '--item-delay': `${j * 60}ms` } as CSSProperties
                              }
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={100} variant="blur">
              <article className="edu-card">
                <p className="panel__eyebrow">{t.experience.education}</p>
                <h3 className="edu-card__title">{t.experience.university}</h3>
                <p className="edu-card__meta">{t.experience.meta}</p>
                <p className="edu-card__text">{t.experience.degree}</p>
              </article>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="panel panel--motion" aria-labelledby="skills-title">
          <div className="container">
            <Reveal variant="blur">
              <p className="panel__eyebrow">{t.skills.eyebrow}</p>
              <h2 id="skills-title" className="panel__heading panel__heading--sm">
                {t.skills.title}
              </h2>
            </Reveal>
            <ul className="bento" role="list">
              {SKILLS.map((skill, i) => (
                <li key={skill.name}>
                  <SkillCard
                    name={skill.name}
                    size={skill.size}
                    delay={(i % 6) * 40}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="cta-band panel--motion" aria-labelledby="code-title">
          <div className="container cta-band__inner">
            <Reveal variant="blur">
              <p className="panel__eyebrow">{t.code.eyebrow}</p>
              <h2 id="code-title" className="cta-band__title">
                {t.code.title}
              </h2>
              <p className="cta-band__text">{t.code.text}</p>
              <MagneticLink
                className="btn btn--fill btn--lg btn-magnetic"
                href="https://github.com/chavcha"
                target="_blank"
                rel="noreferrer"
              >
                {t.code.github}
              </MagneticLink>
            </Reveal>
          </div>
        </section>

        <section
          id="contact"
          className="panel panel--contact panel--motion"
          aria-labelledby="contact-title"
        >
          <div className="container contact">
            <Reveal variant="blur">
              <p className="panel__eyebrow">{t.contact.eyebrow}</p>
              <h2 id="contact-title" className="contact__title">
                {t.contact.line1}
                <br />
                <span className="text-gradient">{t.contact.accent}</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <a className="contact__email" href="mailto:waldemar.vs@yandex.ru">
                waldemar.vs@yandex.ru
              </a>
            </Reveal>
            <Reveal delay={120}>
              <ul className="contact__grid">
                <li>
                  <span className="contact__label">{t.contact.phone}</span>
                  <div className="contact__phones">
                    {PHONES.map((p) => (
                      <a key={p} href={phoneHref(p)} className="contact__link">
                        {p}
                      </a>
                    ))}
                  </div>
                </li>
                <li>
                  <span className="contact__label">{t.contact.location}</span>
                  <span>{t.contact.locationValue}</span>
                </li>
                <li>
                  <span className="contact__label">{t.contact.telegram}</span>
                  <a
                    href="https://t.me/camefromwayabove"
                    className="contact__link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @camefromwayabove
                  </a>
                </li>
                <li>
                  <span className="contact__label">{t.contact.github}</span>
                  <a
                    href="https://github.com/chavcha"
                    className="contact__link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    chavcha
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="panel panel--soft panel--motion" aria-labelledby="extra-title">
          <div className="container">
            <Reveal>
              <p className="panel__eyebrow">{t.extra.eyebrow}</p>
              <p id="extra-title" className="panel__muted">
                {t.extra.text}
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span>
            © {new Date().getFullYear()} {t.footer.name}
          </span>
          <a href="mailto:waldemar.vs@yandex.ru">waldemar.vs@yandex.ru</a>
        </div>
      </footer>
    </div>
  )
}

export default App
