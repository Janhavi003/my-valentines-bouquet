export function initCarousel({ items, trackElement, prevButton, nextButton, onChange }) {
  let index = 0;

  function render() {
    trackElement.innerHTML = `
      <img src="${items[index].image}">
      <p>${items[index].name}</p>
    `;
    onChange(items[index]);
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