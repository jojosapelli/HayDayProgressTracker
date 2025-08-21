// Minimal shared utils for HayDay Progress Tracker (static rows version)
const HD = (() => {
  const KEY = "hayday-progress-v01";

  const formatPct = (x) => (isFinite(x) ? (x*100).toFixed(2) + "%" : "—");

  const loadAll = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch(e){ return {}; }
  };

  const saveAll = (obj) => localStorage.setItem(KEY, JSON.stringify(obj));

  return { formatPct, loadAll, saveAll };
})();
