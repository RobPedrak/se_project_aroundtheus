const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#js-profile-edit-button");
const profileEditModal = document.querySelector("#js-profile-edit-modal");
const profileCloseModalButton = document.querySelector(
  "#js-profile-close-modal-button"
);
const profileName = document.querySelector("#js-profile-name");
const profileDescription = document.querySelector("#js-profile-description");
const profileNameInput = document.querySelector("#js-profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#js-profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const galleryCardsEl = document.querySelector(".gallery__cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLocaleEl = cardElement.querySelector(".card__locale");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardLocaleEl.textContent = cardData.name;
  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  closePopup();
}

function handleProfileEditButtonClick() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.innerText;
  profileEditModal.classList.add("modal_opened");
}

profileEditButton.addEventListener("click", handleProfileEditButtonClick);

profileCloseModalButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  galleryCardsEl.prepend(cardElement);
});
