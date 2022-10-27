const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navlinks");
const links = document.querySelectorAll(".navlinks li");
const headtext = document.querySelector(".headText");
const section1 = document.querySelector(".first")

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("open");
    headtext.classList.toggle("hidden");
    headtext
    links.forEach(link => {
        link.classList.toggle("fade")
    })
})