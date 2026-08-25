/* ==========================================================
   GARSOLVE PARTICLE FIELD
   File: background.js

   - Slow floating particles
   - No connecting lines
   - No grid
   - Cursor proximity glow
   - DOM-based for reliable rendering on GitHub Pages
   ========================================================== */

(function () {
    "use strict";

    const field = document.getElementById("particleField");

    if (!field) {
        return;
    }

    const CONFIG = {
        count: 52,
        minSize: 2,
        maxSize: 4,
        minDuration: 55,
        maxDuration: 95,
        minDelay: -95,
        hoverDistance: 215,
        baseOpacity: 0.34
    };

    const particles = [];
    const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let reducedMotion = reducedMotionQuery.matches;

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createParticle(index) {
        const particle = document.createElement("span");

        particle.className = "particle";

        const size = random(
            CONFIG.minSize,
            CONFIG.maxSize
        );

        const duration = random(
            CONFIG.minDuration,
            CONFIG.maxDuration
        );

        const delay = random(
            CONFIG.minDelay,
            0
        );

        const driftX1 = random(-45, 45);
        const driftY1 = random(-38, 38);
        const driftX2 = random(-90, 90);
        const driftY2 = random(-70, 70);
        const driftX3 = random(-55, 55);
        const driftY3 = random(-45, 45);

        particle.style.left = `${random(2, 98)}%`;
        particle.style.top = `${random(2, 98)}%`;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.setProperty(
            "--drift-x-1",
            `${driftX1}px`
        );

        particle.style.setProperty(
            "--drift-y-1",
            `${driftY1}px`
        );

        particle.style.setProperty(
            "--drift-x-2",
            `${driftX2}px`
        );

        particle.style.setProperty(
            "--drift-y-2",
            `${driftY2}px`
        );

        particle.style.setProperty(
            "--drift-x-3",
            `${driftX3}px`
        );

        particle.style.setProperty(
            "--drift-y-3",
            `${driftY3}px`
        );

        particle.style.setProperty(
            "--particle-opacity",
            random(
                CONFIG.baseOpacity * 0.65,
                CONFIG.baseOpacity * 1.25
            )
        );

        particle.style.animationDuration =
            `${duration}s`;

        particle.style.animationDelay =
            `${delay}s`;

        particle.dataset.index = String(index);

        field.appendChild(particle);
        particles.push(particle);
    }

    function buildParticles() {
        field.innerHTML = "";
        particles.length = 0;

        for (let i = 0; i < CONFIG.count; i += 1) {
            createParticle(i);
        }

        if (reducedMotion) {
            field.classList.add("particle-field--static");
        } else {
            field.classList.remove("particle-field--static");
        }
    }

    function updateMotionPreference() {
        reducedMotion =
            reducedMotionQuery.matches;

        if (reducedMotion) {
            field.classList.add("particle-field--static");
        } else {
            field.classList.remove("particle-field--static");
        }
    }

    function updateGlow(event) {
        if (
            reducedMotion ||
            !event
        ) {
            return;
        }

        const x = event.clientX;
        const y = event.clientY;

        particles.forEach((particle) => {
            const rect =
                particle.getBoundingClientRect();

            const centerX =
                rect.left +
                rect.width / 2;

            const centerY =
                rect.top +
                rect.height / 2;

            const dx =
                centerX - x;

            const dy =
                centerY - y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < CONFIG.hoverDistance) {
                const strength = Math.pow(
                    1 -
                    distance /
                    CONFIG.hoverDistance,
                    0.72
                );

                particle.classList.add(
                    "particle--glowing"
                );

                particle.style.setProperty(
                    "--glow-strength",
                    strength.toFixed(3)
                );
            } else {
                particle.classList.remove(
                    "particle--glowing"
                );

                particle.style.removeProperty(
                    "--glow-strength"
                );
            }
        });
    }

    function clearGlow() {
        particles.forEach((particle) => {
            particle.classList.remove(
                "particle--glowing"
            );

            particle.style.removeProperty(
                "--glow-strength"
            );
        });
    }

    window.addEventListener(
        "mousemove",
        updateGlow,
        { passive: true }
    );

    window.addEventListener(
        "mouseleave",
        clearGlow
    );

    if (
        typeof reducedMotionQuery.addEventListener ===
        "function"
    ) {
        reducedMotionQuery.addEventListener(
            "change",
            updateMotionPreference
        );
    }

    buildParticles();

    window.GarsolveBackground = {
        rebuild: buildParticles,
        clearGlow
    };
})();
