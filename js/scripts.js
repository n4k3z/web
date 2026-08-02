window.addEventListener("load", function () {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const currentTheme = localStorage.getItem("theme") || "dark";
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".main-nav a");

    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
        if (themeIcon) themeIcon.src = "images/moon.svg";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            document.body.classList.toggle("light-theme");
            const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
            localStorage.setItem("theme", theme);

            if (themeIcon) {
                if (theme === "light") {
                    themeIcon.src = "images/moon.svg";
                } else {
                    themeIcon.src = "images/sun.svg";
                }
            }
        });
    }

    // Guardar la posición de desplazamiento antes de cambiar de idioma
    document.querySelectorAll('.language-switch').forEach(link => {
        link.addEventListener('click', function () {
            const scrollPosition = window.scrollY;
            localStorage.setItem('scrollPosition', scrollPosition);
        });
    });

    // Restaurar la posición de desplazamiento al cargar la página
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        localStorage.removeItem('scrollPosition');
    }

    // Ajustar el desplazamiento para que el título de la sección no quede tapado por el menú
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

    // SLIDER DE IMÁGENES
    const sliders = document.querySelectorAll(".slider");
    sliders.forEach((slider) => {
        let currentIndex = 0;
        const slides = slider.querySelector(".slides");
        if (!slides) return;
        const totalSlides = slides.children.length;

        function updateSlidePosition() {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function prevSlide() {
            currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
            updateSlidePosition();
        }

        function nextSlide() {
            currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
            updateSlidePosition();
        }

        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");

        if (prevBtn) prevBtn.addEventListener("click", prevSlide);
        if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    });

    // SLIDER DE VÍDEOS
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

    // Resaltado de sección activa en el menú
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

    window.addEventListener('scroll', onScroll);
    onScroll();
});