// HayDay Progress Tracker shared JS
const HD = (() => {
  const KEY = "hayday-progress-v01";

  const parseCell = (v) => {
    if (v === undefined || v === null) return null;
    if (typeof v === "number") return v;
    const s = String(v).trim();
    if (s === "") return null;
    // fraction "a/b"
    if (s.includes("/")) {
      const [a,b] = s.split("/").map(x => parseFloat(x.replace(',', '.')));
      if (!isNaN(a) && !isNaN(b) && b !== 0) return Math.max(0, Math.min(1, a / b));
      return null;
    }
    const n = parseFloat(s.replace(',', '.'));
    if (!isNaN(n)) return n;
    return null;
  };

  const calcRowProgress = (row) => {
    // row: { name, l1, l2, l3 }
    const vals = [row.l1, row.l2, row.l3].map(parseCell).filter(v => v !== null);
    if (!vals.length) return 0;
    const sum = vals.reduce((a,b) => a + Math.max(0, Math.min(1, b)), 0);
    return sum / vals.length;
  };

  const calcSectionProgress = (rows) => {
    if (!rows || !rows.length) return 0;
    const vals = rows.map(calcRowProgress);
    const sum = vals.reduce((a,b) => a + b, 0);
    return sum / vals.length;
  };

  const formatPct = (x) => (isFinite(x) ? (x*100).toFixed(2) + "%" : "—");

  const loadAll = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch(e){ return {}; }
  };
  const saveAll = (obj) => localStorage.setItem(KEY, JSON.stringify(obj));

  const sampleProduction = () => ([
    { name: "Lure Workbench", l1: "1", l2: "1", l3: "1" },
    { name: "Net Maker", l1: "1", l2: "1", l3: "1" },
    { name: "Lobster Pool x3", l1: "1", l2: "1", l3: "1" },
    { name: "Duck Saloon x3", l1: "1", l2: "1", l3: "1" }
  ]);

  return { parseCell, calcRowProgress, calcSectionProgress, formatPct, loadAll, saveAll, sampleProduction };
})();
