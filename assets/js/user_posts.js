const $post_form_container = $("#post-form-container");

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

// Azure Endpoints
const AUTH_URL = "";
const EVENT_GRID = "";
const POSTS_SERVICE = "";
const BLOB_STORAGE = "";

$(function () {
    loadUserPosts();

    // Logout
    $("#logout-button").on("click", logoutClick);

    // Add Post Form
    $("#post-button").on("click", onPostClick);

    // View Posts
    $("#my-posts-button").on("click", () => {
        window.location.href = "user_posts.html";
    });

    // View Post
    $(".view-post").on("click", (event) => {
        sessionStorage.setItem("postId", event.target.id);
        window.location.href = "user_post.html";
    });

    // Delete Post
    $(".delete-post").on("click", (event) => {
        event.preventDefault();
        deletePost(event.target.id);
    });
});

// Load user posts
function loadUserPosts() {
    window.location.hash = `/posts`;
    const $user_posts = $("#user-posts");

    // Temporary process for testing - To be removed.
    const processedPosts = processPosts(dummyData);

    // const postsData = getPostsRequest();
    // const processedPosts = processPosts(postsData)

    $user_posts.html(
        `<div class="row" data-masonry='{"percentPosition": true }'>${processedPosts.join(
            ""
        )}</div>`
    );
}

// Logout
function logoutClick() {
    // logoutRequest();

    window.location.href = "index.html";
}

// Add Post Form
function onPostClick() {
    window.location.hash = `/posts/create`;
    $("body").append(`<div id="overlay"></div>`);
    $post_form_container.html(
        `
            <div class="floating-form py-4 m-auto bg-body-tertiary border-rounded form">
                <div class="text-center mb-4">
                    <h2>Add Post</h2>
                </div>
                        
                <form>
                    <div class="form-group form-floating">
                        <input type="text" class="form-control" name="postTitle" id="postTitle" placeholder="title" />
                        <label for="postTitle">Post Title</label>
                    </div>

                    <div class="form-group form-floating">
                        <textarea class="form-control" name="postBody" id="postBody" placeholder="post" rows="6"></textarea>
                        <label for="post">Post</label>
                    </div>

                    <div class="form-group form-floating">
                        <input type="file" class="form-control" name="postImage" id="postImage" placeholder="postImage" />
                        <label for="postIage">Post Image</label>
                    </div>

                    <button onclick="addPost()" class="btn btn-primary w-100 py-2 mt-3" type="button">Add Post</button>
                    <button onclick="closePostForm()" class="btn btn-danger w-100 py-2 mt-3" type="button">Cancel</button>
                </form>
            </div>
        `
    );
}

function addPost() {
    const newPostData = new FormData();
    newPostData.append("postTitle", $("#postTitle").val());
    newPostData.append("postBody", $("#postBody").val());
    newPostData.append("postImage", $("#postImage")[0].files[0]);

    // addPostRequest(newPostData);

    // Temporary Testing Logs - To be removed
    console.log(newPostData.get("postTitle"));
    console.log(newPostData.get("postBody"));
    console.log(newPostData.get("postImage"));

    closePostForm();
}

function closePostForm() {
    window.location.hash = `/posts`;
    $("#overlay").remove();
    $post_form_container.empty();
}

// Post Management
function viewPost() {
    sessionStorage.setItem("postId", postId);
    window.location.href = "user_post.html";
}

function deletePost(postId) {
    window.location.hash = `/posts/post/${postId}/delete`;
    const confirm = window.confirm(
        "Are you sure you want to delete this post?"
    );
    window.location.hash = `/posts`;
    // deletePostRequest(postId);

    // Temporary Testing Logs - To be removed
    console.log(postId);
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

function processPosts(postsData) {
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
                    <div id="${
                        post.postID ?? null
                    }" class="col-sm-6 col-lg-4 mb-4" >
                        <div class="card" style="min-height: 30rem;">
                            ${
                                post.postImage
                                    ? `<img src="${post.postImage}" class="card-img-top" height="200" width="100%">`
                                    : altImage()
                            }
                
                            <div class="card-body">
                                <h5 class="card-title">${
                                    post.postTitle ?? "Title Missing"
                                }</h5>
                                <p class="card-text">
                                    ${post.postBody ?? "Post Body Missing"}
                                </p>

                                <button id="${
                                    post.postID
                                }" class="view-post btn btn-primary w-100" type="button">View</button>
                                <button id="${
                                    post.postID
                                }" class="delete-post btn btn-danger w-100 my-2" type="button">Delete</button>
                                
                                ${
                                    resources
                                        ? `
                                            <div class="dropdown">
                                                <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
                                                    See ${
                                                        resources.resourceCount
                                                    } Resources
                                                </button>

                                                <div class="dropdown-menu w-100">
                                                    <h6 class="dropdown-header">Resources</h6>

                                                    ${resources.resources.join(
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                        `
                                        : `
                                            <div></div>
                                        `
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

function addPostRequest(postData) {
    $.ajax({
        url: POSTS_SERVICE,
        data: postData,
        cache: false,
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        type: "POST",
        success: (response) => console.log("Add new post response:", response),
        error: (xhr, status, err) => {
            console.error(
                "Adding of new post failed:",
                status,
                err,
                xhr?.responseText
            );
            alert("Adding of new post failed — see console for details.");
        },
    });
}

function deletePostRequest(postId) {
    $.ajax({
        url: `${POSTS_SERVICE}/${postId}`,
        cache: false,
        contentType: false,
        processData: false,
        type: "DELETE",
        success: (response) =>
            console.log("Delete post request response:", response),
        error: (xhr, status, err) => {
            console.error(
                "Deletion of post failed:",
                status,
                err,
                xhr?.responseText
            );
            alert("Deletion of post failed — see console for details.");
        },
    });
}
