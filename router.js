import {
  showToast,
  toggleFavourite,
  showDetails,
  renderCards,
  populateFilters,
  companies
} from './pages/companies.js';

const app = document.getElementById('app');

const routes = {
  '#dashboard': 'pages/dashboard.html',
  '#companies': 'pages/company-list.html'
};

function loadContent(url) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      app.innerHTML = html;

      // Dashboard logic
      if (url.includes('dashboard.html')) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const name = localStorage.getItem("loggedInUser");
        const user = users.find(u => u.name === name);
        if (user) {
          const welcome = document.getElementById("welcomeMessage");
          if (welcome) welcome.textContent = `Welcome, ${user.name}`;
        }
         const script = document.createElement('script');
            script.src = 'user-dashboard.js';
            document.body.appendChild(script);
      }

      // Company list logic
      else if (url.includes('company-list.html')) {
        window.toggleFavourite = toggleFavourite;
        window.showDetails = showDetails;

        document.getElementById("searchInput").addEventListener("input", renderCards);
        document.getElementById("sectorFilter").addEventListener("change", renderCards);
        document.getElementById("locationFilter").addEventListener("change", renderCards);
        document.querySelectorAll("input[name='typeFilter']").forEach(cb =>
          cb.addEventListener("change", renderCards)
        );
        document.getElementById("favouriteOnly").addEventListener("change", renderCards);
        renderCards();
        populateFilters(companies);
      }
    })
    .catch(() => {
      app.innerHTML = '<h2 class="text-center p-5">Page not found</h2>';
    });
}

function router() {
  const hash = window.location.hash;

  // If no valid route, default to dashboard
  if (!routes[hash]) {
    window.location.hash = '#dashboard';
    return;
  }

  // Load content
  loadContent(routes[hash]);

  // Highlight active nav link
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === hash);
  });
}

// Trigger router on hash change
window.addEventListener('hashchange', router);

// Trigger router on page load with fallback to dashboard
window.addEventListener('load', () => {
  if (!routes[window.location.hash]) {
    window.location.hash = '#dashboard';
  } else {
    router();
  }
});
