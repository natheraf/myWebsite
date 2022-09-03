function landingPageOnLoad() {
    generateMyPathHereGrid();
    generateContactLinks();
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
        document.getElementById("projects-grid").innerHTML += '<a class="project-tile" href="' + links[i] + '" target="_blank"><img class="img" alt="' + figcaptions[i] + '" src="' + thumbnailImgs[i] + '"><figcaption class="img-caption">' + figcaptions[i] + '</figcaption></a>'
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

function showRandomBackgroundImg() {
    function imgObj(path, textColor) {
        this.path = path;
        this.textColor = textColor; // red #E63946, white #F1FAEE, lightest-blue #A8DADC, light-blue #457B9D, dark-blue #1D3557
    }
    let imgs = [];
    imgs.push(new imgObj("../public/background_imgs/lavender.jpg", "#1D3557"));
    const bgimg = imgs[Math.floor(Math.random() * (imgs.length - 1))];
    document.getElementById("welcome-text").style.color = bgimg.textColor;
    document.getElementById("background-img").style.backgroundImage = "url(" + bgimg.path + ")";
}
