// eslint-disable-next-line no-undef
const srcScriptTabJs = chrome.runtime.getURL('tabjs.js');
const scriptTabJs = document.createElement('script');
scriptTabJs.setAttribute('type', 'text/javascript');
scriptTabJs.src = srcScriptTabJs;
document.getElementsByTagName('head')[0].appendChild(scriptTabJs);
