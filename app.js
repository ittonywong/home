(function () {
  "use strict";
  var T = {
    zh: { title: "我的網站", sub: "撳圖示就可以去個網站", foot: "加網站：改 sites.js", btn: "EN", aria: "Switch to English", html: "zh-HK" },
    en: { title: "My Sites", sub: "Tap an icon to open the site", foot: "To add a site, edit sites.js", btn: "繁", aria: "切換至繁體中文", html: "en" }
  };
  var KEY = "home.lang";
  var lang = "zh";
  try { if (localStorage.getItem(KEY) === "en") lang = "en"; } catch (e) {}

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render() {
    var t = T[lang];
    document.documentElement.lang = t.html;
    document.getElementById("title").textContent = t.title;
    document.getElementById("sub").textContent = t.sub;
    document.getElementById("foot").textContent = t.foot;
    document.title = lang === "zh" ? "我的網站 · My Sites" : "My Sites · 我的網站";
    var b = document.getElementById("langBtn");
    b.textContent = t.btn;
    b.setAttribute("aria-label", t.aria);

    var html = (window.SITES || []).map(function (s) {
      var main = lang === "zh" ? s.zh : s.en;
      var second = lang === "zh" ? s.en : s.zh;
      var icon = (window.ICONS || {})[s.icon] || window.ICONS.globe;
      return '<li><a class="tile" href="' + esc(s.url) + '" aria-label="' + esc(main + " – " + second) + '">' +
        '<span class="ico" style="background:' + esc(s.color || "#0b3c5d") + '">' +
        '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">' + icon + '</svg>' +
        (s.tag ? '<span class="tag">' + esc(s.tag) + '</span>' : "") +
        '</span><span class="names"><span class="n1">' + esc(main) + '</span>' +
        '<span class="n2">' + esc(second) + '</span></span></a></li>';
    }).join("");
    document.getElementById("grid").innerHTML = html;
  }

  document.getElementById("langBtn").addEventListener("click", function () {
    lang = lang === "zh" ? "en" : "zh";
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    render();
  });
  render();
})();
