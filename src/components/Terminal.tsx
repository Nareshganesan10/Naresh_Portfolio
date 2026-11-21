
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';

import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Terminal as TerminalIcon,
  Download,
  UserRound,
  BriefcaseBusiness,
  FolderGit2,
  Wrench,
  MessageCircle,
} from 'lucide-react';

import { runCommand } from '../commands/registry';
import { profile } from '../data/profile';
import type { OutputBlock } from '../types/terminal';

type Entry = {
  id: number;
  command?: string;
  output: OutputBlock[];
};

const quickAccess = [
  { label: 'About me', command: 'about', icon: UserRound },
  { label: 'Experience', command: 'experience', icon: BriefcaseBusiness },
  { label: 'Projects', command: 'projects', icon: FolderGit2 },
  { label: 'Skills', command: 'skills', icon: Wrench },
  { label: 'Contact', command: 'contact', icon: MessageCircle },
  { label: 'Resume PDF', command: 'resume', icon: Download, featured: true },
];

const suggestions = [
  ...quickAccess.map(item => item.command),
  'help',
  'neofetch',
];

function Output({ blocks }: { blocks: OutputBlock[] }) {
  return (
    <div className="output-block">
      {blocks.map((block, index) => (
        <div
          className={`output-line ${block.kind}`}
          key={`${index}-${String(block.content)}`}
        >
          {block.content || '\u00a0'}
        </div>
      ))}
    </div>
  );
}

export function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: 1,
      output: [
        { kind: 'success', content: 'NAResh_OS [Version 1.0.0]' },
        {
          kind: 'muted',
          content: 'This is an interactive way to explore Naresh’s work.',
        },
        {
          kind: 'muted',
          content: 'You can use the navigation buttons above — typing commands is optional.',
        },
        {
          kind: 'muted',
          content: '────────────────────────────────────────────────────────',
        },
      ],
    },
  ]);

  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(2);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [entries]);

  const execute = useCallback((raw: string) => {
    const trimmed = raw.trim();

    if (!trimmed) return;

    const result = runCommand(trimmed);

    if (result.action === 'clear') {
      setEntries([]);
      setValue('');
      return;
    }

    setEntries(current => [
      ...current,
      {
        id: idRef.current++,
        command: trimmed,
        output: result.output,
      },
    ]);

    setHistory(current => [...current, trimmed].slice(-60));
    setHistoryIndex(-1);
    setValue('');

    if (result.action === 'resume') {
      window.open(
        `${import.meta.env.BASE_URL}resume.pdf`,
        '_blank',
        'noopener,noreferrer',
      );
    }
  }, []);

  // Scroll to terminal before executing a quick-access command.
  const handleQuickAccess = useCallback(
    (command: string) => {
      document.getElementById('terminal-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      execute(command);
    },
    [execute],
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    execute(value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();

      const next =
        historyIndex < 0
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(next);
      setValue(history[next] ?? '');
    }

    if (event.key === 'ArrowDown' && historyIndex >= 0) {
      event.preventDefault();

      const next = historyIndex + 1;

      setHistoryIndex(next >= history.length ? -1 : next);
      setValue(next >= history.length ? '' : history[next] ?? '');
    }

    if (event.key === 'Tab') {
      const match = suggestions.find(command =>
        command.startsWith(value.toLowerCase()),
      );

      if (match) {
        event.preventDefault();
        setValue(match);
      }
    }
  };

  return (
    <>
      <nav
        className="quick-access-panel"
        aria-label="Portfolio quick navigation"
      >
        <div className="quick-access-heading">
          <div>
            <span className="quick-access-eyebrow">START HERE</span>
            <h2>Explore Naresh's portfolio</h2>
            <p>Choose a section. No coding knowledge required.</p>
          </div>

          <span className="quick-access-hint">
            QUICK ACCESS <span>↘</span>
          </span>
        </div>

        <div className="quick-access-buttons">
          {quickAccess.map(({ label, command, icon: Icon, featured }) => (
            <button
              className={
                featured
                  ? 'quick-access-button featured'
                  : 'quick-access-button'
              }
              key={command}
              type="button"
              onClick={() => handleQuickAccess(command)}
            >
              <Icon size={16} />
              <span>{label}</span>
              <ArrowUpRight
                size={13}
                className="quick-access-arrow"
              />
            </button>
          ))}
        </div>
      </nav>

      <section
        id="terminal-section"
        className="terminal-window"
        aria-label="Interactive portfolio terminal"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="terminal-titlebar">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>

          <div className="window-title">
            <TerminalIcon size={13} />
            <span>naresh@portfolio: ~</span>
          </div>
        </div>

        <div className="terminal-meta">
          <span>zsh</span>
          <span>UTF-8</span>
          <span>100 × 32</span>
        </div>

        <div className="terminal-scroll" ref={scrollRef}>
          <div className="welcome-block">
            <pre className="ascii-logo">
              {String.raw` _   _    _    ____  _____ ____  _   _`}{'\n'}
              {String.raw`| \ | |  / \  |  _ \| ____|/ ___|| | | |`}{'\n'}
              {String.raw`|  \| | / _ \ | |_) |  _|  \___ \| |_| |`}{'\n'}
              {String.raw`| |\  |/ ___ \|  _ <| |___  ___) |  _  |`}{'\n'}
              {String.raw`|_| \_/_/   \_\_| \_\_____| |____/|_| |_|`}
            </pre>

            <div className="welcome-copy">
              <span className="eyebrow">YOUR GUIDE TO MY WORK</span>
              <h1>
                Explore my <em>engineering</em>
                <br />
                journey.
              </h1>
              <p>
                Choose a section above, or type <strong>help</strong> to
                explore the terminal.
              </p>
            </div>
          </div>

          <div className="terminal-divider">
            <span />
            SESSION STARTED
            <span />
          </div>

          {entries.map(entry => (
            <div className="entry" key={entry.id}>
              {entry.command && (
                <div className="command-line">
                  <span className="prompt">
                    naresh<span>@</span>portfolio <b>~</b> $
                  </span>
                  <span>{entry.command}</span>
                </div>
              )}

              <Output blocks={entry.output} />
            </div>
          ))}

          <form className="command-form" onSubmit={onSubmit}>
            <label className="prompt" htmlFor="terminal-input">
              naresh<span>@</span>portfolio <b>~</b> $
            </label>

            <div className="input-wrapper">
              <input
                ref={inputRef}
                id="terminal-input"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                value={value}
                onChange={event => setValue(event.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Enter terminal command"
                placeholder="type a command..."
              />

              <span className="cursor-block" />
            </div>
          </form>
        </div>

        <div className="terminal-footer">
          <span>
            <i className="live-dot" /> SHELL READY
          </span>
          <span>↑ ↓ HISTORY</span>
          <span>TAB AUTOCOMPLETE</span>
        </div>

        <div className="terminal-bottom-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={15} /> GitHub <ArrowUpRight size={12} />
          </a>

          <a href={`mailto:${profile.email}`}>
            <Mail size={15} /> Email <ArrowUpRight size={12} />
          </a>

          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            <Download size={15} /> Resume <ArrowUpRight size={12} />
          </a>

          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={15} /> LinkedIn <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </section>
    </>
  );
}
