/* ==========================================================
   GARSOLVE SCROLL REVEAL
   File: observer.js
   ========================================================== */

   (function () {

    "use strict";

    const elements =
        document.querySelectorAll(
            "[data-reveal], .reveal-stagger"
        );

    if (!elements.length) {
        return;
    }

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* ======================================================
       REDUCED MOTION / FALLBACK
    ====================================================== */

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            function (element) {

                element.classList.add(
                    "is-visible"
                );

            }
        );

        return;
    }


    /* ======================================================
       OBSERVER
    ====================================================== */

    const observer =
        new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    elements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );


    /* ======================================================
       PUBLIC API
       ====================================================== */

    window.GarsolveObserver = {

        revealAll: function () {

            elements.forEach(
                function (element) {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );

        }

    };

})();