import { useEffect, useState } from 'react'
import { CountUp } from './components/CountUp'
import { CursorSpotlight } from './components/CursorSpotlight'
import { Reveal } from './components/Reveal'
import { ScrollProgress } from './components/ScrollProgress'
import { SkillCard } from './components/SkillCard'
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

const EXPERIENCE = [
  {
    index: '01',
    title: 'SEO-специалист',
    period: 'авг. 2025 — окт. 2025',
    duration: '3 месяца',
    highlights: [
      'Продвижение, аналитика и оптимизация.',
      'Яндекс.Вебмастер, Google Search Console, Яндекс.Метрика.',
      'СПА и производство мебели: анализ и продвижение.',
      'Смягчение последствий атак с подставными доменами.',
    ],
  },
  {
    index: '02',
    title: 'Frontend-разработчик',
    period: 'фев. 2024 — авг. 2025',
    duration: '1 год 6 месяцев',
    highlights: [
      'Вёрстка по макетам Figma: семантический HTML, адаптив, CSS Grid и Flexbox — интерфейс одинаково уверенно смотрится на десктопе и мобильных.',
      'Живые шаблоны и UI-киты для заказчиков: аккуратная типографика, состояния кнопок и форм, внимание к деталям, которые замечает пользователь.',
      'Диплом «Социальная сеть» на C# и Razor Pages: регистрация, профили, лента и взаимодействия — fullstack-логика с серверным рендерингом и чистой структурой MVC.',
      'SPA на Vue.js: компоненты, Vue Router, работа с REST API и управление состоянием — от прототипа до рабочего интерфейса без лишней сложности.',
      'Фриланс-формат: согласование ТЗ, прозрачные сроки, промежуточные показы и доработки — чтобы результат совпадал с ожиданиями бизнеса.',
    ],
  },
] as const

const NAV = [
  { href: '#about', label: 'Обо мне' },
  { href: '#experience', label: 'Опыт' },
  { href: '#skills', label: 'Навыки' },
  { href: '#contact', label: 'Контакты' },
] as const

const TICKER_TEXT =
  'React · Vue · TypeScript · React Native · Redux · Node.js · GraphQL · Vite · FSD · C# · SEO · ' +
  'React 19 · React DOM · TypeScript · Vite 8 · HTML5 · CSS3 · ESLint ·'

function phoneHref(display: string) {
  const digits = display.replace(/\D/g, '')
  return digits.startsWith('7') ? `tel:+${digits}` : `tel:+7${digits}`
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [ready, setReady] = useState(false)
  const [activeJob, setActiveJob] = useState<string>(EXPERIENCE[0].index)
  const reducedMotion = usePrefersReducedMotion()
  const activeSection = useScrollSpy(SPY_SECTIONS)

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
        К основному содержимому
      </a>

      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner container">
          <a className="header__logo" href="#top">
            VS
          </a>
          <nav className="header__nav" aria-label="Разделы">
            {NAV.map((item) => {
              const id = item.href.slice(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={activeSection === id ? 'is-active' : undefined}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
          <a className="header__cta" href="#contact">
            Связаться
          </a>
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
          </div>

          <div className="hero__content container">
            <div className="hero__copy">
                <p className="hero__label">Software Developer</p>
                <h1 id="hero-title" className="hero__title">
                  <span className="hero__line">Владимир</span>
                  <span className="hero__line hero__line--accent">Сидоров</span>
                </h1>
                <p className="hero__tagline">
                  Создаю интерфейсы и продукты на фронтенде — от вёрстки и Vue
                  до React и React Native. Чистый код, измеримый результат.
                </p>
                <div className="hero__stats">
                  <div className="stat">
                    <CountUp value={1} suffix="+" />
                    <span className="stat__label">года в разработке</span>
                  </div>
                  <div className="stat">
                    <CountUp value={20} suffix="+" />
                    <span className="stat__label">технологий в стеке</span>
                  </div>
                  <div className="stat">
                    <span className="stat__value">КубГТУ</span>
                    <span className="stat__label">бакалавр ПИ, 2025</span>
                  </div>
                </div>
                <div className="hero__actions">
                  <a className="btn btn--fill" href="#contact">
                    Обсудить проект
                  </a>
                  <a
                    className="btn btn--outline"
                    href="https://github.com/chavcha"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </div>
            </div>
          </div>

          <a href="#about" className="hero__scroll" aria-label="Прокрутить вниз">
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

        <section id="about" className="panel" aria-labelledby="about-title">
          <div className="container panel__grid">
            <Reveal>
              <p className="panel__eyebrow">01 — Обо мне</p>
              <h2 id="about-title" className="panel__heading">
                Разработчик,
                <br />
                ориентированный
                <br />
                <span className="text-gradient">на результат</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="panel__body">
              <p>
                Один год в разработке ПО с фокусом на фронтенд: HTML и CSS,
                JavaScript, TypeScript, React и Vue, React Native, Redux,
                Vite, Node.js, GraphQL и смежный стек (Effector, FSD, C# /
                .NET). Увлекаюсь качественными интерфейсами и продуктовой
                логикой, комфортно работаю в кросс-функциональных командах.
              </p>
              <p>
                Пишу поддерживаемый, документируемый код, провожу code review.
                Параллельно — опыт в SEO и веб-аналитике. Ищу команду, где
                фронтенд — полноценная инженерная дисциплина.
              </p>
            </Reveal>
          </div>
        </section>

        <section
          id="experience"
          className="panel panel--alt"
          aria-labelledby="experience-title"
        >
          <div className="container">
            <Reveal>
              <p className="panel__eyebrow">02 — Опыт</p>
              <h2 id="experience-title" className="panel__heading panel__heading--sm">
                Где я приносил пользу
              </h2>
            </Reveal>

            <ol className="timeline">
              {EXPERIENCE.map((job, i) => (
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
                          {job.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={100}>
              <article className="edu-card">
                <p className="panel__eyebrow">Образование</p>
                <h3 className="edu-card__title">
                  Кубанский государственный технологический университет
                </h3>
                <p className="edu-card__meta">2021 — 2025 · Бакалавр</p>
                <p className="edu-card__text">Программная инженерия · 09.03.04</p>
              </article>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="panel" aria-labelledby="skills-title">
          <div className="container">
            <Reveal>
              <p className="panel__eyebrow">03 — Стек</p>
              <h2 id="skills-title" className="panel__heading panel__heading--sm">
                Инструменты и технологии
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

        <section className="cta-band" aria-labelledby="code-title">
          <div className="container cta-band__inner">
            <Reveal>
              <p className="panel__eyebrow">Код</p>
              <h2 id="code-title" className="cta-band__title">
                Смотрите репозитории
              </h2>
              <p className="cta-band__text">
                GitHub дополняет резюме: структура проектов, стиль кода и подход
                к задачам.
              </p>
              <a
                className="btn btn--fill btn--lg"
                href="https://github.com/chavcha"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="panel panel--contact" aria-labelledby="contact-title">
          <div className="container contact">
            <Reveal>
              <p className="panel__eyebrow">04 — Контакты</p>
              <h2 id="contact-title" className="contact__title">
                Давайте
                <br />
                <span className="text-gradient">сотрудничать</span>
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
                  <span className="contact__label">Телефон</span>
                  {PHONES.map((p) => (
                    <a key={p} href={phoneHref(p)} className="contact__link">
                      {p}
                    </a>
                  ))}
                </li>
                <li>
                  <span className="contact__label">Город</span>
                  <span>Анапа, Россия</span>
                </li>
                <li>
                  <span className="contact__label">Telegram</span>
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
                  <span className="contact__label">GitHub</span>
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

        <section className="panel panel--soft" aria-labelledby="extra-title">
          <div className="container">
            <Reveal>
              <p className="panel__eyebrow">Вне работы</p>
              <p id="extra-title" className="panel__muted">
                Единоборства · Фильмы и сериалы · Музыка · Игры
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} Владимир Сидоров</span>
          <a href="mailto:waldemar.vs@yandex.ru">waldemar.vs@yandex.ru</a>
        </div>
      </footer>
    </div>
  )
}

export default App
