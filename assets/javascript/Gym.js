document.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackText = document.getElementById('feedbackText');
  const nameInput = document.getElementById('name');

  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const feedback = feedbackText.value.trim();
    const userName = nameInput.value.trim();

    if (!feedback || !userName) {
      showNotification('Please enter your name and feedback!', 'error');
      return;
    }

    showNotification('Thank you for your feedback!', 'success');

    // Clear form fields
    feedbackText.value = '';
    nameInput.value = '';
  });

  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 2000);
  }
});
