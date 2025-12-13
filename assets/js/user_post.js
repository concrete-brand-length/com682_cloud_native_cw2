// Temporary dummy data for testing - To be removed
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

// Azure Endpoints
const AUTH_URL = "";
const REG_URL = "";
const EVENT_GRID = "";
const POSTS_SERVICE = "";
const BLOB_STORAGE = "";

// PostID
let postId = "";

$(function () {
    // Load Page
    postId = sessionStorage.getItem("postId");
    loadUserPost();

    // Logout
    $("#logout-button").on("click", logoutClick);

    // View Posts
    $("#my-posts-button").on("click", () => {
        window.location.href = "user_posts.html";
    });

    // Post Management
    $("#updateImage").on("click", (event) => {
        event.preventDefault();
        updatePostImage();
    });

    $("#updateTitle").on("click", (event) => {
        event.preventDefault();
        updatePostTitle();
    });

    $("#updateBody").on("click", (event) => {
        event.preventDefault();
        updatePostBody();
    });

    // Resource Management
    $("#addResource").on("click", (event) => {
        event.preventDefault();
        addResource();
    });

    $(".delete-resource").on("click", (event) => {
        event.preventDefault();
        deleteResource(event.target.id);
    });
});

// User Posts
function loadUserPost() {
    const postId = sessionStorage.getItem("postId");
    const $list = $("#view-post-form-container");
    const post = getPost(postId);
    const processedPosts = processPosts(post);

    $list.html(processedPosts.join(""));
}

// Temp Function for Testing - To Remove
function getPost(postId) {
    let fetchedPost = [];
    for (post of dummyData) {
        if (post.postID === postId) {
            fetchedPost.push(post);
            break;
        }
    }
    return fetchedPost;
}

// Logout
function logoutClick() {
    // logoutRequest();

    window.location.href = "index.html";
}

// Post Management
function updatePostImage() {
    const updateData = new FormData();
    updateData.append("postImage", $("#postImage")[0].files[0]);

    console.log(updateData.get("postImage"));

    // updatePostRequest(updateData);
}

function updatePostTitle() {
    const updateData = new FormData();
    updateData.append("postTitle", $("#postTitle").val());

    console.log(updateData.get("postTitle"));

    // updatePostRequest(updateData);
}

function updatePostBody() {
    const updateData = new FormData();
    updateData.append("postBody", $("#postBody").val());

    console.log(updateData.get("postBody"));

    // updatePostRequest(updateData);
}

// Resource Management
function addResource() {
    const addedResource = new FormData();
    addedResource.append("resource", $("#add-resource")[0].files[0]);

    console.log(addedResource.get("resource"));

    // updatePostRequest(addedResource);
}

function deleteResource(resourceId) {
    console.log(resourceId);

    // deleteResourceRequest(resourceId)
}

// Helper Functions
function altImage() {
    return `
        <svg 
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

function processPosts(postData) {
    const requiredKeys = ["postID", "postTitle", "postBody"];
    const cards = [];
    for (post of postData) {
        if (requiredKeys.every((key) => post?.hasOwnProperty(key))) {
            let resources;
            post.resources
                ? (resources = processPostResources(post.resources))
                : [];

            cards.push(`
                ${processImage(post.postImage)}
                ${processPostTitle(post.postTitle)}
                ${processPostBody(post.postBody)}
                ${processAddResource()}
                ${
                    resources
                        ? `
                            <div class="container w-75" style="display: block; margin: 1rem auto;">
                                <h5>Current Resources</h5>
                                <ul style="list-style: none; margin-left: 0; padding-left: 0;">
                                    ${resources.join("")}
                                </ul>
                            </div>
                            `
                        : `
                            <div></div>
                        `
                }
            `);
        }
    }

    return cards;
}

function processImage(imageURI) {
    return `
        <form enctype="multipart/form-data">
            <div class="container form-group w-75 m-auto">
                <label class="h5" for="postImage">Post Image</label>
                <div class="row">
                    <div class="col-10">
                        <input class="form-control" type="file" name="postImage" id="postImage">
                    </div>

                    <div class="col-2">
                        <button id="updateImage" type="button" class="btn btn-primary" style="width: 6rem;">Update</button>
                    </div>

                </div>
            </div>
        </form>
        
        <div style="width: 70%; display: block; margin: 1rem auto;">
            <img style="width: 100%;" src="${imageURI}" alt="Preview" id="preview">
            <div class="text-center">
                <small>Post Image Preview</small>
            </div>
        </div>
    `;
}

function processPostTitle(postTitle) {
    return `
        <form>
            <div class="container form-group w-75 m-auto">
                <label class="h5" for="title">Post title</label>
                <div class="row">
                    
                    <div class="col-10">
                        <input type="text" class="form-control" name="postTitle" id="postTitle" placeholder="Post title" value="${postTitle}" />
                    </div>

                    <div class="col-2">
                        <button id="updateTitle" type="button" class="btn btn-primary" style="width: 6rem;">Update</button>
                    </div>

                </div>
            </div>
        </form>
    `;
}

function processPostBody(postBody) {
    return `
        <form>
            <div class="container form-group w-75" style="display: block; margin: 1rem auto;">
                <label class="h5" for="postBody">Post</label>
                <div class="row">
                    <div class="col-10">
                        <textarea class="form-control" name="postBody" id="postBody" placeholder="post" rows=6>${postBody}</textarea>
                    </div>
                    
                    <div class="col-2 my-auto">
                        <button id="updateBody" type="button" class="btn btn-primary" style="width: 6rem;">Update</button>
                    </div>
                                
                </div>
            </div>
        </form>
    `;
}

function processAddResource() {
    return `
        <form>
            <div class="container form-group w-75" style="display: block; margin: 1rem auto;">
                <label for="add-resource" class="h5">Add Resource</label>
                <div class="row">
                    <div class="col-10">
                        <input class="form-control" type="file" name="add-resource" id="add-resource">
                    </div>

                    <div class="col-2">
                        <button id="addResource" type="button" class="btn btn-primary" style="width: 6rem;">Add</button>
                    </div>

                </div>
            </div>
        </form>
    `;
}

function processPostResources(resourceData) {
    const requiredKeys = [
        "resourceId",
        "resourceType",
        "resourceName",
        "resourceURI",
    ];
    let resources = [];
    for (res of resourceData) {
        if (requiredKeys.every((key) => res?.hasOwnProperty(key))) {
            resources.push(
                `<li class="my-2">
                    <form>
                        <div class="row">
                            <div class="col-10">
                                <a href="#">${res.resourceName}</a>
                            </div>

                            <div class="col-2">
                                <button id="${res.resourceId}" type="button" class="delete-resource btn btn-danger" style="width: 6rem;">Delete</button>
                            </div>

                        </div>
                    </form>
                </li>`
            );
        }
    }

    return resources;
}

function logoutRequest() {
    $.ajax({
        url: `${AUTH_URL}/logout`,
        data: {},
        cache: false,
        contentType: false,
        processData: false,
        type: "POST",
        success: (response) => console.log("Logout request response", response),
        error: (xhr, status, err) => {
            console.error("Failed to logout:", status, err, xhr?.responseText);
            alert("Failed to logout - see console for details");
        },
    });
}

function getPostRequest() {
    let postData = {};
    $.ajax({
        url: `${POSTS_SERVICE}/${postId}`,
        cache: false,
        contentType: false,
        processData: false,
        type: "GET",
        success: (response) => (postData = response),
        error: (xhr, status, err) => {
            console.error(
                "Failed to fetch post:",
                status,
                err,
                xhr?.responseText
            );
            alert("Failed to fetch post - see console for details");
        },
    });
    return postData;
}

function updatePostRequest(updateData) {
    $.ajax({
        url: `${POSTS_SERVICE}/${postId}`,
        data: updateData,
        cache: false,
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        type: "PUT",
        success: (response) => console.log("Update post respone", response),
        error: (xhr, status, err) => {
            console.error(
                "Failed to update post:",
                status,
                err,
                xhr?.responseText
            );
            alert("Failed to update post - see console for details");
        },
    });
}

function addNewResourceRequest(resourceData) {
    $.ajax({
        url: `${POSTS_SERVICE}/${postId}/resources`,
        data: resourceData,
        cache: false,
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        type: "POST",
        success: (response) => console.log("Add resource response", response),
        error: (xhr, status, err) => {
            console.error(
                "Failed to add new resource:",
                status,
                err,
                xhr?.responseText
            );
            alert("Failed to add new resource - see console for details");
        },
    });
}

function deleteResourceRequest(resourceId) {
    $.ajax({
        url: `${POSTS_SERVICE}/${postId}/resources/${resourceId}`,
        cache: false,
        contentType: false,
        processData: false,
        type: "DELETE",
        success: (response) =>
            console.log("Resource deletion response", response),
        error: (xhr, status, err) => {
            console.error(
                "Failed to delete resource:",
                status,
                err,
                xhr?.responseText
            );
            alert("Failed to delete resource - see console for details");
        },
    });
}
