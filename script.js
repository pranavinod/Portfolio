    const nav = document.getElementById("nav");
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const sections = Array.from(document.querySelectorAll("main section"));
    const mobileNavToggle = document.getElementById("mobileNavToggle");
    const heroContactBtn = document.getElementById("heroContactBtn");
    const heroProjectsBtn = document.getElementById("heroProjectsBtn");
    const downloadCvBtn = document.getElementById("downloadCvBtn");
    const contactForm = document.getElementById("contactForm");
    const contactStatus = document.getElementById("contactStatus");
    const heroPhoto = document.getElementById("heroPhoto");
    const tiltCards = Array.from(document.querySelectorAll(".tilt"));
    const projectLinks = Array.from(document.querySelectorAll(".project-link"));
    const cursorHalo = document.getElementById("cursorHalo");

    // Smooth nav
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const id = link.getAttribute("data-target");
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (nav.classList.contains("open")) nav.classList.remove("open");
      });
    });

    // Scrollspy + section reveal
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          let best = null;
          for (const entry of entries) {
            if (
              entry.isIntersecting &&
              (!best || entry.intersectionRatio > best.intersectionRatio)
            ) {
              best = entry;
            }
          }
          if (best) {
            const id = best.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("data-target") === id
              );
            });
            best.target.classList.add("in-view");
          }
        },
        { threshold: 0.25 }
      );
      sections.forEach((s) => observer.observe(s));
    } else {
      sections.forEach((s) => s.classList.add("in-view"));
    }

    mobileNavToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    heroContactBtn.addEventListener("click", () => {
      document
        .getElementById("contact-section")
        .scrollIntoView({ behavior: "smooth" });
    });

    heroProjectsBtn.addEventListener("click", () => {
      document
        .getElementById("projects-section")
        .scrollIntoView({ behavior: "smooth" });
    });

    // Download resume 
    downloadCvBtn.addEventListener("click", () => {
      window.open("VinodPranavResume.pdf", "_blank");
    });


    // Contact -> mailto
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        contactStatus.textContent =
          "Please include your name, email, and a short message.";
        contactStatus.style.color = "#fb7185";
        return;
      }

      const subject = encodeURIComponent("Portfolio inquiry from " + name);
      const body = encodeURIComponent(
        "From: " + name + " (" + email + ")\n\n" + message
      );

      contactStatus.textContent =
        "Thanks! Opening your email client so you can send the message.";
      contactStatus.style.color = "";
      window.location.href =
        "mailto:pranav6259@gmail.com?subject=" + subject + "&body=" + body;
    });


    heroPhoto.addEventListener("mousemove", (e) => {
      const rect = heroPhoto.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = y * -10;
      const rotateY = x * 10;
      heroPhoto.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroPhoto.addEventListener("mouseleave", () => {
      heroPhoto.style.transform = "rotateX(0deg) rotateY(0deg)";
    });


    function attachTilt(el) {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = y * -8;
        const rotateY = x * 8;
        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        el.style.boxShadow = "0 26px 60px rgba(0,0,0,0.9)";
        el.style.borderColor = "rgba(168,85,247,0.7)";
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
        el.style.boxShadow = "";
        el.style.borderColor = "";
      });
    }

    tiltCards.forEach(attachTilt);

    // Cursor halo follow
    document.addEventListener("mousemove", (e) => {
      cursorHalo.style.left = e.clientX + "px";
      cursorHalo.style.top = e.clientY + "px";
      document.body.classList.add("mouse-active");
      clearTimeout(window.__haloTimeout);
      window.__haloTimeout = setTimeout(() => {
        document.body.classList.remove("mouse-active");
      }, 800);
    });
