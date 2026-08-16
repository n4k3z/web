window.addEventListener("load", function () {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const langToggleBtn = document.getElementById("lang-toggle");
    const langIcon = document.getElementById("lang-icon");
    
    let currentLang = localStorage.getItem("language") || "es";
    let currentTheme = localStorage.getItem("theme") || "dark";

    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".main-nav a");

    // Bloqueo de Clic Derecho y Arrastre
    document.addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener("dragstart", e => e.preventDefault());

    // Configurar icono de tema al cargar
    if (themeIcon) {
        themeIcon.src = currentTheme === "light" ? "images/sun.svg" : "images/moon.svg";
    }

    // Aplicar traducción de textos sin recarga
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem("language", lang);
        document.documentElement.lang = lang;

        // Banderas: Si el idioma actual es Español (es) se muestra la bandera de España (spain.svg).
        // Si cambia a Inglés (en), se muestra la bandera de Reino Unido (uk.svg).
        if (langIcon) {
            langIcon.src = lang === "es" ? "images/spain.svg" : "images/uk.svg";
            langIcon.alt = lang === "es" ? "Español" : "English";
        }

        if (typeof translations === "undefined") return;
        const t = translations[lang];
        if (!t) return;

        // Traducir elementos por data-i18n
        document.querySelectorAll("[data-i18n]").forEach(elem => {
            const key = elem.getAttribute("data-i18n");
            if (t[key]) {
                elem.textContent = t[key];
            }
        });

        // Casos especiales con HTML interno o enlaces embebidos
        const resumenFooter = document.getElementById("resumen_footer");
        if (resumenFooter) {
            resumenFooter.innerHTML = `${t.resumen_footer_p1}<strong><a href="#skills" data-i18n="skills_link_text">${t.skills_link_text}</a></strong>${t.resumen_footer_p2}`;
        }

        const expPersEnginesP1 = document.getElementById("exp_pers_engines_p1");
        if (expPersEnginesP1) {
            expPersEnginesP1.innerHTML = `${t.exp_pers_engines_p1_a}<a href="https://nakez.itch.io/cryptophasia" target="_blank" rel="noopener noreferrer">${t.exp_pers_engines_link}</a>${t.exp_pers_engines_p1_b}`;
        }

        const quoteElem = document.getElementById("quote_text");
        if (quoteElem) {
            quoteElem.textContent = t.quote_text;
        }

        // Re-asignar target="_blank" a nuevos links cargados
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        });
    }

    // Inicializar idioma guardado
    applyLanguage(currentLang);

    // Evento cambiar idioma
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", function () {
            const newLang = currentLang === "es" ? "en" : "es";
            applyLanguage(newLang);
        });
    }

    // Alternar tema claro / oscuro
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            document.documentElement.classList.toggle("light-theme");
            document.body.classList.toggle("light-theme");
            
            const isLight = document.body.classList.contains("light-theme");
            const theme = isLight ? "light" : "dark";
            localStorage.setItem("theme", theme);

            if (themeIcon) {
                themeIcon.src = isLight ? "images/sun.svg" : "images/moon.svg";
            }
        });
    }

    // Desplazamiento suave para la navegación fija
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerOffset = document.querySelector('.main-nav').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Modal de Imágenes
    const modal = document.createElement("div");
    modal.className = "image-modal";
    modal.innerHTML = `
        <span class="image-modal-close">&times;</span>
        <button class="modal-prev">&#10094;</button>
        <img class="image-modal-content" alt="Ampliada">
        <button class="modal-next">&#10095;</button>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector(".image-modal-content");
    const modalClose = modal.querySelector(".image-modal-close");
    const modalPrevBtn = modal.querySelector(".modal-prev");
    const modalNextBtn = modal.querySelector(".modal-next");

    let activeImageCollection = [];
    let activeModalIndex = 0;

    function updateModalImage() {
        if (activeImageCollection.length > 0) {
            modalImg.src = activeImageCollection[activeModalIndex].src;
        }
    }

    function openModal(imagesArray, startIndex) {
        activeImageCollection = imagesArray;
        activeModalIndex = startIndex;
        updateModalImage();
        modal.style.display = "flex";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });

    modalPrevBtn.addEventListener("click", e => {
        e.stopPropagation();
        if (activeImageCollection.length > 0) {
            activeModalIndex = (activeModalIndex === 0) ? activeImageCollection.length - 1 : activeModalIndex - 1;
            updateModalImage();
        }
    });

    modalNextBtn.addEventListener("click", e => {
        e.stopPropagation();
        if (activeImageCollection.length > 0) {
            activeModalIndex = (activeModalIndex === activeImageCollection.length - 1) ? 0 : activeModalIndex + 1;
            updateModalImage();
        }
    });

    // Control táctil (Swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener("touchend", e => {
        touchEndX = e.changedTouches[0].screenX;
        const threshold = 40;
        if (touchEndX < touchStartX - threshold) modalNextBtn.click();
        else if (touchEndX > touchStartX + threshold) modalPrevBtn.click();
    }, { passive: true });

    // Teclado modal
    window.addEventListener("keydown", e => {
        if (modal.style.display === "flex") {
            if (e.key === "Escape") closeModal();
            else if (e.key === "ArrowLeft") modalPrevBtn.click();
            else if (e.key === "ArrowRight") modalNextBtn.click();
        }
    });

    // Configuración de Sliders
    const sliders = document.querySelectorAll(".slider");
    sliders.forEach(slider => {
        let currentIndex = 0;
        const slides = slider.querySelector(".slides");
        if (!slides) return;
        
        const images = Array.from(slides.querySelectorAll("img"));
        const totalSlides = images.length;

        images.forEach((img, idx) => {
            img.addEventListener("click", () => openModal(images, idx));
        });

        function updateSlidePosition() {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                if (totalSlides === 0) return;
                currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
                updateSlidePosition();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                if (totalSlides === 0) return;
                currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
                updateSlidePosition();
            });
        }
    });

    // Resaltado de sección activa en menú
    function onScroll() {
        const nav = document.querySelector('.main-nav');
        if (!nav) return;
        let scrollPos = window.scrollY + nav.offsetHeight;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.getAttribute('id')}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    onScroll();
});