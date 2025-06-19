import {
  companies,
  loadCompanies,
  populateFilters,
  renderTable,
  showDetails,
  editCompany,
  deleteCompany,
  saveButton,
  initModalElements,
  setModalInstance,
} from './adminpages/companies.js';

const app = document.getElementById('app');

const routes = {
  '#dashboard': 'adminpages/dashboard.html',
  '#companies': 'adminpages/company-list.html',
  '#addJobs': 'adminpages/add-job.html',
};

async function loadContent(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    app.innerHTML = html;
    console.log(html);

    // After injecting HTML, initialize modal elements and modal instance
    initModalElements();

    // Setup modal Bootstrap instance
    const modalEl = document.getElementById('companyModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      setModalInstance(modal);
    }

    // Load users info for dashboard
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const name = localStorage.getItem('loggedInUser');
    const user = users.find((u) => u.name === name);

    if (url.includes('dashboard.html') && user) {
      const welcome = document.getElementById('welcomeMessage');
      if (welcome) welcome.textContent = `Welcome, ${user.name}`;
    } else if (url.includes('company-list.html')) {
      // Await loading companies before rendering
      await loadCompanies();

      // Expose functions globally for inline onclick handlers
      window.showDetails = showDetails;
      window.editCompany = editCompany;
      window.deleteCompany = deleteCompany;

      // Add event listeners *once* (remove before add to avoid duplicates)
      const saveBtn = document.getElementById('saveChangesBtn');
      if (saveBtn) {
        saveBtn.removeEventListener('click', saveButton);
        saveBtn.addEventListener('click', saveButton);
      }

      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.addEventListener('input', renderTable);

      const sectorFilter = document.getElementById('sectorFilter');
      if (sectorFilter) sectorFilter.addEventListener('change', renderTable);

      const locationFilter = document.getElementById('locationFilter');
      if (locationFilter) locationFilter.addEventListener('change', renderTable);

      document.querySelectorAll("input[name='typeFilter']").forEach((cb) =>
        cb.addEventListener('change', renderTable)
      );


      populateFilters(companies);
      renderTable();
    }
else if (url.includes('add-job.html')) {
  const jobForm = document.getElementById('jobForm');

  jobForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Construct a single job object in the format you want
    const newJob = {
      // You might want to generate a unique ID or leave it to the server
      // For example, temporary ID here:
      id: Date.now().toString(), // simple unique id

      name: document.getElementById('companyName').value.trim(),
      sector: document.getElementById('sector').value.trim(),
      location: document.getElementById('location').value.trim(),
      type: document.getElementById('jobType').value,
      role: document.getElementById('role').value.trim(),
      description: document.getElementById('description').value.trim(),
      requirements: document.getElementById('requirements').value.split(',').map(r => r.trim()).filter(Boolean),
      perks: document.getElementById('perks').value.split(',').map(p => p.trim()).filter(Boolean),
      tags: document.getElementById('tags').value.split(',').map(t => t.trim()).filter(Boolean),
      time: "Just now", 
    };

    try {
      // POST this job as a separate entry to companies
      const response = await fetch('http://localhost:3000/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        throw new Error('Failed to add job.');
      }

      alert('Job added successfully!');
      jobForm.reset();
      window.location.hash = '#companies';

    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while adding the job.');
    }
  });
}

  } catch (err) {
    console.error('Error loading content:', err);
    app.innerHTML = '<h2 class="text-center p-5">Page not found</h2>';
  }
}

function router() {
  const hash = window.location.hash;

  if (!routes[hash]) {
    window.location.hash = '#dashboard'; // fallback to dashboard
    return;
  }

  loadContent(routes[hash]);

  // Highlight active nav link
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });
}

// Set default route to #dashboard if none is provided
window.addEventListener('load', () => {
  if (!window.location.hash || !routes[window.location.hash]) {
    window.location.hash = '#dashboard';
  } else {
    router();
  }
});

window.addEventListener('hashchange', router);
