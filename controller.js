import { getUserInfo, saveUserInfo, loadUserInfo, getSavedUsersList } from "./model.js";
import { renderPage, buttons, showMessage, updateSavedUsersDropdown } from "./view.js";

let current = null;

const refreshDropdown = (active = "") => {
  updateSavedUsersDropdown(getSavedUsersList(), active);
};

buttons.generate.addEventListener("click", async () => {
  try {
    buttons.generate.disabled = true;
    const txt = buttons.generate.textContent;
    buttons.generate.textContent = "Generating...";

    current = await getUserInfo();
    if (current) {
      renderPage(current);
      showMessage("User profile generated successfully!");
    } else {
      showMessage("Failed to generate user profile.", "error");
    }
    buttons.generate.textContent = txt;
  } catch (error) {
    console.error(error);
    showMessage("Error generating user profile.", "error");
  } finally {
    buttons.generate.disabled = false;
  }
});

buttons.save.addEventListener("click", () => {
  if (!current) {
    return showMessage("No user profile to save. Generate a user first!", "error");
  }
  try {
    const name = saveUserInfo(current);
    if (name) {
      refreshDropdown(name);
      showMessage("User page saved successfully!");
    } else {
      showMessage("Failed to save user page.", "error");
    }
  } catch (error) {
    console.error(error);
    showMessage("Failed to save user page.", "error");
  }
});

buttons.load.addEventListener("click", () => {
  const name = buttons.userSelect.value;
  if (!name) {
    return showMessage("Please select a saved user first.", "error");
  }
  try {
    const profile = loadUserInfo(name);
    if (profile) {
      current = profile;
      renderPage(current);
      showMessage("User page loaded successfully!");
    } else {
      showMessage("Failed to load user page.", "error");
    }
  } catch (error) {
    console.error(error);
    showMessage("Failed to load user page.", "error");
  }
});

refreshDropdown();
