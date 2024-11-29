/* SHOW HIDE PASSWORD LOGIN */
const passwordAccess = (loginPass, loginEye) =>{
    const input = document.getElementById(loginPass),
          iconEye = document.getElementById(loginEye)
 
    iconEye.addEventListener('click', () =>{
       // Change password to text
       input.type === 'password' ? input.type = 'text'
                                       : input.type = 'password'
 
       // Icon change
       iconEye.classList.toggle('ri-eye-fill')
       iconEye.classList.toggle('ri-eye-off-fill')
    })
 }
 passwordAccess('password','loginPassword')
 
 /* SHOW HIDE PASSWORD CREATE ACCOUNT */
 const passwordRegister = (loginPass, loginEye) =>{
    const input = document.getElementById(loginPass),
          iconEye = document.getElementById(loginEye)
 
    iconEye.addEventListener('click', () =>{
       // Change password to text
       input.type === 'password' ? input.type = 'text'
                                       : input.type = 'password'
 
       // Icon change
       iconEye.classList.toggle('ri-eye-fill')
       iconEye.classList.toggle('ri-eye-off-fill')
    })
 }
 passwordRegister('passwordCreate','loginPasswordCreate')
 
 /* SHOW HIDE LOGIN & CREATE ACCOUNT */
 const loginAcessRegister = document.getElementById('loginAccessRegister'),
       buttonRegister = document.getElementById('loginButtonRegister'),
       buttonAccess = document.getElementById('loginButtonAccess')
 
 buttonRegister.addEventListener('click', () => {
    loginAcessRegister.classList.add('active')
 })
 
 buttonAccess.addEventListener('click', () => {
    loginAcessRegister.classList.remove('active')
 })

 localStorage.removeItem("jwt");
 
 var jwt = localStorage.getItem("jwt");
 if (jwt != null) {
   window.location = './Inventory.html';
 }
 
 function login() {
   const email = document.getElementById("email").value.trim();
   const password = document.getElementById("password").value.trim();
 
   // Validate input fields
   if (!email || !password) {
     alert("Please enter both email and password.");
     return false;
   }
 
   const xhttp = new XMLHttpRequest();
   xhttp.open("POST", "https://reqres.in/api/login", true);
   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
 
   xhttp.onreadystatechange = function () {
     if (this.readyState === 4) {
       if (this.status === 200) {
         // Parse JSON response
         const response = JSON.parse(this.responseText);
 
         if (response.token) {
           // Save JWT in Local Storage
           localStorage.setItem("jwt", response.token);
           Swal.fire({
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 1500, // หน่วงเวลา 1.5 วินาทีก่อนเปลี่ยนหน้า
          }).then(() => {
            window.location = './Listings.html'; // Redirect to the Inventory page
          });
         }
       } else if (this.status === 400) {
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid email or password.",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
       } else {
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
       }
     }
   };
 
   // Send request to API
   xhttp.send(
     JSON.stringify({
       email: email,
       password: password,
     })
   );
 
   return false; // Prevent form submission
 }
 