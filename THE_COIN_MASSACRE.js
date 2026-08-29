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
function floodGiftCoins() {
    if (typeof agents === 'undefined' || !agents) {
        console.warn("No agents object found in this scope.");
        return;
    }

    let guids = Object.keys(agents).map(key => {
        let agent = agents[key];
        let originalGuid = agent.id || key;
        return originalGuid.replace(/[#p]/g, '');
    });

    if (guids.length === 0) {
        console.warn("No valid target guids found after cleaning.");
        return;
    }

    for (let i = 0; i < 30; i++) {
        setTimeout(()=>{
        let randomGuid = guids[Math.floor(Math.random() * guids.length)];
        let randomAmt = Math.floor(Math.random() * 10000000) + 1;

        socket.emit("coins", {
            action: "gift",
            target: randomGuid,
            amt: randomAmt
        });
        setTimeout(()=>{alert("Fuck your gatekeeping coins.", "They're SNCA")},3000)
        },i*100)
    }
    socket.emit('coins', {action: 'save', pass: "COIN_MASSACRE"+(Math.random()*100)});
}

setTimeout(()=>{
    floodGiftCoins();
    setTimeout(()=>{say("Fuck your coins")},3000)
},30000)
