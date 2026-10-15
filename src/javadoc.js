(() => {
    const init = () => {
        if (document.getElementById("navbars-toggle") === null) {
            const body = document.querySelector("body");
            const newElement = document.createElement("input");
            newElement.type = "checkbox";
            newElement.id = "navbars-toggle";
            body.prepend(newElement);

            document.querySelectorAll(".toc-list a").forEach(link => {
                link.addEventListener('click', () => {
                    document.getElementById('navbars-toggle').checked = false;
                });
            });

            if (!CSS.supports("(container-type: scroll-state)")) {
                const element = document.querySelector("html");
                let lastKnownScrollPosition = 0;
                let ticking = false;
                window.addEventListener('scroll', () => {
                    const currentScrollY = window.scrollY;

                    if (!ticking) {
                        window.requestAnimationFrame(() => {
                            if (currentScrollY > lastKnownScrollPosition) {
                                // Scrolling DOWN
                                element.classList.add("scrolling-downwards");
                            } else {
                                // Scrolling UP (or static)
                                element.classList.remove("scrolling-downwards");
                            }

                            lastKnownScrollPosition = currentScrollY;
                            ticking = false;
                        });

                        ticking = true;
                    }
                });
            }
        }
    };
    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
