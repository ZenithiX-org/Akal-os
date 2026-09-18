'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

interface Line {
  type: 'input' | 'output';
  text: string;
}

const PROMPT_COLOR = '#33d17a';

const TerminalApp: React.FC = () => {
  const { darkMode, openWindow } = useOSStore();
  void darkMode;
  const t = useT();
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: t.terminal.lastLogin + new Date().toLocaleString() },
    { type: 'output', text: t.terminal.welcome },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [lines]);

  const addLine = (type: 'input' | 'output', text: string) => {
    setLines((prev) => [...prev, { type, text }]);
  };

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    addLine('input', `${t.terminal.prompt} ${trimmed}`);
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const [command, ...args] = trimmed.split(/\s+/);

    switch (command) {
      case 'help':
        addLine('output', t.terminal.available);
        Object.entries(t.terminal.commands).forEach(([cmd, desc]) => {
          addLine('output', `  ${cmd.padEnd(10)} - ${desc}`);
        });
        break;
      case 'ls':
        addLine('output', 'Desktop   Documents   Downloads   Movies   Music   Pictures   Public');
        break;
      case 'pwd':
        addLine('output', '/Users/akal');
        break;
      case 'whoami':
        addLine('output', t.terminal.user);
        break;
      case 'date':
        addLine('output', new Date().toString());
        break;
      case 'echo':
        addLine('output', args.join(' '));
        break;
      case 'clear':
        setLines([]);
        break;
      case 'open': {
        const app = args[0];
        const sizes: Record<string, [number, number]> = {
          finder: [900, 580], safari: [1100, 700], calculator: [320, 520],
          notes: [750, 580], settings: [820, 600], calendar: [900, 640],
          music: [950, 640], messages: [820, 580], terminal: [750, 480],
        };
        const titles: Record<string, string> = {
          finder: t.appName.finder, safari: t.appName.safari, calculator: t.appName.calculator, notes: t.appName.notes,
          settings: t.appName.settings, calendar: t.appName.calendar, music: t.appName.music, messages: t.appName.messages,
        };
        if (app && sizes[app]) {
          openWindow(app, titles[app], sizes[app][0], sizes[app][1]);
          addLine('output', `${titles[app]}...`);
        } else {
          addLine('output', `open: ${app || ''} - finder, safari, calculator, notes, settings, calendar, music, messages, terminal`);
        }
        break;
      }
      case 'neofetch':
        addLine('output', '                    akal@akal-os');
        addLine('output', '                    -----------');
        addLine('output', '         /\\         OS: Akal OS 1.0');
        addLine('output', '        /  \\        Kernel: 1.0.0-web');
        addLine('output', '       / /\\ \\       Shell: akal-sh');
        addLine('output', '      / ____ \\      DE: Glass');
        addLine('output', '     /_/    \\_\\     Terminal: akal-term');
        addLine('output', '                    CPU: WebKit Virtual');
        addLine('output', '                    Memory: ∞');
        addLine('output', '                    Location: ਪੰਜਾਬ, ਭਾਰਤ');
        addLine('output', '                    Uptime: just now');
        break;
      case 'about':
        addLine('output', 'Akal OS 1.0 - ਬਰਾਊਜ਼ਰ-ਅਧਾਰਿਤ ਓਪਰੇਟਿੰਗ ਸਿਸਟਮ');
        addLine('output', 'Built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion');
        addLine('output', '© 2024 Akal OS. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।');
        break;
      case 'sudo':
        addLine('output', t.terminal.sudoers);
        break;
      default:
        addLine('output', `${t.terminal.notFound} ${command}. "${t.terminal.help}" ${t.terminal.available.toLowerCase()}.`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div
      className="glass-surface h-full flex flex-col p-3 font-mono text-sm overflow-y-auto"
      style={{
        background: 'rgba(8, 8, 14, 0.7)',
        color: 'rgba(232, 232, 232, 0.85)',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        borderRadius: 0,
        caretColor: PROMPT_COLOR,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className="whitespace-pre-wrap break-all leading-relaxed"
          style={{
            color: line.type === 'input' ? PROMPT_COLOR : 'rgba(232, 232, 232, 0.7)',
          }}
        >
          {line.text}
        </div>
      ))}
      <div className="flex items-center">
        <span style={{ color: PROMPT_COLOR }}>{t.terminal.prompt} </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none ml-1"
          style={{ color: '#ffffff', caretColor: PROMPT_COLOR }}
          autoFocus
          spellCheck={false}
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default TerminalApp;
