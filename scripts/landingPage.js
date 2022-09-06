function landingPageOnLoad() {
    generateMyProjectsAndAppsGrid();
    generateMyPathHereGrid();
    generateContactLinks();
    firstBackgroundImg();
}

function generateMyPathHereGrid() {
    // each grid tile will have their resource stored in each array in the same index
    let links = [
        "https://codepen.io/natheraf/pen/BamKmGO",
        "https://codepen.io/natheraf/pen/PoONemV",
        "https://codepen.io/natheraf/pen/MWOexQz",
        "https://codepen.io/natheraf/pen/OJORNrM",
        "https://codepen.io/natheraf/pen/YzEawQp"
    ];
    let thumbnailImgs = [
        "https://shots.codepen.io/natheraf/pen/BamKmGO-512.webp?version=1643951965",
        "https://shots.codepen.io/natheraf/pen/PoONemV-512.webp?version=1643951955",
        "https://shots.codepen.io/natheraf/pen/MWOexQz-512.webp?version=1643951943",
        "https://shots.codepen.io/natheraf/pen/OJORNrM-512.webp?version=1645307852",
        "https://shots.codepen.io/natheraf/pen/YzEawQp-512.webp?version=1645313187"
    ];
    let figcaptions = [
        "FCC assignment: Tribute Page",
        "FCC assignment: Survey Form",
        "FCC assignment: Product Landing Page",
        "FCC assignment: Technical Documentation Page",
        "FCC assignment: Personal Portfolio"
    ]; // figcaptions and alt for imgs
    // i guess i can create objects, but i'll do this first because it is how i first envisioned it.
    for (let i = links.length - 1; i >= 0 ; i--) {
        document.getElementById("history-grid").innerHTML += '<a class="project-tile" href="' + links[i] + '" target="_blank"><img class="img" alt="' + figcaptions[i] + '" src="' + thumbnailImgs[i] + '"><figcaption class="history-img-caption">' + figcaptions[i] + '</figcaption></a>'
    }
}

function generateContactLinks() {
    // going to try using an object to store values
    function contactLinks(link, img, alt) {
        this.link = link;
        this.img = img;
        this.alt = alt;
    }
    let links = [];
    
    const linkedin = new contactLinks("https://www.linkedin.com/in/eric-ma-8868241b6/", "https://cdn-icons-png.flaticon.com/512/3536/3536505.png", "linkedin");
    links.push(linkedin);

    const github = new contactLinks("https://github.com/natheraf/myWebsite", "https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png", "github");
    links.push(github);

    const codepen = new contactLinks("https://codepen.io/natheraf", "https://cdn.iconscout.com/icon/free/png-256/codepen-3771364-3149472.png", "codepen");
    links.push(codepen);

    const email = new contactLinks("mailto:ma.eric11214@outlook.com", "https://cdn-icons-png.flaticon.com/512/2374/2374449.png", "email");
    links.push(email);
    
    for (let i = 0; i < links.length; i++) {
        document.getElementById("contact-links").innerHTML += '<a class="contact-methods" href="' + links[i].link + '" target="_blank"><img class="contact-img" alt="' + links[i].alt + '" src="' + links[i].img + '"></a>'
    }
}

function generateMyProjectsAndAppsGrid() {
    function app(img, link, alt) {
        this.img = img;
        this.link = link;
        this.alt = alt;
    }
    let apps = [];
    apps.push(new app("../public/download-app-img.png", "../pages/ytDownloadPage.html", "Media Downloader"));
    for (let i = 0; i < apps.length; i++) {
        document.getElementById("projects_apps_grid").innerHTML += '<a class="apps-link" href="' + apps[i].link + '" target="_blank"><img class="apps-img" alt="' + apps[i].alt + '" src="' + apps[i].img + '"><h3 class="apps-img-caption">' + apps[i].alt + '</h3></a>';
    }
}

let imgIndex = 0;
var tabbedOut = false;
function imgObj(path, textColor, link) {
    this.path = path;
    this.textColor = textColor; // red #E63946, white #F1FAEE, lightest-blue #A8DADC, light-blue #457B9D, dark-blue #1D3557
    this.link = link;
}
let imgs = [];
let navUA = window.navigator.userAgent;
let navConnnectionAvailable =  navUA.includes("Chrome") || navUA.includes("Edg") || navUA.includes("OPR"); // false if on FireFox or Safari

if (navConnnectionAvailable) {
    console.log(navigator.connection);
    if(navigator.connection.downlink > 4) {
        imgs = getArrayOfImages("../public/background_imgs/originalQ/"); // returns array with original quality imgs
    } else if (navigator.connection.downlink > 2) {
        imgs = getArrayOfImages("../public/background_imgs/standardQ/"); // returns array with standard quality imgs
    } else {
        imgs = getArrayOfImages("../public/background_imgs/lowQ/"); // returns array with low quality imgs
    }

    // alternative profiling
    // if (navigator.connection.effectiveType == '4g' || navigator.connection.effectiveType == '3g') {
    //     imgs = getArrayOfImages("../public/background_imgs/originalQ/"); // returns array with original quality imgs
    // } else if (navigator.connection.effectiveType == '2g') {
    //     imgs = getArrayOfImages("../public/background_imgs/standardQ/"); // returns array with low quality imgs
    // } else {
    //     imgs = getArrayOfImages("../public/background_imgs/lowQ/"); // returns array with low quality imgs
    // }

} else { // if user using FireFox or Safari, use low quality images
    imgs = getArrayOfImages("../public/background_imgs/lowQ/"); // returns array with low quality imgs
}

shuffle(imgs);
function showRandomBackgroundImg() {
    if (!tabbedOut && checkVisible(document.getElementById("welcome-text"))) {
        if (imgIndex > imgs.length - 1) { // check if out of bounds
            imgIndex = 0;
        }
        const bgimg = imgs[imgIndex++];
        document.getElementById("welcome-text").style.color = bgimg.textColor;
        document.getElementById("background-img").style.backgroundImage = "url(" + bgimg.path + ")";
        document.getElementById("img-source-btn").onclick = () => {window.open(bgimg.link, '_blank')};
    }
    setTimeout(cacheNextImg, 2500) // cache next image after showing/transitioning to the first one
    setTimeout(showRandomBackgroundImg, 5000);
}

function firstBackgroundImg() {
    document.getElementById("background-img").style.backgroundImage = "url(../public/background_imgs/transparentimg.png)";
    document.getElementById("next-background-img").style.backgroundImage = "url(" + imgs[imgIndex].path + ")"; // cache first image
    setTimeout(showRandomBackgroundImg, 3000);
}

function cacheNextImg() { // cache next image
    if (imgIndex <= imgs.length - 1) { 
        document.getElementById("next-background-img").style.backgroundImage = "url(" + imgs[imgIndex].path + ")";
    }
}

// stops slideshow when title not visible
function checkVisible(elm) { // https://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

// stops slideshow when tab out of visibility
document.addEventListener('visibilitychange', function (event) {
    if (document.hidden) {
        tabbedOut = true;
    } else {
        tabbedOut = false;
    }
});

// Knuth shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function getArrayOfImages(path) {
    let tempArr = [];
    tempArr.push(new imgObj(path + "ice_clock.jpg", "#000000", "https://www.pixiv.net/en/artworks/88588892"));
    tempArr.push(new imgObj(path + "Cafe_evening.jpg", "#1D3557", "https://www.pixiv.net/en/artworks/89360087"));
    tempArr.push(new imgObj(path + "Crystal_Ferris_Wheel.jpg", "#A8DADC", "https://www.pixiv.net/en/artworks/81116740"));
    tempArr.push(new imgObj(path + "S.J.L.jpg", "#A8DADC", "https://www.pixiv.net/en/artworks/80782568"));
    tempArr.push(new imgObj(path + "Otsuka_Station.jpg", "#F1FAEE", "https://www.pixiv.net/en/artworks/75041706"));
    tempArr.push(new imgObj(path + "wayfarer.jpg", "#A8DADC", "https://www.pixiv.net/en/artworks/59801116"));
    tempArr.push(new imgObj(path + "Blank_water.jpg", "#1D3557", "https://www.pixiv.net/en/artworks/53929819"));
    tempArr.push(new imgObj(path + "Landscape.jpg", "#1D3557", "https://www.pixiv.net/en/artworks/40179800"));
    tempArr.push(new imgObj(path + "Blooming_in_the_shade_of_a_tree.jpg", "#F1FAEE", "https://www.pixiv.net/en/artworks/73497750"));
    tempArr.push(new imgObj(path + "The_Guidance_of_Shrines.jpg", "#A8DADC", "https://www.pixiv.net/en/artworks/87938071"));
    tempArr.push(new imgObj(path + "gallery.jpg", "#F1FAEE", "https://www.pixiv.net/en/artworks/90828211"));
    tempArr.push(new imgObj(path + "The_night_is_so_bright.jpg", "#F1FAEE", "https://www.pixiv.net/en/artworks/94819531"));
    tempArr.push(new imgObj(path + "Galaxy_full_of_stars.jpg", "#1D3557", "https://www.pixiv.net/en/artworks/90209969"));
    tempArr.push(new imgObj(path + "tide.jpg", "#F1FAEE", "https://www.pixiv.net/en/artworks/93727581"));
    tempArr.push(new imgObj(path + "lavender.jpg", "#1D3557", "https://unsplash.com/"));
    tempArr.push(new imgObj(path + "genshinFeast.jpg", "#F1FAEE", "https://www.pixiv.net/en/artworks/93526437"));
    tempArr.push(new imgObj(path + "midnight_square.jpg", "#F1FAEE", "https://www.pixiv.net/en/artworks/94982142"));
    tempArr.push(new imgObj(path + "City_of_Two_Hundred_Scenes_Pengcheng_at_Night.jpg", "#F1FAEE", "https://www.pixiv.net/en/artworks/90899797"));
    tempArr.push(new imgObj(path + "Rising_star.jpg", "#A8DADC", "https://www.pixiv.net/en/artworks/77981525"));
    tempArr.push(new imgObj(path + "chair.jpg", "#1D3557", "https://www.pixiv.net/en/artworks/24299378"));
    return tempArr;
}
