

const toggle = document.querySelector(".menu-toggle");
const navGroups = document.querySelector(".nav-groups");
const icon = toggle.querySelector(".icon");

toggle.addEventListener("click", () => {
    navGroups.classList.toggle("active");

    if (navGroups.classList.contains("active")) {
        icon.innerHTML = "&#10006;";
    } else {
        icon.innerHTML = "&#9776;";
    }
});

