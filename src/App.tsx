import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Github, Mail, MapPin, Phone, Terminal as TerminalIcon } from 'lucide-react';
import { BootScreen } from './components/BootScreen';
import { Terminal } from './components/Terminal';
import { profile } from './data/profile';

export default function App() {
  const [booted, setBooted] = useState(false);
  const finishBoot = useCallback(() => setBooted(true), []);

  return (
    <main className="app-shell">
      <AnimatePresence>{!booted && <BootScreen onComplete={finishBoot} />}</AnimatePresence>
      <motion.div className="site-content" initial={{ opacity: 0, y: 12 }} animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: 0.55 }}>
        <header className="topbar">
          <a className="brand" href="#top" aria-label="Naresh home"><span className="brand-symbol">N<span>_</span></span><span>NAResh<span className="brand-muted">.dev</span></span></a>
          <div className="topbar-center"><span className="status-pulse" /> PERSONAL PORTFOLIO <span className="topbar-separator"></span></div>
          <a className="topbar-github" href={profile.github} target="_blank" rel="noreferrer"><Github size={15} /> <span>GITHUB</span><ArrowUpRight size={13} /></a>
        </header>

        <section className="hero-intro" id="top">
          <div className="hero-kicker"><span className="kicker-line" /> SENIOR SOFTWARE ENGINEER · PYTHON BACKEND <span className="kicker-index">[ PORTFOLIO ]</span></div>
          <div className="hero-grid">
            <div className="hero-identity">
              <h2>{profile.name.split(' ')[0]}<br /><span>{profile.name.split(' ').slice(1).join(' ')}</span></h2>
              <p className="hero-role">{profile.title}</p>
              <div className="hero-contact-links">
                <a href={`mailto:${profile.email}`}><Mail size={14} /> {profile.email}</a>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`}><Phone size={14} /> {profile.phone}</a>
              </div>
            </div>
            <div className="hero-aside"><p>{profile.summary}</p><div className="hero-location"><MapPin size={14} /> {profile.location} <span>·</span> {profile.experience} experience</div></div>
          </div>
        </section>

        <Terminal />

        <section className="below-terminal">
          <div className="section-label"><span>01 / HOW TO EXPLORE</span><span>BUILT FOR EVERY VISITOR</span></div>
          <div className="explore-grid">
            <div><TerminalIcon size={18} /><h3>Prefer simple navigation?</h3><p>Use the highlighted buttons above the terminal to browse my profile, work history, projects and contact details. No coding knowledge needed.</p></div>
            <div><Cpu size={18} /><h3>Want the technical details?</h3><p>Open a project to see the problem, what I worked on, the technologies involved and the engineering decisions behind it.</p></div>
            <div><Github size={18} /><h3>Want to explore further?</h3><p>Visit my GitHub or download my resume. The terminal is an optional interactive way to explore this portfolio.</p></div>
          </div>
        </section>

        <footer className="site-footer"><span>© {new Date().getFullYear()} VAIRAVA NARESH</span><span>BUILT WITH PYTHON-LEVEL PRECISION <b>✳</b></span><a href={`mailto:${profile.email}`}>LET'S CONNECT <ArrowUpRight size={12} /></a></footer>
      </motion.div>
    </main>
  );
}
