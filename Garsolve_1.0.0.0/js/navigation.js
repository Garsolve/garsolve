/* ==========================================================
   GARSOLVE NAVIGATION
   File: navigation.js
   ========================================================== */

   (function () {
    "use strict";


    /* ======================================================
       ELEMENTS
    ====================================================== */

    const toggle = document.getElementById("navigationToggle");
    const navigation = document.getElementById("primaryNavigation");
    const header = document.getElementById("siteHeader");

    if (!toggle || !navigation) {
        return;
    }


    const navigationLinks =
        navigation.querySelectorAll("a");


    /* ======================================================
       OPEN / CLOSE MENU
    ====================================================== */

    function openMenu() {

        navigation.classList.add("is-open");

        toggle.classList.add("is-open");

        toggle.setAttribute(
            "aria-expanded",
            "true"
        );

        toggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add(
            "navigation-open"
        );
    }


    function closeMenu() {

        navigation.classList.remove("is-open");

        toggle.classList.remove("is-open");

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

        toggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove(
            "navigation-open"
        );
    }


    function toggleMenu() {

        const isOpen =
            navigation.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    /* ======================================================
       TOGGLE BUTTON
    ====================================================== */

    toggle.addEventListener(
        "click",
        toggleMenu
    );


    /* ======================================================
       CLOSE WHEN NAVIGATION LINK IS SELECTED
    ====================================================== */

    navigationLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMenu();

            }
        );

    });


    /* ======================================================
       CLOSE WITH ESCAPE
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navigation.classList.contains("is-open")
            ) {

                closeMenu();

                toggle.focus();

            }

        }
    );


    /* ======================================================
       CLOSE WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const clickedInsideNavigation =
                navigation.contains(event.target);

            const clickedToggle =
                toggle.contains(event.target);

            if (
                navigation.classList.contains("is-open") &&
                !clickedInsideNavigation &&
                !clickedToggle
            ) {

                closeMenu();

            }

        }
    );


    /* ======================================================
       PREVENT BODY SCROLL WHILE MENU IS OPEN
    ====================================================== */

    const bodyNavigationStyles =
        document.createElement("style");

    bodyNavigationStyles.textContent = `

        body.navigation-open {
            overflow: hidden;
        }

    `;

    document.head.appendChild(
        bodyNavigationStyles
    );


    /* ======================================================
       CLOSE MENU WHEN RETURNING TO DESKTOP
    ====================================================== */

    const desktopBreakpoint =
        window.matchMedia("(min-width: 901px)");


    function handleBreakpointChange(event) {

        if (event.matches) {

            closeMenu();

        }

    }


    if (
        typeof desktopBreakpoint.addEventListener ===
        "function"
    ) {

        desktopBreakpoint.addEventListener(
            "change",
            handleBreakpointChange
        );

    } else {

        /*
         * Compatibility fallback for older browsers.
         */

        desktopBreakpoint.addListener(
            handleBreakpointChange
        );

    }


    /* ======================================================
       HEADER SCROLL STATE
    ====================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add(
                "is-scrolled"
            );

        } else {

            header.classList.remove(
                "is-scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* ======================================================
       HEADER SCROLL STATE
    ====================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add(
                "is-scrolled"
            );

        } else {

            header.classList.remove(
                "is-scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();


    /* ======================================================
       PUBLIC API
    ====================================================== */

    window.GarsolveNavigation = {

        open: openMenu,

        close: closeMenu,

        toggle: toggleMenu,

        updateHeader: updateHeader

    };


})();