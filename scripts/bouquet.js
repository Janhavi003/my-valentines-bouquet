const KEY = "myValentinesBouquets";

export const bouquet = {
  flower: null,
  vase: null,
  message: "",
  to: "",
  from: ""
};

export function getBouquets() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveBouquet(name) {
  const bouquets = getBouquets();
  bouquets.push({ id: Date.now(), name, data: { ...bouquet } });
  localStorage.setItem(KEY, JSON.stringify(bouquets));
}

export function loadBouquet(id) {
  const found = getBouquets().find(b => b.id === id);
  if (found) Object.assign(bouquet, found.data);
}