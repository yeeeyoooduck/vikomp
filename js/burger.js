const burger = document.querySelector(".burger");
const nav = document.querySelector(".header-nav");
const body = document.querySelector("body");
const html = document.querySelector("html");
const navList = document.querySelector(".header-nav-list");

burger.addEventListener("click", () => {
    html.classList.toggle("lock");
    body.classList.toggle("lock");
    burger.classList.toggle("active");
    nav.classList.toggle("active");
});

navList.addEventListener("click", () => {
    if (window.innerWidth < 800) {
        html.classList.remove("lock");
        body.classList.remove("lock");
        burger.classList.remove("active");
        nav.classList.remove("active");
    }
});
