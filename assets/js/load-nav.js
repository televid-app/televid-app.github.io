fetch("/assets/pages/nav.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("navbar").innerHTML = html;
        createThemeToggle();
    })
    .catch(err => console.error("Navbar load error:", err));

function createThemeToggle() {
    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;
    
    const button = document.createElement("button");
    button.className = "theme-toggle";
    button.id = "themeToggle";
    
    button.innerHTML = `
        <div class="toggle-track">
            <div class="toggle-thumb">
                <svg class="sun-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <svg class="moon-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </div>
        </div>
    `;
    
    const item = document.createElement("li");
    item.appendChild(button);
    navLinks.appendChild(item);
    
    initDarkMode();
}

function initDarkMode() {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;
    
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
        document.body.classList.add("dark");
    }
    
    function updateButton() {
        const isDark = document.body.classList.contains("dark");
        const thumb = toggle.querySelector(".toggle-thumb");
        const sun = toggle.querySelector(".sun-icon");
        const moon = toggle.querySelector(".moon-icon");
        
        if (isDark) {
            if (thumb) thumb.style.transform = "translateX(24px)";
            if (sun) sun.style.opacity = "0";
            if (moon) moon.style.opacity = "1";
        } else {
            if (thumb) thumb.style.transform = "translateX(0)";
            if (sun) sun.style.opacity = "1";
            if (moon) moon.style.opacity = "0";
        }
    }
    
    updateButton();
    
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
        updateButton();
    });
}