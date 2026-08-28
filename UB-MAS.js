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
function UbRecite(){
  say("We wish you a very Ub Day,");
  setTimeout(()=>{
    say("We wish you a merry Christmas,");
    setTimeout(()=>{
      say("We wish you a very Ub-mas,");
      setTimeout(()=>{
        say("And a happy new year!");
        setTimeout(()=>{
          say("Good bonzings we bring to you and your Black Santa Claupse,");
          setTimeout(()=>{
            say("We wish you a verity, and a 7 b bot commands,");
            setTimeout(()=>{
              say("Now bring us some bitcoin, Now bring us some big ol YTP");
              setTimeout(()=>{
                say("Now bring us some Figgy pudding, And bring some out here");
                setTimeout(()=>{
                  say("Merry 2018 to 2026 collaboration");
                },3000)
              },3000)
            },3000)
          },3000)
        },3000)
      },1000)
    },1000)
  },1000)
}
UbRecite()
