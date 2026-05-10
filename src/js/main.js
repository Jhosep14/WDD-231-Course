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
init();
