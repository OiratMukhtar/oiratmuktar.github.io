// Terminal-style intro in the hero panel.
// Types out a short "status check" of skills, then leaves a blinking cursor.

const lines = [
  { text: "$ ./whoami --verbose", cls: "prompt-line" },
  { text: "role:        CS student · web developer", cls: "" },
  { text: "focus:       front-end (React, JS) + IT support", cls: "" },
  { text: "status:      available for co-op, Jan 2027", cls: "ok" },
  { text: "languages:   Python, Java, JavaScript", cls: "" },
  { text: "$ ./uptime --support", cls: "prompt-line" },
  { text: "Freedom Bank Astana — Windows infra, remote access, troubleshooting", cls: "" },
];

function typewriter(el, lines) {
  el.innerHTML = "";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    lines.forEach(line => {
      const p = document.createElement("p");
      p.textContent = formatLine(line.text);
      el.appendChild(p);
    });
    appendCursor(el);
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let currentP = null;

  function step() {
    if (lineIndex >= lines.length) {
      appendCursor(el);
      return;
    }
    const line = lines[lineIndex];
    if (charIndex === 0) {
      currentP = document.createElement("p");
      el.appendChild(currentP);
    }
    const display = formatLine(line.text);
    charIndex++;
    currentP.textContent = display.slice(0, charIndex);

    if (charIndex >= display.length) {
      lineIndex++;
      charIndex = 0;
      setTimeout(step, line.text.startsWith("$") ? 260 : 60);
    } else {
      setTimeout(step, line.text.startsWith("$") ? 28 : 12);
    }
  }
  step();
}

function formatLine(text) {
  return text;
}

function appendCursor(el) {
  const span = document.createElement("span");
  span.className = "cursor";
  const lastP = el.lastElementChild;
  if (lastP) {
    lastP.appendChild(span);
  } else {
    el.appendChild(span);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("terminal-body");
  if (body) typewriter(body, lines);
});
