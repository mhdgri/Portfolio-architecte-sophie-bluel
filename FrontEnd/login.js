// Récupération des éléments du formulaire de connexion
const loginForm = document.querySelector('form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const errorElement = document.createElement('p'); // Crée un élément 'p' pour afficher le message d'erreur

// Ajout d'un écouteur d'événement pour la soumission du formulaire
loginForm.addEventListener("submit", handleSubmit);

// Fonction pour gérer la soumission du formulaire de connexion
async function handleSubmit(event) {
    event.preventDefault();
    const email = emailInput.value.trim(); // Trim l'email pour enlever les espaces en début et fin de chaîne
    const password = passwordInput.value.trim(); // Trim le mot de passe pour enlever les espaces en début et fin de chaîne
    if (email === '' || password === '') { // Vérifie si les champs email et mot de passe sont vides
        showError('Veuillez remplir tous les champs.'); // Affiche un message d'erreur si les champs sont vides
        return;
    }
    await fetchLoginData(email, password); // Appelle la fonction fetchLoginData pour envoyer les données de connexion au serveur
}

// Fonction pour envoyer les données de connexion à l'API et vérifier la réponse
async function fetchLoginData(email, password) {
  try {
    const response = await fetch(`${window.API_BASE}/api/users/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      showError('Échec de la connexion. Les informations de connexion sont incorrectes.');
      return;
    }

    const data = await response.json();
    if (data && data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = "index.html";
    } else {
      showError('Les informations de connexion sont incorrectes.');
    }
  } catch (err) {
    showError('Échec de la connexion. Erreur de connexion à l’API.');
  }
}


// Fonction pour afficher les messages d'erreur dans le formulaire
function showError(errorMessage) {
    errorElement.textContent = errorMessage; // Affiche le message d'erreur dans l'élément 'p' créé précédemment
    if (!loginForm.contains(errorElement)) { // Vérifie si l'élément 'p' n'est pas déjà ajouté au formulaire
        loginForm.appendChild(errorElement); // Ajoute l'élément 'p' contenant le message d'erreur au formulaire
    }
}

// Fonction pour enregistrer le token dans le localStorage du navigateur
function tokenRegister(data) {
    localStorage.setItem('token', data.token); // Enregistre le token dans le localStorage du navigateur
}
