import { getParkData } from "./parkService.mjs";
import { parkInfoTemplate, parkMainTemplate, parkFooterTemplate } from "./template.mjs";

async function init() {
    try {
        const parkData = await getParkData();
        const npsLink = document.getElementById("nps-link");
        npsLink.href = parkData.url;

        parkInfoTemplate(parkData);
        parkMainTemplate(parkData);
        parkFooterTemplate(parkData);
    }
    catch (error) {
        console.error(error);
    }
}

function enableNavigation() {
    const menuButton = document.querySelector("#global-nav-toggle");
    menuButton.addEventListener("click", (ev) => {
        let target = ev.target;
        document.querySelector(".global-nav").classList.toggle("show");
        if (target.tagName != "BUTTON") {
            target = target.closest("button");
        }
        if (document.querySelector(".global-nav").classList.contains("show")) {
            target.setAttribute("aria-expanded", true);
        } else {
            target.setAttribute("aria-expanded", false);
        }

        console.log("toggle");
    });
}
enableNavigation();
init();
