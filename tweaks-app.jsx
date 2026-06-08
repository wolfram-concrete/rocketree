/* Rocketree — Tweaks panel app (mounts the host-wired panel only) */
const RT_DEFAULTS = /*EDITMODE-BEGIN*/{
  "fontPair": "warm",
  "journey": "timeline",
  "surface": "soft"
}/*EDITMODE-END*/;

const FONT_MAP = { warm: 'font-warm', editorial: 'font-editorial', klar: 'font-klar' };
const SURFACE_MAP = { soft: 'surface-soft', crisp: 'surface-crisp' };

function RocketreeTweaks() {
  const [t, setTweak] = useTweaks(RT_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    Object.values(FONT_MAP).forEach(c => root.classList.remove(c));
    root.classList.add(FONT_MAP[t.fontPair] || 'font-warm');
  }, [t.fontPair]);

  React.useEffect(() => {
    const root = document.documentElement;
    Object.values(SURFACE_MAP).forEach(c => root.classList.remove(c));
    root.classList.add(SURFACE_MAP[t.surface] || 'surface-soft');
  }, [t.surface]);

  React.useEffect(() => {
    const sec = document.getElementById('ablauf');
    if (!sec) return;
    sec.setAttribute('data-mode', t.journey || 'timeline');
    if (typeof window.RocketreeReplayJourney === 'function') {
      requestAnimationFrame(() => window.RocketreeReplayJourney());
    }
  }, [t.journey]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Typografie" />
      <TweakRadio
        label="Schrift-Paarung"
        value={t.fontPair}
        options={[{ value: 'warm', label: 'Warm' }, { value: 'editorial', label: 'Editorial' }, { value: 'klar', label: 'Klar' }]}
        onChange={(v) => setTweak('fontPair', v)}
      />
      <TweakSection label="90-Tage-Journey" />
      <TweakRadio
        label="Darstellung"
        value={t.journey}
        options={[{ value: 'timeline', label: 'Timeline' }, { value: 'cards', label: 'Karten' }, { value: 'progress', label: 'Balken' }]}
        onChange={(v) => setTweak('journey', v)}
      />
      <TweakSection label="Flächenstil" />
      <TweakRadio
        label="Ecken & Schatten"
        value={t.surface}
        options={[{ value: 'soft', label: 'Weich' }, { value: 'crisp', label: 'Klar' }]}
        onChange={(v) => setTweak('surface', v)}
      />
    </TweaksPanel>
  );
}

(function mount() {
  const el = document.createElement('div');
  el.id = 'rt-tweaks-root';
  document.body.appendChild(el);
  ReactDOM.createRoot(el).render(<RocketreeTweaks />);
})();
