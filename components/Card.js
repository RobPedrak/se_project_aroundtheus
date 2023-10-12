class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeIcon);
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDeleteCard);
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handlePreviewImage);
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handlePreviewImage() {
    openModal(galleryImagePreviewModal);
    previewCardImageEl.src = this._link;
    previewCardImageEl.alt = `${this._name}`;
    cardImageCaption.textContent = this._name;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();

    this._cardLikeButton = this._element.querySelector(".card__like-button");
    this._cardDeleteButton = this._element.querySelector(
      ".card__delete-button"
    );

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__image").textContent = this._name;

    this._setEventListeners();
  }
}

export default Card;

// 1h min 8
