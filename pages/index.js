import { v4 as uuidv4 } from "https://jspm.dev/uuid@8.3.2";

import { initialTodos } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";

import { validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

const todosList = document.querySelector(".todos__list");
const generateTodo = (data) => {
  const todoNew = new Todo(data, "#todo-template", handleCheck, handleDelete); // in sprint 8 we will create and pass the handleCheck and handleDelete functions here

  return todoNew.getView();
};

const handleCheck = () => {
  console.log("handleCheck has run");
};

const handleDelete = () => {
  console.log("handleDelete");
};

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();
  const values = { name, date, id };
  //renderTodo(values); <----

  closeModal(addTodoPopup);

  addTodoFormValidator.resetValidation();
});

initialTodos.forEach((item) => {
  const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  document.querySelector(".todos__list").append(todoElement);
});
