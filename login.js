// Récupération des éléments du formulaire de connexion
const loginForm = document.querySelector("form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorElement = document.createElement("p");

// Ajout d'un écouteur d'événement pour la soumission du formulaire
loginForm.addEventListener("submit", handleSubmit);

// Fonction pour gérer la soumission du formulaire de connexion
async function handleSubmit(event) {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (email === "" || password === "") {
    showError("Veuillez remplir tous les champs.");
    return;
  }
  await fetchLoginData(email, password);
}

// Fonction pour envoyer les données de connexion à l'API
async function fetchLoginData(email, password) {
  console.log("URL API:", window.API_BASE);
  console.log("URL complete:", `${window.API_BASE}/users/login`);
  try {
    const response = await fetch(`${window.API_BASE}/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log("Response status:", response.status);
    
    if (response.ok) {
      const data = await response.json();
      if (data && data.token) {
        tokenRegister(data);
        window.location.href = "index.html";
      } else {
        showError("Les informations de connexion sont incorrectes.");
      }
    } else {
      const errorText = await response.text();
      console.error("Erreur réponse:", errorText);
      showError("Échec de la connexion. Les informations de connexion sont incorrectes.");
    }
  } catch (error) {
    console.error("Erreur complète:", error);
    showError("Échec de la connexion. Erreur de connexion à l'API.");
  }
}

// Fonction pour afficher les messages d'erreur
function showError(errorMessage) {
  errorElement.textContent = errorMessage;
  errorElement.style.color = "red";
  errorElement.style.marginTop = "10px";
  if (!loginForm.contains(errorElement)) {
    loginForm.appendChild(errorElement);
  }
}

// Fonction pour enregistrer le token dans le localStorage
function tokenRegister(data) {
  localStorage.setItem("token", data.token);
}