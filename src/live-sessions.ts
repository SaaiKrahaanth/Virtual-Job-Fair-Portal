document.querySelectorAll('.join-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert("Redirecting to the company's live session...");
    // In a real app: window.location.href = "company-session-link.html";
  });
});