import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds: readonly string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const id = visible[0]?.target.id
        if (id) setActive(id)
      },
      { rootMargin: '-42% 0px -48% 0px', threshold: [0.08, 0.35, 0.6] },
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [sectionIds])

  return active
}
