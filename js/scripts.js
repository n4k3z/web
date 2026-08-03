window.addEventListener("load", function () {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const currentTheme = localStorage.getItem("theme") || "dark";
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".main-nav a");

    // Bloqueo global estricto de Clic Derecho y arrastre en toda la página
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });

    document.addEventListener("dragstart", function (e) {
        e.preventDefault();
    });

    // Aplicar tema guardado al cargar: Modo oscuro -> Luna, Modo claro -> Sol
    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
        if (themeIcon) themeIcon.src = "images/sun.svg";
    } else {
        if (themeIcon) themeIcon.src = "images/moon.svg";
    }

    // Alternar tema claro / oscuro
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

    // Abrir todos los enlaces externos en una pestaña nueva
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
    
    // Cerrar si se hace clic fuera de la imagen y de los botones
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

    // Detección de gestos táctiles (Swipe) en móvil para la pantalla completa
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
        const threshold = 40; // Sensibilidad de deslizamiento
        if (touchEndX < touchStartX - threshold) {
            modalNextBtn.click(); // Deslizar a la izquierda -> Siguiente
        } else if (touchEndX > touchStartX + threshold) {
            modalPrevBtn.click(); // Deslizar a la derecha -> Anterior
        }
    }

    // Control por teclado (Escape para cerrar, Flechas para cambiar en el popup)
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