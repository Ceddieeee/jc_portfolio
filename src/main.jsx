import { StrictMode, useEffect, useId, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { asset, portfolio as data } from './content'
import { attachScrollMotion } from './scroll-motion'
import { CursorSmoke } from './cursor-smoke'
import './styles.css'

const visibleSections = Object.entries(data.sections).filter(([id]) => (
  (id !== 'services' || data.services.enabled) &&
  (id !== 'recognition' || data.recognition.some(group => group.enabled))
))

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function Section({ id, children }) {
  const [label, heading] = data.sections[id]
  return <section className="section" id={id} aria-labelledby={id + '-title'}>
    <div className="section-heading"><p className="kicker">{label}</p><h2 id={id + '-title'}>{heading}</h2></div>
    {children}
  </section>
}

function Header() {
  const [open, setOpen] = useState(false)
  const menu = useRef(null)
  const navId = useId()
  return <header className="site-header" onKeyDown={event => {
    if (event.key === 'Escape' && open) { setOpen(false); menu.current.focus() }
  }}>
    <div className="shell header-inner">
      <a className="mark" href="#top" aria-label="JC PORTUGAL — portfolio home" onClick={() => setOpen(false)}><span className="mark-star" aria-hidden="true" /><span>JC PORTUGAL</span></a>
      <button ref={menu} className="menu-toggle" type="button" aria-expanded={open} aria-controls={navId} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button>
      <nav id={navId} className={open ? 'nav is-open' : 'nav'} aria-label="Portfolio">
        {visibleSections.map(([id, [label]]) => <a key={id} href={'#' + id} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </div>
  </header>
}

function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null)
  useEffect(() => {
    const element = dialog.current
    if (!project) return
    element.showModal()
    function pauseOtherVideos(event) {
      for (const video of element.querySelectorAll('video')) {
        if (video !== event.target) video.pause()
      }
    }
    element.addEventListener('play', pauseOtherVideos, true)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      element.removeEventListener('play', pauseOtherVideos, true)
      for (const video of element.querySelectorAll('video')) video.pause()
      element.close()
      document.body.style.overflow = previousOverflow
    }
  }, [project])
  return <dialog ref={dialog} className="case-dialog" aria-labelledby="case-title"
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => {
      if (event.target !== event.currentTarget) return
      const rect = event.currentTarget.getBoundingClientRect()
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
    }}>
    {project && <article className="case-inner">
      <div className="flex items-start justify-between gap-4">
        <div><p className="kicker">{project.sample ? 'Sample case study' : project.category}</p><h2 id="case-title">{project.title}</h2></div>
        <button type="button" className="button outline close-case" autoFocus onClick={onClose} aria-label="Close case study">×</button>
      </div>
      {project.media ? (
        <div className="case-media">
          {project.media.map((media, index) => (
            <figure key={media.src}>
              {media.type === 'video' ? (
                <video controls playsInline preload="none" poster={asset(media.poster)} aria-labelledby={project.id + '-media-' + index}>
                  <source src={asset(media.src)} type="video/mp4" />
                  <a href={asset(media.src)}>Download video</a>
                </video>
              ) : (
                <img src={asset(media.src)} alt={media.alt} loading="lazy" />
              )}
              <figcaption id={project.id + '-media-' + index}>{media.caption}</figcaption>
            </figure>
          ))}
        </div>
      ) : <img className="case-image" src={asset(project.detailImage)} alt={project.imageAlt} />}
      <dl className="case-details">
        {[['Problem', project.problem], ['My role', project.role], ['Process', project.process], ['Tools', project.tools?.join(', ')], ['Final result', project.result]].filter(([, detail]) => detail).map(([label, detail]) =>
          <div key={label}><dt>{label}</dt><dd>{detail}</dd></div>)}
      </dl>
    </article>}
  </dialog>
}

function Work() {
  const [project, setProject] = useState(null)
  const trigger = useRef(null)
  function closeProject() {
    setProject(null)
    requestAnimationFrame(() => trigger.current?.focus())
  }
  return <section className="section" id="work" aria-labelledby="work-title">
    <div className="section-heading">
      <h2 id="work-title">{data.sections.work[1]}</h2>
      <p>Travel montages, brand concepts, and promotional videos.</p>
    </div>
    <div className="project-grid">
      {data.projects.map(item => <article className="project" key={item.id}>
        <img className={item.coverStyle === 'logo' ? 'project-logo-cover' : undefined} src={asset(item.cover)} alt={item.imageAlt} loading="lazy" width="960" height="660" />
        <div className="project-copy">
          <p className="kicker">{item.category}{item.sample && ' / Sample'}</p>
          <h3>{item.title}</h3><p>{item.description}</p>
          {!item.media && <p className="project-placeholder-note">Illustrative project image</p>}
          <button type="button" className="project-link" aria-label={'View project ' + item.title} onClick={event => { trigger.current = event.currentTarget; setProject(item) }}>View project <Arrow diagonal /></button>
        </div>
      </article>)}
    </div>
    <ProjectDialog project={project} onClose={closeProject} />
  </section>
}

function Contact() {
  const [status, setStatus] = useState('')
  const [pending, setPending] = useState(false)
  const demo = !data.contact.endpoint
  async function submit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form))
    if (Object.values(payload).some(value => !value.trim())) {
      setStatus('Please fill in all fields.')
      return
    }
    if (demo) {
      setStatus('Demo validation passed. Message delivery is disabled.')
      return
    }
    setPending(true)
    setStatus('Sending…')
    try {
      const response = await fetch(data.contact.endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, value.trim()]))),
      })
      if (!response.ok) throw new Error('Delivery failed')
      form.reset()
      setStatus('Message sent.')
    } catch {
      setStatus('Message delivery failed. Please try again.')
    } finally {
      setPending(false)
    }
  }
  return <Section id="contact">
    <div className="contact-layout">
      <div className="contact-intro">
        <p>Tell me what you’re making, what you need, and when you’d like it ready.</p>
        {data.contact.profiles.length > 0 && (
          <ul className="socials">
            {data.contact.profiles.map(profile => <li key={profile.label}><a href={profile.url}>{profile.label} <Arrow diagonal /></a></li>)}
          </ul>
        )}
      </div>
      <form className="contact-form" onSubmit={submit}>
        {demo && <p className="demo" id="contact-demo">Preview form. Messages aren’t sent.</p>}
        <fieldset disabled={pending} aria-describedby={demo ? 'contact-demo' : undefined}>
          <div className="contact-fields">
            <div>
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={100} />
            </div>
            <div>
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} />
            </div>
          </div>
          <div>
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows={5} required maxLength={3000} />
          </div>
          <button className="button primary" type="submit">{demo ? 'Test form' : 'Send message'} <Arrow diagonal /></button>
        </fieldset>
        <p role="status" className="form-status">{status}</p>
      </form>
    </div>
  </Section>
}

function App() {
  const main = useRef(null)
  useEffect(() => attachScrollMotion(main.current), [])
  const person = data.identity
  return <>
    <CursorSmoke />
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main" ref={main} tabIndex={-1}>
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">{person.name}</h1>
          <p className="tagline">{person.tagline}</p>
          <div className="hero-actions">
            <a className="button primary" href="#work">View my work <Arrow diagonal /></a>
            <a className="hero-secondary" href="#about">About me <Arrow diagonal /></a>
          </div>
        </div>
        <div className="hero-portrait">
          <img src={asset(person.heroPortrait)} alt={person.heroPortraitAlt} width="1080" height="1440" fetchPriority="high" />
          <span className="hero-name" aria-hidden="true">{person.name}</span>
        </div>
        <p className="hero-title">{person.title}</p>
      </section>
      <nav className="feature-strip" aria-label="Portfolio highlights">
        <div className="shell">
          {[['work', 'Selected work', '↗'], ['skills', 'Skills & tools', '✦'], ['education', 'Credentials', '✓'], ['contact', 'Get in touch', '↗']].map(([id, label, icon]) =>
            <a key={id} href={'#' + id}><span aria-hidden="true">{icon}</span>{label}</a>)}
        </div>
      </nav>
      <div className="shell portfolio-sections">
      <Work />
      <Section id="about">
        <div className="about-layout">
          <img src={asset(person.portrait)} alt={person.portraitAlt} width="2048" height="1536" loading="lazy" />
          <div className="about-copy"><p>{person.bio}</p><p>{person.background}</p><a className="button outline" href={asset(person.cv)} download>Download CV <span aria-hidden="true">↓</span></a></div>
        </div>
      </Section>
      <Section id="skills"><div className="grid gap-4 md:grid-cols-3">
        {data.skills.map(group => <article className="panel" key={group.title}><h3>{group.title}</h3><ul className="tags">{group.items.map(item => <li key={item} title={group.marks ? item : undefined}>
          {group.marks?.[item] ? (
            <>
              <span className="tool-mark" data-tool={item} aria-hidden="true">
                {group.marks[item] === 'ribbon' ? null : group.marks[item]}
              </span>
              <span className="sr-only">{item}</span>
            </>
          ) : item}
        </li>)}</ul></article>)}
      </div></Section>
      <Section id="education"><ul className="credentials">
        {data.credentials.map(item => <li key={item.type + item.name}><span className="kicker">{item.type}</span><div><h3>{item.name}</h3><p>{item.issuer}</p></div><span>{item.date}</span></li>)}
      </ul></Section>
      <Section id="certifications">
        <ul className="certificate-grid">
          {data.certifications.map(certificate => (
            <li className="certificate-card" key={certificate.id}>
              <a className="certificate-photo" href={asset(certificate.file)} target="_blank" rel="noopener noreferrer" aria-label={'Open certificate: ' + certificate.title}>
                {certificate.photo ? (
                  <img src={asset(certificate.photo)} alt={certificate.photoAlt || certificate.title} loading="lazy" />
                ) : (
                  <span>Certificate photo placeholder</span>
                )}
              </a>
              <div className="certificate-details">
                <p className="certificate-kind">{certificate.kind}</p>
                <h3>{certificate.title}</h3>
                <p>{certificate.issuer}{certificate.date && ` · ${certificate.date}`}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
      {visibleSections.some(([id]) => id === 'recognition') && <Section id="recognition"><div className="grid gap-4 sm:grid-cols-2">
        {data.recognition.filter(group => group.enabled).map(group => <article className="panel" key={group.title}><h3>{group.title}</h3><ul className="recognition-list">{group.entries.map(entry => <li key={entry}>{entry}</li>)}</ul></article>)}
      </div></Section>}
      {data.services.enabled && <Section id="services"><div className="grid gap-4 md:grid-cols-3">
        {data.services.entries.map(item => <article className="panel" key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></article>)}
      </div></Section>}
      <Contact />
      </div>
    </main>
    <footer className="shell footer"><span>{person.name}</span><a href="#top">Back to top ↑</a></footer>
  </>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
