export function startUp(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/**
 * Return DOM element
 * @param {string} selector
 */
export function e(selector) {
  switch (selector[0]) {
    case '#':
      return document.getElementById(selector.slice(1));
    case '.':
      return [...document.getElementsByClassName(selector.slice(1))];
    default:
      return [...document.getElementsByTagName(selector)];
  }
}

export function identitySelector(element, selector) {
  switch (selector[0]) {
    case '#':
      return element.id === selector.slice(1);
    case '.':
      return element.class === selector.slice(1);
    default:
      return element.tagName.toLowerCase() === selector.toLowerCase();
  }
}

/**
 *
 * @param {HTMLElement} element
 * @param {string} event
 * @param {string} selector filter
 * @param {function} handle
 */
export function on(element, event, selector, handle) {
  element.addEventListener(event, (ev) => {
    if (identitySelector(ev.target, selector)) {
      handle(ev);
    }
  });
}


/*eslint-disable */
/* зона анархии*/
String.prototype.splice = function (start, end) {
  return this.slice(0, start) + this.slice(end, this.length);
};
/* eslint-enable */
