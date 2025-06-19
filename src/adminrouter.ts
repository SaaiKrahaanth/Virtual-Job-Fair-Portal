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
} from './adminpages/companies';

const app = document.getElementById('app') as HTMLElement;

const routes: { [key: string]: string } = {
  '#dashboard': 'adminpages/dashboard.html',
  '#companies': 'adminpages/company-list.html',
  '#addJobs': 'adminpages/add-job.html',
};

async function loadContent(url: string): Promise<void> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    app.innerHTML = html;
    console.log(html);

    // After injecting HTML, initialize modal elements and modal instance
    initModalElements();

    // Setup modal Bootstrap instance
    const modalEl = document.getElementById('companyModal');
    if (modalEl && (window as any).bootstrap) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      setModalInstance(modal);
    }

    // Load users info for dashboard
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const name = localStorage.getItem('loggedInUser');
    const user = users.find((u: any) => u.name === name);

    if (url.includes('dashboard.html') && user) {
      const welcome = document.getElementById('welcomeMessage');
      if (welcome) welcome.textContent = `Welcome, ${user.name}`;
    } else if (url.includes('company-list.html')) {
      // Await loading companies before rendering
      await loadCompanies();

      // Expose functions globally for inline onclick handlers
      (window as any).showDetails = showDetails;
      (window as any).editCompany = editCompany;
      (window as any).deleteCompany = deleteCompany;

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
    } else if (url.includes('add-job.html')) {
      const jobForm = document.getElementById('jobForm') as HTMLFormElement | null;

      if (jobForm) {
        jobForm.addEventListener('submit', async (e: Event) => {
          e.preventDefault();

          // Construct a single job object in the format you want
          const newJob = {
            id: Date.now(), // simple unique id as number
            name: (document.getElementById('companyName') as HTMLInputElement).value.trim(),
            sector: (document.getElementById('sector') as HTMLInputElement).value.trim(),
            location: (document.getElementById('location') as HTMLInputElement).value.trim(),
            type: (document.getElementById('jobType') as HTMLInputElement).value,
            role: (document.getElementById('role') as HTMLInputElement).value.trim(),
            description: (document.getElementById('description') as HTMLInputElement).value.trim(),
            requirements: (document.getElementById('requirements') as HTMLInputElement).value.split(',').map(r => r.trim()).filter(Boolean),
            perks: (document.getElementById('perks') as HTMLInputElement).value.split(',').map(p => p.trim()).filter(Boolean),
            tags: (document.getElementById('tags') as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean),
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
    }

  } catch (err) {
    console.error('Error loading content:', err);
    app.innerHTML = '<h2 class="text-center p-5">Page not found</h2>';
  }
}

function router(): void {
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