/**
 * main.js - 포트폴리오 렌더링 엔진.
 * data.js의 DATA 객체를 읽어 HTML을 자동 생성.
 */

document.addEventListener("DOMContentLoaded", function () {
  var d = DATA;
  var p = d.profile;

  // --- Hero 렌더링 ---
  setText(".hero__name", p.name);
  setHTML(".hero__title", '<span class="gradient-text">' + p.title + "</span>");
  setText(".hero__greeting", p.greeting);
  setHTML(".hero__desc", p.description.replace("\n", "<br>"));

  var statsHtml = p.stats
    .map(function (s) {
      return (
        '<div class="hero__stat"><span class="hero__stat-number">' +
        s.number +
        '</span><span class="hero__stat-label">' +
        s.label +
        "</span></div>"
      );
    })
    .join("");
  setHTML(".hero__stats", statsHtml);

  // --- About 렌더링 ---
  var aboutTextHtml = p.aboutText
    .map(function (t) {
      return '<p class="about__text">' + t + "</p>";
    })
    .join("");
  setHTML("#aboutText", aboutTextHtml);

  var focusHtml = p.focusAreas
    .map(function (f) {
      return "<li>" + f + "</li>";
    })
    .join("");
  setHTML("#focusList", focusHtml);

  var detailsHtml = [
    row("Name", p.name + " (" + p.birthYear + "년생)"),
    row("Location", p.address),
    row("Email", '<a href="mailto:' + p.email + '">' + p.email + "</a>"),
    row("Phone", '<a href="tel:' + p.phone + '">' + p.phone + "</a>"),
    // row(
    //   "Website",
    //   '<a href="' +
    //     p.website +
    //     '" target="_blank">' +
    //     p.website.replace("http://", "") +
    //     "</a>",
    // ),
    // row('Education', p.education),
    // row('Career', p.totalCareer + ' (' + p.currentCompany + ')'),
    // row('Military', p.military)
  ].join("");
  setHTML("#aboutDetails", detailsHtml);

  // --- Skills 렌더링 ---
  renderSkillList("#skillsFrontend", d.skills.frontend);
  renderSkillList("#skillsTools", d.skills.tools);

  // --- Projects 렌더링 ---
  var projHtml = d.projects
    .map(function (proj) {
      var thumb = proj.image
        ? '<div class="project-card__thumb"><img src="' +
          proj.image +
          '" alt="' +
          proj.title +
          '"></div>'
        : '<div class="project-card__no-image">NO IMAGE</div>';
      var techs = proj.techs
        .map(function (t) {
          var cls = "stack-badge--fe";
          return '<span class="stack-badge ' + cls + '">' + t + "</span>";
        })
        .join("");
      return (
        '<article class="project-card">' +
        thumb +
        '<div class="project-card__body">' +
        '<h3 class="project-card__name">' +
        proj.title +
        "</h3>" +
        '<p class="project-card__desc">' +
        proj.desc +
        "</p>" +
        '<div class="project-card__stack">' +
        techs +
        "</div>" +
        '<div class="project-card__meta">' +
        '<div class="meta-item"><span class="meta-label">Period</span><span class="meta-period">' +
        proj.period +
        "</span></div>" +
        '<div class="meta-item"><span class="meta-label">Client</span><span class="meta-period">' +
        proj.client +
        "</span></div>" +
        "</div></div></article>"
      );
    })
    .join("");
  setHTML("#projectsGrid", projHtml);

  // --- Experience 렌더링 ---
  var expHtml = d.experiences
    .map(function (exp) {
      var items = exp.highlights
        .map(function (h) {
          return "<li>" + h + "</li>";
        })
        .join("");
      return (
        '<div class="exp-item">' +
        '<div class="exp-item__period">' +
        exp.period +
        "</div>" +
        '<div class="exp-item__content">' +
        '<h3 class="exp-item__company">' +
        exp.company +
        "</h3>" +
        '<p class="exp-item__role">' +
        exp.role +
        "</p>" +
        '<ul class="exp-item__highlights">' +
        items +
        "</ul>" +
        "</div></div>"
      );
    })
    .join("");
  setHTML("#experienceTimeline", expHtml);

  // --- Contact 렌더링 ---
  var contactHtml = [
    contactCard("fa-envelope", "Email", p.email, "mailto:" + p.email),
    contactCard(
      "fa-phone",
      "Phone",
      p.phone,
      "tel:" + p.phone.replace(/-/g, ""),
    ),
    // contactCard(
    //   "fa-globe",
    //   "Website",
    //   p.website.replace("http://", ""),
    //   p.website,
    // ),
    contactCard("fa-github", "GitHub", "Repository", p.github),
  ].join("");
  setHTML("#contactGrid", contactHtml);

  // --- 네비게이션 토글 ---
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.querySelector(".nav__links");
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("nav__links--open");
    navToggle.classList.toggle("nav__hamburger--active");
  });
  document.querySelectorAll(".nav__link").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("nav__links--open");
      navToggle.classList.remove("nav__hamburger--active");
    });
  });

  // --- 스크롤 시 네비게이션 ---
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function () {
    nav.classList.toggle("nav--scrolled", window.scrollY > 50);
  });

  // --- Intersection Observer (스크롤 애니메이션) ---
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  document
    .querySelectorAll(
      ".section, .project-card, .skill-card, .contact-card, .exp-item",
    )
    .forEach(function (el) {
      el.classList.add("scroll-reveal");
      observer.observe(el);
    });

  // ─── 헬퍼 함수 ───
  function setText(sel, text) {
    var el = document.querySelector(sel);
    if (el) el.textContent = text;
  }
  function setHTML(sel, html) {
    var el = document.querySelector(sel);
    if (el) el.innerHTML = html;
  }
  function row(label, value) {
    return (
      '<li><span class="about__label">' +
      label +
      '</span><span class="about__value">' +
      value +
      "</span></li>"
    );
  }
  function renderSkillList(sel, skills) {
    var html = skills
      .map(function (s) {
        var lvl = s.level ? " <em>" + s.level + "%</em>" : "";
        return '<li><span class="skill-tag">' + s.name + lvl + "</span></li>";
      })
      .join("");
    setHTML(sel, html);
  }
  function contactCard(icon, label, value, href) {
    return (
      '<a href="' +
      href +
      '" class="contact-card" target="_blank">' +
      '<i class="fa ' +
      icon +
      ' contact-card__icon"></i>' +
      '<span class="contact-card__label">' +
      label +
      "</span>" +
      '<span class="contact-card__value">' +
      value +
      "</span></a>"
    );
  }
});
