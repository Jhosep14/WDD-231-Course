import { getParkData } from "./parkService.mjs";
import { parkInfoTemplate, parkMainTemplate, parkFooterTemplate } from "./template.mjs";

const parkData = getParkData();

// 1. Select the link element from the HTML
const npsLink = document.getElementById("nps-link");

// 2. Set the href attribute dynamically using the data
npsLink.href = parkData.url;

const parkImage = document.getElementById("park-image");
parkImage.src = parkData.images[0].url;
parkImage.alt = parkData.images[0].altText;



parkInfoTemplate(parkData);
parkMainTemplate(parkData);
parkFooterTemplate(parkData);

