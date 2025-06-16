# 1. Create repo and clone it
git clone https://github.com/your-org/virtual-job-fair.git
cd virtual-job-fair

# 2. Create and push dev branch
git checkout -b dev
git push -u origin dev

# 3. Protect `main` (from GitHub settings)

# 4. Instruct members:
git checkout -b feature/landing-page dev
