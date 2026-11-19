const gsapUrl = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/index.js'
const scrollTriggerUrl = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/ScrollTrigger.js'

export function attachScrollMotion(root) {
  const preference = window.matchMedia('(prefers-reduced-motion: no-preference)')
  let media
  let disposed = false
  let loading = false

  async function enable() {
    if (!preference.matches || loading || media) return
    loading = true
    try {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import(/* @vite-ignore */ gsapUrl),
        import(/* @vite-ignore */ scrollTriggerUrl),
      ])
      if (disposed || !preference.matches) return
      gsap.registerPlugin(ScrollTrigger)
      media = gsap.matchMedia(root)
      media.add({
        desktop: '(min-width: 821px)',
        mobile: '(max-width: 820px)',
        motion: '(prefers-reduced-motion: no-preference)',
      }, ({ conditions }) => {
        if (!conditions.motion) return
        const distance = conditions.desktop ? 1 : 0.45
        const hero = root.querySelector('.hero')
        gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: hero, start: 'top top+=70', end: 'bottom top', scrub: 0.55 },
        })
          .to('.hero-copy', { y: -150 * distance, skewY: -5 * distance }, 0)
          .to('.hero-portrait img', { y: 125 * distance, scale: 1.13 + 0.26 * distance }, 0)
          .to('.hero-name', { y: `-=${260 * distance}`, x: `-=${55 * distance}` }, 0)

        for (const [index, card] of Array.from(root.querySelectorAll('.project-grid .project')).entries()) {
          const direction = index % 2 === 0 ? -1 : 1
          gsap.from(card, {
            x: direction * 52 * distance,
            y: 95 * distance,
            rotation: direction * 9 * distance,
            scale: 0.86,
            duration: 0.95,
            ease: 'back.out(1.65)',
            clearProps: 'transform',
            scrollTrigger: { trigger: card, start: 'top 95%', once: true },
          })
        }

        for (const heading of root.querySelectorAll('.section-heading h2')) {
          gsap.from(heading, {
            y: 38 * distance,
            skewY: -8 * distance,
            duration: 0.85,
            ease: 'power4.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: heading, start: 'top 92%', once: true },
          })
        }
      })
    } catch {
      media?.revert()
      media = undefined
    } finally {
      loading = false
    }
  }

  preference.addEventListener('change', enable)
  enable()
  return () => {
    disposed = true
    preference.removeEventListener('change', enable)
    media?.revert()
  }
}
