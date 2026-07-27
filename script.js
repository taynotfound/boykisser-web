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

// the little fake terminal — types out a boykisser session on scroll-into-view
const termBody = document.getElementById("term-body");
if (termBody) {
  const SCRIPT = [
    { prompt: true, text: "boykisser update" },
    { out: true, text: ":3 creating a Timeshift snapshot first..." },
    { out: true, text: ":3 apt: everything up to date. flatpak: 2 apps updated." },
    { prompt: true, text: "boykisser presets music" },
    { out: true, text: ":3 installing preset 'music'... done!" },
    { prompt: true, text: "boykisser doctor" },
    { out: true, text: "✅ firewall on   ✅ zram active   ✅ backups ready   💖 all purring" },
  ];
  const caret = termBody.querySelector(".caret");
  let started = false;

  const typeLine = (line) => new Promise((resolve) => {
    const el = document.createElement("div");
    el.className = "line" + (line.out ? " out" : "");
    termBody.insertBefore(el, caret);
    if (line.prompt) {
      el.innerHTML = '<span class="prompt">boykisser@boykisser:~$ </span><span class="cmd"></span>';
      const cmd = el.querySelector(".cmd");
      let i = 0;
      const tick = () => {
        cmd.textContent = line.text.slice(0, ++i);
        if (i < line.text.length) setTimeout(tick, 34 + Math.random() * 42);
        else setTimeout(resolve, 320);
      };
      tick();
    } else {
      el.textContent = line.text;
      setTimeout(resolve, 420);
    }
  });

  new IntersectionObserver(async (entries, obs) => {
    if (!entries[0].isIntersecting || started) return;
    started = true;
    obs.disconnect();
    for (const line of SCRIPT) await typeLine(line);
  }, { threshold: 0.4 }).observe(termBody);
}
