/** Pure logic for the browser-based practice exam. No accounts, network calls or browser storage. */
export function shuffle(values, random = Math.random) {
  const a = [...values];
  for (let i = a.length - 1; i > 0; --i) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export function validQuestion(q) {
  return Boolean(q?.id && q?.stem && Array.isArray(q.options) &&
    q.options.length === 4 &&
    q.options.every(o => o.id && o.text) &&
    new Set(q.options.map(o => o.id)).size === 4 &&
    q.options.some(o => o.id === q.correctOptionId) &&
    q.explanation);
}
export function createAttempt(pool, count, random = Math.random) {
  if (!Array.isArray(pool) || !pool.every(validQuestion)) throw new Error("Invalid question pool");
  if (new Set(pool.map(q => q.id)).size !== pool.length) throw new Error("Duplicate question IDs");
  return shuffle(pool, random).slice(0, count).map(q => ({...q, shown: shuffle(q.options, random)}));
}
export function evaluate(items, answers) {
  const missed = items.filter(q => answers[q.id] !== q.correctOptionId).map(q => q.id);
  return {score: items.length - missed.length, total: items.length, missed};
}
export function reconcileMissed(previous, items, answers) {
  const missing = new Set(previous || []);
  for (const q of items) {
    if (answers[q.id] === q.correctOptionId) missing.delete(q.id);
    else missing.add(q.id);
  }
  return [...missing];
}
export function saveableItems(items) {
  return items.map(q => ({id: q.id, optionIds: q.shown.map(o => o.id)}));
}
export function restoreItems(savedItems, bank) {
  const lookup = new Map(bank.map(q => [q.id, q]));
  return savedItems.map(saved => {
    const q = lookup.get(saved.id);
    if (!q || !validQuestion(q)) throw new Error("Saved question no longer exists");
    if (!Array.isArray(saved.optionIds) || saved.optionIds.length !== 4 ||
        new Set(saved.optionIds).size !== 4) throw new Error("Invalid saved answer order");
    const shown = saved.optionIds.map(id => q.options.find(o => o.id === id));
    if (shown.some(o => !o)) throw new Error("Saved answer choice no longer exists");
    return {...q, shown};
  });
}
