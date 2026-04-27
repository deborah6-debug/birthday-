document.addEventListener("DOMContentLoaded", () => {

  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  /* NAVBAR */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  /* VOICE NOTE */
  const voiceNote = document.getElementById("voiceNote");
  const playBtn = document.getElementById("playBtn");

  if (voiceNote && playBtn) {
    playBtn.addEventListener("click", () => {
      if (voiceNote.paused) {
        voiceNote.play();
        playBtn.textContent = "⏸";
      } else {
        voiceNote.pause();
        playBtn.textContent = "▶";
      }
    });
  }

  const bgAudio = document.getElementById("bgAudio");

  if (bgAudio) {
    bgAudio.volume = 0.5;

    // try to autoplay on first interaction
    document.body.addEventListener("click", () => {
      bgAudio.play().catch(() => {});
    }, { once: true });
  }

  /* POPUP */
  const favCards = document.querySelectorAll(".fav-card");
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");
  const bgMusic = document.getElementById("bgMusic");

  function showPopup(message) {
    popupText.textContent = message;
    popup.classList.add("show");
    document.body.classList.add("popup-active");

    setTimeout(() => {
      popup.classList.remove("show");
      document.body.classList.remove("popup-active");
    }, 5000);
  }

  favCards.forEach(card => {
    card.addEventListener("click", (e) => {

      const ripple = document.createElement("span");
      ripple.classList.add("ripple");

      const rect = card.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;

      card.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);

      const text = card.querySelector("p").textContent;

      if (text.includes("music")) {
  showPopup("I don’t know your favourite song… but I know what you carry when you listen 😌💙. You and Minister Dunsin Onyekan 😌💙");
  bgMusic.volume = 0.5;
  bgMusic.play();
}

if (text.includes("jewelry")) {
  showPopup("Anklets? Yeah… you’re that kind of girl 😏✨");
}

if (text.includes("movies")) {
  showPopup("Indian movies ke? You go laugh tire 😂🤎");
}

if (text.includes("youtube")) {
  showPopup("Mukbangs without eating… I’m watching you 👀😂");
}

if (text.includes("beauty")) {
  showPopup("That lipgloss? Don’t worry… I noticed 😌, after you take my cute lipoil and transform it to nail polish 👀👀👀");
}

if (text.includes("nollywood")) {
  showPopup("See you… slowly becoming a Nigerian movie girl 😏🎬");
}

    });
  });

  /* VIDEO AUTOPLAY */
  const videos = document.querySelectorAll("video");

  if (videos.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.6 });

    videos.forEach(video => observer.observe(video));
  }

});