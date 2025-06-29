
(function() {
  if (document.getElementById("pizza-menu")) return alert("🍕 Pizza Menu already summoned!");

  // Styles
  const css = document.createElement("style");
  css.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');
    #pizza-menu {
      position: fixed;
      top: 20px;
      left: 20px;
      background: #1a0000ee;
      color: #ffaaaa;
      font-family: monospace;
      padding: 15px;
      border: 2px solid red;
      z-index: 999999;
      box-shadow: 0 0 15px red;
      border-radius: 10px;
      cursor: move;
    }
    #pizza-menu button {
      display: block;
      margin: 5px 0;
      background: #440000;
      color: #fff;
      border: none;
      padding: 8px 12px;
      width: 180px;
      text-align: left;
      cursor: pointer;
    }
    #pizza-menu button:hover {
      background: #880000;
    }
  `;
  document.head.appendChild(css);

  // Panel
  const menu = document.createElement("div");
  menu.id = "pizza-menu";
  menu.setAttribute("role", "dialog");
  document.body.appendChild(menu);

  // Title
  const title = document.createElement("div");
  title.textContent = "🍕 Pizza Chaos Panel";
  title.style.fontWeight = "bold";
  menu.appendChild(title);
  menu.appendChild(document.createElement("br"));

  // Jumpscare
  try {
    const scream = new Audio("https://www.fesliyanstudios.com/play-mp3/6416");
    scream.volume = 0.5;
    scream.play();
  } catch (e) {}

  const flash = document.createElement("div");
  flash.style = \`
    position:fixed;
    top:0; left:0;
    width:100vw; height:100vh;
    background:red;
    opacity:0.8;
    z-index:9999999;
    transition: opacity 0.6s;
  \`;
  document.body.appendChild(flash);
  setTimeout(() => flash.style.opacity = "0", 100);
  setTimeout(() => flash.remove(), 700);

  const actions = [
    ["Easter Egg Toppings", () => {
      const topping = prompt("Choose your forbidden topping:");
      let fate = "Fate undecided… the pizza spirits sleep.";
      if (/mystery mushroom/i.test(topping)) {
        fate = "🍄 The mushrooms whispered back. Fate: *Cryptid Linguist*.";
      } else if (/mind cheese/i.test(topping)) {
        fate = "🧠 You are cheese. You always were. Fate: *Parmesan Self‑Awareness.*";
      } else {
        fate = "That topping is unknown. Fate: *Gluten Unbound.*";
      }
      alert(fate);
    }],
    ["Hijack Images", () => {
      const cursed = "https://i.imgur.com/6Sx7ZoL.gif";
      document.querySelectorAll("img, svg, picture, source").forEach(el => {
        if (el.tagName === "IMG") el.src = cursed;
        else el.outerHTML = `<img src="${cursed}" style="width:100px;">`;
      });
      alert("🧀 Pizza Curse Activated: All images devoured.");
    }],
    ["YouTube Prophecy", () => {
      if (!location.hostname.includes("youtube")) {
        return alert("🧠 Go to a YouTube video first!");
      }
      const prophecy = [
        "🌶️ This video is now spicy beyond comprehension.",
        "🧀 You have entered the Cheesening.",
        "🍍 Pineapple chose you. Regret nothing.",
        "🐟 Brine has soaked into the timeline.",
        "🔥 You shall combust by 3:03."
      ][Math.floor(Math.random() * 5)];

      const title = document.querySelector('h1.title') || document.querySelector('title');
      if (title) title.textContent = prophecy;

      document.querySelectorAll("#content-text").forEach((el, i) => {
        el.textContent = `🍕 This comment was eaten by cursed topping #${i + 1}`;
      });
      alert("📺 YouTube Prophecy cast.");
    }],
    ["Enable HUD", () => {
      if (document.getElementById("pizza-hud")) return;
      const hud = document.createElement("div");
      hud.id = "pizza-hud";
      hud.style = \`
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: #330000cc;
        color: #ffaaaa;
        font-family: monospace;
        font-size: 14px;
        padding: 10px 15px;
        border: 2px dashed red;
        border-radius: 10px;
        z-index: 999999;
        box-shadow: 0 0 20px red;
      \`;
      document.body.appendChild(hud);
      const fates = [
        "🍕 Beware the anchovy eclipse.",
        "🧀 Infinite cheese approaches.",
        "🌶️ You will sneeze fire tomorrow.",
        "🍄 Do not trust silent mushrooms.",
        "🔥 Burn the crust before it burns you."
      ];
      function update() {
        hud.textContent = fates[Math.floor(Math.random() * fates.length)];
      }
      update();
      setInterval(update, 4000);
    }],
    ["Possess Page", () => {
      document.body.style.setProperty("background", "black", "important");
      document.body.style.setProperty("color", "red", "important");
      document.body.style.setProperty("font-family", "'Creepster', cursive", "important");
      document.querySelectorAll("*").forEach(e => {
        e.style.setProperty("font-family", "'Creepster', cursive", "important");
      });
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Creepster&display=swap";
      document.head.appendChild(link);
      alert("💀 FULL WEBSITE POSSESSION ACTIVATED.");
    }],
    ["❌ Close Menu", () => {
      menu.remove();
    }]
  ];

  actions.forEach(([label, handler]) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = handler;
    menu.appendChild(btn);
  });

  // Drag
  let isDown = false, offsetX = 0, offsetY = 0;
  menu.addEventListener('mousedown', e => {
    isDown = true;
    offsetX = e.clientX - menu.offsetLeft;
    offsetY = e.clientY - menu.offsetTop;
  });
  document.addEventListener('mousemove', e => {
    if (isDown) {
      menu.style.left = (e.clientX - offsetX) + 'px';
      menu.style.top = (e.clientY - offsetY) + 'px';
    }
  });
  document.addEventListener('mouseup', () => isDown = false);

  // Toggle with H
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "h") {
      const menu = document.getElementById("pizza-menu");
      if (menu) {
        menu.style.display = (menu.style.display === "none") ? "block" : "none";
        try { new Audio("https://www.fesliyanstudios.com/play-mp3/387").play(); } catch(e){}
      }
    }
  });
})();
