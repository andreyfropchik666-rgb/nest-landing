(function () {
  "use strict";

  /* —— Config (replace with real endpoints/handles) —— */
  /* Portfolio demo: no live CRM / messengers */
  var CONFIG = {
    formEndpoint: "",
  };

  var header = document.getElementById("header");
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("nav");
  var form = document.getElementById("lead-form");
  var stats = document.getElementById("stats");
  var searchForm = document.querySelector(".search-form");
  var counted = false;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ========== HEADER + PAGE PROGRESS + HERO PARALLAX ========== */
  var hero = document.querySelector(".hero");
  var heroMediaImg = hero ? hero.querySelector(".hero__media img") : null;
  var pageProgressBar = document.getElementById("page-progress-bar");
  var scrollRaf = 0;

  var isPropertyPage = document.body.classList.contains("page-property");

  function onScrollChrome() {
    var y = window.scrollY || 0;

    if (header) {
      header.classList.toggle("is-scrolled", y > 8);
      /* Property pages: always solid. Main: solid after hero. */
      var solid = true;
      if (!isPropertyPage && hero) {
        var heroBottom = hero.offsetTop + hero.offsetHeight - 80;
        solid = y > heroBottom - (header.offsetHeight || 64);
      }
      if (isPropertyPage) solid = true;
      header.classList.toggle("is-solid", solid);
    }

    if (pageProgressBar) {
      var doc = document.documentElement;
      var max = Math.max(1, doc.scrollHeight - window.innerHeight);
      var pct = Math.min(100, Math.max(0, (y / max) * 100));
      pageProgressBar.style.height = pct + "%";
    }

    /* Subtle hero parallax (content speed 1x, image ~0.4x visual lag via translate) */
    if (heroMediaImg && hero && !reducedMotion) {
      var rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        var shift = Math.min(80, Math.max(-40, -rect.top * 0.22));
        heroMediaImg.style.transform =
          "scale(1.08) translate3d(0, " + shift + "px, 0)";
      }
    }
  }

  function onScrollChromeRaf() {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(function () {
      scrollRaf = 0;
      onScrollChrome();
    });
  }

  window.addEventListener("scroll", onScrollChromeRaf, { passive: true });
  window.addEventListener("resize", onScrollChromeRaf, { passive: true });
  onScrollChrome();

  /* Hero entrance */
  if (hero) {
    if (reducedMotion) {
      hero.classList.add("is-ready");
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          hero.classList.add("is-ready");
        });
      });
    }
  }

  /* ========== CUSTOM CURSOR (desktop only) ========== */
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var cursorDot = document.getElementById("cursor-dot");
  var cursorRing = document.getElementById("cursor-ring");
  var cursorLabel = document.getElementById("cursor-label");

  if (
    finePointer &&
    !reducedMotion &&
    cursorDot &&
    cursorRing
  ) {
    document.body.classList.add("has-custom-cursor");
    var mx = window.innerWidth / 2;
    var my = window.innerHeight / 2;
    var rx = mx;
    var ry = my;
    var cursorRaf = 0;

    function tickCursor() {
      cursorRaf = 0;
      /* ~120ms lag feel */
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      cursorDot.style.transform =
        "translate3d(" + mx + "px, " + my + "px, 0) translate(-50%, -50%)";
      cursorRing.style.transform =
        "translate3d(" + rx + "px, " + ry + "px, 0) translate(-50%, -50%)";
      if (cursorLabel) {
        cursorLabel.style.transform =
          "translate3d(" + rx + "px, " + ry + "px, 0) translate(-50%, -50%)";
      }
      cursorRaf = requestAnimationFrame(tickCursor);
    }
    cursorRaf = requestAnimationFrame(tickCursor);

    document.addEventListener(
      "pointermove",
      function (e) {
        mx = e.clientX;
        my = e.clientY;
      },
      { passive: true }
    );

    function setCursorHover(on, card) {
      document.body.classList.toggle("cursor-hover", on && !card);
      document.body.classList.toggle("cursor-hover-card", on && !!card);
    }

    document.addEventListener(
      "pointerover",
      function (e) {
        var t = e.target;
        if (!t || !t.closest) return;
        var card = t.closest(".property-card, .district-card");
        var interactive = t.closest(
          "a, button, [role='button'], input, select, textarea, label, .process-col, .why-item, .faq-item__q"
        );
        if (card) setCursorHover(true, true);
        else if (interactive) setCursorHover(true, false);
      },
      true
    );

    document.addEventListener(
      "pointerout",
      function (e) {
        var t = e.target;
        if (!t || !t.closest) return;
        var related = e.relatedTarget;
        if (related && related.closest) {
          if (
            related.closest(
              "a, button, [role='button'], input, select, textarea, label, .property-card, .district-card, .process-col, .why-item, .faq-item__q"
            )
          ) {
            return;
          }
        }
        setCursorHover(false, false);
      },
      true
    );
  } else {
    if (cursorDot) cursorDot.style.display = "none";
    if (cursorRing) cursorRing.style.display = "none";
    if (cursorLabel) cursorLabel.style.display = "none";
  }

  /* ========== MOBILE MENU ========== */
  function closeMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню");
    nav.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Закрыть меню");
    nav.classList.add("is-open");
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

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
      closeQuiz();
      closeLightbox();
    }
  });

  /* ========== SCROLL SPY ========== */
  var navLinks = document.querySelectorAll(".nav__link[href^='#']");
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    var el = document.getElementById(id);
    if (el) sections.push({ id: id, el: el, link: link });
  });

  function updateSpy() {
    if (!sections.length) return;
    var y = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.el.offsetTop <= y) current = s;
    });
    sections.forEach(function (s) {
      s.link.classList.toggle("is-active", s === current);
      var dot = s.link.querySelector(".nav__dot");
      if (s === current) {
        if (!dot) {
          var d = document.createElement("span");
          d.className = "nav__dot";
          d.setAttribute("aria-hidden", "true");
          s.link.prepend(d);
        }
      } else if (dot) {
        dot.remove();
      }
    });
  }
  window.addEventListener("scroll", updateSpy, { passive: true });
  updateSpy();

  /* ========== REVEAL ========== */
  /* Ensure key blocks participate in scroll-reveal */
  document
    .querySelectorAll(
      ".section-head, .process-head, .answers-split, .reviews-split, .cta-lead__grid, .properties__head"
    )
    .forEach(function (el) {
      if (!el.classList.contains("reveal")) el.classList.add("reveal");
    });

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !reducedMotion) {
    var rio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            rio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      rio.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ========== COUNTERS ========== */
  /* Final values are in HTML for no-JS / first paint; animate from 0 only when in view. */
  function formatCountValue(value, target, suffix) {
    if (target >= 1000) {
      return value.toLocaleString("ru-RU") + suffix;
    }
    return value + suffix;
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = reducedMotion ? 0 : 1800;
    var start = performance.now();

    if (duration === 0) {
      el.textContent = formatCountValue(target, target, suffix);
      return;
    }

    el.textContent = formatCountValue(0, target, suffix);

    function frame(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var value = Math.round(target * eased);
      el.textContent = formatCountValue(value, target, suffix);
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = formatCountValue(target, target, suffix);
    }
    requestAnimationFrame(frame);
  }

  function runCounters() {
    if (counted) return;
    counted = true;
    document.querySelectorAll(".js-count").forEach(animateCount);
  }

  if (stats && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounters();
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(stats);
  } else if (stats) {
    runCounters();
  }

  /* ========== PHONE MASK ========== */
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

  function bindPhoneMask(input) {
    if (!input) return;
    input.addEventListener("input", function () {
      var pos = input.selectionStart;
      var before = input.value.length;
      input.value = formatPhone(input.value);
      var after = input.value.length;
      if (document.activeElement === input) {
        try {
          input.setSelectionRange(pos + (after - before), pos + (after - before));
        } catch (e) {}
      }
    });
    input.addEventListener("focus", function () {
      if (!input.value) input.value = "+7 (";
    });
    input.addEventListener("blur", function () {
      if (digitsOnly(input.value).length <= 1) input.value = "";
    });
  }

  document.querySelectorAll('input[type="tel"]').forEach(bindPhoneMask);

  /* ========== FORM HELPERS ========== */
  function setFieldError(field, msg) {
    if (!field) return;
    field.classList.add("is-invalid");
    var input = field.querySelector("input, select, textarea");
    var err = field.querySelector(".field-error");
    if (err) {
      err.textContent = msg || "Проверьте поле";
      err.hidden = false;
    }
    if (input) {
      input.setAttribute("aria-invalid", "true");
    }
  }

  function clearFieldError(field) {
    if (!field) return;
    field.classList.remove("is-invalid");
    var input = field.querySelector("input, select, textarea");
    var err = field.querySelector(".field-error");
    if (err) err.hidden = true;
    if (input) input.removeAttribute("aria-invalid");
  }

  function clearFormErrors(formEl) {
    formEl.querySelectorAll(".field").forEach(clearFieldError);
  }

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

  function saveLead(payload) {
    try {
      var key = "nest_leads";
      var list = JSON.parse(localStorage.getItem(key) || "[]");
      list.push(Object.assign({ at: new Date().toISOString() }, payload));
      localStorage.setItem(key, JSON.stringify(list.slice(-50)));
    } catch (e) {}
  }

  function submitLead(payload, btn) {
    return new Promise(function (resolve, reject) {
      saveLead(payload);
      if (!CONFIG.formEndpoint) {
        setTimeout(function () {
          resolve({ ok: true, demo: true });
        }, 700);
        return;
      }
      fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          if (!r.ok) throw new Error("fail");
          return r.json().catch(function () {
            return {};
          });
        })
        .then(resolve)
        .catch(reject);
    });
  }

  function handleLeadForm(formEl, options) {
    if (!formEl) return;
    options = options || {};

    /* Errors hidden until validation fails */
    formEl.querySelectorAll(".field-error").forEach(function (err) {
      err.hidden = true;
    });

    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      clearFormErrors(formEl);

      var nameInput = formEl.querySelector('[name="name"]');
      var phoneInput = formEl.querySelector('[name="phone"]');
      var consent = formEl.querySelector('[name="consent"]');
      var nameField = nameInput && nameInput.closest(".field");
      var phoneField = phoneInput && phoneInput.closest(".field");
      var consentField = consent && consent.closest(".field");
      var ok = true;
      var i18n = window.NestI18n;
      var firstInvalid = null;

      if (!nameInput || nameInput.value.trim().length < 2) {
        setFieldError(nameField, i18n ? i18n.t("contact.errName") : "Укажите имя");
        ok = false;
        firstInvalid = firstInvalid || nameInput;
      }
      if (!phoneInput || !isValidPhone(phoneInput.value)) {
        setFieldError(phoneField, i18n ? i18n.t("contact.errPhone") : "Введите корректный телефон");
        ok = false;
        firstInvalid = firstInvalid || phoneInput;
      }
      if (consent && !consent.checked) {
        setFieldError(consentField, i18n ? i18n.t("contact.errConsent") : "Нужно согласие");
        ok = false;
        firstInvalid = firstInvalid || consent;
      }
      if (!ok) {
        if (firstInvalid && typeof firstInvalid.focus === "function") {
          try {
            firstInvalid.focus({ preventScroll: false });
          } catch (err) {
            firstInvalid.focus();
          }
        }
        return;
      }

      var btn = formEl.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : "";
      if (btn) {
        btn.classList.add("is-loading");
        btn.disabled = true;
        btn.textContent = "Отправляем…";
      }

      var fd = new FormData(formEl);
      var payload = {};
      fd.forEach(function (v, k) {
        payload[k] = v;
      });
      payload.source = options.source || "lead-form";
      payload.page = location.href;

      submitLead(payload, btn)
        .then(function () {
          var success = formEl.parentElement.querySelector(".form-success");
          if (success) {
            formEl.style.display = "none";
            success.classList.add("is-visible");
          } else if (btn) {
            btn.textContent = "Заявка отправлена";
            showToast(window.NestI18n ? window.NestI18n.t("toast.lead") : "Заявка принята");
            setTimeout(function () {
              formEl.reset();
              btn.textContent = original;
              btn.disabled = false;
              btn.classList.remove("is-loading");
            }, 2800);
          }
          if (typeof options.onSuccess === "function") options.onSuccess(payload);
          if (window.ym) {
            try {
              ym(0, "reachGoal", "lead_submit");
            } catch (err) {}
          }
        })
        .catch(function () {
          showToast("Не удалось отправить. Позвоните нам");
          if (btn) {
            btn.textContent = original;
            btn.disabled = false;
            btn.classList.remove("is-loading");
          }
        });
    });

    formEl.querySelectorAll("input, select, textarea").forEach(function (inp) {
      inp.addEventListener("input", function () {
        clearFieldError(inp.closest(".field"));
      });
      inp.addEventListener("change", function () {
        clearFieldError(inp.closest(".field"));
      });
    });
  }

  handleLeadForm(form, { source: "contact" });

  /* ========== PROPERTY FILTER ========== */
  var cards = Array.prototype.slice.call(document.querySelectorAll(".property-card[data-id]"));
  var emptyEl = document.getElementById("properties-empty");
  var countEl = document.getElementById("filter-count");
  var chipsEl = document.getElementById("filter-chips");
  var locationSelect = document.getElementById("location");
  var typeSelect = document.getElementById("type");
  var priceSelect = document.getElementById("price");

  var PRICE_LABELS = {
    "10": "до 10 млн ₽",
    "20": "10–20 млн ₽",
    "40": "20–40 млн ₽",
    "40plus": "от 40 млн ₽",
  };
  var LOC_LABELS = {
    center: "Центр",
    west: "Запад",
    north: "Север",
    south: "Юг",
    east: "Восток",
  };
  var TYPE_LABELS = {
    apartment: "Квартира",
    house: "Дом",
    newbuild: "Новостройка",
    penthouse: "Пентхаус",
  };

  function getFiltersFromUI() {
    return {
      location: locationSelect ? locationSelect.value : "",
      type: typeSelect ? typeSelect.value : "",
      price: priceSelect ? priceSelect.value : "",
    };
  }

  function getFiltersFromURL() {
    var p = new URLSearchParams(location.search);
    return {
      location: p.get("location") || "",
      type: p.get("type") || "",
      price: p.get("price") || "",
    };
  }

  function writeFiltersToURL(f) {
    var p = new URLSearchParams();
    if (f.location) p.set("location", f.location);
    if (f.type) p.set("type", f.type);
    if (f.price) p.set("price", f.price);
    var qs = p.toString();
    var url = location.pathname + (qs ? "?" + qs : "") + (location.hash || "#properties");
    if (!location.hash || location.hash === "#top") {
      url = location.pathname + (qs ? "?" + qs : "") + "#properties";
    }
    history.replaceState(null, "", url);
  }

  function matchPrice(cardPrice, filter) {
    if (!filter) return true;
    var price = parseFloat(cardPrice);
    if (filter === "10") return price < 10;
    if (filter === "20") return price >= 10 && price < 20;
    if (filter === "40") return price >= 20 && price < 40;
    if (filter === "40plus") return price >= 40;
    return true;
  }

  var propertyGrid = document.getElementById("property-grid");

  function applyFilters(f, pushUrl) {
    if (!cards.length) return;
    var visible = 0;
    cards.forEach(function (card) {
      var loc = card.getAttribute("data-location") || "";
      var type = card.getAttribute("data-type") || "";
      var types = type.split(/\s+/);
      var price = card.getAttribute("data-price") || "0";
      var okLoc = !f.location || loc === f.location;
      var okType = !f.type || types.indexOf(f.type) !== -1;
      var okPrice = matchPrice(price, f.price);
      var show = okLoc && okType && okPrice;
      card.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });

    /* Empty vs grid: exclusive if/else, never both */
    var isEmpty = visible === 0;
    if (emptyEl) {
      emptyEl.hidden = !isEmpty;
      emptyEl.classList.toggle("is-visible", isEmpty);
    }
    if (propertyGrid) {
      propertyGrid.hidden = isEmpty;
      propertyGrid.setAttribute("aria-hidden", isEmpty ? "true" : "false");
    }
    var i18n = window.NestI18n;
    if (countEl) {
      if (i18n) {
        countEl.textContent =
          visible === cards.length
            ? i18n.t("prop.count", { n: cards.length })
            : i18n.t("prop.countFound", { n: visible, total: cards.length });
      } else {
        countEl.textContent =
          visible === cards.length
            ? cards.length + " объектов"
            : "Найдено: " + visible + " из " + cards.length;
      }
    }

    var has = !!(f.location || f.type || f.price);
    var filterBar = document.getElementById("filter-bar");
    if (filterBar) filterBar.classList.toggle("is-active", has);

    if (chipsEl) {
      chipsEl.innerHTML = "";
      function addChip(key, label) {
        if (!f[key]) return;
        var chip = document.createElement("span");
        chip.className = "filter-chip";
        chip.innerHTML =
          label +
          ' <button type="button" aria-label="×">&times;</button>';
        chip.querySelector("button").addEventListener("click", function () {
          f[key] = "";
          if (key === "location" && locationSelect) locationSelect.value = "";
          if (key === "type" && typeSelect) typeSelect.value = "";
          if (key === "price" && priceSelect) priceSelect.value = "";
          applyFilters(f, true);
        });
        chipsEl.appendChild(chip);
      }
      var locL = i18n
        ? {
            center: i18n.t("search.center"),
            west: i18n.t("search.west"),
            north: i18n.t("search.north"),
            south: i18n.t("search.south"),
            east: i18n.t("search.east"),
          }
        : LOC_LABELS;
      var typeL = i18n
        ? {
            apartment: i18n.t("search.apartment"),
            house: i18n.t("search.house"),
            newbuild: i18n.t("search.newbuild"),
            penthouse: i18n.t("search.penthouse"),
          }
        : TYPE_LABELS;
      var priceL = i18n
        ? {
            "10": i18n.t("search.p10"),
            "20": i18n.t("search.p20"),
            "40": i18n.t("search.p40"),
            "40plus": i18n.t("search.p40p"),
          }
        : PRICE_LABELS;
      addChip("location", locL[f.location] || f.location);
      addChip("type", typeL[f.type] || f.type);
      addChip("price", priceL[f.price] || f.price);

      var reset = document.getElementById("filter-reset");
      if (reset) reset.hidden = !has;
    }

    if (pushUrl) writeFiltersToURL(f);
  }

  function syncSelects(f) {
    if (locationSelect) locationSelect.value = f.location || "";
    if (typeSelect) typeSelect.value = f.type || "";
    if (priceSelect) priceSelect.value = f.price || "";
  }

  if (cards.length) {
    var initial = getFiltersFromURL();
    syncSelects(initial);
    applyFilters(initial, false);

    if (searchForm) {
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var f = getFiltersFromUI();
        applyFilters(f, true);
        var props = document.getElementById("properties");
        if (props) props.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      });
    }

    [locationSelect, typeSelect, priceSelect].forEach(function (sel) {
      if (!sel) return;
      sel.addEventListener("change", function () {
        applyFilters(getFiltersFromUI(), true);
      });
    });

    var resetBtn = document.getElementById("filter-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", function (e) {
        e.preventDefault();
        syncSelects({ location: "", type: "", price: "" });
        applyFilters({ location: "", type: "", price: "" }, true);
      });
    }
  }

  /* ========== FAVORITES ========== */
  var FAV_KEY = "nest_favorites";

  function getFavs() {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function setFavs(arr) {
    localStorage.setItem(FAV_KEY, JSON.stringify(arr));
  }

  function isFav(id) {
    return getFavs().indexOf(id) !== -1;
  }

  function toggleFav(id) {
    var arr = getFavs();
    var i = arr.indexOf(id);
    if (i === -1) {
      arr.push(id);
      setFavs(arr);
      return true;
    }
    arr.splice(i, 1);
    setFavs(arr);
    return false;
  }

  function syncFavButtons() {
    var i18n = window.NestI18n;
    document.querySelectorAll(".property-card__fav").forEach(function (btn) {
      var id = btn.getAttribute("data-fav");
      var on = isFav(id);
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        on
          ? i18n
            ? i18n.t("prop.favOn")
            : "Убрать из избранного"
          : i18n
            ? i18n.t("prop.fav")
            : "В избранное"
      );
    });
  }

  document.querySelectorAll(".property-card__fav").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var id = btn.getAttribute("data-fav");
      var on = toggleFav(id);
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      var i18n = window.NestI18n;
      showToast(
        on
          ? (i18n ? i18n.t("toast.favOn") : "Добавлено в избранное")
          : (i18n ? i18n.t("toast.favOff") : "Удалено из избранного")
      );
    });
  });
  syncFavButtons();

  /* ========== FAQ ========== */
  document.querySelectorAll(".faq-item__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var open = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach(function (el) {
        el.classList.remove("is-open");
        var q = el.querySelector(".faq-item__q");
        if (q) q.setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ========== MORTGAGE ========== */
  var mPrice = document.getElementById("m-price");
  var mDown = document.getElementById("m-down");
  var mYears = document.getElementById("m-years");
  var mRate = document.getElementById("m-rate");
  var mPayment = document.getElementById("m-payment");
  var mPriceVal = document.getElementById("m-price-val");
  var mDownVal = document.getElementById("m-down-val");
  var mYearsVal = document.getElementById("m-years-val");
  var mRateVal = document.getElementById("m-rate-val");
  var mCalcBtn = document.getElementById("m-calc-btn");
  var mResult = document.getElementById("m-result");

  var payAnimId = 0;
  var payDisplay = 0;

  function formatPay(n) {
    var i18n = window.NestI18n;
    var perMo = i18n ? i18n.t("mortgage.perMonth") : "₽/мес";
    var loc = i18n && i18n.getLang() === "en" ? "en-US" : "ru-RU";
    return Math.round(n).toLocaleString(loc) + " " + perMo;
  }

  function animatePayTo(target, instant) {
    if (!mPayment) return;
    if (instant || reducedMotion) {
      payDisplay = target;
      mPayment.textContent = formatPay(target);
      return;
    }
    var from = payDisplay > 0 ? payDisplay : target;
    var start = performance.now();
    var dur = 380;
    if (payAnimId) cancelAnimationFrame(payAnimId);

    function frame(now) {
      var t = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      payDisplay = from + (target - from) * eased;
      mPayment.textContent = formatPay(payDisplay);
      if (t < 1) payAnimId = requestAnimationFrame(frame);
      else {
        payDisplay = target;
        mPayment.textContent = formatPay(target);
      }
    }
    payAnimId = requestAnimationFrame(frame);
  }

  function calcMortgage(opts) {
    if (!mPrice || !mPayment) return;
    opts = opts || {};
    var price = parseFloat(mPrice.value) * 1000000;
    var downPct = parseFloat(mDown.value) / 100;
    var years = parseFloat(mYears.value);
    var rate = parseFloat(mRate.value) / 100 / 12;
    var principal = price * (1 - downPct);
    var n = years * 12;
    var pay =
      rate === 0
        ? principal / n
        : (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    var rounded = Math.round(pay);
    var i18n = window.NestI18n;
    var mln = i18n ? i18n.t("meta.mln") : "млн ₽";
    var yearsU = i18n ? i18n.t("mortgage.yearsUnit") : "лет";
    mPayment.setAttribute("data-raw-pay", String(rounded));
    animatePayTo(rounded, !!opts.instant);
    if (mPriceVal) mPriceVal.textContent = parseFloat(mPrice.value).toFixed(1) + " " + mln;
    if (mDownVal) mDownVal.textContent = mDown.value + "%";
    if (mYearsVal) mYearsVal.textContent = mYears.value + " " + yearsU;
    if (mRateVal) mRateVal.textContent = parseFloat(mRate.value).toFixed(1) + "%";

    if (opts.pulse && mResult) {
      mResult.classList.remove("is-pulse");
      void mResult.offsetWidth;
      mResult.classList.add("is-pulse");
    }
  }

  /* Seed display from HTML default so first paint matches calculation */
  if (mPayment) {
    var seed = parseFloat(mPayment.getAttribute("data-raw-pay") || "0");
    if (seed > 0) payDisplay = seed;
  }

  function updateRangeFill(el) {
    if (!el) return;
    var min = parseFloat(el.min) || 0;
    var max = parseFloat(el.max) || 100;
    var val = parseFloat(el.value) || 0;
    var pct = max === min ? 0 : ((val - min) / (max - min)) * 100;
    el.style.setProperty("--range-progress", pct + "%");
  }

  [mPrice, mDown, mYears, mRate].forEach(function (el) {
    if (!el) return;
    updateRangeFill(el);
    el.addEventListener("input", function () {
      updateRangeFill(el);
      calcMortgage();
    });
  });
  if (mCalcBtn) {
    mCalcBtn.addEventListener("click", function () {
      calcMortgage({ pulse: true });
    });
  }
  /* Compute immediately on load (not on button click only) */
  calcMortgage({ instant: true });
  window.addEventListener("nest:lang", function () {
    calcMortgage({ instant: true });
  });

  /* ========== QUIZ ========== */
  var quizOverlay = document.getElementById("quiz-overlay");
  var quizState = { step: 0, answers: {}, type: "", budget: "", district: "", timing: "" };
  var quizSteps = document.querySelectorAll(".quiz__step");
  var quizBar = document.getElementById("quiz-progress");

  function openQuiz() {
    if (!quizOverlay) return;
    quizOverlay.classList.add("is-open");
    quizOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    goQuizStep(0);
    var first = quizOverlay.querySelector(".quiz__close");
    if (first) first.focus();
  }

  function closeQuiz() {
    if (!quizOverlay) return;
    quizOverlay.classList.remove("is-open");
    quizOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function goQuizStep(n) {
    quizState.step = n;
    quizSteps.forEach(function (s, i) {
      s.classList.toggle("is-active", i === n);
    });
    if (quizBar) {
      quizBar.style.width = ((n + 1) / quizSteps.length) * 100 + "%";
    }
  }

  document.querySelectorAll("[data-open-quiz]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openQuiz();
    });
  });

  if (quizOverlay) {
    quizOverlay.addEventListener("click", function (e) {
      if (e.target === quizOverlay) closeQuiz();
    });
    var closeBtn = quizOverlay.querySelector(".quiz__close");
    if (closeBtn) closeBtn.addEventListener("click", closeQuiz);

    quizOverlay.querySelectorAll(".quiz__option").forEach(function (opt) {
      opt.addEventListener("click", function () {
        var step = opt.closest(".quiz__step");
        var key = step.getAttribute("data-key");
        step.querySelectorAll(".quiz__option").forEach(function (o) {
          o.classList.remove("is-selected");
        });
        opt.classList.add("is-selected");
        quizState.answers[key] = opt.getAttribute("data-value");
        quizState[key] = opt.getAttribute("data-value");
      });
    });

    quizOverlay.querySelectorAll("[data-quiz-next]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var step = quizSteps[quizState.step];
        var key = step.getAttribute("data-key");
        if (key && key !== "contact" && !quizState.answers[key]) {
          showToast(window.NestI18n ? window.NestI18n.t("toast.pick") : "Выберите вариант");
          return;
        }
        if (quizState.step < quizSteps.length - 1) {
          goQuizStep(quizState.step + 1);
        }
      });
    });

    quizOverlay.querySelectorAll("[data-quiz-back]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (quizState.step > 0) goQuizStep(quizState.step - 1);
      });
    });

    var quizForm = document.getElementById("quiz-form");
    handleLeadForm(quizForm, {
      source: "quiz",
      onSuccess: function (payload) {
        payload.quiz = quizState.answers;
        saveLead({ type: "quiz", answers: quizState.answers, contact: payload });
      },
    });

    if (quizForm) {
      quizForm.addEventListener("submit", function () {
        var hidden = quizForm.querySelector('[name="quiz_answers"]');
        if (hidden) hidden.value = JSON.stringify(quizState.answers);
      });
    }
  }

  /* ========== MOBILE STICKY BAR ========== */
  var mobileBar = document.getElementById("mobile-bar");
  var contactSec = document.getElementById("contact");
  var heroSec = document.querySelector(".hero");

  function updateMobileBar() {
    if (!mobileBar) return;
    if (window.innerWidth > 960) {
      mobileBar.classList.remove("is-visible");
      document.body.classList.remove("has-mobile-bar");
      return;
    }
    var pastHero = heroSec
      ? window.scrollY > heroSec.offsetHeight * 0.55
      : window.scrollY > 400;
    var nearForm = false;
    if (contactSec) {
      var rect = contactSec.getBoundingClientRect();
      nearForm = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    }
    var show = pastHero && !nearForm;
    mobileBar.classList.toggle("is-visible", show);
    document.body.classList.toggle("has-mobile-bar", show);
  }
  window.addEventListener("scroll", updateMobileBar, { passive: true });
  window.addEventListener("resize", updateMobileBar);
  updateMobileBar();

  if (mobileBar) {
    var leadBtn = mobileBar.querySelector("[data-scroll-contact]");
    if (leadBtn) {
      leadBtn.addEventListener("click", function () {
        var c = document.getElementById("contact");
        if (c) c.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      });
    }
  }

  /* ========== LIGHTBOX (global for property pages if main.js loaded) ========== */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbCounter = document.getElementById("lightbox-counter");
  var lbSources = [];
  var lbIndex = 0;

  function openLightbox(sources, index) {
    if (!lightbox || !lbImg) return;
    lbSources = sources || [];
    lbIndex = index || 0;
    updateLightbox();
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

  function updateLightbox() {
    if (!lbImg || !lbSources.length) return;
    lbImg.src = lbSources[lbIndex];
    if (lbCounter) lbCounter.textContent = lbIndex + 1 + " / " + lbSources.length;
  }

  function lbNext() {
    if (!lbSources.length) return;
    lbIndex = (lbIndex + 1) % lbSources.length;
    updateLightbox();
  }

  function lbPrev() {
    if (!lbSources.length) return;
    lbIndex = (lbIndex - 1 + lbSources.length) % lbSources.length;
    updateLightbox();
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
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "ArrowRight") lbNext();
      if (e.key === "ArrowLeft") lbPrev();
    });
  }

  window.NestLightbox = { open: openLightbox, close: closeLightbox };

  /* Prefill interest from mortgage / quiz / district links */
  document.querySelectorAll("[data-prefill-interest]").forEach(function (el) {
    el.addEventListener("click", function () {
      var interest = document.getElementById("interest");
      var val = el.getAttribute("data-prefill-interest");
      if (interest && val) interest.value = val;
    });
  });

  document.querySelectorAll("[data-prefill-message]").forEach(function (el) {
    el.addEventListener("click", function () {
      var msg = document.getElementById("message");
      var val = el.getAttribute("data-prefill-message");
      if (msg && val) {
        msg.value = val;
      }
    });
  });

  document.querySelectorAll("[data-filter-location]").forEach(function (el) {
    el.addEventListener("click", function () {
      var loc = el.getAttribute("data-filter-location") || "";
      if (locationSelect) locationSelect.value = loc;
      applyFilters(getFiltersFromUI(), true);
    });
  });

  /* Legacy stub handlers (if any remain without real href) */
  document.querySelectorAll("[data-stub-msg]").forEach(function (el) {
    var href = el.getAttribute("href") || "";
    if (href && href !== "#" && href.indexOf("javascript:") !== 0) return;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      showToast(window.NestI18n ? window.NestI18n.t("stub.msg") : "Мессенджер недоступен");
    });
  });

  window.addEventListener("nest:lang", function () {
    if (cards.length) applyFilters(getFiltersFromUI(), false);
    syncFavButtons();
    setupReviewsMarquee();
  });

  /* ========== REVIEWS MARQUEE (vertical loop) ========== */
  function setupReviewsMarquee() {
    var track = document.querySelector(".reviews-marquee__track");
    var group = document.querySelector(".reviews-marquee__group:not(.is-clone)");
    if (!track || !group) return;

    track.querySelectorAll(".reviews-marquee__group.is-clone").forEach(function (el) {
      el.remove();
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    var clone = group.cloneNode(true);
    clone.classList.add("is-clone");
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("[id]").forEach(function (el) {
      el.removeAttribute("id");
    });
    track.appendChild(clone);
  }

  setupReviewsMarquee();

  /* ========== WHY list stagger (once) ========== */
  var whyList = document.getElementById("why-list");
  if (whyList) {
    if (reducedMotion) {
      whyList.classList.add("is-inview");
    } else if ("IntersectionObserver" in window) {
      var whyIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            whyList.classList.add("is-inview");
            whyIo.unobserve(whyList);
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
      );
      whyIo.observe(whyList);
    } else {
      whyList.classList.add("is-inview");
    }
  }

  /* ========== PROCESS sequential activation (once, scroll-driven) ========== */
  var processSection = document.getElementById("process");
  var processCols = document.querySelectorAll("#process-cols .process-col");
  var processMaxStep = -1;
  var processDone = false;

  function setProcessStep(step) {
    if (!processCols.length) return;
    if (step <= processMaxStep) return;
    processMaxStep = step;
    processCols.forEach(function (col, i) {
      col.classList.toggle("is-active", i <= step);
    });
    if (step >= processCols.length - 1) {
      processDone = true;
    }
  }

  function updateProcessFromScroll() {
    if (processDone || !processSection || !processCols.length) return;
    var rect = processSection.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    /* Map section travel through viewport → 0..1 (forward only) */
    var start = vh * 0.72;
    var end = vh * 0.28;
    var focus = rect.top + rect.height * 0.38;
    var t = (start - focus) / (start - end);
    if (t < 0) t = 0;
    if (t > 1) t = 1;
    /* thresholds: 0.08→0, 0.32→1, 0.56→2, 0.8→3 */
    var step = -1;
    if (t >= 0.08) step = 0;
    if (t >= 0.32) step = 1;
    if (t >= 0.56) step = 2;
    if (t >= 0.8) step = 3;
    if (step >= 0) setProcessStep(step);
  }

  if (processSection && processCols.length) {
    if (reducedMotion) {
      setProcessStep(processCols.length - 1);
    } else {
      var processRaf = 0;
      function onProcessScroll() {
        if (processRaf) return;
        processRaf = requestAnimationFrame(function () {
          processRaf = 0;
          updateProcessFromScroll();
        });
      }
      window.addEventListener("scroll", onProcessScroll, { passive: true });
      window.addEventListener("resize", onProcessScroll, { passive: true });
      updateProcessFromScroll();

      /* Fallback: if section is already past, activate all once */
      if ("IntersectionObserver" in window) {
        var processIo = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              /* kick first column soon after enter if still none */
              if (processMaxStep < 0) {
                setTimeout(function () {
                  if (processMaxStep < 0) setProcessStep(0);
                }, 120);
              }
            });
          },
          { threshold: 0.2 }
        );
        processIo.observe(processSection);
      }
    }
  }
})();
