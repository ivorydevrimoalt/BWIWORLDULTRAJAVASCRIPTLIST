function say(x) {
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
function dishUbRecite(){
  say("Ooooooooohhh");
  setTimeout(()=>{
    say("Give us some peanut Ub-er jelly Ub-wich and some Ub-terini and some Ub-ioli and a little bit of Col-Ub and some of that pUbsi and mix the sod-ub together to make a delicious 'Peanut Ub-er Jelly Ub-wich Ub-terini Ub-ioli Col-ub Pubsi' Diiiiiish");
  },1000)
}
say("/speed 150");
setTimeout(()=>{
  dishUbRecite()
},1000)
