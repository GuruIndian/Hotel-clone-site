// ✅ Sabse pehle utility functions define karen
function showDropdown(menu, toggle) {
  if (!menu || !toggle) return;
  menu.style.display = "block";
  menu.style.opacity = "1";
  menu.style.transform = "translateY(0)";
  toggle.classList.add("active");
}

function hideDropdown(menu, toggle) {
  if (!menu || !toggle) return;
  menu.style.display = "none";
  menu.style.opacity = "0";
  menu.style.transform = "translateY(-10px)";
  toggle.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const features = document.querySelectorAll(".features .feature");

  const observeFeatures = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"; // Start animation
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  features.forEach((feature) => {
    feature.style.animationPlayState = "paused"; // Pause animation initially
    observeFeatures.observe(feature);
  });

  // Quick Links Services click event ke liye toggle functionality add karna
  const quickLinkServices = document.getElementById("quick-link-services");
  if (quickLinkServices) {
    quickLinkServices.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default behavior (e.g., page refresh)

      const dropdown = document.querySelector(".dropdown");
      if (!dropdown) return; // Exit if dropdown is not found

      const dropdownMenu = dropdown.querySelector(".dropdown-menu");
      const dropdownToggle = dropdown.querySelector(".dropdown-toggle");
      if (!dropdownMenu) return; // Exit if dropdownMenu is not found

      //Pehle sirf "show" hota tha, ab toggle karega (band bhi hoga agar open hai)
      if (dropdownMenu.style.display === "block") {
        hideDropdown(dropdownMenu, dropdownToggle);
      } else {
        showDropdown(dropdownMenu, dropdownToggle);
      }
    });
  }

  // Navbar hover functionality (dropdown close hone ka issue fix)
  const dropdown = document.querySelector(".dropdown");
  if (dropdown) {
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    const dropdownToggle = dropdown.querySelector(".dropdown-toggle");

    let closeTimeout; // Timeout variable define kiya

    dropdown.addEventListener("mouseenter", () => {
      showDropdown(dropdownMenu, dropdownToggle);
      clearTimeout(closeTimeout);
    });

    dropdown.addEventListener("mouseleave", () => {
      closeTimeout = setTimeout(
        () => hideDropdown(dropdownMenu, dropdownToggle),
        300
      );
    });
  }
});
