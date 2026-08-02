import React, { useState, useEffect, useRef } from 'react';
import { profile, education, skillGroups, projects } from '@/data/portfolio';

type HistoryItem = {
  type: 'input' | 'output';
  command?: string;
  content: React.ReactNode;
};

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'input', command: 'whoami', content: null },
    { type: 'output', content: 'alok-pal' },
    { type: 'input', command: 'cat role.txt', content: null },
    { type: 'output', content: 'Full-Stack Developer (MERN + DevOps)' },
    { type: 'input', command: 'cat focus.txt', content: null },
    { type: 'output', content: 'Backend · DevOps · Clean Architecture' },
    { type: 'input', command: 'ls ./principles', content: null },
    { type: 'output', content: 'ownership  test-it  ship-it  document-it' },
  ]);

  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>(['whoami', 'cat role.txt', 'cat focus.txt', 'ls ./principles']);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on history change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add to command history list
    const newCmdHistory = [...cmdHistory.filter((c) => c !== cmd), cmd];
    setCmdHistory(newCmdHistory);
    setHistoryIndex(-1);

    const commandLine: HistoryItem = {
      type: 'input',
      command: cmd,
      content: null,
    };

    const cmdLower = cmd.toLowerCase();
    let outputContent: React.ReactNode = null;

    if (cmdLower === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmdLower === 'help') {
      outputContent = (
        <div className="space-y-1 text-text-muted">
          <p className="text-text-main font-semibold">Available commands:</p>
          <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-0.5">
            <span className="text-accent font-medium">neofetch</span>
            <span>Display system info & ASCII art logo</span>
            <span className="text-accent font-medium">skills</span>
            <span>List skills by tech group</span>
            <span className="text-accent font-medium">projects</span>
            <span>View detailed projects list</span>
            <span className="text-accent font-medium">education</span>
            <span>Academic qualifications</span>
            <span className="text-accent font-medium">contact</span>
            <span>Get contact & social links</span>
            <span className="text-accent font-medium">whoami</span>
            <span>Print current logged-in developer</span>
            <span className="text-accent font-medium">role</span>
            <span>Current professional designations</span>
            <span className="text-accent font-medium">focus</span>
            <span>Core architectural principles</span>
            <span className="text-accent font-medium">principles</span>
            <span>Software engineering values</span>
            <span className="text-accent font-medium">clear</span>
            <span>Wipe terminal log buffer</span>
          </div>
        </div>
      );
    } else if (cmdLower === 'whoami') {
      outputContent = <div className="text-text-muted">{profile.name.toLowerCase().replace(' ', '-')}</div>;
    } else if (cmdLower === 'role') {
      outputContent = <div className="text-text-muted">{profile.roles.join(' · ')}</div>;
    } else if (cmdLower === 'focus') {
      outputContent = <div className="text-text-muted">Backend · DevOps · Clean Architecture · Scalability</div>;
    } else if (cmdLower === 'principles') {
      outputContent = (
        <div className="text-text-muted">
          <span className="text-accent font-semibold">ownership</span> (own design to deploy) ·{' '}
          <span className="text-accent-2 font-semibold">test-it</span> (automated validations) ·{' '}
          <span className="text-accent-3 font-semibold">ship-it</span> (CI/CD pipeline shipping) ·{' '}
          <span className="text-text-main font-semibold">document-it</span> (clean API contracts)
        </div>
      );
    } else if (cmdLower === 'education') {
      outputContent = (
        <div className="space-y-1 text-text-muted">
          <p className="text-text-main font-semibold">{education.degree}</p>
          <p>{education.school} ({education.period})</p>
          <p>
            GPA: <span className="text-accent font-bold">{education.cgpa} / 10</span> ·{' '}
            <span className="text-text-dim">{education.detail}</span>
          </p>
        </div>
      );
    } else if (cmdLower === 'contact') {
      outputContent = (
        <div className="space-y-0.5 text-text-muted">
          <p>Email:    <a href={`mailto:${profile.email}`} className="text-accent hover:underline">{profile.email}</a></p>
          <p>Phone:    <a href={`tel:${profile.phoneHref}`} className="text-accent-2 hover:underline">{profile.phone}</a></p>
          <p>GitHub:   <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-accent-3 hover:underline">github.com/{profile.githubHandle}</a></p>
          <p>LinkedIn: <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">linkedin.com/in/{profile.linkedinHandle}</a></p>
          <p>Location: {profile.location}</p>
        </div>
      );
    } else if (cmdLower === 'skills') {
      outputContent = (
        <div className="space-y-1.5 py-0.5">
          {skillGroups.map((g) => (
            <div key={g.title} className="grid grid-cols-[100px_1fr] gap-x-4">
              <span className="text-accent font-semibold">{g.title}:</span>
              <span className="text-text-muted">{g.items.join(', ')}</span>
            </div>
          ))}
        </div>
      );
    } else if (cmdLower === 'projects') {
      outputContent = (
        <div className="space-y-3 py-1">
          {projects.map((p, idx) => (
            <div key={p.id} className="border-l-2 border-accent/40 pl-3">
              <h4 className="font-semibold text-text-main">
                {idx + 1}. {p.name} <span className="text-xs font-normal text-text-dim">({p.tagline})</span>
              </h4>
              <p className="text-xs text-text-muted mt-0.5">Stack: {p.stack.join(', ')}</p>
              {p.live && (
                <p className="text-xs">
                  URL: <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{p.liveLabel}</a>
                </p>
              )}
            </div>
          ))}
        </div>
      );
    } else if (cmdLower === 'neofetch') {
      outputContent = (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 font-mono text-xs leading-relaxed py-1">
          <pre className="text-accent shrink-0 font-bold leading-[1.1] select-none">
{`   _   ___  
  /_\\ | _ \\ 
 / _ \\|  _/ 
/_/ \\_\\_|   `}
          </pre>
          <div className="text-text-muted space-y-0.5 min-w-0">
            <p className="text-accent font-bold">alok@portfolio.dev</p>
            <p className="text-text-dim">------------------</p>
            <p><span className="text-accent-2">OS:</span> Docker Linux (Alpine Base)</p>
            <p><span className="text-accent-2">Host:</span> alok-pal.dev (React+Vite)</p>
            <p><span className="text-accent-2">Kernel:</span> MERN-Engine-v1.0.0</p>
            <p><span className="text-accent-2">Uptime:</span> 247 days, 12 hours</p>
            <p><span className="text-accent-2">Shell:</span> react-ts-sh</p>
            <p><span className="text-accent-2">RAM:</span> 8.24 GB / 16.00 GB (51%)</p>
            <p><span className="text-accent-2">Projects:</span> MERN FuzzTube & OpenCV Traffic System</p>
            <p><span className="text-accent-2">Education:</span> B.Tech CSE @ JSS University Noida</p>
          </div>
        </div>
      );
    } else {
      outputContent = (
        <div className="text-red-400">
          command not found: {cmd}. Type <span className="text-text-main font-semibold">help</span> to view all commands.
        </div>
      );
    }

    setHistory((prev) => [...prev, commandLine, { type: 'output', content: outputContent }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < cmdHistory.length) {
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      onClick={focusInput}
      className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl shadow-black/30 cursor-text"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
        <span className="ml-3 font-mono text-xs text-text-dim">alok@portfolio: ~/about</span>
        <span className="ml-auto text-[10px] text-text-dim font-mono hidden sm:inline-block">Type 'help' for options</span>
      </div>
      <div 
        ref={containerRef}
        className="h-80 overflow-y-auto p-5 font-mono text-[13px] leading-relaxed space-y-2.5 custom-scrollbar"
      >
        <div className="text-text-dim text-[11px] pb-1 border-b border-white/5 flex justify-between items-center">
          <span>Logged in as alok-pal on port 3000</span>
          <span>Session: active</span>
        </div>
        
        {history.map((item, idx) => {
          if (item.type === 'input') {
            return (
              <div key={idx} className="flex items-center">
                <span className="text-accent shrink-0">alok@portfolio</span>
                <span className="text-text-muted shrink-0">:</span>
                <span className="text-accent-2 shrink-0">~/about</span>
                <span className="text-text-muted shrink-0">$</span>
                <span className="text-text-main ml-2 font-medium break-all">{item.command}</span>
              </div>
            );
          } else {
            return <div key={idx} className="pl-2">{item.content}</div>;
          }
        })}

        <div className="flex items-center">
          <span className="text-accent shrink-0">alok@portfolio</span>
          <span className="text-text-muted shrink-0">:</span>
          <span className="text-accent-2 shrink-0">~/about</span>
          <span className="text-text-muted shrink-0">$</span>
          <div className="relative flex-1 ml-2 min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-text-main focus:outline-none font-mono caret-accent"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
