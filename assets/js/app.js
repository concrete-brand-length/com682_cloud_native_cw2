// Azure Endpoints
const LOGIN_URL =
    "https://com682-assignment-web-app.azurewebsites.net/.auth/login/github";
const LOGOUT_URL =
    "https://com682-assignment-web-app.azurewebsites.net/.auth/logout";

const $forms_container = $("#forms-container");
const $navbar_buttons_container = $("#navbar-buttons-container");
const $hero_register_form_button = $("#hero-register-button");

const search = document.getElementById("search-bar");

// Temporary dummy data for testing - To be removed.
let dummyData = [
    {
        postID: "d017fe9b-7c3a-4db6-b89a-a0a530bffa65",
        postImage: "./assets/images/CISA.webp",
        postTitle: "New Bugs Land in CISA's Catalog",
        postBody:
            "The U.S. Cybersecurity and Infrastructure Security Agency (CISA) on Monday added five security flaws to its Known Exploited Vulnerabilities (KEV) Catalog, officially confirming a recently disclosed vulnerability impacting Oracle E-Business Suite (EBS) has been weaponized in real-world attacks.",
        resources: [
            {
                resourceId: "c3d168d5-1189-4e7b-a711-c350ce7b32ea",
                resourceType: "image",
                resourceName: "Test Image 1",
                resourceURI: "./assets/images/CISA.webp",
            },
            {
                resourceId: "bd5a956b-08c7-4f57-aaa2-ffc4212c2419",
                resourceType: "image",
                resourceName: "Test Image 2",
                resourceURI: "./assets/images/CISA.webp",
            },
            {
                resourceId: "13b190d8-e807-4d6e-8530-ca322187dfdd",
                resourceType: "image",
                resourceName: "Test Image 3",
                resourceURI: "./assets/images/CISA.webp",
            },
        ],
    },
    {
        postID: "7c0a34ba-c54b-464a-a044-8b292a118770",
        postImage: "./assets/images/sim-farm.webp",
        postTitle: "Europol Dismantles SIM Farm Network",
        postBody:
            "Europol on Friday announced the disruption of a sophisticated cybercrime-as-a-service (CaaS) platform that operated a SIM farm and enabled its customers to carry out a broad spectrum of crimes ranging from phishing to investment fraud (Lakshmanan, 2025).",
        resources: [
            {
                resourceId: "3bca3406-e250-47cc-b6f8-46e0f86a7884",
                resourceType: "image",
                resourceName: "Test Image 1",
                resourceURI: "./assets/images/sim-farm.webp",
            },
            {
                resourceId: "3aa23d1f-1a97-4c3d-84fe-e677d46d7327",
                resourceType: "image",
                resourceName: "Test Image 2",
                resourceURI: "./assets/images/sim-farm.webp",
            },
            {
                resourceId: "4447979b-c27e-4049-89a9-1df8fac45119",
                resourceType: "image",
                resourceName: "Test Image 3",
                resourceURI: "./assets/images/sim-farm.webp",
            },
        ],
    },
    {
        postID: "038755db-8e20-408d-8238-d3a660154b5b",
        postImage: "./assets/images/pdf-malware.webp",
        postTitle: "Silver Fox Expands Winos 4.0 Attacks",
        postBody:
            "The threat actors behind a malware family known as Winos 4.0 (aka ValleyRAT) have expanded their targeting footprint from China and Taiwan to target Japan and Malaysia with another remote access trojan (RAT) tracked as HoldingHands RAT (aka Gh0stBins) (Lakshmanan, 2025).",
        resources: [
            {
                resourceId: "0acc581c-7121-4546-8e27-4a81dce6ed3a",
                resourceType: "image",
                resourceName: "Test Image 1",
                resourceURI: "./assets/images/pdf-malware.webp",
            },
            {
                resourceId: "0af05e3c-0adb-4a5f-a315-72c2b0ad4991",
                resourceType: "image",
                resourceName: "Test Image 2",
                resourceURI: "./assets/images/pdf-malware.webp",
            },
            {
                resourceId: "42ea0870-3cd1-4b53-a96c-f354a6b34ab2",
                resourceType: "image",
                resourceName: "Test Image 3",
                resourceURI: "./assets/images/pdf-malware.webp",
            },
        ],
    },
];

$(function () {
    loadPosts();
});

// Homepage Posts
function loadPosts() {
    window.location.hash = `/`;
    checkAuth();
    const $homepage_posts = $("#homepage-posts");

    // Temporary dummy data processing for testing - To be removed
    const processedPosts = processPosts(dummyData);

    // const postsData = getPostsRequest();
    // const processedPosts = processPosts(postsData);

    $homepage_posts.html(
        `<div class="row" data-masonry='{"percentPosition": true }'>${processedPosts.join(
            ""
        )}</div>`
    );
}

function login() {
    window.location.href = LOGIN_URL;
}

function logout() {
    window.location.href = LOGOUT_URL;
}

function userPosts() {
    window.location.href = "user_posts.html";
}

// Temporary for testing - To be modified to using Azure Cognitive Search
function onSearch(event) {
    window.location.hash = `/search`;
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    alert(`Your searched for ${formData.get("search-bar")}`);
    form.reset();
    window.location.hash = `/`;
}

// Helper Functions
function altImage() {
    return `<svg
              aria-label="Placeholder: Image cap"
              class="bd-placeholder-img card-img-top"
              height="200"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#868e96"></rect>
              <text x="50%" y="50%" fill="#dee2e6" dy=".3em">No Image Found</text>
            </svg>`;
}

function processPosts(postsData, view = "") {
    const requiredKeys = ["postID", "postTitle", "postBody"];
    const cards = [];
    for (post of postsData) {
        if (requiredKeys.every((key) => post?.hasOwnProperty(key))) {
            let resources;
            post.resources
                ? (resources = processPostResources(post.resources))
                : {};

            cards.push(
                `
                    <div id="${post.postID}" class="col-sm-6 col-lg-4 mb-4" >
                        <div class="card" style="min-height: 30rem;">
                            ${
                                post.postImage
                                    ? `
                                        <img 
                                            src="${post.postImage}" 
                                            class="card-img-top" 
                                            height="200" 
                                            width="100%"
                                            >
                                    `
                                    : altImage()
                            }
              
                            <div class="card-body">
                                <h5 class="card-title">${post.postTitle}</h5>

                                <p class="card-text">
                                    ${post.postBody}
                                </p>
                
                                ${
                                    resources
                                        ? `
                                            <div class="dropdown">
                                                <button 
                                                    class="btn btn-outline-secondary dropdown-toggle w-100" 
                                                    type="button" 
                                                    data-bs-toggle="dropdown"
                                                    >
                                                    See ${
                                                        resources.resourceCount
                                                    } Resources
                                                </button>

                                                <div class="dropdown-menu w-100">
                                                    <h6 class="dropdown-header">Images</h6>

                                                    ${resources.resources.join(
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                        `
                                        : `<div></div>`
                                }
                            </div>
                        </div>
                    </div>
                `
            );
        }
    }

    return cards;
}

function processPostResources(resourceData) {
    const requiredKeys = [
        "resourceId",
        "resourceType",
        "resourceName",
        "resourceURI",
    ];
    let resourceCount = 0;
    let resources = [];
    for (res of resourceData) {
        if (requiredKeys.every((key) => res?.hasOwnProperty(key))) {
            resourceCount += 1;
            resources.push(
                `<a id="${res["resourceId"]}" class="dropdown-item" href="${res["resourceURI"]}" target="_blank">${res["resourceName"]}</a>`
            );
        }
    }

    return { resourceCount: resourceCount, resources: resources };
}

function setLoggedInUserButtons() {
    $navbar_buttons_container.empty();
    $navbar_buttons_container.html(
        `
            <button onclick="userPosts()" type="button" class="btn btn-primary col" style="width: 6rem;">My Posts</button>
            <button onclick="logout()" type="button" class="btn btn-warning col" style="width: 6rem;">Logout</button>
        `
    );
}

function setNonAuthButtons() {
    $navbar_buttons_container.empty();
    $navbar_buttons_container.html(
        `
            <button onclick="login()" type="button" class="btn btn-warning col" style="width: 6rem;">Login</button>
        `
    );
}

function setHeroRegisterFormButton() {
    $hero_register_form_button.empty();
    $hero_register_form_button.html(
        `
            <button onclick="login()" type="button" class="btn btn-primary my-2">Login to share with the community</button>
        `
    );
}

function checkAuth() {
    $.ajax({
        url: "https://com682-assignment-web-app.azurewebsites.net/.auth/me",
        cache: false,
        contentType: false,
        processData: false,
        type: "GET",
        success: () => {
            $hero_register_form_button.empty();
            setLoggedInUserButtons();
        },
        error: () => {
            setHeroRegisterFormButton();
            setNonAuthButtons();
        },
    });
}

function getPostsRequest() {
    let postsData = [];
    $.ajax({
        url: POSTS_SERVICE,
        cache: false,
        contentType: false,
        processData: false,
        type: "GET",
        success: (response) => (postsData = response),
        error: (xhr, status, err) => {
            console.error(
                "Failed to fetch posts:",
                status,
                err,
                xhr?.responseText
            );
            alert("Failed to fetch posts - see console for details");
        },
    });

    return postsData;
}
