const rooms = [
  { name: "Standard Room", price: 100, image: "assets/images/room-1.jpg" },
  { name: "Deluxe Room", price: 150, image: "assets/images/room-2.jpg" },
  { name: "Suite Room", price: 200, image: "assets/images/room-3.jpg" },
  { name: "Family Room", price: 250, image: "assets/images/room-4.jpg" },
  { name: "Luxury Suite", price: 300, image: "assets/images/room-5.jpg" },
  { name: "Executive Room", price: 350, image: "assets/images/room-6.jpg" },
  { name: "Single Room", price: 80, image: "assets/images/room-7.jpg" },
  { name: "Double Room", price: 120, image: "assets/images/room-8.jpg" },
  { name: "Presidential Suite", price: 500, image: "assets/images/room-9.jpg" },
  { name: "Ocean View Room", price: 400, image: "assets/images/room-10.jpg" },
];

let currentRoomIndex = 0;
const roomsPerPage = 5;
let currentBooking = null;

function renderRooms() {      /* Function to render rooms (Rooms ko display karta hai.) */
  const roomList = document.getElementById("room-list");

  const nextRooms = rooms.slice(currentRoomIndex, currentRoomIndex + roomsPerPage);

  nextRooms.forEach((room, index) => {
    const roomDiv = document.createElement("div");
    roomDiv.classList.add("room");
    roomDiv.innerHTML = `
      <img src="${room.image}" alt="${room.name}">
      <h3>${room.name}</h3>
      <p>Price: $${room.price}/night</p>
      <label>Check-in: <input type="date" id="checkin-${currentRoomIndex + index}"></label>
      <label>Check-out: <input type="date" id="checkout-${currentRoomIndex + index}"></label>
      <button onclick="bookRoom('${room.name}', ${room.price}, 'checkin-${currentRoomIndex + index}', 'checkout-${currentRoomIndex + index}')">Book Now</button>
    `;
    roomList.appendChild(roomDiv);
  });

  currentRoomIndex += roomsPerPage;

  if (currentRoomIndex >= rooms.length) {
    document.getElementById("show-more").style.display = "none";
    document.getElementById("last-page-notification").style.display = "block";
  }

  // Show the back-to-top button
  document.getElementById("back-to-top").style.display = "block";
}

function showMoreRooms() {
  renderRooms();
}

function bookRoom(roomName, price, checkinId, checkoutId) {
const checkinElement = document.getElementById(checkinId);
const checkoutElement = document.getElementById(checkoutId);

const checkin = checkinElement.value;
const checkout = checkoutElement.value;

const today = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-mm-dd format


// Reset styles
checkinElement.style.border = "";
checkinElement.style.backgroundColor = "";
checkoutElement.style.border = "";
checkoutElement.style.backgroundColor = "";

// Validation for invalid or past dates
if (!checkin || checkin < today || checkout <= checkin) {
    alert("Please enter valid check-in and check-out dates!");

    if (!checkin || checkin < today) {
        checkinElement.style.border = "2px solid red";
        checkinElement.style.backgroundColor = "#ffe6e6"; // Light red background
    }

    if (!checkout || checkout <= checkin) {
        checkoutElement.style.border = "2px solid red";
        checkoutElement.style.backgroundColor = "#ffe6e6"; // Light red background
    }

    return;
}

const customerName = prompt("Enter your name:");
if (!customerName) {
    alert("Name is required!");
    return;
}

const countryCode = prompt("Enter your country code (e.g., +1):", "+1");
  const contact = prompt("Enter your 10-digit contact number:");
  if (!contact || contact.length > 10 || isNaN(contact)) {
    alert("Invalid contact number!");
    return;
  }

currentBooking = {
    customerName,
    contact: `${countryCode}${contact}`,
    roomName,
    price,
    checkin,
    checkout,
};

// Set success styles
checkinElement.style.border = "2px solid green";
checkinElement.style.backgroundColor = "#e6ffe6"; // Light green background
checkoutElement.style.border = "2px solid green";
checkoutElement.style.backgroundColor = "#e6ffe6"; // Light green background




document.getElementById("payment-summary").textContent = `
  Confirm payment of $${price} for ${roomName} from ${checkin} to ${checkout}, booked under the name ${customerName}. Contact: ${countryCode}${contact}.
`;

document.getElementById("payment-section").style.display = "block";
}



function confirmPayment() {   /* Function to confirm payment (Payment ko confirm karta hai.) */
  if (!currentBooking) {
    alert("No booking to confirm!");
    return;
  }

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(currentBooking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Payment successful! Booking confirmed.");
  currentBooking = null;
  document.getElementById("payment-section").style.display = "none";
  window.location.href = "history.html";
}

function cancelPayment() {  /* Function to cancel payment (Payment ko cancel karta hai.) */
  currentBooking = null;
  document.getElementById("payment-section").style.display = "none";
}



function scrollToFirstImage() {
  const firstImage = document.querySelector(".room img");
  if (firstImage) {
    firstImage.scrollIntoView({ behavior: "smooth" });
  }
}

// Initial render of rooms
document.addEventListener("DOMContentLoaded", renderRooms);
