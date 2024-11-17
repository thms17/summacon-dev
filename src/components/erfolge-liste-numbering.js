document.addEventListener('DOMContentLoaded', function () {
  // Selektiere die Collection List anhand des Attributs
  const collectionWrapper = document.querySelector('[erfolge-collection-list="wrapper"]');

  if (collectionWrapper) {
    // Selektiere alle Collection Items innerhalb des Wrappers
    const collectionItems = collectionWrapper.querySelectorAll(
      '[erfolge-collection-list="number"]'
    );

    collectionItems.forEach((item, index) => {
      // Setze den Textinhalt des jeweiligen Child-Elements auf die Reihenfolge (index + 1)
      item.textContent = `0${index + 1}`;
    });
  }
});
