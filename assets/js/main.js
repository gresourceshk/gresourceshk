(function () {
  var toggle = document.querySelector(".menu-toggle");
  var navWrap = document.querySelector(".nav-wrap");
  if (toggle && navWrap) {
    toggle.addEventListener("click", function () {
      var open = navWrap.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll(".primary-nav > ul > li > a").forEach(function (a) {
    var li = a.parentElement;
    if (!li.querySelector(".sub-menu")) return;
    a.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width: 980px)").matches) {
        if (a.getAttribute("href") === "#" || a.getAttribute("href") === "#pll_switcher") {
          e.preventDefault();
        }
        li.classList.toggle("open");
      }
    });
  });

  var searchBtn = document.querySelector(".search-btn");
  var searchPanel = document.querySelector(".search-panel");
  if (searchBtn && searchPanel) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      searchPanel.classList.toggle("open");
      var input = searchPanel.querySelector("input");
      if (searchPanel.classList.contains("open") && input) input.focus();
    });
  }

  var form = document.querySelector(".search-panel form, form.search-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      var q = (form.querySelector("input[name='s'], input[type='search']") || {}).value || "";
      if (!form.getAttribute("action") || form.getAttribute("action") === "#") {
        e.preventDefault();
        var depth = document.body.getAttribute("data-depth") || "0";
        var prefix = depth === "1" ? "../" : depth === "2" ? "../../" : "";
        location.href = prefix + "search.html?q=" + encodeURIComponent(q);
      }
    });
  }

  /* Hero */
  var slides = document.querySelectorAll(".hero-slide");
  var dots = document.querySelectorAll(".hero-dots button");
  var idx = 0;
  var timer;
  function show(i) {
    if (!slides.length) return;
    idx = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle("active", n === idx); });
    dots.forEach(function (d, n) { d.classList.toggle("active", n === idx); d.setAttribute("aria-selected", n === idx ? "true" : "false"); });
  }
  function start() {
    stop();
    if (slides.length > 1) timer = setInterval(function () { show(idx + 1); }, 5000);
  }
  function stop() { if (timer) clearInterval(timer); }
  var prev = document.querySelector(".hero-arrow.prev");
  var next = document.querySelector(".hero-arrow.next");
  if (prev) prev.addEventListener("click", function () { show(idx - 1); start(); });
  if (next) next.addEventListener("click", function () { show(idx + 1); start(); });
  dots.forEach(function (d, n) {
    d.addEventListener("click", function () { show(n); start(); });
  });
  var hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mouseenter", stop);
    hero.addEventListener("mouseleave", start);
  }
  show(0);
  start();

  /* Year tabs */
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var buttons = root.querySelectorAll(".year-tabs button");
    var panels = root.querySelectorAll(".year-panel");
    function activate(id) {
      buttons.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-year") === id); });
      panels.forEach(function (p) { p.classList.toggle("active", p.id === "year-" + id); });
    }
    buttons.forEach(function (b) {
      b.addEventListener("click", function () { activate(b.getAttribute("data-year")); });
    });
    var first = buttons[0];
    if (first) activate(first.getAttribute("data-year"));
  });

  var topBtn = document.querySelector(".scroll-top");
  if (topBtn) {
    window.addEventListener("scroll", function () {
      topBtn.classList.toggle("show", window.scrollY > 400);
    });
    topBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* Delayed HKEX 1051 quote: Yahoo fetch first, Tencent script-tag fallback. */
  function initStockQuote() {
    var box = document.querySelector(".stock-box");
    if (!box) return;
    var locale = box.getAttribute("data-locale") || "en";
    var priceEl = box.querySelector(".stock-price");
    var changeEl = box.querySelector(".stock-change");
    var notes = box.querySelectorAll(".stock-note");
    var asofEl = notes.length > 1 ? notes[1] : null;
    var timer = null;
    var inflight = false;
    var monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function pad2(n) {
      return (n < 10 ? "0" : "") + n;
    }

    function hktFromDate(date) {
      var map = {};
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Hong_Kong",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).formatToParts(date).forEach(function (p) {
        map[p.type] = p.value;
      });
      var hour = map.hour === "24" ? 0 : +map.hour;
      return { y: +map.year, m: +map.month, d: +map.day, hh: hour, mm: +map.minute };
    }

    function hktFromTencent(str) {
      var m = /^(\d{4})\/(\d{1,2})\/(\d{1,2})[ T](\d{1,2}):(\d{2})/.exec(str || "");
      if (!m) return null;
      return { y: +m[1], m: +m[2], d: +m[3], hh: +m[4], mm: +m[5] };
    }

    function formatPct(pct) {
      var body = Math.abs(pct).toFixed(2) + "%";
      if (pct > 0) return "+" + body;
      if (pct < 0) return "\u2212" + body;
      return body;
    }

    function formatAsof(hkt) {
      var time = pad2(hkt.hh) + ":" + pad2(hkt.mm);
      if (locale === "zh") {
        return "延遲報價截至 " + hkt.y + "年" + hkt.m + "月" + hkt.d + "日 " + time + " 香港時間。";
      }
      if (locale === "cn") {
        return "延迟报价截至 " + hkt.y + "年" + hkt.m + "月" + hkt.d + "日 " + time + " 香港时间。";
      }
      return "Delayed quote as of " + hkt.d + " " + monthsEn[hkt.m - 1] + " " + hkt.y + " " + time + " HKT.";
    }

    function validQuote(q) {
      return q && isFinite(q.price) && q.price > 0 && isFinite(q.pct) && q.hkt &&
        q.hkt.y >= 2020 && q.hkt.m >= 1 && q.hkt.m <= 12;
    }

    function render(q) {
      if (!validQuote(q) || !priceEl || !changeEl) return;
      var priceTxt = q.price.toFixed(3);
      if (locale === "zh" || locale === "cn") {
        priceEl.textContent = priceTxt + " 港元";
      } else {
        priceEl.textContent = "HKD " + priceTxt;
      }
      var changeLabel = locale === "zh" ? "每日變化 " : locale === "cn" ? "每日变化 " : "Day Change ";
      changeEl.innerHTML = changeLabel + "<strong>" + formatPct(q.pct) + "</strong>";
      if (asofEl) asofEl.textContent = formatAsof(q.hkt);
    }

    function withTimeout(promise, ms) {
      return new Promise(function (resolve, reject) {
        var t = setTimeout(function () { reject(new Error("timeout")); }, ms);
        promise.then(function (v) {
          clearTimeout(t);
          resolve(v);
        }, function (e) {
          clearTimeout(t);
          reject(e);
        });
      });
    }

    function fetchYahoo() {
      var url = "https://query1.finance.yahoo.com/v8/finance/chart/1051.HK?interval=1d&range=5d&_=" + Date.now();
      return withTimeout(fetch(url, { mode: "cors", cache: "no-store", credentials: "omit" }).then(function (res) {
        if (!res.ok) throw new Error("yahoo http");
        return res.json();
      }).then(function (data) {
        var meta = data && data.chart && data.chart.result && data.chart.result[0] && data.chart.result[0].meta;
        if (!meta) throw new Error("yahoo meta");
        var price = Number(meta.regularMarketPrice);
        var pct = Number(meta.regularMarketChangePercent);
        var ts = Number(meta.regularMarketTime);
        if (!isFinite(price) || !isFinite(pct) || !isFinite(ts)) throw new Error("yahoo fields");
        var q = { price: price, pct: pct, hkt: hktFromDate(new Date(ts * 1000)) };
        if (!validQuote(q)) throw new Error("yahoo invalid");
        return q;
      }), 5000);
    }

    function parseTencent(raw) {
      if (!raw) throw new Error("tencent empty");
      var parts = String(raw).split("~");
      if (parts.length < 33) throw new Error("tencent fields");
      var price = parseFloat(parts[3]);
      var pct = parseFloat(parts[32]);
      var hkt = hktFromTencent(parts[30]);
      var q = { price: price, pct: pct, hkt: hkt };
      if (!validQuote(q)) throw new Error("tencent invalid");
      return q;
    }

    function fetchTencent() {
      return new Promise(function (resolve, reject) {
        var prev = document.getElementById("hkex-quote-gtimg");
        if (prev) prev.parentNode.removeChild(prev);
        try { delete window.v_hk01051; } catch (e) { window.v_hk01051 = undefined; }
        var s = document.createElement("script");
        s.id = "hkex-quote-gtimg";
        s.src = "https://qt.gtimg.cn/q=hk01051?t=" + Date.now();
        var done = false;
        function finish(err, q) {
          if (done) return;
          done = true;
          clearTimeout(tid);
          s.onload = s.onerror = null;
          if (s.parentNode) s.parentNode.removeChild(s);
          if (err) reject(err);
          else resolve(q);
        }
        var tid = setTimeout(function () { finish(new Error("tencent timeout")); }, 8000);
        s.onload = function () {
          try {
            finish(null, parseTencent(window.v_hk01051));
          } catch (e) {
            finish(e);
          }
        };
        s.onerror = function () { finish(new Error("tencent script")); };
        document.head.appendChild(s);
      });
    }

    function load() {
      if (inflight || document.visibilityState !== "visible") return;
      inflight = true;
      fetchYahoo().catch(function () {
        return fetchTencent();
      }).then(function (q) {
        render(q);
      }).catch(function () {
        /* Fail closed: keep HTML snapshot numbers and notes. */
      }).then(function () {
        inflight = false;
      });
    }

    function start() {
      stop();
      load();
      timer = setInterval(load, 60000);
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") start();
      else stop();
    });
    start();
  }

  initStockQuote();
})();
