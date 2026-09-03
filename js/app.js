/* ==========================================================
   GARSOLVE APPLICATION
   File: app.js

   Purpose:
   - Main JavaScript entry point
   - Coordinates site modules
   - Handles global page behavior
   - Initializes smooth navigation
   - Provides a small public API
   ========================================================== */

   (function () {

    "use strict";


    /* ======================================================
       APPLICATION STATE
    ====================================================== */

    const GarsolveApp = {

        initialized: false,

        modules: {}

    };


    /* ======================================================
       DOM READY
    ====================================================== */

    function initialize() {

        if (
            GarsolveApp.initialized
        ) {

            return;

        }


        GarsolveApp.initialized =
            true;


        /*
         * Store references to the modules that were
         * initialized by their individual JavaScript files.
         */

        GarsolveApp.modules =
            {

                navigation:
                    window.GarsolveNavigation ||
                    null,

                background:
                    window.GarsolveBackground ||
                    null,

                counters:
                    window.GarsolveCounters ||
                    null,

                observer:
                    window.GarsolveObserver ||
                    null

            };

            initializeSmoothAnchors();
            initializeExternalLinks();
            initializeCurrentYear();
                initializePageReady();


    }


    /* ======================================================
       SMOOTH ANCHOR NAVIGATION
    ====================================================== */

    function initializeSmoothAnchors() {

        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        links.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {

                            return;

                        }


                        event.preventDefault();


                        target.scrollIntoView(
                            {
                                behavior:
                                    getScrollBehavior(),

                                block:
                                    "start"
                            }
                        );


                        /*
                         * Update the URL without
                         * forcing a page reload.
                         */

                        if (
                            window.history &&
                            window.history.pushState
                        ) {

                            window.history.pushState(
                                null,
                                "",
                                targetId
                            );

                        }

                    }
                );

            }
        );

    }


    /* ======================================================
       SCROLL BEHAVIOR
    ====================================================== */

    function getScrollBehavior() {

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        return reducedMotion
            ? "auto"
            : "smooth";

    }


    /* ======================================================
       EXTERNAL LINKS
    ====================================================== */

    function initializeExternalLinks() {

        const externalLinks =
            document.querySelectorAll(
                'a[data-external="true"]'
            );


        externalLinks.forEach(
            function (link) {

                link.setAttribute(
                    "target",
                    "_blank"
                );


                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }
        );

    }



    /* ==========================================================
   SERVICE CARD INTERACTION
   ========================================================== */

    function initializeCurrentYear() {

        const yearElements =
            document.querySelectorAll(
                "[data-current-year]"
            );


        const currentYear =
            new Date().getFullYear();


        yearElements.forEach(
            function (element) {

                element.textContent =
                    currentYear;

            }
        );

    }


    /* ======================================================
       PAGE READY STATE
    ====================================================== */

    function initializePageReady() {

        /*
         * Give the browser one frame to finish layout
         * before announcing that the application is ready.
         */

        window.requestAnimationFrame(
            function () {

                document.documentElement.classList.add(
                    "app-ready"
                );

            }
        );

    }


    /* ======================================================
       HANDLE HASH ON INITIAL PAGE LOAD
    ====================================================== */

    function handleInitialHash() {

        const hash =
            window.location.hash;


        if (!hash) {

            return;

        }


        const target =
            document.querySelector(
                hash
            );


        if (!target) {

            return;

        }


        /*
         * Allow the browser to finish initial layout
         * before scrolling to the requested section.
         */

        window.requestAnimationFrame(
            function () {

                setTimeout(
                    function () {

                        target.scrollIntoView(
                            {
                                behavior:
                                    "auto",

                                block:
                                    "start"
                            }
                        );

                    },
                    50
                );

            }
        );

    }


    /* ======================================================
       HANDLE BACK / FORWARD NAVIGATION
    ====================================================== */

    window.addEventListener(
        "popstate",
        function () {

            const hash =
                window.location.hash;


            if (!hash) {

                window.scrollTo(
                    {
                        top: 0,
                        behavior:
                            getScrollBehavior()
                    }
                );

                return;

            }


            const target =
                document.querySelector(
                    hash
                );


            if (!target) {

                return;

            }


            target.scrollIntoView(
                {
                    behavior:
                        getScrollBehavior(),

                    block:
                        "start"
                }
            );

        }
    );


    /* ======================================================
       PAGE VISIBILITY
    ====================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            /*
             * The background module already handles
             * its own animation lifecycle.
             *
             * This hook is intentionally kept here as
             * a central application lifecycle point for
             * future modules.
             */

            if (
                document.hidden
            ) {

                document.documentElement.classList.add(
                    "page-hidden"
                );

            } else {

                document.documentElement.classList.remove(
                    "page-hidden"
                );

            }

        }
    );


    /* ======================================================
       INITIALIZE WHEN DOM IS READY
    ====================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                initialize();

                handleInitialHash();

            },
            {
                once: true
            }
        );

    } else {

        initialize();

        handleInitialHash();

    }


    /* ======================================================
       PUBLIC APPLICATION API
    ====================================================== */

    window.GarsolveApp =
        GarsolveApp;


})();