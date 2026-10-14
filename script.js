
/* ==================================
   MY PERSONAL PORTFOLIO - JAVASCRIPT
================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. AUTOMATIC CURRENT YEAR
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 2. DARK MODE AND LIGHT MODE
    const themeButton = document.getElementById("themeButton");

    if (themeButton) {
        themeButton.addEventListener("click", function () {

            const darkModeIsActive =
                document.body.classList.toggle("dark-mode");

            if (darkModeIsActive) {
                themeButton.textContent = "☀️ Light Mode";
                themeButton.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );
            } else {
                themeButton.textContent = "🌙 Dark Mode";
                themeButton.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );
            }
        });
    }


    // 3. ACTIVE NAVIGATION LINK
    const navLinks = document.querySelectorAll(
        '.site-header nav a[href^="#"]'
    );

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    function setActiveLink(sectionId) {
        navLinks.forEach(function (link) {

            const isActive =
                link.getAttribute("href") === "#" + sectionId;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        setActiveLink(entry.target.id);
                    }
                });

            },
            {
                root: null,
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    } else {

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.forEach(function (item) {
                    item.classList.remove("active");
                });

                link.classList.add("active");
            });
        });
    }


    // 4. BACK TO TOP BUTTON
    const backToTop = document.getElementById("backToTop");

    function updateBackToTop() {

        if (backToTop) {
            backToTop.classList.toggle(
                "visible",
                window.scrollY > 350
            );
        }
    }

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();

    if (backToTop) {
        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // 5. CONTACT BUTTON MESSAGE
    const contactLinks = document.querySelectorAll(
        'a[href^="mailto:"]'
    );

    const toast = document.getElementById("toast");
    let toastTimer;

    function showToast(message) {

        if (!toast) {
            return;
        }

        toast.textContent = message;
        toast.classList.add("show");

        window.clearTimeout(toastTimer);

        toastTimer = window.setTimeout(function () {
            toast.classList.remove("show");
        }, 3500);
    }

    contactLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const email = link
                .getAttribute("href")
                .replace("mailto:", "")
                .trim();

            if (email === "yourname@example.com") {

                event.preventDefault();

                showToast(
                    "Please replace yourname@example.com with your real email in portfolio.html."
                );
            }
        });
    });


    // 6. WELCOME MESSAGE
    console.log(
        "Welcome to Jaina Rose M. Somera's Personal Portfolio!"
    );

    // 7. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm && formMessage) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Magpapakita ng eksaktong mensahe sa ilalim ng form
            formMessage.textContent = "Thank you for reaching out. Your inquiry has been submitted.";
            
            // Para lumitaw din yung toast notification sa baba
            showToast("Thank you for reaching out. Your inquiry has been submitted.");

            // I-clear ang mga input pagkatapos i-submit
            contactForm.reset();
        });
    }

});
