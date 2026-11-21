import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const bootLines = [
  '[  OK  ] Initializing Naresh OS...',
  '[  OK  ] Loading backend modules...',
  '[  OK  ] Mounting project workspace...',
  '[  OK  ] Establishing secure session...',
];

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { onComplete(); return; }
    const timers = bootLines.map((_, index) => window.setTimeout(() => setVisible(index + 1), 230 * (index + 1)));
    const done = window.setTimeout(onComplete, 1450);
    return () => { timers.forEach(window.clearTimeout); window.clearTimeout(done); };
  }, [onComplete]);

  return (
    <motion.div className="boot-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
      <div className="boot-mark">N<span>_</span>OS</div>
      <div className="boot-log">{bootLines.slice(0, visible).map(item => <div key={item}>{item}</div>)}</div>
      <div className="boot-progress"><motion.span initial={{ width: '0%' }} animate={{ width: `${visible * 25}%` }} /></div>
      <div className="boot-caption">PERSONAL WORKSPACE // VERSION 1.0.0</div>
    </motion.div>
  );
}
