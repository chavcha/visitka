export type Locale = 'en' | 'ru'

export type ExperienceJob = {
  index: string
  title: string
  highlights: string[]
}

export type Copy = {
  meta: {
    title: string
    description: string
  }
  a11y: {
    skip: string
    nav: string
    scrollDown: string
    language: string
    theme: string
    darkMode: string
    lightMode: string
    accent: string
    accentBlue: string
    accentViolet: string
    accentEmerald: string
  }
  nav: {
    about: string
    experience: string
    skills: string
    contact: string
  }
  header: {
    cta: string
  }
  hero: {
    label: string
    firstName: string
    lastName: string
    tagline: string
    statYears: string
    statTech: string
    statUni: string
    statDegree: string
    discuss: string
    github: string
  }
  about: {
    eyebrow: string
    line1: string
    line2: string
    accent: string
    p1: string
    p2: string
  }
  experience: {
    eyebrow: string
    title: string
    education: string
    university: string
    meta: string
    degree: string
    jobs: ExperienceJob[]
  }
  skills: {
    eyebrow: string
    title: string
  }
  code: {
    eyebrow: string
    title: string
    text: string
    github: string
  }
  contact: {
    eyebrow: string
    line1: string
    accent: string
    phone: string
    location: string
    locationValue: string
    telegram: string
    github: string
  }
  extra: {
    eyebrow: string
    text: string
  }
  footer: {
    name: string
  }
  easterEgg: {
    title: string
    text: string
  }
}
