// scripts/carousel.js

export function initCarousel({
  items,
  trackElement,
  prevButton,
  nextButton,
  onChange
}) {
  let index = 0;

  function render() {
    const item = items[index];
    trackElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <p>${item.name}</p>
    `;
    onChange(item);
  }

  prevButton.addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    render();
  });

  nextButton.addEventListener("click", () => {
    index = (index + 1) % items.length;
    render();
  });

  // initial render
  render();
}