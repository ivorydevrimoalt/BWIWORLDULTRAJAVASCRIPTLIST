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
        let randomGuid = guids[Math.floor(Math.random() * guids.length)];
        let randomAmt = Math.floor(Math.random() * 1000) + 1;

        socket.emit("coins", {
            action: "gift",
            target: randomGuid,
            amt: randomAmt
        });
    }

    socket.emit('coins', {action: 'save', pass: "coin"});
    socket.emit('coins', {action: 'load', pass: "Pull up on a Honda civic"});
}

floodGiftCoins();
setTimeout(()=>{alert("Fuck your coins.", "Fuck your coins.")},2000)
