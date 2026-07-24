document.addEventListener("DOMContentLoaded", () => {

    const themeToggle = document.getElementById("themeToggle");

    const printButton = document.getElementById("printButton");

    const searchInput = document.getElementById("searchInput");

    const currentYear = document.getElementById("currentYear");

    const scanProgress = document.getElementById("scanProgress");

    const sections = document.querySelectorAll(".policy-section");

    const navLinks = document.querySelectorAll(".sidebar a");


    /*
    |--------------------------------------------------------------------------
    | AÑO ACTUAL
    |--------------------------------------------------------------------------
    */

    currentYear.textContent = new Date().getFullYear();


    /*
    |--------------------------------------------------------------------------
    | MODO OSCURO
    |--------------------------------------------------------------------------
    */

    const savedTheme = localStorage.getItem("privacy-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeToggle.textContent = "☀";

    }


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        localStorage.setItem(
            "privacy-theme",
            isDark ? "dark" : "light"
        );

        themeToggle.textContent = isDark ? "☀" : "☾";

    });


    /*
    |--------------------------------------------------------------------------
    | IMPRIMIR / GUARDAR COMO PDF
    |--------------------------------------------------------------------------
    */

    printButton.addEventListener("click", () => {

        window.print();

    });


    /*
    |--------------------------------------------------------------------------
    | BÚSQUEDA
    |--------------------------------------------------------------------------
    */

    searchInput.addEventListener("input", (event) => {

        const searchTerm = event.target.value.toLowerCase().trim();


        sections.forEach((section) => {

            const content = section.textContent.toLowerCase();

            const matches = content.includes(searchTerm);


            if (searchTerm === "") {

                section.style.display = "";

            } else {

                section.style.display = matches
                    ? ""
                    : "none";

            }

        });

    });


    /*
    |--------------------------------------------------------------------------
    | NAVEGACIÓN ACTIVA
    |--------------------------------------------------------------------------
    */

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                    });


                    const activeLink = document.querySelector(
                        `.sidebar a[href="#${entry.target.id}"]`
                    );


                    if (activeLink) {

                        activeLink.classList.add("active");

                    }

                }

            });

        },

        {
            rootMargin: "-20% 0px -70% 0px"
        }

    );


    sections.forEach((section) => {

        observer.observe(section);

    });


    /*
    |--------------------------------------------------------------------------
    | BARRA DE PROGRESO DE LECTURA
    |--------------------------------------------------------------------------
    */

    const updateScanProgress = () => {

        const scrollTop = window.scrollY;

        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        const progress = docHeight > 0
            ? (scrollTop / docHeight) * 100
            : 0;

        scanProgress.style.width = `${progress}%`;

    };


    window.addEventListener("scroll", updateScanProgress, { passive: true });

    updateScanProgress();

});