(() => {
  "use strict";

  const content = window.HARAYAKI_CONTENT;
  if (!content) {
    console.error("HARAYAKI_CONTENT wurde nicht geladen.");
    return;
  }

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const headerLogo = $("#header-logo");
  const footerLogo = $("#footer-logo");
  const heroVideo = $("#hero-video");
  const heroVideoSource = $("#hero-video-source");
  const heroVideoMobileSource = $("#hero-video-source-mobile");

  if (headerLogo) headerLogo.src = content.brand.logoLight;
  if (footerLogo) footerLogo.src = content.brand.logoDark;
  if (heroVideo) heroVideo.poster = content.brand.heroPoster;
  if (heroVideoMobileSource) heroVideoMobileSource.src = content.brand.heroVideoMobile;
  if (heroVideoSource) heroVideoSource.src = content.brand.heroVideo;
  if (heroVideoMobileSource || heroVideoSource) heroVideo?.load();

  const emailLink = $("#contact-email-link");
  const phone = $("#contact-phone");
  if (emailLink) {
    emailLink.textContent = content.brand.email;
    emailLink.href = `mailto:${content.brand.email}`;
  }
  if (phone) phone.textContent = content.brand.phone;
  $("#current-year").textContent = new Date().getFullYear();

  // Navigation
  const header = $("#site-header");
  const navToggle = $(".nav-toggle");
  const primaryNav = $("#primary-nav");

  const closeNavigation = () => {
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Menü öffnen");
    primaryNav?.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  navToggle?.addEventListener("click", () => {
    const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(willOpen));
    navToggle.setAttribute("aria-label", willOpen ? "Menü schließen" : "Menü öffnen");
    primaryNav?.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("nav-open", willOpen);
  });

  $$("#primary-nav a").forEach((link) => link.addEventListener("click", closeNavigation));

  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Hero video control
  const videoToggle = $("#video-toggle");
  const videoToggleIcon = $(".video-toggle-icon", videoToggle || document);

  const updateVideoButton = () => {
    if (!heroVideo || !videoToggle || !videoToggleIcon) return;
    const isPaused = heroVideo.paused;
    videoToggleIcon.textContent = isPaused ? "▶" : "Ⅱ";
    videoToggle.setAttribute("aria-label", isPaused ? "Hero-Video abspielen" : "Hero-Video pausieren");
  };

  videoToggle?.addEventListener("click", async () => {
    if (!heroVideo) return;
    if (heroVideo.paused) {
      try { await heroVideo.play(); } catch (error) { console.warn("Video konnte nicht gestartet werden.", error); }
    } else {
      heroVideo.pause();
    }
    updateVideoButton();
  });
  heroVideo?.addEventListener("play", updateVideoButton);
  heroVideo?.addEventListener("pause", updateVideoButton);
  heroVideo?.addEventListener("error", () => {
    if (videoToggle) videoToggle.hidden = true;
  });
  updateVideoButton();

  // Package cards
  const packageGrid = $("#package-grid");
  if (packageGrid) {
    packageGrid.innerHTML = content.packages.map((item) => `
      <article class="package-card reveal">
        <div class="package-image-wrap">
          <span class="size-badge">${escapeHtml(item.size)}</span>
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">
        </div>
        <div class="package-content">
          <p class="package-badge">${escapeHtml(item.badge)}</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.teaser)}</p>
          <ul>${item.highlights.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
          <button class="button button-card" type="button" data-package-id="${escapeHtml(item.id)}">Mehr erfahren</button>
        </div>
      </article>
    `).join("");
  }

  // Modal handling
  let activeModal = null;
  let returnFocus = null;

  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const openModal = (modal) => {
    if (!modal) return;
    returnFocus = document.activeElement;
    activeModal = modal;
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => $(focusableSelector, modal)?.focus());
  };

  const closeModal = (modal = activeModal) => {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    activeModal = null;
    if (returnFocus instanceof HTMLElement) returnFocus.focus();
  };

  $$("[data-close-modal]").forEach((element) => element.addEventListener("click", () => closeModal(element.closest(".modal"))));

  document.addEventListener("keydown", (event) => {
    if (!activeModal) return;
    if (event.key === "Escape") closeModal();
    if (event.key !== "Tab") return;

    const focusable = $$(focusableSelector, activeModal).filter((node) => node.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const packageModal = $("#package-modal");
  const packageModalContent = $("#package-modal-content");

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-package-id]");
    if (!trigger) return;

    const item = content.packages.find((packageItem) => packageItem.id === trigger.dataset.packageId);
    if (!item || !packageModalContent) return;

    packageModalContent.innerHTML = `
      <div class="package-modal-grid">
        <div class="package-modal-media">
          <span class="size-badge size-badge-large">${escapeHtml(item.size)}</span>
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
        </div>
        <div class="package-modal-copy">
          <p class="package-badge">${escapeHtml(item.badge)}</p>
          <h2 id="package-modal-title">${escapeHtml(item.title)}</h2>
          <p class="modal-lead">${escapeHtml(item.description)}</p>
          <h3>Technische Details</h3>
          <dl class="spec-list">
            ${item.specifications.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
          </dl>
          <h3>Im Paket enthalten</h3>
          <ul class="check-list">${item.included.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
          <a class="button button-primary" href="#kontakt" data-close-modal>Anfrage für ${escapeHtml(item.size)} starten</a>
        </div>
      </div>
    `;
    openModal(packageModal);
  });

  // Menu modal
  const menuModal = $("#menu-modal");
  const menuModalIntro = $("#menu-modal-intro");
  const menuModalContent = $("#menu-modal-content");

  if (menuModalIntro) menuModalIntro.textContent = content.menu.intro;
  if (menuModalContent) {
    menuModalContent.innerHTML = content.menu.categories.map((category) => `
      <section class="menu-category">
        <h3>${escapeHtml(category.title)}</h3>
        <div class="menu-items">
          ${category.items.map((item) => `
            <div class="menu-item">
              <div>
                <strong>${escapeHtml(item.name)}</strong>
                ${item.note ? `<small>${escapeHtml(item.note)}</small>` : ""}
              </div>
              <span>${escapeHtml(item.price)}</span>
            </div>
          `).join("")}
        </div>
      </section>
    `).join("");
  }

  $$("[data-open-menu]").forEach((button) => button.addEventListener("click", () => openModal(menuModal)));

  // Rocket machine gallery: desktop grid, mobile carousel
  const rocketCarousel = $("[data-rocket-carousel]");
  const rocketTrack = $("[data-rocket-track]", rocketCarousel || document);
  const rocketSlides = $$(".rocket-slide", rocketCarousel || document);
  const rocketDots = $$("[data-rocket-dot]", rocketCarousel || document);
  let activeRocketSlide = 0;
  let rocketScrollFrame = null;

  $$(".rocket-image", rocketCarousel || document).forEach((image) => {
    const media = image.closest(".rocket-media");
    const updateImageState = () => media?.classList.toggle("is-missing", !image.naturalWidth);
    image.addEventListener("load", updateImageState);
    image.addEventListener("error", updateImageState);
    if (image.complete) updateImageState();
  });

  const updateRocketCarousel = (index) => {
    if (!rocketSlides.length) return;
    activeRocketSlide = (index + rocketSlides.length) % rocketSlides.length;
    rocketDots.forEach((dot, dotIndex) => dot.setAttribute("aria-current", String(dotIndex === activeRocketSlide)));
  };

  const showRocketSlide = (index) => {
    if (!rocketTrack || !rocketSlides.length) return;
    updateRocketCarousel(index);
    rocketTrack.scrollTo({ left: rocketSlides[activeRocketSlide].offsetLeft - rocketTrack.offsetLeft, behavior: "smooth" });
  };

  $("[data-rocket-prev]", rocketCarousel || document)?.addEventListener("click", () => showRocketSlide(activeRocketSlide - 1));
  $("[data-rocket-next]", rocketCarousel || document)?.addEventListener("click", () => showRocketSlide(activeRocketSlide + 1));
  rocketDots.forEach((dot) => dot.addEventListener("click", () => showRocketSlide(Number(dot.dataset.rocketDot))));

  rocketTrack?.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    showRocketSlide(activeRocketSlide + (event.key === "ArrowRight" ? 1 : -1));
  });

  rocketTrack?.addEventListener("scroll", () => {
    if (rocketScrollFrame) cancelAnimationFrame(rocketScrollFrame);
    rocketScrollFrame = requestAnimationFrame(() => {
      const trackLeft = rocketTrack.getBoundingClientRect().left;
      const closestIndex = rocketSlides.reduce((closest, slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        return distance < closest.distance ? { index, distance } : closest;
      }, { index: 0, distance: Infinity }).index;
      updateRocketCarousel(closestIndex);
    });
  }, { passive: true });

  // Contact form: endpoint or mailto fallback
  const contactForm = $("#contact-form");
  const formStatus = $("#form-status");

  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = $("button[type='submit']", contactForm);
    const formData = new FormData(contactForm);

    if (content.brand.formEndpoint) {
      submitButton.disabled = true;
      formStatus.textContent = "Anfrage wird gesendet …";
      try {
        const response = await fetch(content.brand.formEndpoint, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        contactForm.reset();
        formStatus.textContent = "Danke! Deine Anfrage wurde erfolgreich gesendet.";
      } catch (error) {
        console.error(error);
        formStatus.textContent = "Die Anfrage konnte nicht gesendet werden. Bitte nutze die angegebene E-Mail-Adresse.";
      } finally {
        submitButton.disabled = false;
      }
      return;
    }

    const name = formData.get("name") || "";
    const company = formData.get("company") || "";
    const email = formData.get("email") || "";
    const phoneNumber = formData.get("phone") || "";
    const message = formData.get("message") || "";
    const subject = encodeURIComponent(`Buchungsanfrage von ${name}${company ? ` – ${company}` : ""}`);
    const body = encodeURIComponent([
      `Name: ${name}`,
      `Unternehmen: ${company}`,
      `E-Mail: ${email}`,
      `Telefon: ${phoneNumber}`,
      "",
      "Eventdetails:",
      message
    ].join("\n"));

    window.location.href = `mailto:${content.brand.email}?subject=${subject}&body=${body}`;
    formStatus.textContent = "Dein E-Mail-Programm wurde mit der Anfrage geöffnet.";
  });

  // Reveal animation
  const revealElements = $$(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }
})();
