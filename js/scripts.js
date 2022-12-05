window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 72,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

// form validation

const form = document.getElementById("gform");
const fullname = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

const setSuccess = (element) => {
  const inputElement = element.parentElement.querySelector(".form-control");
  const errorDisplay = element.parentElement.querySelector(".form-error");
  errorDisplay.innerText = "";
  inputElement.classList.remove("error");
  inputElement.classList.add("success");
};

const setError = (element, message) => {
  const inputElement = element.parentElement.querySelector(".form-control");
  const errorDisplay = element.parentElement.querySelector(".form-error");
  errorDisplay.innerText = message;
  inputElement.classList.add("error");
  inputElement.classList.remove("success");
};

const isValidEmail = (email) => {
  const regularEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularEx.test(String(email).toLowerCase());
};

const validateInput = () => {
  const nameValue = fullname.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();
  if (nameValue === "") {
    setError(fullname, "Full name is required");
  } else {
    setSuccess(fullname);
  }
  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }
  if (messageValue === "") {
    setError(message, "Message is required");
  } else {
    setSuccess(message);
  }
};

const onSubmitForm = (e) => {
  e.preventDefault();
  validateInput();
  if (
    !email.classList.contains("error") &&
    !fullname.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbyl73mY7g9SoQ-EY_TvU3bAOnnu-l5aN85gdJF6lTsadSVXCplOdnI2vtZQGPx8vEZR/exec",
      data: $("#gform").serialize(),
      method: "post",
      success: function (response) {
        alert("Form submitted successfully");
        window.location.reload();
      },
      error: function (err) {
        alert("Something Went Wrong");
      },
    });
  }
};

form.addEventListener("submit", onSubmitForm);
