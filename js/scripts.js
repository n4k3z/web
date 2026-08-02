window.addEventListener("load", function () {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const currentTheme = localStorage.getItem("theme") || "dark";
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".main-nav a");

    // Aplicar tema guardado al cargar
    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
        if (themeIcon) themeIcon.src = "images/moon.svg";
    }

    // Alternar tema claro / oscuro
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            document.body.classList.toggle("light-theme");
            const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
            localStorage.setItem("theme", theme);

            if (themeIcon) {
                themeIcon.src = theme === "light" ? "images/moon.svg" : "images/sun.svg";
            }
        });
    }

    // Guardar la posición de desplazamiento antes de cambiar de idioma
    document.querySelectorAll('.language-switch').forEach(link => {
        link.addEventListener('click', function () {
            localStorage.setItem('scrollPosition', window.scrollY);
        });
    });

    // Restaurar la posición de desplazamiento al cargar la página
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        localStorage.removeItem('scrollPosition');
    }

    // Ajustar el desplazamiento suave teniendo en cuenta la barra superior fija
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (!this.classList.contains('language-switch')) {
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
            }
        });
    });

    // Abrir todos los enlaces externos (que empiecen por http/https) en una pestaña nueva
    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });

    // ==========================================
    // SLIDER DE IMÁGENES + POP-UP + PROTECCIÓN
    // ==========================================
    
    // Crear contenedor Modal en el DOM dinámicamente
    const modal = document.createElement("div");
    modal.className = "image-modal";
    modal.innerHTML = '<span class="image-modal-close">&times;</span><img class="image-modal-content" alt="Ampliada">';
    document.body.appendChild(modal);

    const modalImg = modal.querySelector(".image-modal-content");
    const modalClose = modal.querySelector(".image-modal-close");

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });
    modal.addEventListener("click", (e) => {
        if (e.target !== modalImg) {
            modal.style.display = "none";
        }
    });

    const sliders = document.querySelectorAll(".slider");
    sliders.forEach((slider) => {
        let currentIndex = 0;
        const slides = slider.querySelector(".slides");
        if (!slides) return;
        
        const images = slides.querySelectorAll("img");
        const totalSlides = images.length;

        images.forEach(img => {
            // Protección contra clic derecho
            img.addEventListener("contextmenu", (e) => e.preventDefault());

            // Abrir pop-up al hacer clic (solo si no se está arrastrando el slider)
            img.addEventListener("click", () => {
                modal.style.display = "flex";
                modalImg.src = img.src;
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

    // Resaltado optimizado de la sección activa en el menú al hacer scroll
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