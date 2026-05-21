fetch("https://capstone-backend-tzox.onrender.com/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "divye@lpu.in", password: "@123Divye" })
})
.then(res => res.text())
.then(text => console.log(text))
.catch(err => console.error(err));
