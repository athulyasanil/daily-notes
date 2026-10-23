
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const petalContainer = document.querySelector(".petal-container");
    const letterCard = document.querySelector(".letter-card");
    const navigationLinks = document.querySelectorAll(
        ".page-navigation a"
    );

    // Respect the visitor's motion preferences.
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Create additional falling rose petals.
    function createPetals() {
        if (!petalContainer || reduceMotion) return;

        for (let i = 0; i < 12; i++) {
            const petal = document.createElement("span");

            petal.classList.add("petal", "extra-petal");

            petal.style.left = Math.random() * 100 + "%";
            petal.style.animationDelay = -(Math.random() * 15) + "s";
            petal.style.animationDuration =
                10 + Math.random() * 10 + "s";

            const size = 7 + Math.random() * 8;
            petal.style.width = size + "px";
            petal.style.height = size * 1.45 + "px";

            petalContainer.appendChild(petal);
        }
    }

    createPetals();

    // Add a gentle fade when opening another page.
    navigationLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const destination = link.getAttribute("href");

            if (
                !destination ||
                destination.startsWith("#") ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey ||
                event.button !== 0 ||
                reduceMotion
            ) {
                return;
            }

            event.preventDefault();

            if (letterCard) {
                letterCard.style.transition =
                    "opacity 0.35s ease, transform 0.35s ease";

                letterCard.style.opacity = "0";
                letterCard.style.transform = "translateY(12px)";
            }

            body.style.transition = "opacity 0.35s ease";
            body.style.opacity = "0";

            window.setTimeout(() => {
                window.location.href = destination;
            }, 350);
        });
    });

    // Restore the page's visibility after navigation.
    body.style.opacity = "1";

    // Add a small heart when the visitor clicks the letter.
    if (letterCard && !reduceMotion) {
        letterCard.addEventListener("click", (event) => {
            // Do not create hearts when clicking navigation links.
            if (event.target.closest("a")) return;

            const heart = document.createElement("span");

            heart.textContent = "♥";
            heart.setAttribute("aria-hidden", "true");

            heart.style.position = "fixed";
            heart.style.left = event.clientX + "px";
            heart.style.top = event.clientY + "px";
            heart.style.zIndex = "9999";
            heart.style.pointerEvents = "none";
            heart.style.color = "#a83249";
            heart.style.fontSize = "19px";
            heart.style.textShadow =
                "0 2px 8px rgba(100, 20, 40, 0.2)";
            heart.style.transition =
                "transform 0.8s ease, opacity 0.8s ease";

            document.body.appendChild(heart);

            requestAnimationFrame(() => {
                heart.style.transform =
                    "translateY(-45px) scale(1.5)";
                heart.style.opacity = "0";
            });

            window.setTimeout(() => {
                heart.remove();
            }, 850);
        });
    }

    // Keep the page counter accessible to screen readers.
    const counter = document.querySelector(".counter-text");

    if (counter) {
        counter.setAttribute("aria-live", "polite");
    }
});
