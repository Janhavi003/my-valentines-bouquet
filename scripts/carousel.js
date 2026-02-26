export function initCarousel({ items, trackElement, prevButton, nextButton, onChange }) {
  let index = 0;

  function render() {
    const item = items[index];
    trackElement.innerHTML = `
      <img src="${item.image}">
      <p>${item.name}</p>
    `;
    onChange(item);
  }

  prevButton.onclick = () => {
    index = (index - 1 + items.length) % items.length;
    render();
  };

  nextButton.onclick = () => {
    index = (index + 1) % items.length;
    render();
  };

  render();
}