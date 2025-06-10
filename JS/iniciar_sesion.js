document.getElementById("loginBtn").addEventListener("click", login);

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validación: campos vacíos
  if (!email || !password) {
    alert("Por favor completa ambos campos.");
    return;
  }

  // Preparar parámetros
  const params = new URLSearchParams();
  params.append("action", "login");
  params.append("email", email);
  params.append("password", password);

  // Hacer petición al Apps Script
  fetch("https://script.google.com/macros/s/AKfycbwxgSNWSW9zFQZ6jhgINTlmn_jtMaQHPeMKgOmhW88i5A5BSKdNaQWdcsw3_6ikusfw/exec", {
    method: "POST",
    body: params
  })
  .then(res => res.json())
  .then(data => {
    if (data.estado === "VALIDO") {
      // Guardar datos del usuario en localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("sucursal", data.sucursal);

      // Redirigir a la página principal
      window.location.href = "main.html";
    } else {
      alert("❌ Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Ocurrió un error al iniciar sesión. Verifica tu conexión o intenta más tarde.");
  });
}
