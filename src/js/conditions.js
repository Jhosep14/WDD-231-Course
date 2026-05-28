import { getParkData, getConditionsData } from "./parkService.mjs";
import { parkInfoTemplate, parkFooterTemplate, ConditionsMain } from "./template.mjs";


async function init() {
    try {
        const parkData = await getParkData();
        const alertsAndVcData = await getConditionsData();
        const npsLink = document.getElementById("nps-link");
        npsLink.href = parkData.url;

        parkInfoTemplate(parkData);
        ConditionsMain(parkData, alertsAndVcData);
        parkFooterTemplate(parkData);
    }
    catch (error) {
        console.error(error);
    }
}
init();