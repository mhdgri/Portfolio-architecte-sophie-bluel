// Récupération des éléments du formulaire de connexion
const loginForm = document.querySelector("form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorElement = document.createElement("p"); // Crée un élément 'p' pour afficher le message d'erreur

// Ajout d'un écouteur d'événement pour la soumission du formulaire
loginForm.addEventListener("submit", handleSubmit);

// Fonction pour gérer la soumission du formulaire de connexion
async function handleSubmit(event) {
  event.preventDefault();
  const email = emailInput.value.trim(); // Trim l'email pour enlever les espaces en début et fin de chaîne
  const password = passwordInput.value.trim(); // Trim le mot de passe pour enlever les espaces en début et fin de chaîne
  if (email === "" || password === "") {
    // Vérifie si les champs email et mot de passe sont vides
    showError("Veuillez remplir tous les champs."); // Affiche un message d'erreur si les champs sont vides
    return;
  }
  await fetchLoginData(email, password); // Appelle la fonction fetchLoginData pour envoyer les données de connexion au serveur
}

// Fonction pour envoyer les données de connexion à l'API et vérifier la réponse
async function fetchLoginData(email, password) {
  console.log("URL API:", window.API_BASE);
  console.log("URL complete:", `${window.API_BASE}/api/users/login`);
  try {
    const response = await fetch(`${window.API_BASE}/api/users/login`, {
      // Envoie une requête POST à l'URL de l'API avec les données de connexion
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
    console.log("Response:", response);
    if (response.ok) {
      // Vérifie si la réponse du serveur est OK (200)
      const data = await response.json(); // Transforme la réponse en objet JSON
      if (data && data.token) {
        // Vérifie si les données de connexion sont valides et si le token est présent
        tokenRegister(data); // Appelle la fonction tokenRegister pour enregistrer le token dans le localStorage
        window.location.href = "index.html"; // Redirige vers la page index.html en cas de connexion réussie
      } else {
        showError("Les informations de connexion sont incorrectes."); // Affiche un message d'erreur si les informations de connexion sont incorrectes
        console.log(
          "Échec de la connexion. Les informations de connexion sont incorrectes."
        );
      }
    } else {
      showError(
        "Échec de la connexion. Les informations de connexion sont incorrectes."
      ); // Affiche un message d'erreur si la réponse du serveur n'est pas OK
      console.log(
        "Échec de la connexion. Les informations de connexion sont incorrectes."
      );
    }
  } catch (error) {
    showError("Échec de la connexion. Erreur de connexion à l'API."); // Affiche un message d'erreur en cas d'erreur de connexion à l'API
    console.log("Échec de la connexion. Erreur de connexion à l'API.");
  }
}

// Fonction pour afficher les messages d'erreur dans le formulaire
function showError(errorMessage) {
  errorElement.textContent = errorMessage; // Affiche le message d'erreur dans l'élément 'p' créé précédemment
  if (!loginForm.contains(errorElement)) {
    // Vérifie si l'élément 'p' n'est pas déjà ajouté au formulaire
    loginForm.appendChild(errorElement); // Ajoute l'élément 'p' contenant le message d'erreur au formulaire
  }
}

// Fonction pour enregistrer le token dans le localStorage du navigateur
function tokenRegister(data) {
  localStorage.setItem("token", data.token); // Enregistre le token dans le localStorage du navigateur
}
