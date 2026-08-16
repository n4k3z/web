document.addEventListener("DOMContentLoaded", () => {
    // --- LÓGICA DE TRADUCCIÓN E IDIOMAS ---
    let currentLang = localStorage.getItem("lang") || "es";
    let translations = {};

    const loadLanguage = async (lang) => {
        try {
            const res = await fetch(`${lang}.json`);
            if (!res.ok) throw new Error(`Error loading ${lang}.json`);
            translations = await res.json();
            applyTranslations();
            updateLangButtonUI(lang);
            document.documentElement.lang = lang;
            localStorage.setItem("lang", lang);
            currentLang = lang;
        } catch (error) {
            console.error("Error al cargar las traducciones:", error);
        }
    };

    const getNestedTranslation = (obj, path) => {
        return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
    };

    const applyTranslations = () => {
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            const val = getNestedTranslation(translations, key);
            if (val !== undefined) el.textContent = val;
        });

        document.querySelectorAll("[data-i18n-attr]").forEach(el => {
            const attrConfig = el.getAttribute("data-i18n-attr");
            const [attrName, key] = attrConfig.split(':');
            const val = getNestedTranslation(translations, key);
            if (val !== undefined) el.setAttribute(attrName, val);
        });
    };

    const updateLangButtonUI = (lang) => {
        const langFlag = document.getElementById("lang-flag");
        if (langFlag) {
            if (lang === "es") {
                langFlag.src = "images/spain.svg";
                langFlag.alt = "Español";
            } else {
                langFlag.src = "images/uk.svg";
                langFlag.alt = "English";
            }
        }
    };

    const langToggleBtn = document.getElementById("lang-toggle");
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            const newLang = currentLang === "es" ? "en" : "es";
            loadLanguage(newLang);
        });
    }

    loadLanguage(currentLang);

    // --- LÓGICA DE TEMAS (CLARO / OSCURO) ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const savedTheme = localStorage.getItem("theme") || "dark";

    const setTheme = (theme) => {
        if (theme === "light") {
            document.body.classList.add("light-mode");
            if (themeIcon) themeIcon.src = "images/sun.svg";
        } else {
            document.body.classList.remove("light-mode");
            if (themeIcon) themeIcon.src = "images/moon.svg";
        }
        localStorage.setItem("theme", theme);
    };

    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isLight = document.body.classList.contains("light-mode");
            setTheme(isLight ? "dark" : "light");
        });
    }

    // --- SLIDERS DE IMÁGENES ---
    document.querySelectorAll(".slider").forEach(slider => {
        const slides = slider.querySelector(".slides");
        const images = slider.querySelectorAll(".slides img");
        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");
        let currentIndex = 0;

        const updateSlider = () => {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        if (prevBtn && nextBtn && images.length > 0) {
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
                updateSlider();
            });

            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
                updateSlider();
            });
        }
    });

    // --- SCROLL Y MENÚ ACTIVO ---
    const navLinks = document.querySelectorAll(".main-nav a[href^='#']");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});