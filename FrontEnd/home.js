// Gère images avec URL absolue ou relative
const addProject = (title, imageUrl) => {
  const galleryContent = document.querySelector(".gallery");
  const newFigure = document.createElement("figure");
  const newImage = document.createElement("img");
  const newCaption = document.createElement("figcaption");

  const src = imageUrl?.startsWith('http')
    ? imageUrl
    : `${window.API_BASE}${imageUrl}`;

  newImage.src = src;
  newImage.alt = title || '';
  newCaption.textContent = title || '';

  newFigure.appendChild(newImage);
  newFigure.appendChild(newCaption);
  galleryContent.appendChild(newFigure);
};


// Fonction pour récupérer les projets depuis l'API et les ajouter dans la galerie
const fetchProjects = async () => {
    // Récupérer les projets depuis l'API
    const response = await fetch(`${window.API_BASE}/api/works`);
    const allProjects = await response.json();
    
    // Ajouter chaque projet dans la galerie en appelant la fonction addProject
    allProjects.forEach(({ title, imageUrl }) => {
        addProject(title, imageUrl);
    });
};

// Appeler la fonction fetchProjects pour récupérer et afficher les projets dans la galerie
fetchProjects();

// Fonction pour ajouter une catégorie dans le filtre
const addCategory = (id, name) => {
    const newFilter = createCategoryFilterElement(id, name);
    const filterContent = document.querySelector(".filterContent");
    filterContent.appendChild(newFilter);
};

// Créer un élément de filtre de catégorie
const createCategoryFilterElement = (id, name) => {
    const newFilter = document.createElement("a");
    newFilter.classList.add("filter_item");
    newFilter.setAttribute("data-categoryId", id);
    newFilter.textContent = name;

    // Ajouter l'écouteur d'événement pour le filtrage des projets
    newFilter.addEventListener("click", async (event) => {
        applyCategoryFilter(id, event);
    });

    return newFilter;
};

// Appliquer le filtre de catégorie sur les projets
const applyCategoryFilter = async (id, event) => {
    event.preventDefault();

    const allLinks = document.querySelectorAll('.filter_item');
    allLinks.forEach(link => {
        link.classList.remove('active');
    })
    event.target.classList.add('active');

    // Récupérer tous les projets depuis l'API
    const response = await fetch(`${window.API_BASE}/api/works`);
    const allProjects = await response.json();

    // Filtrer les projets en fonction de l'ID de la catégorie sélectionnée
    const filteredProjects = (id === 0) ? allProjects : allProjects.filter(
        (project) => project.categoryId == id
    );

    // Mettre à jour la galerie avec les projets filtrés
    updateGallery(filteredProjects);
};

// Mettre à jour la galerie avec les projets filtrés
const updateGallery = (filteredProjects) => {
    const galleryContent = document.querySelector(".gallery");
    galleryContent.innerHTML = "";

    // Ajouter les projets filtrés dans la galerie
    filteredProjects.forEach(({ title, imageUrl }) => {
        addProject(title, imageUrl);
    });
};

// Fonction pour ajouter une catégorie à la liste déroulante
const fillSelectCategories = (id,name) => {
    const select = document.querySelector('#category');
    const option = document.createElement('option');
    option.value = id;
    option.innerText = name;
    select.appendChild(option);
};
    
// Fonction pour récupérer les catégories depuis l'API et les ajouter dans le filtre
const fetchCategories = async () => {
    // Ajouter la catégorie "Tous" avec l'ID 0
    addCategory(0, "Tous");
    
    // Récupérer les catégories depuis l'API
    const response = await fetch(`${window.API_BASE}/api/categories`);
    const allCategories = await response.json();
    
    // Ajouter chaque catégorie dans le filtre
    allCategories.forEach(({ id, name }) => {
        addCategory(id, name);
        fillSelectCategories(id, name);
    });
};

const firstModal = document.querySelectorAll('.modal_wrapper')[0];
const secondModal = document.querySelectorAll('.modal_wrapper')[1];
const modal = document.querySelector('.modal');

//Fonction pour afficher la modal
const showModal = (modal,wrapper) => {
    firstModal.style.display = 'none';
    secondModal.style.display = 'none';

    modal.style.display = 'flex';
    wrapper.style.display = 'block';
};
    
// Appeler la fonction fetchCategories pour récupérer et afficher les catégories dans le filtre
fetchCategories();

    
// Sélection des éléments DOM nécessaires pour la modal
const modalWrapper = document.querySelector('.modal_wrapper');
const openModal = document.querySelector('.open_modal');
const closeModal = document.querySelector('.js-close-modal');
const closeSecondModal = document.querySelectorAll('.js-close-modal')[1];
const backArrow = document.querySelector('.back_arrow');

// Ajout d'un écouteur d'événement pour le clic sur l'élément openModal
openModal.addEventListener('click', e => {
    // Empêcher le comportement par défaut du clic
    e.preventDefault();
    // Changer le style d'affichage de l'élément modal en 'flex' pour le rendre visible
    showModal(modal,firstModal);
});

backArrow.addEventListener('click', e => {
    // Empêcher le comportement par défaut du clic
    e.preventDefault();
    // Changer le style d'affichage de l'élément modal en 'flex' pour le rendre visible
    showModal(modal,firstModal);
});

// Ajout d'un écouteur d'événement pour le clic sur l'élément modal
modal.addEventListener('click', e => {
    // Empêcher le comportement par défaut du clic
    e.preventDefault();
    // Définir l'attribut aria-hidden de la modal sur 'true' pour la cacher
    modal.setAttribute('aria-hidden', 'true');
    // Changer le style d'affichage de l'élément modal en 'none' pour la cacher
    modal.style.display = 'none';
});

// Ajout d'un écouteur d'événement pour le clic sur l'élément modalWrapper
firstModal.addEventListener('click', e => {
    // Empêcher la propagation de l'événement
    e.stopPropagation();
});

// Ajout d'un écouteur d'événement pour le clic sur l'élément modalWrapper
secondModal.addEventListener('click', e => {
    // Empêcher la propagation de l'événement
    e.stopPropagation();
});

// Ajout d'un écouteur d'événement pour le clic sur l'élément closeModal
closeModal.addEventListener('click', e => {
    // Empêcher le comportement par défaut du clic
    e.preventDefault();
    // Définir l'attribut aria-hidden de la modal sur 'true' pour la cacher
    modal.setAttribute('aria-hidden', 'true');
    // Changer le style d'affichage de l'élément modal en 'none' pour la cacher
    modal.style.display = 'none';
});

closeSecondModal.addEventListener('click', e => {
    // Empêcher le comportement par défaut du clic
    e.preventDefault();
    // Définir l'attribut aria-hidden de la modal sur 'true' pour la cacher
    modal.setAttribute('aria-hidden', 'true');
    // Changer le style d'affichage de l'élément modal en 'none' pour la cacher
    modal.style.display = 'none';
});


// Définition de l'URL de l'API
const apiUrl = `${window.API_BASE}/api/works/`;

// Fonction pour ajouter une image dans la galerie
const addImageModal = async (imageUrl) => {
    // Récupérer le token de l'utilisateur
    const token = localStorage.getItem("token");
    // Envoyer une requête POST à l'API avec l'URL de l'image
    const response = await fetch(`${window.API_BASE}/api/works`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ imageUrl })
    });
    // Retourner la réponse JSON de l'API
    return response.json();
};

// Fonction pour supprimer un projet de la galerie
const deleteProject = async (id) => {
    // Récupérer le token de l'utilisateur
    const token = localStorage.getItem("token");
    // Envoyer une requête DELETE à l'API avec l'ID du projet
    const response = await fetch(`${window.API_BASE}/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });
    // Retourner la réponse JSON de l'API
    return response.json();
};


// Ajouter un projet à la galerie
const addProjectModal = ({ imageUrl, id, title }) => {
  const modalGallery = document.querySelector(".modal_gallery");

  const imgContent = document.createElement("div");
  const image = document.createElement("img");
  const textModal = document.createElement("p");
  const contentIconMove = document.createElement("span");
  const contentIconDelete = document.createElement("span");
  const iconMove = document.createElement("i");
  const iconDelete = document.createElement("i");

  imgContent.classList.add("content_img");

  const src = imageUrl?.startsWith('http')
    ? imageUrl
    : `${window.API_BASE}${imageUrl}`;

  image.src = src;
  image.alt = title || '';

  textModal.innerText = 'éditer';
  contentIconMove.classList.add("content-icons");
  contentIconDelete.classList.add("content_delete");
  contentIconDelete.setAttribute("data-projectId", id);
  iconMove.classList.add("fa-solid", "fa-arrows-up-down-left-right");
  iconDelete.classList.add("fa-solid", "fa-trash-can");

  contentIconMove.appendChild(iconMove);
  contentIconDelete.appendChild(iconDelete);
  imgContent.appendChild(image);
  imgContent.appendChild(textModal);
  imgContent.appendChild(contentIconMove);
  imgContent.appendChild(contentIconDelete);
  modalGallery.appendChild(imgContent);

  // suppression
  contentIconDelete.addEventListener('click', async (e) => {
    const projectId = e.currentTarget.getAttribute("data-projectId");
    const res = await deleteProject(projectId);
    // si OK, retire l’élément et rafraîchis la galerie principale
    if (res && !res.error) {
      imgContent.remove();
      await refreshMainGallery();
    }
  });
};

async function refreshMainGallery() {
  const response = await fetch(`${window.API_BASE}/api/works`);
  const allProjects = await response.json();

  const galleryContent = document.querySelector(".gallery");
  galleryContent.innerHTML = "";
  allProjects.forEach(({ title, imageUrl }) => addProject(title, imageUrl));
}


// Configurer l'écouteur d'événements pour le bouton Ajouter afin d'afficher le modal
function setupAddButtonEventListener() {
    const btnAdd = document.querySelector('.btn_add');
    btnAdd.addEventListener('click', async () => {
        showModal(modal, secondModal);
    });
}

// Appeler la fonction pour configurer l'écouteur d'événements pour le bouton Ajouter
setupAddButtonEventListener();

// Afficher les éléments d'authentification si l'utilisateur est authentifié
function displayAuthElements() {
    // Fonction pour afficher les éléments d'authentification
    function showAuthElement(classElement, display) {
        const authElements = document.querySelectorAll(classElement);
        authElements.forEach((element) => {
            element.style.display = display;
        });
    }

    // Vérifier si l'utilisateur est authentifié
    if (localStorage.getItem('token') !== null) {
        // Afficher les éléments d'authentification
        showAuthElement('.is_auth', 'block');
        showAuthElement('.is_auth_flex', 'flex');
    }
}

// Appeler la fonction pour afficher les éléments d'authentification
displayAuthElements();

// Fonction pour créer un objet FormData à partir du formulaire d'ajout de projet
function addProjectForm() {
    // Sélectionner les éléments du formulaire
    const title = document.querySelector('#title');
    const category = document.querySelector('#category');
    const file = document.querySelector('#file');

    // Créer un nouvel objet FormData
    const formData = new FormData();
    // Ajouter les valeurs des éléments du formulaire à l'objet FormData
    formData.append('title', title.value);
    formData.append('category', category.value);
    formData.append('image', file.files[0]);

    // Retourner l'objet FormData
    return formData;
}

// Fonction pour ajouter un nouveau projet en utilisant l'objet FormData et l'URL de l'API
async function addNewProject(dataForm) {
    // Récupérer le token stocké dans le localStorage
    const token = localStorage.getItem("token");
    // Définir l'URL de l'API
    const url = `${window.API_BASE}/api/works`;

    try {
        // Envoyer une requête POST à l'API avec l'objet FormData et le token d'authentification
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: dataForm
        });
        // Retourner la réponse de l'API en tant qu'objet JSON
        return await response.json();
    } catch (error) {
        // En cas d'erreur, afficher l'erreur dans la console et retourner null
        console.error(error);
        return null;
    }
}

// Fonction pour configurer l'écouteur d'événements pour la soumission du formulaire d'ajout de projet
function setupAddProjectForm() {
  const btnAddProject = document.querySelector('#btnAddProject');

  btnAddProject.addEventListener('click', async (e) => {
    e.preventDefault();
    const dataForm = addProjectForm();
    const res = await addNewProject(dataForm);

    if (res && !res.error) {
      // rafraîchis la modale
      document.querySelector(".modal_gallery").innerHTML = "";
      const r = await fetch(`${window.API_BASE}/api/works`);
      const all = await r.json();
      all.forEach(addProjectModal);

      // rafraîchis la galerie principale
      await refreshMainGallery();
    } else {
      console.error('Erreur ajout projet', res);
    }
  });
}

// Appeler la fonction pour configurer l'écouteur d'événements pour la soumission du formulaire d'ajout de projet
setupAddProjectForm();

// Fonction pour prévisualiser l'image téléchargée
function previewFile(e) {
    // Sélectionner le conteneur où la prévisualisation de l'image sera ajoutée
    const input = document.querySelector(".input");
    // Vérifier si un élément img existe déjà dans la classe "input"
    const existingPreview = input.querySelector('img');
    // Si un élément img existe déjà, remplacer sa source par la nouvelle image
    if (existingPreview) {
        existingPreview.src = URL.createObjectURL(e.target.files[0]);
    } else {
        // Créer un nouvel élément img
        const preview = document.createElement('img');
        // Ajouter l'élément img au conteneur
        input.appendChild(preview);
        // Définir la hauteur de l'élément img
        preview.style.height = '169px';
        // Désactiver la répétition de l'arrière-plan de l'élément img
        preview.style.backgroundRepeat = "no-repeat";
        // Attribuer la source de l'image à l'élément img
        preview.src = URL.createObjectURL(e.target.files[0]);
        // Ajouter une classe CSS pour mettre en évidence que l'image a été sélectionnée
        button_add_image.classList.add('selected');
    }
}

// Fonction pour masquer les éléments à l'intérieur de la classe "input"
function hideInputElements() {
    // Sélectionner tous les éléments à l'intérieur de la classe "input", sauf l'élément img
    const inputElements = document.querySelectorAll('.input > *:not(img)');
    // Parcourir chaque élément et définir la propriété display sur 'none' pour les masquer
    inputElements.forEach((element) => {
        element.style.display = 'none';
    });
}

// Fonction pour configurer les écouteurs d'événements pour l'entrée d'image et la prévisualisation
function setupImageInput() {
    // Sélectionner le bouton pour ajouter une image
    const button_add_image = document.querySelector('.button_add_image');
    // Sélectionner l'input de type file
    const input_file_image = document.querySelector('#file');

    // Ajouter un écouteur d'événements au bouton pour déclencher l'input de type file lorsqu'il est cliqué
    button_add_image.addEventListener('click', (e) => {
        e.preventDefault();
        // Masquer les éléments à l'intérieur de la classe "input"
        hideInputElements();
        // Déclencher l'input de type file
        input_file_image.click();
    });

    // Ajouter un écouteur d'événements à l'input de type file pour appeler la fonction de prévisualisation lorsque le fichier est sélectionné
    input_file_image.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            previewFile(e);
        }
    });
}

// Appeler la fonction pour configurer les écouteurs d'événements
setupImageInput();
