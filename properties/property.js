(function () {
  "use strict";

  var header = document.getElementById("header");
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("nav");
  var form = document.getElementById("book-form");
  var main = document.getElementById("gallery-main");
  var thumbs = document.querySelectorAll(".prop-gallery__thumb");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (header) {
    header.classList.add("is-scrolled");
    header.classList.add("is-solid");
  }

  function closeMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Закрыть меню");
    nav.classList.add("is-open");
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) closeMenu();
      else openMenu();
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* Gallery sources */
  var sources = [];
  thumbs.forEach(function (thumb) {
    var src = thumb.getAttribute("data-src");
    if (src && sources.indexOf(src) === -1) sources.push(src);
  });

  function setActiveThumb(src) {
    thumbs.forEach(function (t) {
      t.classList.toggle("is-active", t.getAttribute("data-src") === src);
    });
  }

  thumbs.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      var src = thumb.getAttribute("data-src");
      if (main && src) {
        main.style.opacity = "0.6";
        main.src = src;
        main.onload = function () {
          main.style.opacity = "1";
        };
        setActiveThumb(src);
      }
    });
  });

  /* Lightbox */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbCounter = document.getElementById("lightbox-counter");
  var lbIndex = 0;

  function openLightbox(index) {
    if (!lightbox || !lbImg || !sources.length) return;
    lbIndex = typeof index === "number" ? index : 0;
    updateLb();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateLb() {
    if (!lbImg) return;
    lbImg.src = sources[lbIndex];
    if (lbCounter) lbCounter.textContent = lbIndex + 1 + " / " + sources.length;
    if (main) {
      main.src = sources[lbIndex];
      setActiveThumb(sources[lbIndex]);
    }
  }

  function lbNext() {
    lbIndex = (lbIndex + 1) % sources.length;
    updateLb();
  }
  function lbPrev() {
    lbIndex = (lbIndex - 1 + sources.length) % sources.length;
    updateLb();
  }

  if (main) {
    main.style.cursor = "zoom-in";
    main.addEventListener("click", function () {
      var i = sources.indexOf(main.getAttribute("src"));
      openLightbox(i >= 0 ? i : 0);
    });
  }

  var mainWrap = document.querySelector(".prop-gallery__main");
  if (mainWrap && !mainWrap.querySelector(".prop-gallery__zoom")) {
    var zoom = document.createElement("span");
    zoom.className = "prop-gallery__zoom";
    zoom.textContent = "Открыть";
    mainWrap.appendChild(zoom);
  }

  if (lightbox) {
    var lbClose = lightbox.querySelector(".lightbox__close");
    var lbNextBtn = lightbox.querySelector(".lightbox__next");
    var lbPrevBtn = lightbox.querySelector(".lightbox__prev");
    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lbNextBtn) lbNextBtn.addEventListener("click", lbNext);
    if (lbPrevBtn) lbPrevBtn.addEventListener("click", lbPrev);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
      closeLightbox();
    }
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "ArrowRight") lbNext();
    if (e.key === "ArrowLeft") lbPrev();
  });

  /* Phone mask + form */
  function digitsOnly(v) {
    return (v || "").replace(/\D/g, "");
  }
  function formatPhone(raw) {
    var d = digitsOnly(raw);
    if (d.charAt(0) === "8") d = "7" + d.slice(1);
    if (d.charAt(0) !== "7") d = "7" + d;
    d = d.slice(0, 11);
    var out = "+7";
    if (d.length > 1) out += " (" + d.slice(1, 4);
    if (d.length >= 4) out += d.length > 4 ? ") " : ")";
    if (d.length > 4) out += d.slice(4, 7);
    if (d.length > 7) out += "-" + d.slice(7, 9);
    if (d.length > 9) out += "-" + d.slice(9, 11);
    return out;
  }
  function isValidPhone(v) {
    var d = digitsOnly(v);
    if (d.charAt(0) === "8") d = "7" + d.slice(1);
    return d.length === 11 && d.charAt(0) === "7";
  }

  document.querySelectorAll('input[type="tel"]').forEach(function (input) {
    input.addEventListener("input", function () {
      input.value = formatPhone(input.value);
    });
    input.addEventListener("focus", function () {
      if (!input.value) input.value = "+7 (";
    });
    input.addEventListener("blur", function () {
      if (digitsOnly(input.value).length <= 1) input.value = "";
    });
  });

  function setError(field, msg) {
    if (!field) return;
    field.classList.add("is-invalid");
    var err = field.querySelector(".field-error");
    var input = field.querySelector("input, select, textarea");
    if (err) {
      if (msg) err.textContent = msg;
      err.hidden = false;
    }
    if (input) input.setAttribute("aria-invalid", "true");
  }
  function clearError(field) {
    if (!field) return;
    field.classList.remove("is-invalid");
    var err = field.querySelector(".field-error");
    var input = field.querySelector("input, select, textarea");
    if (err) err.hidden = true;
    if (input) input.removeAttribute("aria-invalid");
  }

  if (form) {
    form.querySelectorAll(".field-error").forEach(function (err) {
      err.hidden = true;
    });
    form.querySelectorAll("input, select, textarea").forEach(function (inp) {
      inp.addEventListener("input", function () {
        clearError(inp.closest(".field"));
      });
      inp.addEventListener("change", function () {
        clearError(inp.closest(".field"));
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.querySelectorAll(".field").forEach(clearError);
      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      var consent = form.querySelector('[name="consent"]');
      var ok = true;
      var firstInvalid = null;
      if (!name || name.value.trim().length < 2) {
        setError(name && name.closest(".field"), "Укажите имя");
        ok = false;
        firstInvalid = firstInvalid || name;
      }
      if (!phone || !isValidPhone(phone.value)) {
        setError(phone && phone.closest(".field"), "Введите корректный телефон");
        ok = false;
        firstInvalid = firstInvalid || phone;
      }
      if (consent && !consent.checked) {
        setError(consent.closest(".field"), "Нужно согласие");
        ok = false;
        firstInvalid = firstInvalid || consent;
      }
      if (!ok) {
        if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Отправляем…";

      var payload = {
        name: name.value.trim(),
        phone: phone.value,
        message: (form.querySelector('[name="message"]') || {}).value || "",
        property: document.title,
        page: location.href,
        at: new Date().toISOString(),
      };
      try {
        var list = JSON.parse(localStorage.getItem("nest_leads") || "[]");
        list.push(payload);
        localStorage.setItem("nest_leads", JSON.stringify(list.slice(-50)));
      } catch (err) {}

      setTimeout(function () {
        var success = document.getElementById("book-success");
        if (success) {
          form.style.display = "none";
          success.classList.add("is-visible");
        } else {
          btn.textContent = "Заявка отправлена";
          setTimeout(function () {
            form.reset();
            btn.textContent = original;
            btn.disabled = false;
          }, 2400);
        }
      }, 600);
    });
  }

  /* Share */
  var shareTg = document.getElementById("share-tg");
  var shareCopy = document.getElementById("share-copy");
  if (shareTg) {
    shareTg.href =
      "https://t.me/share/url?url=" +
      encodeURIComponent(location.href) +
      "&text=" +
      encodeURIComponent(document.title);
  }
  if (shareCopy) {
    shareCopy.addEventListener("click", function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href).then(function () {
          shareCopy.textContent = window.NestI18n
            ? window.NestI18n.t("propPage.copied")
            : "Ссылка скопирована";
          setTimeout(function () {
            shareCopy.textContent = window.NestI18n
              ? window.NestI18n.t("propPage.copy")
              : "Копировать ссылку";
          }, 2000);
        });
      }
    });
  }

  /* Fav on detail */
  var favBtn = document.getElementById("prop-fav");
  var propId = document.body.getAttribute("data-prop-id");
  if (favBtn && propId) {
    function getFavs() {
      try {
        return JSON.parse(localStorage.getItem("nest_favorites") || "[]");
      } catch (e) {
        return [];
      }
    }
    function sync() {
      var on = getFavs().indexOf(propId) !== -1;
      favBtn.classList.toggle("is-active", on);
      favBtn.setAttribute("aria-pressed", on ? "true" : "false");
      favBtn.textContent = on
        ? window.NestI18n
          ? window.NestI18n.t("propPage.favOn")
          : "В избранном"
        : window.NestI18n
          ? window.NestI18n.t("propPage.fav")
          : "В избранное";
    }
    favBtn.addEventListener("click", function () {
      var arr = getFavs();
      var i = arr.indexOf(propId);
      if (i === -1) arr.push(propId);
      else arr.splice(i, 1);
      localStorage.setItem("nest_favorites", JSON.stringify(arr));
      sync();
    });
    sync();
    window.addEventListener("nest:lang", sync);
  }

  /* Mobile bar hide near form */
  var mobileBar = document.getElementById("mobile-bar");
  var book = document.getElementById("book");
  function updateBar() {
    if (!mobileBar) return;
    if (window.innerWidth > 960) {
      mobileBar.classList.remove("is-visible");
      return;
    }
    var near = false;
    if (book) {
      var r = book.getBoundingClientRect();
      near = r.top < window.innerHeight * 0.9 && r.bottom > 0;
    }
    mobileBar.classList.toggle("is-visible", window.scrollY > 200 && !near);
    document.body.classList.toggle("has-mobile-bar", mobileBar.classList.contains("is-visible"));
  }
  window.addEventListener("scroll", updateBar, { passive: true });
  window.addEventListener("resize", updateBar);
  updateBar();

  function showToast(msg) {
    var toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  document.querySelectorAll("[data-stub-msg]").forEach(function (el) {
    var href = el.getAttribute("href") || "";
    if (href && href !== "#" && href.indexOf("javascript:") !== 0) return;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      showToast(window.NestI18n ? window.NestI18n.t("stub.msg") : "Мессенджер недоступен");
    });
  });

  /* Map: ensure iframe is visible; skeleton until load */
  document.querySelectorAll(".prop-map").forEach(function (map) {
    var iframe = map.querySelector("iframe");
    var fallback = map.querySelector(".prop-map__fallback");
    if (!iframe) return;

    map.classList.add("is-loaded");
    if (fallback) fallback.hidden = true;

    iframe.addEventListener("error", function () {
      map.classList.add("is-error");
      map.classList.remove("is-loaded");
      if (fallback) {
        fallback.hidden = false;
        fallback.textContent = window.NestI18n
          ? window.NestI18n.t("propPage.mapError")
          : "Карта недоступна. Район указан в описании объекта.";
      }
    });
  });

  /* Hide field errors until validation */
  if (form) {
    form.querySelectorAll(".field-error").forEach(function (err) {
      err.hidden = true;
    });
  }
})();
