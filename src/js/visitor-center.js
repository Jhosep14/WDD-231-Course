import { getParkData, getVisitorCentersData } from "./parkService.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs";

async function init() {
    try {
        const parkData = await getParkData();

        // Sets the header, footer, and navigation
        await setHeaderFooter(parkData);

        const id = getParam("id");
        const centerDetails = await getVisitorCentersData(id);
        setVisitorCenterInfo(centerDetails[0]);

    }
    catch (error) {
        console.error(error);
    }
}


function getParam(param) {
    const search = location.search;
    const urlParams = new URLSearchParams(search);
    return urlParams.get(param);
}

function setVisitorCenterInfo(centerDetails) {
    const vcSection = document.getElementById("visitor-center-info");
    vcSection.innerHTML = vcListTemplate(centerDetails);
}

function vcListTemplate(centerDetail) {
    // Generate Addresses
    let addressesHtml;
    if (centerDetail.addresses && centerDetail.addresses.length > 0) {
        addressesHtml = centerDetail.addresses.map(a => `
            <div class="vc-address">
                <h4>${a.type} Address</h4>
                <address>
                    ${a.line1}<br>
                    ${a.line2 ? a.line2 + '<br>' : ''}
                    ${a.line3 ? a.line3 + '<br>' : ''}
                    ${a.city}, ${a.stateCode} ${a.postalCode}
                </address>
            </div>
        `).join("");
    } else {
        addressesHtml = "<p>No address available.</p>";
    }

    // Generate Amenities
    let amenitiesHtml;
    if (centerDetail.amenities && centerDetail.amenities.length > 0) {
        amenitiesHtml = "<ul>" + centerDetail.amenities.map(a => `<li>${a}</li>`).join("") + "</ul>";
    } else {
        amenitiesHtml = "<p>No amenities listed.</p>";
    }

    // Generate Contacts
    let contactsHtml = "";
    if (centerDetail.contacts && centerDetail.contacts.phoneNumbers && centerDetail.contacts.phoneNumbers.length > 0) {
        contactsHtml += centerDetail.contacts.phoneNumbers.map(p => `<p>${p.type}: ${p.phoneNumber}</p>`).join("");
    }
    if (centerDetail.contacts && centerDetail.contacts.emailAddresses && centerDetail.contacts.emailAddresses.length > 0) {
        contactsHtml += centerDetail.contacts.emailAddresses.map(e => `<p>Email: <a href="mailto:${e.emailAddress}">${e.emailAddress}</a></p>`).join("");
    }
    if (!contactsHtml) {
        contactsHtml = "<p>No contact information available.</p>";
    }

    // Generate Gallery
    let galleryHtml = "";
    if (centerDetail.images && centerDetail.images.length > 0) {
        centerDetail.images.forEach(img => {
            galleryHtml += `
            <div class="visitor-center__gallery__image"><img src="${img.url}" alt="${img.altText || centerDetail.name}"></div>
            `;
        });
    } else {
        galleryHtml = "<p>No images available.</p>";
    }

    return `
    <section class="visitor-center-info">
        <article class="visitor-center__article">
            <h1 class="visitor-center__name">
                <svg class="icon_vc">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/visitor-center-icon.svg">
                    </use>
                </svg>
                ${centerDetail.name}
            </h1>
            <img class="visitor-center__image" src="${centerDetail.images?.[0]?.url || ''}" alt="${centerDetail.name}">
            <p class="visitor-center__description">${centerDetail.description}</p>
        </article>
        
        <article class="visitor-center__details-container">
            <details class="vc-details" open>
                <summary>
                    <div class="vc-details-summary-content">
                        <svg class="icon_vc_detail"><use href="/images/sprite.symbol.svg#heading-icon_map-pin"></use></svg>
                        <span>ADDRESSES</span>
                    </div>
                    <svg class="chevron"><use href="/images/sprite.symbol.svg#arrow"></use></svg>
                </summary>
                <div class="vc-details-content">
                    ${addressesHtml}
                </div>
            </details>
            
            <details class="vc-details">
                <summary>
                    <div class="vc-details-summary-content">
                        <svg class="icon_vc_detail"><use href="/images/sprite.symbol.svg#directions"></use></svg>
                        <span>DIRECTIONS</span>
                    </div>
                    <svg class="chevron"><use href="/images/sprite.symbol.svg#arrow"></use></svg>
                </summary>
                <div class="vc-details-content">
                    <p>${centerDetail.directionsInfo || 'No directions available.'}</p>
                    ${centerDetail.directionsUrl ? `<p><a href="${centerDetail.directionsUrl}">Get Directions</a></p>` : ''}
                </div>
            </details>
            
            <details class="vc-details">
                <summary>
                    <div class="vc-details-summary-content">
                        <svg class="icon_vc_detail"><use href="/images/sprite.symbol.svg#heading-icon_info"></use></svg>
                        <span>AMENITIES</span>
                    </div>
                    <svg class="chevron"><use href="/images/sprite.symbol.svg#arrow"></use></svg>
                </summary>
                <div class="vc-details-content">
                    ${amenitiesHtml}
                </div>
            </details>
            
            <details class="vc-details">
                <summary>
                    <div class="vc-details-summary-content">
                        <svg class="icon_vc_detail"><use href="/images/sprite.symbol.svg#phone"></use></svg>
                        <span>CONTACTS</span>
                    </div>
                    <svg class="chevron"><use href="/images/sprite.symbol.svg#arrow"></use></svg>
                </summary>
                <div class="vc-details-content">
                    ${contactsHtml}
                </div>
            </details>
            
            <details class="vc-details">
                <summary>
                    <div class="vc-details-summary-content">
                        <svg class="icon_vc_detail"><use href="/images/sprite.symbol.svg#camera-alt"></use></svg>
                        <span>IMAGE GALLERY</span>
                    </div>
                    <svg class="chevron"><use href="/images/sprite.symbol.svg#arrow"></use></svg>
                </summary>
                <div class="vc-details-content vc-gallery-container">
                    ${galleryHtml}
                </div>
            </details>
        </article>
    </section>
    `;
}



init();