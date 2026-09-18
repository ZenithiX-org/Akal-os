'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore } from '@/lib/os-store';

const ACCENT = '#d70a53';
const ACCENT_SOFT = 'rgba(215, 10, 83, 0.25)';

const CalculatorApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [operator, setOperator] = useState('');
  const [prevValue, setPrevValue] = useState('');
  const [newInput, setNewInput] = useState(true);
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    if (newInput) { setDisplay(num); setNewInput(false); }
    else { setDisplay((prev) => (prev === '0' ? num : prev.length < 15 ? prev + num : prev)); }
  };

  const handleDecimal = () => {
    if (newInput) { setDisplay('0.'); setNewInput(false); return; }
    if (!display.includes('.')) setDisplay((prev) => prev + '.');
  };

  const handleOperator = (op: string) => {
    setPrevValue(display);
    setOperator(op);
    setEquation(`${display} ${op}`);
    setNewInput(true);
  };

  const calculate = () => {
    if (!operator || !prevValue) return;
    const prev = parseFloat(prevValue);
    const current = parseFloat(display);
    let result = 0;
    switch (operator) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '×': result = prev * current; break;
      case '÷': result = current === 0 ? 0 : prev / current; break;
      case '%': result = prev % current; break;
    }
    const resultStr = parseFloat(result.toFixed(10)).toString();
    setHistory((prev) => [`${prevValue} ${operator} ${current} = ${resultStr}`, ...prev.slice(0, 9)]);
    setDisplay(resultStr);
    setEquation('');
    setOperator('');
    setPrevValue('');
    setNewInput(true);
  };

  const clear = () => { setDisplay('0'); setEquation(''); setOperator(''); setPrevValue(''); setNewInput(true); };
  const toggleSign = () => setDisplay((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
  const percent = () => setDisplay((prev) => (parseFloat(prev) / 100).toString());

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
      else if (e.key === '+') handleOperator('+');
      else if (e.key === '-') handleOperator('-');
      else if (e.key === '*') handleOperator('×');
      else if (e.key === '/') { e.preventDefault(); handleOperator('÷'); }
      else if (e.key === 'Enter' || e.key === '=') calculate();
      else if (e.key === 'Escape') clear();
      else if (e.key === '.') handleDecimal();
      else if (e.key === 'Backspace') setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const buttons = [
    [{ label: 'AC', action: clear, style: 'func' }, { label: '+/-', action: toggleSign, style: 'func' }, { label: '%', action: percent, style: 'func' }, { label: '÷', action: () => handleOperator('÷'), style: 'op' }],
    [{ label: '7', action: () => handleNumber('7'), style: 'num' }, { label: '8', action: () => handleNumber('8'), style: 'num' }, { label: '9', action: () => handleNumber('9'), style: 'num' }, { label: '×', action: () => handleOperator('×'), style: 'op' }],
    [{ label: '4', action: () => handleNumber('4'), style: 'num' }, { label: '5', action: () => handleNumber('5'), style: 'num' }, { label: '6', action: () => handleNumber('6'), style: 'num' }, { label: '-', action: () => handleOperator('-'), style: 'op' }],
    [{ label: '1', action: () => handleNumber('1'), style: 'num' }, { label: '2', action: () => handleNumber('2'), style: 'num' }, { label: '3', action: () => handleNumber('3'), style: 'num' }, { label: '+', action: () => handleOperator('+'), style: 'op' }],
    [{ label: '0', action: () => handleNumber('0'), style: 'zero' }, { label: '.', action: handleDecimal, style: 'num' }, { label: '=', action: calculate, style: 'op' }],
  ];

  const getButtonClass = (style: string) => {
    const base = 'glass-card flex items-center justify-center font-medium text-xl cursor-pointer select-none !rounded-2xl !transition-all active:scale-95';
    if (style === 'op') return `${base} !text-white`;
    if (style === 'func') return `${base} !text-white/90`;
    if (style === 'zero') return `${base} !text-white col-span-2 justify-start pl-7`;
    return `${base} !text-white`;
  };

  const getButtonStyle = (style: string, label: string): React.CSSProperties => {
    if (style === 'op') {
      const isActive = operator === label;
      return {
        background: isActive ? '#fff' : ACCENT,
        color: isActive ? ACCENT : '#fff',
        borderColor: isActive ? '#fff' : ACCENT,
        boxShadow: isActive ? `0 0 16px ${ACCENT}66` : `0 4px 16px ${ACCENT}44`,
      };
    }
    if (style === 'func') {
      return {
        background: 'rgba(255,255,255,0.08)',
        borderColor: 'rgba(255,255,255,0.1)',
      };
    }
    if (style === 'zero') {
      return {
        background: 'rgba(255,255,255,0.08)',
        borderColor: 'rgba(255,255,255,0.1)',
      };
    }
    return {
      background: 'var(--glass-bg-dark-2)',
      borderColor: 'var(--glass-border-dark)',
    };
  };

  return (
    <div className="glass-surface h-full flex" style={{ borderRadius: 0 }}>
      <div className="flex-1 flex flex-col">
        {/* Display */}
        <div className="glass-card mx-3 mt-3 flex flex-col items-end justify-end px-5 py-4" style={{ minHeight: '120px', background: 'rgba(0,0,0,0.35)' }}>
          <div className="text-sm min-h-5" style={{ color: 'rgba(255,255,255,0.4)' }}>{equation}</div>
          <div className="font-light mt-1 transition-all text-white" style={{ fontSize: display.length > 10 ? '32px' : display.length > 7 ? '40px' : '52px' }}>
            {parseFloat(display) > 1e15 ? parseFloat(display).toExponential(5) : display}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex-1 p-3 grid gap-2" style={{ gridTemplateRows: 'repeat(5, 1fr)' }}>
          {buttons.map((row, ri) => (
            <div key={ri} className="grid gap-2" style={{ gridTemplateColumns: row.some((b) => b.style === 'zero') ? '2fr 1fr 1fr' : 'repeat(4, 1fr)' }}>
              {row.map((btn, bi) => (
                <button key={bi} onClick={btn.action} className={getButtonClass(btn.style)} style={getButtonStyle(btn.style, btn.label)}>
                  {btn.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      {history.length > 0 && (
        <div className="glass-card w-36 flex flex-col !rounded-none !my-0 !mx-0" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', borderRadius: 0 }}>
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.55)' }}>History</div>
          <div className="flex-1 overflow-y-auto">
            {history.map((h, i) => (
              <div key={i} className="px-3 py-2 text-xs" style={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</div>
            ))}
          </div>
          <button
            onClick={() => setHistory([])}
            className="glass-btn !rounded-none mx-2 mb-2 !py-1.5 text-xs"
            style={{ background: ACCENT_SOFT, borderColor: ACCENT }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default CalculatorApp;
