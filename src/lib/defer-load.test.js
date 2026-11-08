import { describe, expect, test } from 'bun:test';
import { runAfterEngagement } from './defer-load';

function fakeWindow(readyState = 'loading') {
  const listeners = new Map();
  const timers = [];
  return {
    document: { readyState },
    addEventListener: (e, fn) => listeners.set(e, [...(listeners.get(e) || []), fn]),
    removeEventListener: (e, fn) => listeners.set(e, (listeners.get(e) || []).filter((f) => f !== fn)),
    setTimeout: (fn, ms) => { timers.push({ fn, ms }); return timers.length; },
    clearTimeout: (id) => { if (timers[id - 1]) timers[id - 1].fn = () => {}; },
    fire: (e) => (listeners.get(e) || []).slice().forEach((fn) => fn()),
    timers,
  };
}

describe('third-party scripts wait for the visitor', () => {
  test('nothing runs during initial page load', () => {
    const w = fakeWindow();
    let runs = 0;
    runAfterEngagement(() => runs++, 8000, w);
    expect(runs).toBe(0);
  });
  test('first scroll or tap runs it once', () => {
    const w = fakeWindow();
    let runs = 0;
    runAfterEngagement(() => runs++, 8000, w);
    w.fire('scroll');
    w.fire('pointerdown');
    expect(runs).toBe(1);
  });
  test('without interaction it runs after the fallback delay following page load', () => {
    const w = fakeWindow();
    let runs = 0;
    runAfterEngagement(() => runs++, 8000, w);
    expect(w.timers.length).toBe(0);
    w.fire('load');
    expect(w.timers[0].ms).toBe(8000);
    w.timers[0].fn();
    expect(runs).toBe(1);
  });
});
