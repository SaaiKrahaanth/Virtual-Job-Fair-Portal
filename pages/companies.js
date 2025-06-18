export const companies = [
      {
        id:1,
        name: "Infosys",
        sector: "IT",
        location: "Bangalore",
        type: "Internship",
        role: "Frontend Developer Intern",
        description: "Work on ReactJS-based UI development with real-world projects.",
        requirements: ["Knowledge of HTML, CSS, JavaScript", "Basics of React or Angular", "Good problem-solving skills"],
        perks: ["Certificate", "Flexible hours", "Pre-placement offer"],
        tags: ["#HiringNow", "#Remote", "#FreshersWelcome", "#Flexible"],
        time: "2 days ago",
        favourite: false
      },
      {
        id:2,
        name: "TCS",
        sector: "IT",
        location: "Delhi",
        type: "Full-Time",
        role: "Java Backend Developer",
        description: "Develop robust backend services using Java, Spring Boot.",
        requirements: ["2+ years experience in Java", "Spring Boot and REST API knowledge", "Good communication skills"],
        perks: ["Medical insurance", "Annual bonus"],
        tags: ["#ExperiencedOnly", "#ImmediateJoining", "#CoreJava"],
        time: "1 week ago",
        favourite: false
      },
      {
        id:3,
        name: "HDFC Bank",
        sector: "Finance",
        location: "Mumbai",
        type: "Full-Time",
        role: "Relationship Manager",
        description: "Manage customer accounts and sell banking products.",
        requirements: ["Bachelor's degree in Finance", "Good communication & interpersonal skills"],
        perks: ["Sales incentives", "On-the-job training"],
        tags: ["#HiringNow", "#SalesRole", "#TargetBased", "#MBAPreferred"],
        time: "5 days ago",
        favourite: false
      },
      {
        id:4,
        name: "Wipro",
        sector: "IT",
        location: "Hyderabad",
        type: "Part-Time",
        role: "Tech Support Executive",
        description: "Provide tech support for domestic and international clients.",
        requirements: ["Basic IT knowledge", "Strong verbal communication", "Willingness to work shifts"],
        perks: ["Night shift allowance", "Remote options"],
        tags: ["#Remote", "#NightShift", "#VoiceProcess", "#WalkInDrive"],
        time: "3 days ago",
        favourite: false
      },
      {
        id:5,
        name: "Amazon",
        sector: "E-Commerce",
        location: "Bangalore",
        type: "Full-Time",
        role: "Data Analyst",
        description: "Analyze large datasets to identify customer behavior trends.",
        requirements: ["SQL, Excel, Tableau", "Statistical knowledge", "Strong communication skills"],
        perks: ["Stock options", "Health insurance"],
        tags: ["#UrgentHiring", "#WorkFromHome", "#Analytics"],
        time: "1 day ago",
        favourite: false
      },
      {
        id:6,
        name: "BYJU'S",
        sector: "EdTech",
        location: "Delhi",
        type: "Full-Time",
        role: "Business Development Associate",
        description: "Promote BYJU'S courses through direct, consultative sales to students and parents.",
        requirements: ["Any graduation", "Good persuasion skills"],
        perks: ["High incentives", "Travel allowances"],
        tags: ["#TargetBased", "#FreshersWelcome", "#FieldWork"],
        time: "4 days ago",
        favourite: false
      },
      {
        id:7,
        name: "Cognizant",
        sector: "IT",
        location: "Chennai",
        type: "Internship",
        role: "QA Automation Intern",
        description: "Assist in automation testing of enterprise web applications.",
        requirements: ["Basic knowledge of testing tools", "Good understanding of SDLC"],
        perks: ["Mentorship", "Hands-on experience", "Certificate"],
        tags: ["#Remote", "#LearningOpportunity"],
        time: "3 days ago",
        favourite: false
      },
      {
        id:8,
        name: "Deloitte",
        sector: "Consulting",
        location: "Mumbai",
        type: "Full-Time",
        role: "Risk Analyst",
        description: "Evaluate and mitigate financial & cyber risks for clients.",
        requirements: ["Excel, Python", "Good analytical reasoning", "Presentation skills"],
        perks: ["Work-life balance", "Global exposure"],
        tags: ["#UrgentHiring", "#ClientFacing", "#ExperiencedOnly"],
        time: "6 days ago",
        favourite: false
      },
      {
        id:9,
        name: "Swiggy",
        sector: "E-Commerce",
        location: "Hyderabad",
        type: "Part-Time",
        role: "Delivery Executive",
        description: "Deliver food orders quickly, safely, and on time with professionalism and care.",
        requirements: ["Valid DL & 2-wheeler", "Smartphone"],
        perks: ["Weekly payouts", "Fuel allowance"],
        tags: ["#Flexible", "#NoInterview", "#ImmediateJoining"],
        time: "Today",
        favourite: false
      },
      {
        id:10,
        name: "Apollo Hospitals",
        sector: "Healthcare",
        location: "Chennai",
        type: "Full-Time",
        role: "Medical Data Coordinator",
        description: "Manage electronic medical records and support research documentation.",
        requirements: ["B.Sc or equivalent", "Accuracy and ethics in data handling"],
        perks: ["Free health check-ups", "Hospital discounts"],
        tags: ["#Healthcare", "#Clerical", "#WomenPreferred"],
        time: "2 days ago",
        favourite: false
      }
    ];

export function populateFilters(companies) {
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

 export function renderCards() {
      const list = document.getElementById("companyList");
      list.innerHTML = "";
      const search = document.getElementById("searchInput").value.toLowerCase();
      const sector = document.getElementById("sectorFilter").value;
      const location = document.getElementById("locationFilter").value;
      const typeCheckboxes = document.querySelectorAll("input[name='typeFilter']:checked");
      const types = Array.from(typeCheckboxes).map(cb => cb.value);
      const favOnly = document.getElementById("favouriteOnly").checked;


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

  // Add onclick directly to the card container div
  card.innerHTML = `
    <div class="card h-100 shadow-sm rounded border-0 custom-card"   onclick="showDetails(${index})" role="button">
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
        ${c.tags.map(tag => `<span class="badge bg-primary me-1 small">${tag}</span>`).join("")}
      </div>
      <div class="card-footer bg-white text-primary text-end small"> 
        <i class="bi bi-clock me-1"></i>${c.time}
      </div>
    </div>
  `;

        list.appendChild(card);
      });

    }
    

    export function showDetails(index) {
      const modalEl = document.getElementById('companyModal');
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
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
            ${c.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join(" ")}
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

   

    export function toggleFavourite(id) {
      const company = companies.find(c => c.id === id);
  if (company) {
    company.favourite = !company.favourite;
    showToast(company.favourite ? "Added to favourites!" : "Removed from favourites.");
    renderCards();
  } else {
    console.error(`Company with id ${id} not found.`);
  }
    }
    export function showToast(message) {
      const toastEl = document.getElementById("favouriteToast");
      toastEl.querySelector(".toast-body").textContent = message;
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }

    
    // document.addEventListener("DOMContentLoaded", () => {
    //   const users = JSON.parse(localStorage.getItem("users")) || [];
    //   const name = localStorage.getItem("loggedInUser");
    //   const role = localStorage.getItem("userRole");
    //   const email = localStorage.getItem("userEmail");
    //   const user = users.find(u => u.name === name);
    //   const dashboardLink = document.getElementById("dashboardLink");
    //   // const dashboardLink = document.getElementById("dashboardLink");
    //   // if (role === "admin" ) {
    //   //   dashboardLink.href = "Admindashboard.html";
    //   // }
    //   // else{
    //   //   dashboardLink.href = "userdashboard.html";
    //   // }
    //  if (dashboardLink) {
    //   if (role === "Admin") {
    //     dashboardLink.setAttribute("href", "admindashboard.html");
    //   } else {
    //     dashboardLink.setAttribute("href", "userdashboard.html");
    //   }
    // }
    //       document.getElementById("navUserName").textContent = name;
    //       document.getElementById("navUserEmail").textContent = email;
    //     });

    // function logout() {
    //   localStorage.removeItem("loggedInUser");
    //   localStorage.removeItem("userRole");
    //   window.location.href = "logout.html";
    // }