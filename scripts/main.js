import { flowers, vases } from "./data.js";
import { initCarousel } from "./carousel.js";

/* --------------------
   PREVIEW ELEMENTS
-------------------- */
const previewFlower = document.getElementById("preview-flower");
const previewVase = document.getElementById("preview-vase");
const previewMessage = document.getElementById("preview-message");

/* --------------------
   BOUQUET STATE
-------------------- */
const bouquet = {
  flower: null,
  vase: null,
  message: ""
};

/* --------------------
   DOM ELEMENTS
-------------------- */
const flowerTrack = document.getElementById("flower-carousel");
const vaseTrack = document.getElementById("vase-carousel");

const flowerButtons = document.querySelectorAll(
  ".section:nth-of-type(1) .carousel-btn"
);
const vaseButtons = document.querySelectorAll(
  ".section:nth-of-type(2) .carousel-btn"
);

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

  previewMessage.textContent = bouquet.message;
}

/* --------------------
   INIT CAROUSELS
-------------------- */
initCarousel({
  items: flowers,
  trackElement: flowerTrack,
  prevButton: flowerButtons[0],
  nextButton: flowerButtons[1],
  onChange: (flower) => {
    bouquet.flower = flower;
    updatePreview();
  }
});

initCarousel({
  items: vases,
  trackElement: vaseTrack,
  prevButton: vaseButtons[0],
  nextButton: vaseButtons[1],
  onChange: (vase) => {
    bouquet.vase = vase;
    updatePreview();
  }
});

/* --------------------
   MESSAGE INPUT
-------------------- */
const messageInput = document.querySelector(".message-input");
messageInput.addEventListener("input", (e) => {
  bouquet.message = e.target.value;
  updatePreview();
});