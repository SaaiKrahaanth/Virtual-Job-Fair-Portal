interface User {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  role: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("LoginForm") as HTMLFormElement | null;
  const signupForm = document.getElementById("RegisterForm") as HTMLFormElement | null;

  const getUsers = (): User[] => {
    return JSON.parse(localStorage.getItem("users") || "[]");
  };

  if (signupForm) {
    signupForm.addEventListener("submit", (e: Event) => {
      e.preventDefault();

      const name = (document.getElementById("signupName") as HTMLInputElement).value.trim();
      const email = (document.getElementById("signupEmail") as HTMLInputElement).value.trim();
      const password = (document.getElementById("signupPassword") as HTMLInputElement).value.trim();
      const contactNumber = (document.getElementById("contactNumber") as HTMLInputElement).value.trim();
      const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value.trim();
      const role = (document.getElementById("signupRole") as HTMLSelectElement).value;

      const users = getUsers();
      if (users.find((u) => u.email === email)) {
        alert("Email already registered");
        return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        alert(
          "Password must be at least 8 characters long and include:\n- One uppercase letter\n- One lowercase letter\n- One number"
        );
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }

      users.push({ name, email, password, contactNumber, role });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! Please Log in.");
      window.location.href = "Login.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e: Event) => {
      e.preventDefault();

      const email = (document.getElementById("loginEmail") as HTMLInputElement).value;
      const password = (document.getElementById("loginPassword") as HTMLInputElement).value;
      const role = (document.getElementById("loginRole") as HTMLSelectElement).value;

      const users = getUsers();
      const user = users.find((u) => u.email === email && u.password === password && u.role === role);

      if (user) {
        localStorage.setItem("loggedInUser", user.name);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userEmail", user.email);

        window.location.href = user.role === "Admin" ? "Admindashboard.html" : "userdashboard.html";
      } else {
        alert("Invalid Username or Password. Please Try again!");
      }
    });
  }
});
