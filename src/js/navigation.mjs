export function enableNavigation() {
    const menuButton = document.querySelector("#global-nav-toggle");
    if (!menuButton) return;
    menuButton.addEventListener("click", (ev) => {
        let target = ev.target;
        const globalNav = document.querySelector(".global-nav");
        if (globalNav) {
            globalNav.classList.toggle("show");
            if (target.tagName != "BUTTON") {
                target = target.closest("button");
            }
            if (globalNav.classList.contains("show")) {
                target.setAttribute("aria-expanded", true);
            } else {
                target.setAttribute("aria-expanded", false);
            }
        }
    });
}

export function ToggleforSubMenu() {
    const subMenuToggle = document.querySelectorAll(".global-nav__split-button__toggle");
    const subMenuLinks = document.querySelectorAll(".global-nav__submenu");
    if (!subMenuToggle || !subMenuLinks) return;
    
    subMenuToggle.forEach((element, index) => {
        element.addEventListener("click", () => {
            if (window.innerWidth <= 1024) {
                const targetSubMenu = subMenuLinks[index];
                if (targetSubMenu) {
                    targetSubMenu.classList.toggle("show");
                    if (targetSubMenu.classList.contains("show")) {
                        element.setAttribute("aria-expanded", "true");
                    } else {
                        element.setAttribute("aria-expanded", "false");
                    }
                }
            }
        });
    });
}
