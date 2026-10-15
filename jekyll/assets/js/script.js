(() => {
    document.querySelectorAll("main pre").forEach(element => {
        const contents = element.textContent;
        element.insertAdjacentHTML('beforebegin', '<button class="copy"><span>Copy</span></button>');
        const button = element.previousElementSibling;
        const buttonCopySpan = button.querySelector("span");
        button.onclick = async () => {
            await navigator.clipboard.writeText(contents);
            buttonCopySpan.innerHTML = "Copied!";
            setTimeout(function() {
                setTimeout(function() {
                    buttonCopySpan.innerHTML = "Copy";
                }, 100);
            }, 1900);
        }
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

    const correctLinkTargets = (currentUrl) => {
        document.querySelectorAll('a').forEach(link => {
            link.classList.remove('to-current-target');
            if (link.href === currentUrl) {
                link.classList.add('to-current-target');
            }
        });
    };

    correctLinkTargets(window.location.href);
    document.querySelectorAll('a').forEach(link => {
        link.onclick = () => {
            correctLinkTargets(link.href);
            document.getElementById('navbars-toggle').checked = false;
        };
    });
})();
