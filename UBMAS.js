function UbRecite(){
  socket.emit("talk", {text: "We wish you a very Ub Day,"});
  setTimeout(()=>{
    socket.emit("talk", {text: "We wish you a merry Christmas,"});
    setTimeout(()=>{
      socket.emit("talk", {text: "We wish you a very Ub-mas,"});
      setTimeout(()=>{
        socket.emit("talk", {text: "And a happy new year!"});
        setTimeout(()=>{
          socket.emit("talk", {text: "Good bonzings we bring to you and your Black Santa Claupse,"});
          setTimeout(()=>{
            socket.emit("talk", {text: "We wish you a verity, and a 7 b bot commands,"});
            setTimeout(()=>{
              socket.emit("talk", {text: "Now bring us some bitcoin, Now bring us some big ol YTP"});
              setTimeout(()=>{
                socket.emit("talk", {text: "Now bring us some Figgy pudding, And bring some out here"});
                setTimeout(()=>{
                  socket.emit("talk", {text: "Merry 2018 to 2026 collaboration"});
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
