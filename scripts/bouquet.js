// scripts/bouquet.js

const STORAGE_KEY = "myValentinesBouquets";

/* ---------- STATE ---------- */
export const bouquet = {
  flower: null,
  vase: null,
  message: ""
};

/* ---------- STORAGE ---------- */
export function getBouquets() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveBouquet(name) {
  const bouquets = getBouquets();

  bouquets.push({
    id: Date.now(),
    name,
    data: { ...bouquet }
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bouquets));
}

export function loadBouquet(id) {
  const found = getBouquets().find(b => b.id === id);
  if (!found) return;

  Object.assign(bouquet, found.data);
}