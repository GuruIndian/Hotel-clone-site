let slideIndex = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = null;
let autoSlideInterval;

// Smooth scroll to reservation section
function scrollToSection(id) {
  const element = document.getElementById(id);
  window.scrollTo({
    top: element.offsetTop - 50, // Offset for header
    behavior: 'smooth'
  });
}

// Slider functionality
function slideMenu(direction) {
  const menuSlider = document.querySelector('.menu-slider');
  const items = document.querySelectorAll('.menu-item');

  if (!menuSlider || items.length === 0) return; // Prevent errors

  const totalItems = items.length;
  slideIndex = Math.max(0, Math.min(slideIndex + direction, totalItems - 1));

  const offset = slideIndex * (items[0].offsetWidth + 20); // Adjust for item width and margin
  menuSlider.style.transform = `translateX(-${offset}px)`;
  menuSlider.style.transition = 'transform 2s ease-in-out';
}

// Auto-slide function
function startAutoSlide() {
  autoSlideInterval = setInterval(() => slideMenu(1), 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Mouse dragging functionality
function startDragging(event) {
  if (!menuSlider) return; // Prevent crashes
  isDragging = true;
  startX = getPositionX(event);
  menuSlider.style.transition = 'none'; // Disable transition during dragging
  cancelAnimationFrame(animationID);
}

function dragging(event) {
  if (!isDragging) return;
  const currentPosition = getPositionX(event);
  currentTranslate = prevTranslate + currentPosition - startX;
  setSliderPosition();
}

function stopDragging() {
  if (!isDragging || !menuSlider) return;
  isDragging = false;

  const items = document.querySelectorAll('.menu-item');
  const itemWidth = items[0].offsetWidth + 20;
  slideIndex = Math.round(-currentTranslate / itemWidth);

  prevTranslate = -slideIndex * itemWidth;
  setSliderPosition();

  menuSlider.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
  startAutoSlide(); // Resume auto-slide after dragging
}

// Utility functions
function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches?.[0]?.clientX || 0;
}

function setSliderPosition() {
  menuSlider.style.transform = `translateX(${currentTranslate}px)`;
}

// Attach mouse and touch events
const menuCarousel = document.querySelector('.menu-carousel');
const menuSlider = document.querySelector('.menu-slider');

menuCarousel.addEventListener('mousedown', startDragging);
menuCarousel.addEventListener('mousemove', dragging);
menuCarousel.addEventListener('mouseup', stopDragging);
menuCarousel.addEventListener('mouseleave', stopDragging);
menuCarousel.addEventListener('touchstart', startDragging);
menuCarousel.addEventListener('touchmove', dragging);
menuCarousel.addEventListener('touchend', stopDragging);

// Stop auto-slide on mouse hover and restart when leaving
menuCarousel.addEventListener('mouseenter', stopAutoSlide);
menuCarousel.addEventListener('mouseleave', startAutoSlide);

// Initialize auto-slide
startAutoSlide();

// Keyboard navigation
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') slideMenu(-1);
  if (event.key === 'ArrowRight') slideMenu(1);
});

document.addEventListener('DOMContentLoaded', () => {
  const timeInput = document.getElementById('time');
  const timeDropdownBtn = document.querySelector('.time-dropdown-btn');
  const timeDropdown = document.querySelector('.time-dropdown');
  const timeItems = document.querySelectorAll('.time-dropdown li');
  const reservationForm = document.getElementById('reservationForm');

  // Toggle dropdown visibility
  timeDropdownBtn.addEventListener('click', () => {
    timeDropdown.style.display = timeDropdown.style.display === 'block' ? 'none' : 'block';
  });

  // Select a time from the dropdown
  timeItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedTime = item.getAttribute('data-time');
      timeInput.value = selectedTime; // Set value to input
      timeDropdown.style.display = 'none'; // Hide dropdown

      // Provide feedback to the user
      alert(`You selected ${selectedTime}.`);
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (!timeDropdown.contains(event.target) && event.target !== timeDropdownBtn) {
      timeDropdown.style.display = 'none';
    }
  });

  // Handle form submission
  reservationForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default submission

    // Basic validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = document.getElementById('date').value.trim();
    const time = document.getElementById('time').value.trim();
    const guests = document.getElementById('guests').value.trim();

    if (!name || !email || !date || !time || !guests || guests <= 0) {
      alert('Please fill out all fields correctly before submitting.');
      return;
    }

    // Confirm successful reservation
    const successMessage = document.createElement('p');
    successMessage.textContent = `Reservation successfully made for ${name} on ${date} at ${time} for ${guests} guest(s).`;
    successMessage.style.color = 'green';
    successMessage.style.marginTop = '20px';

    // Display the success message
    const existingMessage = document.querySelector('.reservation-success');
    if (existingMessage) {
      existingMessage.remove();
    }

    successMessage.classList.add('reservation-success');
    reservationForm.appendChild(successMessage);

    // Optionally clear form fields
    reservationForm.reset();
  });
});
