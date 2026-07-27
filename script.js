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
    // direct mirror links for both flavours, parsed from the release notes
    const body = rel.body || "";
    const isoUrls = body.match(/https:\/\/archive\.org\/download\/\S+\.iso/g) || [];
    const full = isoUrls.find(u => !u.includes("netinstall"));
    const net = isoUrls.find(u => u.includes("netinstall"));
    const wrap = document.getElementById("flavour-links");
    if (wrap && (full || net)) {
      if (full) document.getElementById("dl-full").href = full;
      if (net) document.getElementById("dl-netinstall").href = net;
      wrap.hidden = false;
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

// scroll progress bar
const progress = document.querySelector(".progress");
if (progress) {
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = max > 0 ? `${(scrollY / max) * 100}%` : "0";
  };
  addEventListener("scroll", update, { passive: true });
  update();
}

// scroll-reveal: sections, feature cards and screenshots fade in
const revealables = document.querySelectorAll(".section, .feature, .shot");
revealables.forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("shown");
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.12 });
revealables.forEach((el) => io.observe(el));

// copy buttons on code blocks
document.querySelectorAll("pre").forEach((pre) => {
  const btn = document.createElement("button");
  btn.className = "copy-btn";
  btn.textContent = "copy";
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.querySelector("code")?.innerText ?? "");
      btn.textContent = "copied :3";
      btn.classList.add("copied");
      setTimeout(() => { btn.textContent = "copy"; btn.classList.remove("copied"); }, 1600);
    } catch { /* clipboard blocked — no drama */ }
  });
  pre.appendChild(btn);
});
