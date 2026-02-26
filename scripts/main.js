import { flowers, vases } from "./data.js";
import { initCarousel } from "./carousel.js";
import { bouquet, saveBouquet, loadBouquet, getBouquets } from "./bouquet.js";

console.log("bouquet import:", bouquet);
const previewFlower = document.getElementById("preview-flower");
const previewVase = document.getElementById("preview-vase");
const previewMessage = document.getElementById("preview-message");
const messageInput = document.querySelector(".message-input");
const toast = document.getElementById("toast");
const savedList = document.getElementById("saved-bouquets");

function updatePreview() {
  if (bouquet.vase) previewVase.src = bouquet.vase.image;
  if (bouquet.flower) previewFlower.src = bouquet.flower.image;
  previewMessage.textContent = bouquet.message;
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

initCarousel({
  items: flowers,
  trackElement: document.getElementById("flower-carousel"),
  prevButton: document.querySelector(".section:nth-of-type(1) .carousel-btn:first-child"),
  nextButton: document.querySelector(".section:nth-of-type(1) .carousel-btn:last-child"),
  onChange: f => { bouquet.flower = f; updatePreview(); }
});

initCarousel({
  items: vases,
  trackElement: document.getElementById("vase-carousel"),
  prevButton: document.querySelector(".section:nth-of-type(2) .carousel-btn:first-child"),
  nextButton: document.querySelector(".section:nth-of-type(2) .carousel-btn:last-child"),
  onChange: v => { bouquet.vase = v; updatePreview(); }
});

messageInput.oninput = e => {
  bouquet.message = e.target.value;
  updatePreview();
};

document.querySelector(".save-btn").onclick = () => {
  const name = prompt("Name your bouquet 💐");
  if (!name) return;
  saveBouquet(name);
  showToast("Bouquet saved 💖");
  renderSaved();
};

function renderSaved() {
  savedList.innerHTML = "";
  getBouquets().forEach(b => {
    const li = document.createElement("li");
    li.textContent = b.name;
    li.onclick = () => {
      loadBouquet(b.id);
      messageInput.value = bouquet.message;
      updatePreview();
      showToast("Bouquet loaded 💐");
    };
    savedList.appendChild(li);
  });
}

document.getElementById("export-btn").onclick = () => {
  html2canvas(document.querySelector(".preview")).then(canvas => {
    const a = document.createElement("a");
    a.download = "my-valentines-bouquet.png";
    a.href = canvas.toDataURL();
    a.click();
  });
};

renderSaved();
updatePreview();