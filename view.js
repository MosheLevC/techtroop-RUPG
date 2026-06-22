const elements = {
  header: document.querySelector("header"),
  about: document.querySelector(".about"),
  friends: document.querySelector(".friends"),
  quote: document.querySelector(".quote"),
  pokemon: document.querySelector(".pokemon"),
  generateBtn: document.querySelector(".generate-button"),
  saveBtn: document.querySelector(".save-button"),
  loadBtn: document.querySelector(".load-button"),
  userSelect: document.querySelector(".user-select"),
};

export const renderUser = (info) => {
  if (!info) return;

  const img = elements.header.querySelector(".image-circle img");
  if (img) {
    img.src = info.userPictureUrl;
    img.alt = `${info.fNAme} ${info.lName}`;
  }

  elements.header.querySelector(".user-details")?.remove();

  const div = document.createElement("div");
  div.className = "user-details";
  div.innerHTML = `
    <h1 class="user-name">${info.fNAme} ${info.lName}</h1>
    <p class="user-location">${info.city}, ${info.state}</p>
  `;
  elements.header.appendChild(div);
};

export const renderAbout = (text) => {
  if (!text) return;

  elements.about.querySelectorAll(".about-text").forEach((p) => p.remove());

  const p = document.createElement("p");
  p.className = "about-text";
  p.textContent = text;
  elements.about.appendChild(p);
};

export const renderFriends = (friends) => {
  if (!friends) return;

  elements.friends.querySelector(".friends-list")?.remove();

  const ul = document.createElement("ul");
  ul.className = "friends-list";
  ul.innerHTML = friends.map((friend) => `<li>${friend.fName} ${friend.lName}</li>`).join("");
  elements.friends.appendChild(ul);
};

export const renderQuote = (quote) => {
  if (!quote) return;

  elements.quote.querySelector(".quote-container")?.remove();

  const div = document.createElement("div");
  div.className = "quote-container";
  div.innerHTML = `
    <blockquote class="quote-text">"${quote.quoteText}"</blockquote>
    <cite class="quote-author">— ${quote.quoteBy}</cite>
  `;
  elements.quote.appendChild(div);
};

export const renderPokemon = (pokemon) => {
  if (!pokemon) return;

  elements.pokemon.querySelector(".pokemon-container")?.remove();

  const div = document.createElement("div");
  div.className = "pokemon-container";
  div.innerHTML = `
    <img class="pokemon-image" src="${pokemon.picture}" alt="${pokemon.name}" />
    <p class="pokemon-name">${pokemon.name}</p>
  `;
  elements.pokemon.appendChild(div);
};

export const showMessage = (message, type = "success") => {
  document.querySelector(".app-message")?.remove();

  const popup = document.createElement("div");
  popup.className = `app-message ${type}`;
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("fade-out");
    popup.addEventListener("transitionend", () => popup.remove());
  }, 2500);
};

export const renderPage = (data) => {
  if (!data) return;
  renderUser(data.userInfo);
  renderAbout(data.userAbout);
  renderFriends(data.userFriends);
  renderQuote(data.favoriteQuote);
  renderPokemon(data.favoritePokemon);
};

export const updateSavedUsersDropdown = (names, active) => {
  const select = elements.userSelect;
  if (!select) return;

  const options = names.map((name) => `<option value="${name}" ${name === active ? "selected" : ""}>${name}</option>`);
  select.innerHTML = '<option value="" disabled selected>Select a saved user...</option>' + options.join("");

  if (!active || !names.includes(active)) {
    select.value = "";
  }
};

export const buttons = {
  generate: elements.generateBtn,
  save: elements.saveBtn,
  load: elements.loadBtn,
  userSelect: elements.userSelect,
};
