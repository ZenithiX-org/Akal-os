'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore } from '@/lib/os-store';

const CalculatorApp: React.FC = () => {
  const { darkMode } = useOSStore();
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

  const getButtonStyle = (style: string, label: string) => {
    const base = 'flex items-center justify-center rounded-full font-medium transition-all active:scale-95 cursor-pointer select-none';
    if (style === 'op' || label === '=') return `${base} text-white text-2xl` + (operator === label ? ' bg-white text-orange-500' : ' bg-orange-500 hover:bg-orange-400');
    if (style === 'func') return `${base} text-black text-xl bg-gray-400 hover:bg-gray-300`;
    if (style === 'zero') return `${base} text-white text-xl col-span-2 justify-start pl-7 bg-gray-700 hover:bg-gray-600`;
    return `${base} text-white text-xl bg-gray-700 hover:bg-gray-600`;
  };

  return (
    <div className="h-full flex" style={{ background: '#1c1c1e', color: 'white' }}>
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col items-end justify-end px-5 py-4" style={{ minHeight: '140px', background: 'rgba(0,0,0,0.3)' }}>
          <div className="text-sm opacity-50 min-h-5">{equation}</div>
          <div className="font-light mt-1 transition-all" style={{ fontSize: display.length > 10 ? '32px' : display.length > 7 ? '40px' : '52px' }}>
            {parseFloat(display) > 1e15 ? parseFloat(display).toExponential(5) : display}
          </div>
        </div>
        <div className="flex-1 p-3 grid gap-2" style={{ gridTemplateRows: 'repeat(5, 1fr)' }}>
          {buttons.map((row, ri) => (
            <div key={ri} className="grid gap-2" style={{ gridTemplateColumns: row.some((b) => b.style === 'zero') ? '2fr 1fr 1fr' : 'repeat(4, 1fr)' }}>
              {row.map((btn, bi) => (
                <button key={bi} onClick={btn.action} className={getButtonStyle(btn.style, btn.label)}>
                  {btn.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      {history.length > 0 && (
        <div className="w-36 flex flex-col" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="px-3 py-2 text-xs font-semibold opacity-50">HISTORY</div>
          <div className="flex-1 overflow-y-auto">
            {history.map((h, i) => (
              <div key={i} className="px-3 py-2 text-xs opacity-70 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>{h}</div>
            ))}
          </div>
          <button onClick={() => setHistory([])} className="px-3 py-2 text-xs text-blue-400 hover:text-blue-300">Clear</button>
        </div>
      )}
    </div>
  );
};

export default CalculatorApp;
