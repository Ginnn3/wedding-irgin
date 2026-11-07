const opening = document.getElementById("opening");
const openInvitation = document.getElementById("openInvitation");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("weddingMusic");

openInvitation.addEventListener("click", () => {
  opening.classList.add("hide");
  document.body.classList.add("opened");
  music.play().catch(() => {});
});

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play().catch(() => alert("Tambahkan file music.mp3 di folder utama website."));
    musicBtn.textContent = "❚❚";
  } else {
    music.pause();
    musicBtn.textContent = "♪";
  }
});

const weddingDate = new Date("2026-11-07T09:00:00+07:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = Math.max(0, weddingDate - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.image;
    lightbox.classList.add("show");
  });
});

closeLightbox.addEventListener("click", () => lightbox.classList.remove("show"));
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.classList.remove("show");
});

document.getElementById("copyAccount").addEventListener("click", async () => {
  const number = document.getElementById("accountNumber").textContent.trim();
  await navigator.clipboard.writeText(number);
  document.getElementById("copyAccount").textContent = "Copied ✓";
  setTimeout(() => document.getElementById("copyAccount").textContent = "Copy No. Rekening", 1800);
});

const form = document.getElementById("wishForm");
const wishes = document.getElementById("wishes");

function loadWishes() {
  const saved = JSON.parse(localStorage.getItem("weddingWishes") || "[]");
  wishes.innerHTML = saved.map(w => `
    <article class="wish">
      <strong>${escapeHtml(w.name)}</strong>
      <small>${escapeHtml(w.attendance)}</small>
      <p>${escapeHtml(w.message)}</p>
    </article>
  `).join("");
}
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
form.addEventListener("submit", e => {
  e.preventDefault();
  const saved = JSON.parse(localStorage.getItem("weddingWishes") || "[]");
  saved.unshift({
    name: document.getElementById("name").value,
    attendance: document.getElementById("attendance").value,
    message: document.getElementById("message").value
  });
  localStorage.setItem("weddingWishes", JSON.stringify(saved));
  form.reset();
  loadWishes();
});
loadWishes();

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth"});
    }
  });
});
