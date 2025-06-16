function showDetails(index) {
    const c = companies[index];
    document.getElementById("modalTitle").innerHTML = `
      <span class="text-primary text-white">${c.name}</span> - <small>${c.role}</small>
    `;

    document.getElementById("modalBody").innerHTML = `
      <div class="row mb-3">
        <div class="col-md-6">
          <p><strong>Sector:</strong> ${c.sector}</p>
          <p><strong>Location:</strong> ${c.location}</p>
          <p><strong>Type:</strong> <span class="badge bg-info text-dark">${c.type}</span></p>
          <p><strong>Posted:</strong> <i>${c.time}</i></p>
        </div>
        <div class="col-md-6">
          <p><strong>Tags:</strong><br>
            ${c.tags.map(tag =>` <span class="badge bg-secondary me-1">${tag}</span>`).join(" ")}
          </p>
        </div>
      </div>

      <hr class="my-3"/>

      <div class="mb-3">
        <h6 class="text-primary"><i class="bi bi-person-badge"></i> Job Description</h6>
        <p>${c.description}</p>
      </div>

      <div class="mb-3">
        <h6 class="text-primary"><i class="bi bi-card-checklist"></i> Requirements</h6>
        <ul class="list-group list-group-flush">
          ${c.requirements.map(req => `<li class="list-group-item">${req}</li>`).join("")}
        </ul>
      </div>

      <div class="mb-3">
        <h6 class="text-primary"><i class="bi bi-heart-pulse"></i> Perks & Benefits</h6>
        <div class="d-flex flex-wrap gap-2">
          ${c.perks.map(perk => `<span class="badge rounded-pill bg-success">${perk}</span>`).join("")}
        </div>
      </div>
    `;
  }


    function populateFilters(companies) {
  const sectorSet = new Set();
  const locationSet = new Set();

  companies.forEach(company => {
    sectorSet.add(company.sector);
    locationSet.add(company.location);
  });

  const sectorFilter = document.getElementById("sectorFilter");
  const locationFilter = document.getElementById("locationFilter");

  // Helper to add options
  function addOptions(selectEl, itemsSet) {
    // Clear old dynamic options
    selectEl.querySelectorAll("option:not(:first-child)").forEach(opt => opt.remove());
    [...itemsSet].sort().forEach(item => {
      const opt = document.createElement("option");
      opt.value = item;
      opt.textContent = item;
      selectEl.appendChild(opt);
    });
  }

  addOptions(sectorFilter, sectorSet);
  addOptions(locationFilter, locationSet);
}
populateFilters(companies);