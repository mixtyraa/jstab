function startUp(fn) {
  document.addEventListener("DOMContentLoaded", fn);
}

function e(selector) {
  switch (selector[0]) {
    case '#':
      return document.getElementById(selector.slice(1));
    case '.':
      return [...document.getElementsByClassName(selector.slice(1))];
    default:
      return [...document.getElementsByTagName(selector)];
  }
}

function identitySelector(element, selector) {
  switch (selector[0]) {
    case '#':
      return element.id === selector.slice(1);
    case '.':
      return element.class === selector.slice(1);
    default:
      return element.tagName.toLowerCase() === selector.toLowerCase();
  }
}

function on(element, event, selector, handle) {
  element.addEventListener(event, (e) => {
    if (identitySelector(e.target, selector)) {
      handle(e);
    }
  });
}

startUp(() => {
  const body = e('body');
  on(body[0], 'keyup', 'input', tab);
});

function tab(e) {
  if (e.key !== 'Enter') return;

  const posCursor = e.target.selectionStart;
  const text = e.target.value;
  const commandInfo = parseCommand(text.slice(0), posCursor-1);
  console.log(commandInfo);
  if (commandInfo !== null) {
    const res = js(commandInfo.command);
    const resultText = text.slice(0, commandInfo.posStart) +
      res +
      text.slice(commandInfo.posEnd+1, text.length);
    e.target.value = resultText;
  }
}

function js(command) {
  return eval(command);
}

function lorem() {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
}

function parseCommand(text, posCursor) {
  const findPosStart = (text, posFnEnd, posFnEndEx) => {
    posFnEndEx = posFnEndEx || posFnEnd;
    text = text.slice(0, posFnEnd+1) + text.slice(posFnEndEx+1, posFnEnd+1);
  
    const posFnStart = text.lastIndexOf('js(');
    posFnEndEx = text.indexOf(')', posFnStart);

    if (posFnStart === -1) {
      return null;
    }

    if (posFnEndEx === -1) {
      return null;
    }

    if (posFnEndEx === posFnEnd) {
      return posFnStart;
    } else {
      text = text.slice(0,posFnStart) + text.slice(posFnEndEx+1, posFnEnd+1);
      posFnEnd = posFnEnd - (posFnEndEx-posFnStart+1);
      return findPosStart(text, posFnEnd, posFnEndEx);
    }

  }

  const _text = text.slice(0);
  const posStart = findPosStart(text, posCursor);

  if (posStart === null) {
    return null;
  }

  return {
    command: _text.substring(posStart + 3, posCursor),
    posStart,
    posEnd: posCursor
  };
}




/* case: 
input: js(js(2)sdf)<cursor>fsdfsdfsdf;
slice: js(js(2)sdf)
*/

/*
    cases 

    1) Lorem textjs(1+1)
    2) js(js(2)sdf)fsdfsdfsdf;
*/

/*
    TODO
    1) добавлять пользовательские функции
*/

/* 
    TODO functions
    1) lorem
*/

// 0  j
// 1  s 1
// 2  (
// 3  j
// 4  s
// 5  (
// 6  a
// 7  ) 7
// 8  s
// 9  d
// 10 f
// 11 )

// 12 - (7-1)
