import { getParkData, getConditionsData } from "./parkService.mjs";
import { ConditionsMain } from "./template.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs";


async function init() {
    try {
        const parkData = await getParkData();
        const alertsAndVcData = await getConditionsData();
        
        // Sets the header, footer, and navigation
        await setHeaderFooter(parkData);
        
        // Renders the main content for the conditions page
        ConditionsMain(parkData, alertsAndVcData);
    }
    catch (error) {
        console.error(error);
    }
}

init();