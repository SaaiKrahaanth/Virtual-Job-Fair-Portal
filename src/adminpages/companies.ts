import { Company } from '../interfaces/Company';

// Use Company[] for type safety
export let companies: Company[] = [];

let modalTitle: HTMLElement | null,
  modalBody: HTMLElement | null,
  saveBtn: HTMLElement | null,
  toastEl: HTMLElement | null,
  toast: any;
let modal: any; // Bootstrap modal instance

let editingCompanyId: number | null = null;

export function initModalElements(): void {
  modalTitle = document.getElementById('modalTitle');
  modalBody = document.getElementById('modalBody');
  saveBtn = document.getElementById('saveChangesBtn');
  toastEl = document.getElementById('favouriteToast');
  if (toastEl && (window as any).bootstrap) {
    toast = new (window as any).bootstrap.Toast(toastEl);
  }
}

export function setModalInstance(modalInstance: any): void {
  modal = modalInstance;
}

export async function loadCompanies(): Promise<void> {
  try {
    const res = await fetch('http://localhost:3000/companies');
    companies = await res.json();
  } catch (err) {
    console.error('Error loading company data:', err);
    companies = [];
  }
}

export function populateFilters(companiesList: Company[]): void {
  const sectorSet = new Set<string>();
  const locationSet = new Set<string>();

  companiesList.forEach((company) => {
    if (company.sector) sectorSet.add(company.sector);
    if (company.location) locationSet.add(company.location);
  });

  const sectorFilter = document.getElementById('sectorFilter') as HTMLSelectElement | null;
  const locationFilter = document.getElementById('locationFilter') as HTMLSelectElement | null;

  addOptions(sectorFilter, sectorSet);
  addOptions(locationFilter, locationSet);
}

export function addOptions(selectEl: HTMLSelectElement | null, itemsSet: Set<string>): void {
  if (!selectEl) return;
  selectEl.querySelectorAll('option:not(:first-child)').forEach((opt) => opt.remove());
  [...itemsSet]
    .sort()
    .forEach((item) => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      selectEl.appendChild(opt);
    });
}

export function renderTable(): void {
  const tbody = document.querySelector('#companyTable tbody') as HTMLElement | null;
  if (!tbody) return;
  tbody.innerHTML = '';

  const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
  const sectorFilter = document.getElementById('sectorFilter') as HTMLSelectElement | null;
  const locationFilter = document.getElementById('locationFilter') as HTMLSelectElement | null;
  const typeCheckboxes = document.querySelectorAll("input[name='typeFilter']:checked") as NodeListOf<HTMLInputElement>;

  const search = searchInput ? searchInput.value.toLowerCase() : '';
  const sector = sectorFilter ? sectorFilter.value : '';
  const location = locationFilter ? locationFilter.value : '';
  const types = Array.from(typeCheckboxes).map((cb) => cb.value);

  const filtered = companies.filter((c) => {
    return (
      (!search || c.name.toLowerCase().includes(search)) &&
      (!sector || c.sector === sector) &&
      (!location || c.location === location) &&
      (types.length === 0 || (c.type && types.includes(c.type)))
    );
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-muted py-4">
          No companies match your search/filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach((c, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.sector ?? ''}</td>
      <td>${c.location}</td>
      <td>${c.type ?? ''}</td>
      <td>${c.role ?? ''}</td>
      <td>${c.time ?? ''}</td>
      <td>
        <button class="btn btn-sm btn-primary me-2" onclick="window.showDetails(${index})">View</button>
        <button class="btn btn-sm btn-warning me-2" onclick="window.editCompany(${c.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="window.deleteCompany(${c.id},event)">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

export function showDetails(index: number): void {
  const modalEl = document.getElementById('companyModal');
  if (!(window as any).bootstrap) return;
  const modal = new (window as any).bootstrap.Modal(modalEl);
  modal.show();
  const c = companies[index];
  (document.getElementById("modalTitle") as HTMLElement).innerHTML = `
    <span class="text-primary text-white">${c.name}</span> - <small>${c.role ?? ''}</small>
  `;

  (document.getElementById("modalBody") as HTMLElement).innerHTML = `
    <div class="row mb-3">
      <div class="col-md-6">
        <p><strong>Sector:</strong> ${c.sector ?? ''}</p>
        <p><strong>Location:</strong> ${c.location}</p>
        <p><strong>Type:</strong> <span class="badge bg-info text-dark">${c.type ?? ''}</span></p>
        <p><strong>Posted:</strong> <i>${c.time ?? ''}</i></p>
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
      <p>${c.description ?? ''}</p>
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

export function editCompany(id: number): void {
  const c = companies.find(comp => comp.id == id);
  if (!c) return alert('Company not found.');
  editingCompanyId = id;
  if (saveBtn) saveBtn.style.display = 'inline-block';
  if (modalTitle) modalTitle.textContent = `Edit Company: ${c.name}`;

  if (modalBody) modalBody.innerHTML = `
    <form id="editForm" class="row g-3">
      <div class="col-md-6">
        <label for="editName" class="form-label">Name</label>
        <input type="text" id="editName" name="editName" class="form-control" value="${c.name}" required />
      </div>
      <div class="col-md-6">
        <label for="editSector" class="form-label">Sector</label>
        <input type="text" id="editSector" name="editSector" class="form-control" value="${c.sector ?? ''}" required />
      </div>
      <div class="col-md-6">
        <label for="editLocation" class="form-label">Location</label>
        <input type="text" id="editLocation" name="editLocation" class="form-control" value="${c.location}" required />
      </div>
      <div class="col-md-6">
        <label for="editType" class="form-label">Type</label>
        <select id="editType" name="editType" class="form-select" required>
          <option value="Internship" ${c.type === 'Internship' ? 'selected' : ''}>Internship</option>
          <option value="Full-Time" ${c.type === 'Full-Time' ? 'selected' : ''}>Full-Time</option>
          <option value="Part-Time" ${c.type === 'Part-Time' ? 'selected' : ''}>Part-Time</option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="editRole" class="form-label">Role</label>
        <input type="text" id="editRole" name="editRole" class="form-control" value="${c.role ?? ''}" required />
      </div>
      <div class="col-md-6">
        <label for="editTime" class="form-label">Posted</label>
        <input type="text" id="editTime" name="editTime" class="form-control" value="${c.time ?? ''}" required />
      </div>
      <div class="col-12">
        <label for="editDescription" class="form-label">Description</label>
        <textarea id="editDescription" name="editDescription" class="form-control" rows="3" required>${c.description ?? ''}</textarea>
      </div>
      <div class="col-12">
        <label for="editRequirements" class="form-label">Requirements (comma-separated)</label>
        <input type="text" id="editRequirements" name="editRequirements" class="form-control" value="${(c.requirements ?? []).join(', ')}" />
      </div>
      <div class="col-12">
        <label for="editPerks" class="form-label">Perks</label>
        <input type="text" id="editPerks" name="editPerks" class="form-control" value="${(c.perks ?? []).join(', ')}" />
      </div>
    </form>
  `;

  if (modal) modal.show();
}

export async function deleteCompany(id: number, event: Event): Promise<void> {
  event.preventDefault();

  if (!confirm('Are you sure you want to delete this company?')) return;

  try {
    const res = await fetch(`http://localhost:3000/companies/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete company from server.');
    }

    companies = companies.filter((c) => c.id != id);
    renderTable();
    showToast('Company deleted successfully.');
  } catch (error) {
    console.error('Delete failed:', error);
    alert('Could not delete the company. Please try again.');
  }
}

export async function saveButton(): Promise<void> {
  let form: HTMLFormElement | null;
  if (editingCompanyId == null) {
    form = document.getElementById('addForm') as HTMLFormElement | null;
  } else {
    form = document.getElementById('editForm') as HTMLFormElement | null;
  }
  if (!form) return;

  const formData = new FormData(form);

  const newCompany: Company = {
    id: editingCompanyId ?? Date.now(),
    name: (formData.get('editName') ?? formData.get('addName') ?? '') as string,
    sector: (formData.get('editSector') ?? formData.get('addSector') ?? '') as string,
    location: (formData.get('editLocation') ?? formData.get('addLocation') ?? '') as string,
    type: (formData.get('editType') ?? formData.get('addType') ?? '') as string,
    role: (formData.get('editRole') ?? formData.get('addRole') ?? '') as string,
    time: (formData.get('editTime') ?? formData.get('addTime') ?? '') as string,
    description: (formData.get('editDescription') ?? formData.get('addDescription') ?? '') as string,
    requirements: (
      (formData.get('editRequirements') ?? formData.get('addRequirements') ?? '')
        .toString()
        .split(',')
        .map((r) => r.trim())
        .filter((r) => r.length > 0)
    ),
    perks: (
      (formData.get('editPerks') ?? formData.get('addPerks') ?? '')
        .toString()
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
    ),
    favourite:
      formData.get('editFavourite') === 'on' ||
      formData.get('addFavourite') === 'on' ||
      false,
  };

  try {
    if (editingCompanyId === null) {
      // Add new company via POST
      const res = await fetch('http://localhost:3000/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompany),
      });

      if (!res.ok) throw new Error('Failed to add new company');

      const addedCompany = await res.json();
      companies.push(addedCompany);
      showToast('Company added successfully.');
    } else {
      // Edit existing company via PATCH
      const res = await fetch(`http://localhost:3000/companies/${editingCompanyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompany),
      });

      if (!res.ok) throw new Error('Failed to update company');

      const updatedCompany = await res.json();
      const index = companies.findIndex((c) => c.id == editingCompanyId);
      if (index !== -1) {
        companies[index] = updatedCompany;
        showToast('Company updated successfully.');
      } else {
        alert('Error: Company not found for update.');
        return;
      }
    }

    renderTable();
    if (modal) modal.hide();
    editingCompanyId = null;
  } catch (error) {
    console.error(error);
    alert('Error saving company. Please try again.');
  }
}

export function showToast(message: string): void {
  if (!toastEl || !toast) return;
  const toastBody = toastEl.querySelector('.toast-body');
  if (toastBody) toastBody.textContent = message;
  toast.show();
}