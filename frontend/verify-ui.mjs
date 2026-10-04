// Browser checks using native Chrome DevTools Protocol. No npm dependencies.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve(import.meta.dirname, '..');
const targets = await (await fetch('http://127.0.0.1:9222/json')).json();
const socket = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
let counter = 0;
const pending = new Map();
const report = { desktop: [], mobile: [], interactions: [], api: [], errors: [] };
socket.onmessage = event => {
  const m = JSON.parse(event.data);
  if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(m.error) : p.resolve(m.result); }
  if (m.method === 'Runtime.exceptionThrown') report.errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  if (m.method === 'Network.responseReceived' && m.params.response.url.includes(':8000/')) report.api.push({ url: m.params.response.url, status: m.params.response.status });
};
const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++counter; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); });
const evaluate = async expression => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result.value; };
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function waitFor(expression, timeout = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeout) { if (await evaluate(expression).catch(() => false)) return; await delay(200); }
  throw new Error('Timed out: ' + expression);
}
async function navigate(route) {
  await send('Page.navigate', { url: 'http://127.0.0.1:3000' + route });
  const pathname = route.split('?')[0].replace(/\/$/, '') || '/';
  await waitFor(`(location.pathname.replace(/\\/$/, '') || '/') === ${JSON.stringify(pathname)} && document.readyState !== 'loading' && !!document.querySelector('main h1')`);
  await evaluate('document.fonts.ready.then(() => true)');
  await delay(1300);
}
async function capture(name, full = false) {
  if (full) {
    const height = await evaluate('document.documentElement.scrollHeight');
    for (let y = 0; y < height; y += 650) { await evaluate(`window.scrollTo(0,${y})`); await delay(180); }
    await delay(900);
  }
  await evaluate('window.scrollTo(0,0)');
  await delay(250);
  const m = await send('Page.getLayoutMetrics');
  const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full, ...(full ? { clip: { x: 0, y: 0, width: m.cssContentSize.width, height: m.cssContentSize.height, scale: 1 } } : {}) });
  await fs.writeFile(path.join(root, 'screenshots', name), Buffer.from(r.data, 'base64'));
}
const click = text => evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.includes(${JSON.stringify(text)})).click()`);
await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1040, deviceScaleFactor: 1, mobile: false });
const routes = [['/', '01_landing.png'], ['/dashboard?demo=1', '02_dashboard.png'], ['/voice', '03_voice_ai.png'], ['/agents', '04_agents.png'], ['/fraud', '05_fraud.png'], ['/insights?demo=1', '06_insights.png']];
try {
  for (const [route, filename] of routes) {
    await navigate(route);
    if (route === '/fraud') await waitFor('document.querySelector(".risk-badge strong")?.textContent === "HIGH"');
    const dimensions = await evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth,title:document.querySelector("h1").textContent,fonts:[document.fonts.check("500 16px Manrope"),document.fonts.check("400 14px Inter")]})');
    assert.ok(dimensions.scroll <= dimensions.width, 'Desktop overflow: ' + route);
    report.desktop.push({ route, ...dimensions }); await capture(filename);
    if (route === '/') await capture('01_landing_full.png', true);
    console.log('Captured', filename);
  }
  if (!process.argv.includes('--screenshots-only')) {
    for (const route of ['/profile', '/mitra', '/impact']) { await navigate(route); report.desktop.push({ route, loaded: true }); }
    await navigate('/voice');
    await evaluate('window.crypto.randomUUID = () => "arthopilot-required-demo-500"');
    await click('Understand my transaction'); await waitFor('document.querySelector(".transaction-preview")?.textContent.includes("500")');
    await click('Confirm & save'); await waitFor('document.body.textContent.includes("Transaction saved.")');
    report.interactions.push('Real /chat preview and idempotent save'); await capture('07_voice_saved.png');
    await navigate('/dashboard'); await click('গত সপ্তাহের');
    await waitFor('document.querySelector(".inline-answer") && !document.querySelector(".inline-answer").textContent.includes("looking at")');
    report.interactions.push('Dashboard question answered');
    await click('Demo preview');
    await evaluate('[...document.querySelectorAll(".transaction-filters button")].find(b=>b.textContent === "Expenses").click()');
    assert.equal(await evaluate('document.querySelectorAll(".transaction-row").length'), 1);
    await click('Add a transaction'); await waitFor('document.querySelector("dialog")?.open');
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await waitFor('document.querySelector("dialog")?.open === false'); report.interactions.push('Filters, demo toggle and keyboard modal dismissal');
    await navigate('/agents');
    for (let i = 0; i < 4; i++) { await evaluate(`document.querySelectorAll('.agent-node')[${i}].click()`); await click('Run with'); await waitFor('!!document.querySelector(".agent-result")'); }
    report.interactions.push('All four agents return actual API previews');
    await navigate('/fraud'); await waitFor('document.querySelector(".risk-badge strong")?.textContent === "HIGH"');
    await click('Safe example'); await waitFor('document.querySelector(".risk-badge strong")?.textContent === "LOW"'); report.interactions.push('Fraud HIGH and LOW API results');
    await navigate('/insights'); await waitFor('!document.body.textContent.includes("Looking at your recorded activity")');
    for (const label of ['Expenses', 'Growth', 'Sales']) await evaluate(`[...document.querySelectorAll('.main-analytics button')].find(b=>b.textContent === ${JSON.stringify(label)}).click()`);
    report.interactions.push('Live insights and three chart views');
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    for (const [route, filename] of [...routes, ['/profile','profile.png'], ['/mitra','mitra.png'], ['/impact','impact.png']]) {
      await navigate(route); const dimensions = await evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth})');
      assert.ok(dimensions.scroll <= 390, 'Mobile overflow ' + route + ': ' + dimensions.scroll);
      report.mobile.push({ route, ...dimensions }); await capture('mobile_' + filename);
    }
    await navigate('/dashboard'); await evaluate('document.querySelector("[aria-label=\\"Open navigation\\"]").click()');
    assert.equal(await evaluate('document.querySelector(".sidebar").classList.contains("open")'), true);
    await evaluate('[...document.querySelectorAll(".sidebar a")].find(a=>a.getAttribute("href").startsWith("/insights")).click()');
    await waitFor('location.pathname.includes("insights") && !document.querySelector(".sidebar").classList.contains("open")'); report.interactions.push('Mobile drawer navigation');
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }); await navigate('/voice');
    assert.ok(parseFloat(await evaluate('getComputedStyle(document.querySelector(".main-mic")).animationDuration')) < .001);
    report.interactions.push('Reduced motion respected'); assert.equal(report.errors.length, 0, report.errors.join('\n'));
    for (const endpoint of ['/chat','/fraud-check','/insights','/transactions']) assert.ok(report.api.some(r => r.url.includes(endpoint) && r.status === 200), endpoint);
    console.log('All responsive, interaction and API checks passed.');
  }
} finally { await fs.writeFile(path.join(root,'screenshots','ui-verification.json'),JSON.stringify(report,null,2)); socket.close(); }
