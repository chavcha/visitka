import type { Copy, Locale } from './types'

const en: Copy = {
  meta: {
    title: 'Vladimir Sidorov — Software Developer',
    description:
      'Vladimir Sidorov — Software Developer, Anapa. Frontend (React, Vue), freelance, SEO projects. KubSTU, Software Engineering.',
  },
  a11y: {
    skip: 'Skip to main content',
    nav: 'Sections',
    scrollDown: 'Scroll down',
    language: 'Language',
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    contact: 'Contact',
  },
  header: { cta: 'Get in touch' },
  hero: {
    label: 'Software Developer',
    firstName: 'Vladimir',
    lastName: 'Sidorov',
    tagline:
      'I build frontend interfaces and products — from layout and Vue to React and React Native. Clean code, measurable outcomes.',
    statYears: 'year in development',
    statTech: 'technologies in stack',
    statUni: 'KubSTU',
    statDegree: 'BSc Software Eng., 2025',
    discuss: 'Discuss a project',
    github: 'GitHub',
  },
  about: {
    eyebrow: '01 — About',
    line1: 'A developer',
    line2: 'focused on',
    accent: 'outcomes',
    p1: 'One year in software development with a frontend focus: HTML and CSS, JavaScript, TypeScript, React and Vue, React Native, Redux, Vite, Node.js, GraphQL, and related tools (Effector, FSD, C# / .NET). I care about polished interfaces and product logic, and I work well in cross-functional teams.',
    p2: 'I write maintainable, documented code and do code reviews. I also have experience in SEO and web analytics. I am looking for a team where frontend is a full engineering discipline.',
  },
  experience: {
    eyebrow: '02 — Experience',
    title: 'Key achievements',
    education: 'Education',
    university: 'Kuban State Technological University',
    meta: "2021 — 2025 · Bachelor's",
    degree: 'Software Engineering · 09.03.04',
    jobs: [
      {
        index: '01',
        title: 'SEO Specialist',
        highlights: [
          'Promotion, analytics, and optimization.',
          'Yandex Webmaster, Google Search Console, Yandex Metrica.',
          'Spa and furniture manufacturing: analysis and growth.',
          'Mitigating impact of attacks using lookalike domains.',
        ],
      },
      {
        index: '02',
        title: 'Frontend Developer',
        highlights: [
          'Figma-to-code: semantic HTML, responsive layouts, CSS Grid and Flexbox — interfaces that work on desktop and mobile.',
          'Live templates and UI kits for clients: typography, button and form states, attention to details users notice.',
          'Graduation project “Social Network” in C# and Razor Pages: registration, profiles, feed, and interactions — fullstack logic with server rendering and clean MVC structure.',
          'Vue.js SPA: components, Vue Router, REST API integration, and state management — from prototype to production UI without unnecessary complexity.',
          'Independent delivery: scope alignment, clear timelines, progress demos, and iterations so outcomes match business expectations.',
        ],
      },
    ],
  },
  skills: {
    eyebrow: '03 — Stack',
    title: 'Tools & technologies',
  },
  code: {
    eyebrow: 'Code',
    title: 'Browse repositories',
    text: 'GitHub complements the resume: project structure, code style, and how I approach problems.',
    github: 'GitHub',
  },
  contact: {
    eyebrow: '04 — Contact',
    line1: "Let's",
    accent: 'collaborate',
    phone: 'Phone',
    location: 'Location',
    locationValue: 'Anapa, Russia',
    telegram: 'Telegram',
    github: 'GitHub',
  },
  extra: {
    eyebrow: 'Beyond work',
    text: 'Martial arts · Movies & TV · Music · Games',
  },
  footer: { name: 'Vladimir Sidorov' },
}

const ru: Copy = {
  meta: {
    title: 'Владимир Сидоров — Software Developer',
    description:
      'Владимир Сидоров — Software Developer, Анапа. Фронтенд (React, Vue), фриланс, SEO-проекты. КубГТУ, программная инженерия.',
  },
  a11y: {
    skip: 'К основному содержимому',
    nav: 'Разделы',
    scrollDown: 'Прокрутить вниз',
    language: 'Язык',
  },
  nav: {
    about: 'Обо мне',
    experience: 'Опыт',
    skills: 'Навыки',
    contact: 'Контакты',
  },
  header: { cta: 'Связаться' },
  hero: {
    label: 'Software Developer',
    firstName: 'Владимир',
    lastName: 'Сидоров',
    tagline:
      'Создаю интерфейсы и продукты на фронтенде — от вёрстки и Vue до React и React Native. Чистый код, измеримый результат.',
    statYears: 'год в разработке',
    statTech: 'технологий в стеке',
    statUni: 'КубГТУ',
    statDegree: 'бакалавр ПИ, 2025',
    discuss: 'Обсудить проект',
    github: 'GitHub',
  },
  about: {
    eyebrow: '01 — Обо мне',
    line1: 'Разработчик,',
    line2: 'ориентированный',
    accent: 'на результат',
    p1: 'Один год в разработке ПО с фокусом на фронтенд: HTML и CSS, JavaScript, TypeScript, React и Vue, React Native, Redux, Vite, Node.js, GraphQL и смежный стек (Effector, FSD, C# / .NET). Увлекаюсь качественными интерфейсами и продуктовой логикой, комфортно работаю в кросс-функциональных командах.',
    p2: 'Пишу поддерживаемый, документируемый код, провожу code review. Параллельно — опыт в SEO и веб-аналитике. Ищу команду, где фронтенд — полноценная инженерная дисциплина.',
  },
  experience: {
    eyebrow: '02 — Опыт',
    title: 'Ключевые достижения',
    education: 'Образование',
    university: 'Кубанский государственный технологический университет',
    meta: '2021 — 2025 · Бакалавр',
    degree: 'Программная инженерия · 09.03.04',
    jobs: [
      {
        index: '01',
        title: 'SEO-специалист',
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
        highlights: [
          'Вёрстка по макетам Figma: семантический HTML, адаптив, CSS Grid и Flexbox — интерфейс одинаково уверенно смотрится на десктопе и мобильных.',
          'Живые шаблоны и UI-киты для заказчиков: аккуратная типографика, состояния кнопок и форм, внимание к деталям, которые замечает пользователь.',
          'Диплом «Социальная сеть» на C# и Razor Pages: регистрация, профили, лента и взаимодействия — fullstack-логика с серверным рендерингом и чистой структурой MVC.',
          'SPA на Vue.js: компоненты, Vue Router, работа с REST API и управление состоянием — от прототипа до рабочего интерфейса без лишней сложности.',
          'Самостоятельная работа: согласование ТЗ, прозрачные сроки, промежуточные показы и доработки — чтобы результат совпадал с ожиданиями бизнеса.',
        ],
      },
    ],
  },
  skills: {
    eyebrow: '03 — Стек',
    title: 'Инструменты и технологии',
  },
  code: {
    eyebrow: 'Код',
    title: 'Смотрите репозитории',
    text: 'GitHub дополняет резюме: структура проектов, стиль кода и подход к задачам.',
    github: 'GitHub',
  },
  contact: {
    eyebrow: '04 — Контакты',
    line1: 'Давайте',
    accent: 'сотрудничать',
    phone: 'Телефон',
    location: 'Город',
    locationValue: 'Анапа, Россия',
    telegram: 'Telegram',
    github: 'GitHub',
  },
  extra: {
    eyebrow: 'Вне работы',
    text: 'Единоборства · Фильмы и сериалы · Музыка · Игры',
  },
  footer: { name: 'Владимир Сидоров' },
}

export const translations: Record<Locale, Copy> = { en, ru }
