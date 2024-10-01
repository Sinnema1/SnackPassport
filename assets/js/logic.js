// Create logic to toggle the light/dark mode styles for the page and circle. The mode should be saved to local storage.
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle");
    const body = document.body;
  
    function toggleMode() {
      if (body.classList.contains("light")) {
        body.classList.remove("light");
        body.classList.add("dark");
        localStorage.setItem("mode", "dark");
      } else {
        body.classList.remove("dark");
        body.classList.add("light");
        localStorage.setItem("mode", "light");
      }
    }
  
    if (toggleButton) {
      toggleButton.addEventListener("click", toggleMode);
    }
  });

// Create a function that will read from local storage and return the data. If no data exists, return an empty array.
const getLocalStorage = function () {
    const data = localStorage.getItem("data");
  
    if (data) {
      return JSON.parse(data);
    }
  
    return [];
  };

// Create a function that will write to local storage. This function should accept an array of objects and write the data to local storage.
const setLocalStorage = function (data) {
    localStorage.setItem("data", JSON.stringify(data));
  };

// ! Use the following function whenever you need to redirect to a different page

let redirectURL = "";

const redirectPage = function (url) {
  redirectURL = url;
  location.assign(url);
};