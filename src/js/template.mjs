export function parkInfoTemplate(info) {
    const parkInfo = document.getElementById("park-info__content");
    parkInfo.innerHTML = `<span class="park-name">${info.name}</span>
    <div class="park-details">
    <span class="park-type">${info.designation}</span>
    <span class="states">${info.states}</span>
    </div>`;
}

export function parkMainTemplate(info) {
    const main = document.getElementById("main");
    main.innerHTML = `<h1 class="main-park-name">${info.fullName}</h1>
    <p class="park-description">${info.description}</p>
    <div class="media-grid">
        <div class="media-card">
            <img class="image-subtitle" src="${info.images[1].url}" alt="${info.images[1].altText}">
            <h2 class="subtitle-header">Current Conditions ›</h2>
            <p class="text-block">
                See what conditions to expect in the park before leaving on your trip!
            </p>
        </div>
        <div class="media-card">
            <img class="image-subtitle" src="${info.images[2].url}" alt="${info.images[2].altText}">
            <h2 class="subtitle-header">Fees and Passes ›</h2>
            <p class="text-block">
                Learn about the fees and passes that are available.
            </p>
        </div>
        <div class="media-card">
            <img class="image-subtitle" src="${info.images[5].url}" alt="${info.images[3].altText}">
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