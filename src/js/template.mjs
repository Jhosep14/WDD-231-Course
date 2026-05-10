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