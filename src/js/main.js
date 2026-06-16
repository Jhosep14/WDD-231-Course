import { getParkData } from "./parkService.mjs";
import { parkMainTemplate } from "./template.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs";

async function init() {
    try {
        const parkData = await getParkData();
        
        // Sets the header, footer, and navigation
        await setHeaderFooter(parkData);
        
        // Renders the main content for the home page
        parkMainTemplate(parkData);
    }
    catch (error) {
        console.error(error);
    }
}

init();
