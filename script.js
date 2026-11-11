
const themeButtons = document.querySelectorAll(".theme-option");
const themeToggle = document.getElementById("themeToggle");

const themes = [
    "green",
    "dark",
    "blue",
    "pink",
    "red",
    "purple",
    "yellow"
];

// Apply theme
function applyTheme(theme) {
    if (!themes.includes(theme)) {
        theme = "blue";
    }

    document.body.dataset.theme = theme;

    // Save selected theme
    localStorage.setItem("fatihPortfolioTheme", theme);

    // Update active button
    themeButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.theme === theme
        );
    });

    // Update browser theme color
    const colors = {
        green: "#06130e",
        dark: "#080808",
        blue: "#080b14",
        pink: "#170814",
        red: "#160709",
        purple: "#100818",
        yellow: "#151104"
    };

    const metaTheme = document.querySelector(
        'meta[name="theme-color"]'
    );

    if (metaTheme) {
        metaTheme.setAttribute("content", colors[theme]);
    }
}

// Theme button click
themeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedTheme = button.dataset.theme;

        applyTheme(selectedTheme);

        // Small click animation
        button.animate(
            [
                { transform: "scale(0.95)" },
                { transform: "scale(1.05)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 300,
                easing: "ease-out"
            }
        );
    });
});

// Theme toggle button
let themeIndex = 0;

themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.dataset.theme;

    themeIndex = themes.indexOf(currentTheme);
    themeIndex = (themeIndex + 1) % themes.length;

    applyTheme(themes[themeIndex]);

    document.querySelector(".theme-section").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// Load saved theme
const savedTheme = localStorage.getItem("fatihPortfolioTheme");

applyTheme(savedTheme || "blue");

// Reveal animations
const revealElements = document.querySelectorAll(
    ".about-card, .project-card, .achievement-card, .profile-card"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });
}

// Current year in footer
const copyright = document.querySelector(".copyright");

if (copyright) {
    copyright.textContent =
        `© ${new Date().getFullYear()} AL FATIH IMAN ALAMSYAH`;
}

console.log("AL FATIH PORTFOLIO READY!");
