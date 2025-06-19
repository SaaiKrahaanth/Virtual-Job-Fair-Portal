import { Company } from '../interfaces/Company';

export let companies: Company[] = [];

export async function loadCompanies(): Promise<void> {
  try {
    const res = await fetch("http://localhost:3000/companies");
    companies = await res.json();

    // Load favourites from localStorage
    const savedFavs: number[] = JSON.parse(localStorage.getItem("favourites") || "[]");
    companies.forEach(c => {
      c.favourite = savedFavs.includes(c.id);
    });

  } catch (err) {
    console.error("Error loading company data:", err);
  }
}

function updateLocalStorageFavourites(): void {
  const favIds = companies.filter(c => c.favourite).map(c => c.id);
  localStorage.setItem("favourites", JSON.stringify(favIds));
}

export function populateFilters(companiesList: Company[]): void {
  const sectorSet = new Set<string>();
  const locationSet = new Set<string>();

  companiesList.forEach(company => {
    sectorSet.add(company.sector);
    locationSet.add(company.location);
  });

  const sectorFilter = document.getElementById("sectorFilter") as HTMLSelectElement | null;
  const locationFilter = document.getElementById("locationFilter") as HTMLSelectElement | null;

  function addOptions(selectEl: HTMLSelectElement | null, itemsSet: Set<string>) {
    if (!selectEl) return;
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

export function renderCards(): void {
  const list = document.getElementById("companyList") as HTMLElement;
  list.innerHTML = "";
  const search = (document.getElementById("searchInput") as HTMLInputElement).value.toLowerCase();
  const sector = (document.getElementById("sectorFilter") as HTMLSelectElement).value;
  const location = (document.getElementById("locationFilter") as HTMLSelectElement).value;
  const typeCheckboxes = document.querySelectorAll("input[name='typeFilter']:checked") as NodeListOf<HTMLInputElement>;
  const types = Array.from(typeCheckboxes).map(cb => cb.value);
  const favOnly = (document.getElementById("favouriteOnly") as HTMLInputElement).checked;

  const filtered = companies.filter(c => {
    return (!search || c.name.toLowerCase().includes(search)) &&
      (!sector || c.sector === sector) &&
      (!location || c.location === location) &&
      (types.length === 0 || types.includes(c.type)) &&
      (!favOnly || c.favourite === true);
  });

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="col-12 text-center py-5">
        <h5 class="text-muted"> No companies match your search/filter criteria.</h5>
        <p class="text-secondary">Try adjusting your filters or search terms.</p>
      </div>
    `;
    return;
  }

  filtered.forEach((c, index) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card h-100 shadow-sm rounded border-0 custom-card" onclick="showDetails(${index})" role="button">
        <div class="card-body position-relative">
          <i class="bi ${c.favourite ? 'bi-star-fill text-primary' : 'bi-star text-secondary'} 
            position-absolute top-0 end-0 m-2 me-3 mt-2 fs-5 favourite-toggle" 
            role="button" onclick="event.stopPropagation();  toggleFavourite(${c.id})"></i>

          <h5 class="card-title text-prim fw-bold">${c.name}</h5>
          <p class="card-text mb-1"><strong>Sector:</strong> ${c.sector}</p>
          <p class="card-text mb-1"><strong>Location:</strong> ${c.location}</p>
          <p class="card-text mb-1"><strong>Hiring Type:</strong> ${c.type}</p>
          <p class="card-text mb-1"><strong>Role:</strong> ${c.role}</p>
          <p class="card-text">${c.description}</p>
          ${(c.tags ?? []).map(tag => `<span class="badge bg-primary me-1 small">${tag}</span>`).join("")}
        </div>
        <div class="card-footer bg-white text-primary text-end small"> 
          <i class="bi bi-clock me-1"></i>${c.time}
        </div>
      </div>
    `;

    list.appendChild(card);
  });
}

export function showDetails(index: number): void {
  const modalEl = document.getElementById('companyModal');
  // @ts-ignore
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
  const c = companies[index];
  (document.getElementById("modalTitle") as HTMLElement).innerHTML = `
    <span class="text-primary text-white">${c.name}</span> - <small>${c.role}</small>
  `;

  (document.getElementById("modalBody") as HTMLElement).innerHTML = `
    <div class="row mb-3">
      <div class="col-md-6">
        <p><strong>Sector:</strong> ${c.sector}</p>
        <p><strong>Location:</strong> ${c.location}</p>
        <p><strong>Type:</strong> <span class="badge bg-info text-dark">${c.type}</span></p>
        <p><strong>Posted:</strong> <i>${c.time}</i></p>
      </div>
      <div class="col-md-6">
        <p><strong>Tags:</strong><br>
          ${(c.tags ?? []).map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join(" ")}
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
        ${(c.requirements ?? []).map(req => `<li class="list-group-item">${req}</li>`).join("")}
      </ul>
    </div>
    <div class="mb-3">
      <h6 class="text-primary"><i class="bi bi-heart-pulse"></i> Perks & Benefits</h6>
      <div class="d-flex flex-wrap gap-2">
        ${(c.perks ?? []).map(perk => `<span class="badge rounded-pill bg-success">${perk}</span>`).join("")}
      </div>
    </div>
  `;
}

export function toggleFavourite(id: number): void {
  const company = companies.find(c => c.id === id);
  if (company) {
    company.favourite = !company.favourite;
    updateLocalStorageFavourites();
    showToast(company.favourite ? "Added to favourites!" : "Removed from favourites.");
    renderCards();
  } else {
    console.error(`Company with id ${id} not found.`);
  }
}

export function showToast(message: string): void {
  const toastEl = document.getElementById("favouriteToast");
  if (!toastEl) return;
  const toastBody = toastEl.querySelector(".toast-body");
  if (toastBody) toastBody.textContent = message;
  // @ts-ignore
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

document.addEventListener('DOMContentLoaded', () => {
  loadCompanies();
});