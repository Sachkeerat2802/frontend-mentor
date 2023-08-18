"use strict";

/////////////////////////////
/////      NAVBAR       /////
/////////////////////////////

const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".nav-toggle");

navToggle.addEventListener("click", () => {
    if (nav.dataset.visible === "true") {
        nav.dataset.visible = "false";
        navToggle.setAttribute("aria-expanded", "false");
    } else {
        nav.dataset.visible = "true";
        navToggle.setAttribute("aria-expanded", "true");
    }
});

/////////////////////////////
///    UPDATING CONTENT   ///
/////////////////////////////

async function getData() {
    const request = new Request("assets/shared/data.json");
    const response = await fetch(request);
    const responseText = await response.text();
    const data = JSON.parse(responseText);

    populate(data);
}

const populate = (obj) => {
    if (window.location.href.includes("destination")) {
        const tabIndicators = document.querySelector(".tab-list");
        tabIndicators.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const data = obj["destinations"];

                tabIndicators.querySelectorAll("button").forEach((indicator) => {
                    indicator.setAttribute("aria-selected", "false");
                });
                e.target.setAttribute("aria-selected", "true");

                data.forEach((section) => {
                    if (section.name === e.target.textContent) {
                        document.querySelector(".destination-article__name").textContent = section.name;
                        document.querySelector(".destination-article__description").textContent = section.description;
                        document.querySelector(".destination-article__distance").textContent = section.distance;
                        document.querySelector(".destination-article__time").textContent = section.travel;
                        document.querySelector(".destination__img").querySelector("img").src = section.images.webp;
                    }
                });
            }
        });
    }

    if (window.location.href.includes("crew")) {
        const dotIndicators = document.querySelector(".dot-indicators");
        dotIndicators.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const data = obj["crew"];

                dotIndicators.querySelectorAll("button").forEach((indicator) => {
                    indicator.setAttribute("aria-selected", "false");
                });
                e.target.setAttribute("aria-selected", "true");

                data.forEach((section) => {
                    if (section.role === e.target.getAttribute("aria-label")) {
                        document.querySelector(".crew-article__designation").textContent = section.role;
                        document.querySelector(".crew-article__name").textContent = section.name;
                        document.querySelector(".crew-article__description").textContent = section.bio;
                        document.querySelector(".crew__img").querySelector("img").src = section.images.webp;
                    }
                });
            }
        });
    }

    if (window.location.href.includes("technology")) {
        const numIndicators = document.querySelector(".num-indicators");
        numIndicators.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const data = obj["technology"];

                numIndicators.querySelectorAll("button").forEach((indicator) => {
                    indicator.setAttribute("aria-selected", "false");
                });
                e.target.setAttribute("aria-selected", "true");

                data.forEach((section) => {
                    if (section.name === e.target.getAttribute("aria-label")) {
                        document.querySelector(".technology-article__name").textContent = section.name;
                        document.querySelector(".technology-article__description").textContent = section.description;
                        document.querySelector(".technology__img").dataset.type = section.name;
                    }
                });
            }
        });
    }
};

getData();
