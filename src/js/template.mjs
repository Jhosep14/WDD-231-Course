export function parkInfoTemplate(info) {
    const parkInfo = document.getElementById("park-info__content");
    const parkImage = document.getElementById("park-image");
    parkImage.src = info.images[0].url;
    parkImage.alt = info.images[0].altText;
    parkInfo.innerHTML = ` 
    <span class="park-name">${info.name}</span>
    <div class="park-details">
    <span class="park-type">${info.designation}</span>
    <span class="states">${info.states}</span>
    </div>`
}

export function parkMainTemplate(info) {
    const main = document.getElementById("main");

    // Some parks might not have 6 images! If an image is missing, we fall back to the first image (info.images[0])
    const img1 = info.images[1] || info.images[0];
    const img2 = info.images[2] || info.images[0];
    const img3 = info.images[3] || info.images[0];

    main.innerHTML = `<h1 class="main-park-name">${info.fullName}</h1>
    <p class="park-description">${info.description}</p>
    <div class="media-grid">
        <div class="media-card">
            <img class="image-subtitle" src="${img1.url}" alt="${img1.altText}">
            <h2 class="subtitle-header">Current Conditions ›</h2>
            <p class="text-block">
                See what conditions to expect in the park before leaving on your trip!
            </p>
        </div>
        <div class="media-card">
            <img class="image-subtitle" src="${img2.url}" alt="${img2.altText}">
            <h2 class="subtitle-header">Fees and Passes ›</h2>
            <p class="text-block">
                Learn about the fees and passes that are available.
            </p>
        </div>
        <div class="media-card">
            <img class="image-subtitle" src="${img3.url}" alt="${img3.altText}">
            <h2 class="subtitle-header">Visitor Centers ›</h2>
            <p class="text-block">
                Learn about the visitor centers in the park.
            </p>
        </div>
    </div>`;
}

export function parkFooterTemplate(info) {
    const footer = document.getElementById("park-footer");
    footer.innerHTML =
        `<div class="contact-info">
            <h3 class="footer-title">CONTACT INFO</h3>
            <span class="footer-subtitle">Mailing Address</span>
            <p class="footer-text">
            ${info.addresses[1].line1}
            ${info.addresses[1].line2}
            ${info.addresses[1].city}, ${info.addresses[1].stateCode} ${info.addresses[1].postalCode}
            </p>
            <span class="footer-subtitle">Phone</span>
            <p class="footer-text">
            ${info.contacts.phoneNumbers[0].phoneNumber}
            </p>
        </div>`;
}

/* Conditions pages templates --------------------------------------------------------*/

export function ConditionsMain(info, conditionsData) {
    const mainSection = document.getElementById("main");
    const alertsData = conditionsData.alertsData;
    const vcData = conditionsData.vcData;
    // Loop through all alerts and create list items for each one with specific SVG icons and style classes
    const alertsHtml = alertsData && alertsData.data.length > 0
        ? alertsData.data.map(alert => {
            const category = alert.category ? alert.category.toLowerCase() : "";
            let catClass = "alert-information";
            let iconId = "alert-information";

            if (category === "danger") {
                catClass = "alert-danger";
                iconId = "alert-danger";
            } else if (category === "caution" || category === "warning") {
                catClass = "alert-caution";
                iconId = "alert-caution";
            } else if (category === "park closure" || category === "closure") {
                catClass = "alert-closure";
                iconId = "alert-closure";
            }

            const iconSvg = `<svg class="icon" focusable="false" aria-hidden="true"><use xlink:href="/images/sprite.symbol.svg#${iconId}"></use></svg>`;

            return `
                <li class="alert-card ${catClass}">
                    <div class="alert-icon-container">${iconSvg}</div>
                    <div class="alert-content">
                        <h3>${alert.title}</h3>
                        <p>${alert.description}</p>
                    </div>
                </li>`;
        }).join("")
        : "<li>No active alerts at this time.</li>";

    // Loop through visitor centers and create dynamic list matching the image layout (no bullets, thin separators)
    const visitorHtml = vcData && vcData.data.length > 0
        ? vcData.data.map(vc => `
            <div class="visitor-center-item">
                <h3>${vc.name}</h3>
                <p>${vc.description}</p>
                ${vc.directionsInfo ? `<p>${vc.directionsInfo}</p>` : ""}
            </div>
          `).join("")
        : "<p class=\"visitor-center-item\">No visitor centers listed.</p>";

    // Pull the activities list dynamically from `info`
    const activitiesHtml = info.activities && info.activities.length > 0
        ? info.activities.map(act => `<li>${act.name}</li>`).join("")
        : "<li>No activities listed.</li>";

    mainSection.innerHTML =
        `<h1>Current Conditions</h1>
        <section class="alerts">
            <h2>Alerts</h2>
            <ul>${alertsHtml}</ul>
        </section>
        <section class="visitor">
            <h2>Visitor Services</h2>
            <details name="current-details">
                <summary>Visitor Centers</summary>
                <div class="visitor-center-list">
                    ${visitorHtml}
                </div>
            </details>
        </section>
        <section class="activities">
            <h2>Activities</h2>
            <details name="current-details">
                <summary>All Activities</summary>
                <ul class="activities-list">
                    ${activitiesHtml}
                </ul>
            </details>
        </section>`;
}

