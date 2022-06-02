const items = document.querySelectorAll('#timeline li');
const tabletWidthLandscape = 1000
const isInViewport = el => {
  const rect = el.getBoundingClientRect(); // returns size of the object an its relative position to the viewport
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight + 100 || document.documentElement.clientHeight + 100 ) &&
    rect.right <= (window.innerWidth + 100 || document.documentElement.clientWidth + 100)
  );
};

const isXPercentInViewport = function(el, percentVisible) {
  let
    rect = el.getBoundingClientRect(),
    windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
};

const run = () =>
  items.forEach(item => {
    // render the item faster on landscape mode when the width falls under a specific value
    if (window.innerWidth < tabletWidthLandscape && (window.innerWidth > window.innerHeight)) {
      // The user is in landscape mode!
      if(isXPercentInViewport(item)) {
        item.classList.add('show');
      }
    } 
    if (isInViewport(item)) {
      item.classList.add('show');
    }
  });

// Events
window.addEventListener('load', run);
window.addEventListener('resize', run);
window.addEventListener('scroll', run);
