const chars = ['\u005Cu20B0', '\u20B0', "𖠚", "\u005C", "뀋"];

function aaa(){
  let result = '';
  for (let i = 0; i < 50; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result
}
var delay = 15;
function chatbarz(x) {
  const chatbar = document.getElementById("chatbar");
  if (!chatbar) return;

  // 1. Set the input value
  chatbar.value = x;

  // 2. Dispatch an Input Event (needed for modern frameworks like React/Vue)
  chatbar.dispatchEvent(new Event('input', { bubbles: true }));

  // 3. Create and dispatch the Enter key events
  const enterDown = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  });

  const enterUp = new KeyboardEvent('keyup', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  });

  chatbar.dispatchEvent(enterDown);
  chatbar.dispatchEvent(enterUp);
}

function payload1(){
  delay--
  setTimeout(()=>{chatbarz(aaa());payload1()},delay*100)
  if (delay === 10) {
      payload2();
  }
  if (delay === 1) {
      delay = delay*10
  }
  delay=Math.abs(delay)
}
function payload2(){
  setTimeout(()=>{chatbarz("/color");payload2()},delay*88)
}
function payload3(){
  setTimeout(()=>{chatbarz("/color");payload3()},delay*88)
}

payload1();
