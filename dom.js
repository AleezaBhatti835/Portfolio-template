const inputField = document.getElementById("userInput");
const saveBtn = document.getElementById("saveBtn");
const inputList = document.getElementById("inputList");

// Load stored inputs from localStorage
function loadInputs() {
  inputList.innerHTML = ""; // clear list
  const inputs = JSON.parse(localStorage.getItem("userInputs")) || [];

  inputs.forEach((item, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = item;

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("buttons");

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editInput(index);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteInput(index);

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnContainer);
    inputList.appendChild(li);
  });
}

// Save new input
function saveInput() {
  const value = inputField.value.trim();
  if (value === "") {
    alert("Please enter something!");
    return;
  }

  const inputs = JSON.parse(localStorage.getItem("userInputs")) || [];
  inputs.push(value);
  localStorage.setItem("userInputs", JSON.stringify(inputs));

  inputField.value = "";
  loadInputs();
}

// Edit input
function editInput(index) {
  const inputs = JSON.parse(localStorage.getItem("userInputs")) || [];
  const newValue = prompt("Edit the value:", inputs[index]);
  if (newValue !== null && newValue.trim() !== "") {
    inputs[index] = newValue.trim();
    localStorage.setItem("userInputs", JSON.stringify(inputs));
    loadInputs();
  }
}

// Delete input
function deleteInput(index) {
  const inputs = JSON.parse(localStorage.getItem("userInputs")) || [];
  inputs.splice(index, 1);
  localStorage.setItem("userInputs", JSON.stringify(inputs));
  loadInputs();
}

saveBtn.addEventListener("click", saveInput);
window.onload = loadInputs;
