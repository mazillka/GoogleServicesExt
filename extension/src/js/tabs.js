document.addEventListener('DOMContentLoaded', function () {
  let tabLinks = document.getElementsByClassName("tab-links");

  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener("click", function (event) {
      openTab(event, event.target.value);
    });
  }

  tabLinks[0].click();
});

function openTab(evt, cityName) {
  let tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  let tabLinks = document.getElementsByClassName("tab-links");
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
