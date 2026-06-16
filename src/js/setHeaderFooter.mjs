import { getParkData } from "./parkService.mjs";
import { parkInfoTemplate, parkFooterTemplate } from "./template.mjs";
import { enableNavigation, ToggleforSubMenu } from "./navigation.mjs";

export async function setHeaderFooter(parkData) {
    if (!parkData) {
        parkData = await getParkData();
    }
    
    const npsLink = document.getElementById("nps-link");
    if (npsLink) {
        npsLink.href = parkData.url;
    }

    parkInfoTemplate(parkData);
    parkFooterTemplate(parkData);
    enableNavigation();
    ToggleforSubMenu();
}
