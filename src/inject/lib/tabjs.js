import * as helper from './helper';

function js(command) {
  // eslint-disable-next-line no-eval
  return eval(command);
}

const parser = {
  getCommand(text, posCursor) {
    const posStart = this.findPosStart(text, posCursor);
    if (posStart === null) {
      return null;
    }

    return {
      command: text.substring(posStart + 3, posCursor),
      posStart,
      posEnd: posCursor,
    };
  },

  findPosStart(text, posFnEnd, posFnEndEx) {
    posFnEndEx = posFnEndEx || posFnEnd;
    text = text.slice(0, posFnEnd + 1) + text.slice(posFnEndEx + 1, posFnEnd + 1);

    const posFnStart = text.lastIndexOf('js(');

    posFnEndEx = this.findPostEnd(text, posFnStart);

    if (posFnStart === -1) {
      return null;
    }

    if (posFnEndEx === -1) {
      return null;
    }

    if (posFnEndEx === posFnEnd) {
      return posFnStart;
    }

    text = text.slice(0, posFnStart) + text.slice(posFnEndEx + 1, posFnEnd + 1);
    posFnEnd -= (posFnEndEx - posFnStart + 1);
    return this.findPosStart(text, posFnEnd, posFnEndEx);
  },

  findPostEnd(text, posFnStart, lenDiff) {
    lenDiff = lenDiff || 0;

    const posFnEndEx = text.indexOf(')');
    const posFnStartEx = text.lastIndexOf('(');

    if (posFnStartEx - 2 === posFnStart || posFnEndEx === -1) {
      return posFnEndEx + lenDiff;
    }
    return this.findPostEnd(
      text.splice(posFnStartEx, posFnEndEx + 1),
      posFnStart,
      (posFnEndEx - posFnStartEx + 1),
    );
  },

};

function tab(e) {
  if (e.key !== 'Enter') return;

  const posCursor = e.target.selectionStart;
  const text = e.target.value;
  const commandInfo = parser.getCommand(text.slice(0), posCursor - 1);

  if (commandInfo !== null) {
    const res = js(commandInfo.command);
    const resultText = text.slice(0, commandInfo.posStart)
      + res
      + text.slice(commandInfo.posEnd + 1, text.length);
    e.target.value = resultText;
  }
}

helper.startUp(() => {
  const body = helper.e('body');
  helper.on(body[0], 'keyup', 'input', tab);
});
