document.addEventListener("DOMContentLoaded",()=>{
    const loginForm = document.getElementById("LoginForm");
    const signupForm = document.getElementById("RegisterForm");

    //Arrow function named as getUsers
    const getUsers = () => JSON.parse(localStorage.getItem("users")) || []

    if(signupForm){
        signupForm.addEventListener("submit",(e)=>{
            e.preventDefault();
            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
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
            users.push({name,email, password});
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

            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if(user){
                localStorage.setItem("loggedInUser", user.name);
                window.location.href = "index.html"
            }
            else{
                alert("Invalid Username or Password. Please Try again!")
            }

        })
    }
})
