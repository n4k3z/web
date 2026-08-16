window.addEventListener("load", function () {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const langToggleBtn = document.getElementById("lang-toggle");
    const langIcon = document.getElementById("lang-icon");

    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".main-nav a");

    // Bloqueo global de Clic Derecho y arrastre
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });

    document.addEventListener("dragstart", function (e) {
        e.preventDefault();
    });

    // ==========================================
    // SISTEMA DE INTERNACIONALIZACIÓN (i18n)
    // ==========================================
    const translations = {
        es: typeof translationsEs !== 'undefined' ? translationsEs : {},
        en: typeof translationsEn !== 'undefined' ? translationsEn : {}
    };

    let currentLang = localStorage.getItem("lang") || "es";

    function getNestedTranslation(obj, path) {
        return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj);
    }

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem("lang", lang);
        document.documentElement.lang = lang;

        const langData = translations[lang];
        if (!langData) return;

        // Metadatos
        if (langData.meta) {
            document.title = langData.meta.title;
            const metaDesc = document.getElementById("meta-desc");
            const ogTitle = document.getElementById("og-title");
            const ogDesc = document.getElementById("og-desc");

            if (metaDesc) metaDesc.setAttribute("content", langData.meta.description);
            if (ogTitle) ogTitle.setAttribute("content", langData.meta.title);
            if (ogDesc) ogDesc.setAttribute("content", langData.meta.description);
        }

        // Elementos de Texto Plano
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            const text = getNestedTranslation(langData, key);
            if (text !== null && text !== undefined) {
                el.textContent = text;
            }
        });

        // Elementos de Texto con HTML
        document.querySelectorAll("[data-i18n-html]").forEach(el => {
            const key = el.getAttribute("data-i18n-html");
            const htmlText = getNestedTranslation(langData, key);
            if (htmlText !== null && htmlText !== undefined) {
                el.innerHTML = htmlText;
            }
        });

        // Icono de cambio de idioma
        if (langIcon) {
            langIcon.src = lang === "es" ? "images/spain.svg" : "images/uk.svg";
            langIcon.alt = lang === "es" ? "Bandera España" : "English Flag";
        }
    }

    // Evento de cambio de idioma
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", function () {
            const newLang = currentLang === "es" ? "en" : "es";
            applyLanguage(newLang);
        });
    }

    // Inicializar Idioma
    applyLanguage(currentLang);

    // ==========================================
    // SISTEMA DE TEMA (MODO CLARO / OSCURO)
    // ==========================================
    const currentTheme = localStorage.getItem("theme") || "dark";

    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
        if (themeIcon) themeIcon.src = "images/sun.svg";
    } else {
        if (themeIcon) themeIcon.src = "images/moon.svg";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            document.body.classList.toggle("light-theme");
            const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
            localStorage.setItem("theme", theme);

            if (themeIcon) {
                themeIcon.src = theme === "light" ? "images/sun.svg" : "images/moon.svg";
            }
        });
    }

    // ==========================================
    // NAVEGACIÓN Y DESPLAZAMIENTO
    // ==========================================
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
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
        });
    });

    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });

    // ==========================================
    // SISTEMA DE POP-UP GLOBAL PARA AMBOS SLIDERS
    // ==========================================
    const modal = document.createElement("div");
    modal.className = "image-modal";
    modal.innerHTML = `
        <span class="image-modal-close">&times;</span>
        <button class="modal-prev" aria-label="Anterior">&#10094;</button>
        <img class="image-modal-content" alt="Ampliada">
        <button class="modal-next" aria-label="Siguiente">&#10095;</button>
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
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    modalPrevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (activeImageCollection.length > 0) {
            activeModalIndex = (activeModalIndex === 0) ? activeImageCollection.length - 1 : activeModalIndex - 1;
            updateModalImage();
        }
    });

    modalNextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (activeImageCollection.length > 0) {
            activeModalIndex = (activeModalIndex === activeImageCollection.length - 1) ? 0 : activeModalIndex + 1;
            updateModalImage();
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleModalSwipe();
    }, { passive: true });

    function handleModalSwipe() {
        const threshold = 40;
        if (touchEndX < touchStartX - threshold) {
            modalNextBtn.click();
        } else if (touchEndX > touchStartX + threshold) {
            modalPrevBtn.click();
        }
    }

    window.addEventListener("keydown", (e) => {
        if (modal.style.display === "flex") {
            if (e.key === "Escape") {
                closeModal();
            } else if (e.key === "ArrowLeft") {
                modalPrevBtn.click();
            } else if (e.key === "ArrowRight") {
                modalNextBtn.click();
            }
        }
    });

    // ==========================================
    // CONFIGURACIÓN DE SLIDERS DE IMÁGENES
    // ==========================================
    const sliders = document.querySelectorAll(".slider");
    sliders.forEach((slider) => {
        let currentIndex = 0;
        const slides = slider.querySelector(".slides");
        if (!slides) return;
        
        const images = Array.from(slides.querySelectorAll("img"));
        const totalSlides = images.length;

        images.forEach((img, idx) => {
            img.addEventListener("click", () => {
                openModal(images, idx);
            });
        });

        function updateSlidePosition() {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function prevSlide() {
            if (totalSlides === 0) return;
            currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
            updateSlidePosition();
        }

        function nextSlide() {
            if (totalSlides === 0) return;
            currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
            updateSlidePosition();
        }

        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");

        if (prevBtn) prevBtn.addEventListener("click", prevSlide);
        if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    });

    // ==========================================
    // SLIDER DE VÍDEOS (SIN CONTROLES, EN BUCLE)
    // ==========================================
    const videoPlayer = document.getElementById("videoPlayer5");
    if (videoPlayer) {
        const videoSources = [
            "videos/promo01.webm",
            "videos/promo02.webm",
            "videos/promo03.webm",
            "videos/promo04.webm",
            "videos/promo05.webm",
        ];
        let currentVideoIndex = 0;

        function changeVideo(index) {
            videoPlayer.classList.add("fade-out");

            setTimeout(() => {
                currentVideoIndex = index;
                videoPlayer.src = videoSources[currentVideoIndex];
                videoPlayer.load();
                videoPlayer.play();
                videoPlayer.classList.remove("fade-out");
                videoPlayer.classList.add("fade-in");
            }, 500);
        }

        function prevVideoSlide() {
            const newIndex = currentVideoIndex === 0 ? videoSources.length - 1 : currentVideoIndex - 1;
            changeVideo(newIndex);
        }

        function nextVideoSlide() {
            const newIndex = currentVideoIndex === videoSources.length - 1 ? 0 : currentVideoIndex + 1;
            changeVideo(newIndex);
        }

        const prevVidBtn = document.querySelector(".video-slider-container .prev");
        const nextVidBtn = document.querySelector(".video-slider-container .next");

        if (prevVidBtn) prevVidBtn.addEventListener("click", prevVideoSlide);
        if (nextVidBtn) nextVidBtn.addEventListener("click", nextVideoSlide);
    }

    // ==========================================
    // RESALTADO DE SECCIÓN EN MENÚ
    // ==========================================
    function onScroll() {
        const nav = document.querySelector('.main-nav');
        if (!nav) return;
        let scrollPos = window.scrollY + nav.offsetHeight;

        sections.forEach((section) => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === section.getAttribute('id')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    onScroll();
});