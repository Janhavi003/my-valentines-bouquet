import { flowers, vases } from "./data.js";
import { initCarousel } from "./carousel.js";
import { bouquet, saveBouquet, loadBouquet, getBouquets } from "./bouquet.js";

/* --------------------
   DOM ELEMENTS
-------------------- */
const previewFlower = document.getElementById("preview-flower");
const previewVase = document.getElementById("preview-vase");
const previewMessage = document.getElementById("preview-message");
const previewTo = document.getElementById("preview-to");
const previewFrom = document.getElementById("preview-from");

const messageInput = document.querySelector(".message-input");
const toInput = document.getElementById("to");
const fromInput = document.getElementById("from");

const toast = document.getElementById("toast");
const savedList = document.getElementById("saved-bouquets");

/* --------------------
   PREVIEW UPDATE
-------------------- */
function updatePreview() {
  if (bouquet.vase) {
    previewVase.src = bouquet.vase.image;
    previewVase.alt = bouquet.vase.name;
  }

  if (bouquet.flower) {
    previewFlower.src = bouquet.flower.image;
    previewFlower.alt = bouquet.flower.name;
  }

  previewMessage.textContent = bouquet.message || "";
  previewTo.textContent = bouquet.to ? `To: ${bouquet.to}` : "";
  previewFrom.textContent = bouquet.from ? `From: ${bouquet.from}` : "";
}

/* --------------------
   TOAST
-------------------- */
function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

/* --------------------
   CAROUSELS
-------------------- */
initCarousel({
  items: flowers,
  trackElement: document.getElementById("flower-carousel"),
  prevButton: document.querySelector(
    ".section:nth-of-type(1) .carousel-btn:first-child"
  ),
  nextButton: document.querySelector(
    ".section:nth-of-type(1) .carousel-btn:last-child"
  ),
  onChange: (flower) => {
    bouquet.flower = flower;
    updatePreview();
  }
});

initCarousel({
  items: vases,
  trackElement: document.getElementById("vase-carousel"),
  prevButton: document.querySelector(
    ".section:nth-of-type(2) .carousel-btn:first-child"
  ),
  nextButton: document.querySelector(
    ".section:nth-of-type(2) .carousel-btn:last-child"
  ),
  onChange: (vase) => {
    bouquet.vase = vase;
    updatePreview();
  }
});

/* --------------------
   INPUTS
-------------------- */
messageInput.addEventListener("input", (e) => {
  bouquet.message = e.target.value;
  updatePreview();
});

toInput.addEventListener("input", (e) => {
  bouquet.to = e.target.value;
  updatePreview();
});

fromInput.addEventListener("input", (e) => {
  bouquet.from = e.target.value;
  updatePreview();
});

/* --------------------
   SAVE BOUQUET
-------------------- */
document.querySelector(".save-btn").addEventListener("click", () => {
  const name = prompt("Name your bouquet 💐");
  if (!name) return;

  saveBouquet(name);
  showToast("Bouquet saved 💖");
  renderSavedBouquets();
});

/* --------------------
   SAVED BOUQUETS LIST
-------------------- */
function renderSavedBouquets() {
  savedList.innerHTML = "";

  getBouquets().forEach((b) => {
    const li = document.createElement("li");
    li.textContent = b.name;

    li.addEventListener("click", () => {
      loadBouquet(b.id);

      messageInput.value = bouquet.message || "";
      toInput.value = bouquet.to || "";
      fromInput.value = bouquet.from || "";

      updatePreview();
      showToast("Bouquet loaded 💐");
    });

    savedList.appendChild(li);
  });
}

/* --------------------
   EXPORT CARD (CROPPED)
-------------------- */
document.getElementById("export-btn").addEventListener("click", () => {
  const exportArea = document.getElementById("export-area");

  html2canvas(exportArea, {
    scale: 2,
    backgroundColor: null,
    width: exportArea.offsetWidth,
    height: exportArea.offsetHeight,
    windowWidth: exportArea.offsetWidth,
    windowHeight: exportArea.offsetHeight
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "my-valentines-bouquet.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

/* --------------------
   INIT
-------------------- */
renderSavedBouquets();
updatePreview();