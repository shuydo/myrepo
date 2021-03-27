const galContainer = document.querySelector(".menu");

const request = new XMLHttpRequest();
request.open("GET", "./menu.json");
request.responseType = "json";
request.send();

const source = document.querySelector("#card_templ").innerHTML.trim();
const template = Handlebars.compile(source);

request.onload = function () {
  const menu = request.response;

  const markup = menu.reduce((acc, curVal) => acc + template(curVal), "");

  const container = document.querySelector(".menu");
  container.innerHTML = markup;
};

const Theme = {
  LIGHT: "light-theme",
  DARK: "dark-theme",
};

const bodyRef = document.body;
const switchcherRef = document.querySelector("#theme-switch-toggle");
// console.log("swither: ", switchcherRef.checked);

if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", Theme.LIGHT);
  bodyRef.classList.add(Theme.LIGHT);
  // page.classList.toggle('light-theme');
} else {
  bodyRef.classList.add(localStorage.getItem("theme"));
  switchcherRef.checked = true;
  // console.log("theme: ", localStorage.getItem("theme"));
}

const input = document.querySelector(".theme-switch__toggle");
const log = document.getElementById("values");

input.addEventListener("change", updateValue);

function updateValue(e) {
  // console.log("swither: ", switchcherRef.checked);

  // console.log("toggle");
  if (localStorage.getItem("theme") === Theme.LIGHT) {
    localStorage.setItem("theme", Theme.DARK);

    bodyRef.classList.remove(Theme.LIGHT);
    bodyRef.classList.add(Theme.DARK);
  } else {
    localStorage.setItem("theme", Theme.LIGHT);

    bodyRef.classList.remove(Theme.DARK);
    bodyRef.classList.add(Theme.LIGHT);
  }
}
