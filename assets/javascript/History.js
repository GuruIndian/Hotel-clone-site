// Utility: Get current date and time
function getCurrentTimestamp() {
  const now = new Date();
  return now.toLocaleString();
}

// Utility: Fetch bookings from localStorage
function getBookings() {
  return JSON.parse(localStorage.getItem("bookings")) || [];
}

// Utility: Save bookings to localStorage
function saveBookings(bookings) {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

// Load Booking History
function loadBookingHistory() {
  const bookings = getBookings();
  const historyBody = document.getElementById("history-body");

  historyBody.innerHTML = ""; // Clear existing rows

  bookings.forEach((booking, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${booking.customerName}</td>
      <td>${booking.roomName}</td>
      <td>${booking.contact || "N/A"}</td>
      <td>$${booking.price}</td>
      <td>${booking.checkin}</td>
      <td>${booking.checkout}</td>
       <td>Paid</td>
      <td>${booking.statusDeletedOn || "N/A"}</td>
      <td>
        <button class="delete-btn" onclick="deleteBooking(${index})">Delete Booking</button>
      </td>
    `;

    historyBody.appendChild(row);
  });
}

// Load Customer Status
function loadCustomerStatus() {
  const bookings = getBookings();
  const tableBody = document.getElementById("customer-status-table").querySelector("tbody");

  tableBody.innerHTML = ""; // Clear existing rows

  bookings.forEach((booking, index) => {
    // Show only bookings that have an active status
    if (booking.status !== null) {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${booking.customerName}</td>
        <td>${booking.roomName}</td>
        <td>${booking.contact || "N/A"}</td>
        <td>${booking.bookingType || "Regular"}</td>
        <td>
          <label>
            <input type="radio" name="status-${index}" value="In" 
              ${booking.status === "In" ? "checked" : ""} onchange="updateStatus(${index}, 'In')"> In
          </label>
          <label>
            <input type="radio" name="status-${index}" value="Out" 
              ${booking.status === "Out" ? "checked" : ""} onchange="updateStatus(${index}, 'Out')"> Out
          </label>
        </td>
        <td>
          <button class="delete-btn" onclick="deleteCustomerStatus(${index})">Delete Status</button>
        </td>
      `;

      tableBody.appendChild(row);
    }
  });
}


// Update Status
function updateStatus(index, status) {
  const bookings = getBookings();
  bookings[index].status = status;
  saveBookings(bookings);
  alert(`Status updated to "${status}"`);
}

// Delete Booking History
function deleteBooking(index) {
  const bookings = getBookings();

  if (confirm("Are you sure you want to delete this booking? All associated customer statuses will be removed!")) {
    bookings.splice(index, 1); // Remove the booking
    saveBookings(bookings);
    loadBookingHistory();
    loadCustomerStatus();
    alert("Booking and associated statuses deleted successfully!");
  }
}

// Delete Customer Status
function deleteCustomerStatus(index) {
  const bookings = getBookings();

  if (confirm("Are you sure you want to delete this customer's status?")) {
    const timestamp = getCurrentTimestamp();
    bookings[index].statusDeletedOn = timestamp; // Log the deletion in booking history
    bookings[index].status = null; // Clear status

    saveBookings(bookings);
    loadBookingHistory(); // Booking history still shows the deleted status log
    loadCustomerStatus(); // Customer status table no longer shows this status
    alert("Customer status deleted and logged in booking history!");
  }
}

// Initial Table Load
document.addEventListener("DOMContentLoaded", () => {
  loadBookingHistory();
  loadCustomerStatus();
});
  