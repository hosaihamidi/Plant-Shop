// Message sent
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    let btn = e.target;

    let name = btn.getAttribute("data-name");
    let price = parseFloat(btn.getAttribute("data-price"));

    // add to cart
    addToCart(name, price);

    // change button color
    btn.classList.add("active");
    btn.innerText = "Added ✓";

    setTimeout(() => {
      btn.classList.remove("active");
      btn.innerText = "Add to Cart";
    }, 1200);

    // show bottom notification
    showBottomNotice(`${name} added to cart 🌿`);
  }
});
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const msg = document.getElementById("form-msg");
    msg.textContent = "✅ Message sent!";
    msg.style.color = "#2e7d32";

    this.reset();
  });
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("darkModeToggle");

  // Load saved mode
  if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  // Click toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("mode", "dark");
        toggleBtn.textContent = "☀️";
      } else {
        localStorage.setItem("mode", "light");
        toggleBtn.textContent = "🌙";
      }
    });
  }
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// set active load
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.nav-link[href="#home"]').classList.add("active");
});

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
