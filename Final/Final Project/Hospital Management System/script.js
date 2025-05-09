document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        const { uname, upass } = JSON.parse(savedUser);
        if (username === uname && password === upass) {
          localStorage.setItem("loggedIn", "true");
          window.location.href = "index.html";
        } else {
          alert("Invalid credentials!");
        }
      } else {
        alert("No user found. Please register.");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const uname = document.getElementById("newUsername").value;
      const upass = document.getElementById("newPassword").value;
      localStorage.setItem("user", JSON.stringify({ uname, upass }));
      alert("Registered successfully! Please log in.");
      window.location.href = "login.html";
    });
  }

  const searchDoctor = document.getElementById("searchDoctor");
  if (searchDoctor) {
    searchDoctor.addEventListener("input", () => {
      const term = searchDoctor.value.toLowerCase();
      document.querySelectorAll(".doctor-card").forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const specialty = card.dataset.specialty.toLowerCase();
        card.style.display = name.includes(term) || specialty.includes(term) ? "flex" : "none";
      });
    });
  }

  const searchMedicine = document.getElementById("searchMedicine");
  if (searchMedicine) {
    searchMedicine.addEventListener("input", () => {
      const term = searchMedicine.value.toLowerCase();
      document.querySelectorAll(".medicine-item").forEach(item => {
        const name = item.dataset.name.toLowerCase();
        item.style.display = name.includes(term) ? "flex" : "none";
      });
    });
  }
});

function bookAppointment(btn) {
  if (localStorage.getItem("loggedIn") === "true") {
    btn.textContent = "Appointment Done";
    btn.disabled = true;
  } else {
    alert("Please log in to book an appointment.");
    window.location.href = "login.html";
  }
}
