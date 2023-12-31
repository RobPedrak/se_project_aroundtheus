import Card from "/components/Card.js";
import { config } from "../components/FormValidator.js";
import FormValidator from "../components/FormValidator.js";

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

const cardData = {
  name: "",
  link: "",
};

// const cardSelector = "#card-template";
const card = new Card(cardData, "#card-template");
card.getView();

const profileEditButton = document.querySelector("#js-profile-edit-button");
const profileEditModal = document.querySelector("#js-profile-edit-modal");
const profileName = document.querySelector("#js-profile-name");
const profileDescription = document.querySelector("#js-profile-description");
const profileNameInput = document.querySelector("#js-profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#js-profile-description-input"
);

const galleryAddCardButton = document.querySelector(
  "#js-gallery-add-card-button"
);
const galleryAddModal = document.querySelector("#js-gallery-add-modal");
const galleryImagePreviewModal = document.querySelector(
  "#js-gallery-img-preview-modal"
);
const previewCardImageEl = document.querySelector(".modal__container-imageEl");

const profileEditForm = document.forms["profile-edit-form"];
const galleryCardsEl = document.querySelector(".gallery__cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardImageCaption = document.querySelector(
  ".modal__container-imageCaption"
);

const galleryAddForm = document.forms["gallery-add-form"];
const galleryTitleInput = document.querySelector("#js-gallery-title-input");
const galleryImageInput = document.querySelector("#js-gallery-image-input");

const modalOverlays = document.querySelectorAll(".modal");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closeModal(openedPopup);
  }
}

modalOverlays.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLocaleEl = cardElement.querySelector(".card__locale");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardLocaleEl.textContent = cardData.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(galleryImagePreviewModal);
    previewCardImageEl.src = cardData.link;
    previewCardImageEl.alt = `${cardData.name}`;
    cardImageCaption.textContent = cardData.name;
  });

  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.innerText;
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.innerText = profileDescriptionInput.value;

  closeModal(profileEditModal);
});

galleryAddCardButton.addEventListener("click", () =>
  openModal(galleryAddModal)
);

galleryAddForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCardTitle = galleryTitleInput.value;
  const newCardImage = galleryImageInput.value;

  const newCardData = {
    name: newCardTitle,
    link: newCardImage,
  };

  const newCardElement = getCardElement(newCardData);

  galleryAddForm.reset();

  galleryCardsEl.prepend(newCardElement);

  closeModal(galleryAddModal);
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  galleryCardsEl.prepend(cardElement);
});

const formValidator = new FormValidator(
  config,
  profileEditForm,
  galleryAddForm
);

formValidator.enableValidation();
