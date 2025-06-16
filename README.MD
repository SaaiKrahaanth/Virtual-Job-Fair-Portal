# 1. Create repo and clone it
git clone https://github.com/your-org/virtual-job-fair.git
cd virtual-job-fair

# 2. Create and push dev branch
git checkout -b dev
git push -u origin dev

# 3. Protect `main` (from GitHub settings)

# 4. Instruct members:
git checkout -b feature/landing-page dev

Here’s your `README.md` content for the **Virtual Job Fair Portal** project based on the given structure and sprint goals:

---

```markdown
# 🎯 Virtual Job Fair Portal

A full-stack web application for students and job seekers to register, explore companies, attend virtual job fairs, apply for jobs, and interact with recruiters through live sessions and chat.

---

## 🚀 Sprint 1: UI Foundation & Version Control

### 🧾 Goal:
- Establish project foundation
- Set up version control using Git
- Create a responsive static UI using HTML5, CSS3, Bootstrap 5, and JavaScript

---

## 📁 Folder Structure

```

virtual-job-fair-portal/
│
├── index.html                ← Landing page (Member 2)
├── login.html                ← Optional: fallback for login modal
├── register.html             ← Optional: fallback for register modal
│
├── css/
│   └── styles.css            ← Custom CSS (override Bootstrap if needed)
│
├── js/
│   ├── countdown.js          ← Countdown timer logic (Member 5)
│   └── main.js               ← Any shared JS
│
├── assets/
│   ├── images/               ← Logos, icons, banners, etc.
│   └── testimonials/         ← Images used in testimonials
│
├── components/
│   ├── navbar.html           ← Reusable navbar (Member 6)
│   ├── footer.html           ← Reusable footer (Member 6)
│   ├── company-listing.html  ← Company section (Member 4)
│   ├── auth-modals.html      ← Bootstrap login/register modals (Member 3)
│
├── README.md                 ← Project guide & Git instructions
├── .gitignore                ← Ignore node\_modules, etc.
└── LICENSE                   ← (Optional, if needed)

````

---

## 🧑‍💻 Team & Tasks

| Member     | Task |
|------------|------|
| Member 1   | Set up GitHub repo, branching strategy, and collaboration instructions |
| Member 2   | Design responsive landing page with event highlights and testimonials |
| Member 3   | Create login/registration forms using Bootstrap modals |
| Member 4   | Build company listing section with filters |
| Member 5   | Add countdown timer for upcoming job fair using JavaScript |
| Member 6   | Implement responsive navbar and footer with links and social icons |

---

## 🌿 Git Branching Strategy

- `main` → Stable production-ready code
- `dev` → All features merge here for integration
- `feature/<task-name>` → One feature per branch

### 🔁 Working Workflow

```bash
# Clone and setup
git clone https://github.com/your-org/virtual-job-fair.git
cd virtual-job-fair

# Switch to dev
git checkout dev

# Create a feature branch
git checkout -b feature/your-feature-name

# After coding
git add .
git commit -m "Add your message here"
git push origin feature/your-feature-name

# Then create a pull request to dev branch on GitHub
````

---

## 🌐 Technologies Used

* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* Git & GitHub

---

## 📸 Screenshot Insertion Format

To insert a screenshot in markdown:

```markdown
![Alt Text](assets/images/screenshot.png)
```

---

## 📌 Note

* This is a static UI sprint – no backend integration yet.
* All team members must push only to their feature branches.
* Pull requests will be merged only after code review.

---

## 📄 License

This project is open-source. See `LICENSE` file for more details.

```

---

Let me know if you'd like this saved as a file or customized with your actual repo link and member names.
```
