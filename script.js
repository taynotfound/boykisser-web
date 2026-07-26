// show the latest release name + date on the download button
(async () => {
  try {
    const r = await fetch("https://api.github.com/repos/taynotfound/BoykisserLinux/releases/latest");
    if (!r.ok) return;
    const rel = await r.json();
    const info = document.getElementById("release-info");
    const btn = document.getElementById("download-btn");
    if (btn && rel.html_url) btn.href = rel.html_url;
    if (info && rel.tag_name) {
      const date = rel.published_at ? new Date(rel.published_at).toLocaleDateString() : "";
      info.textContent = ` · latest: ${rel.tag_name}${date ? " (" + date + ")" : ""}`;
    }
  } catch { /* offline or rate-limited — the static link still works */ }
})();

// click anywhere, leave a little trail of kisses
const KISSES = [":3", "🐾", "💕", ":3c", "♡"];

document.addEventListener("click", (e) => {
  const kiss = document.createElement("span");
  kiss.textContent = KISSES[Math.floor(Math.random() * KISSES.length)];
  kiss.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    transform: translate(-50%, -50%);
    pointer-events: none;
    font-size: 1.4rem;
    z-index: 9999;
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
  `;
  document.body.appendChild(kiss);
  requestAnimationFrame(() => {
    kiss.style.transform = "translate(-50%, -160%) scale(1.4)";
    kiss.style.opacity = "0";
  });
  setTimeout(() => kiss.remove(), 800);
});
