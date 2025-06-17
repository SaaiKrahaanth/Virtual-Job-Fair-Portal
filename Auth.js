document.addEventListener("DOMContentLoaded",()=>{
    const loginForm = document.getElementById("LoginForm");
    const signupForm = document.getElementById("RegisterForm");

    //Arrow function named as getUsers
    const getUsers = () => JSON.parse(localStorage.getItem("users")) || []

    if(signupForm){
        signupForm.addEventListener("submit",(e)=>{
            e.preventDefault();
            const name = document.getElementById("signupName").value.trim();
            const email = document.getElementById("signupEmail").value.trim();
            const password = document.getElementById("signupPassword").value.trim();
            const contactNumber = document.getElementById("contactNumber").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();
            const role = document.getElementById("signupRole").value;
            const users = getUsers(); 
            if(users.find(u => u.email === email)){
                alert ("Email already registered");
                return;
            }
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(password)) {
                alert("Password must be at least 8 characters long and include:\n- One uppercase letter\n- One lowercase letter\n- One number");
                return;
            }
            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }
            users.push({name,email, password,contactNumber,role});
            localStorage.setItem("users",JSON.stringify(users));
            alert("Signup successful! Please Log in.")
            window.location.href="Login.html";
        })
    }

    if(loginForm){
        loginForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const role = document.getElementById("loginRole").value;
            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password && u.role === role);

            if(user){
                localStorage.setItem("loggedInUser", user.name);
                localStorage.setItem("userRole",user.role);
                localStorage.setItem("userEmail",user.email);
                if(user.role=== "Admin"){
                    window.location.href = "Admindashboard.html";
                }
                else{
                    window.location.href = "userdashboard.html";
                }
            }
            else{
                alert("Invalid Username or Password. Please Try again!")
            }

        })
    }
})
