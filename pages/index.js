//import { V4 as uuidv4 } from "https://jspm.dev/uuid";
import "../utils/constants.js";
import "../components/FormValidator.js";
import "../components/Todo.js";
import { validationConfig } from "../utils/constants.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");

  const closeModal = (modal) => {
    modal.classList.remove("popup_visible");
  };

  const todoNameEl = todoElement.querySelector(".todo__name");
  const todoCheckboxEl = todoElement.querySelector(".todo__completed");
  const todoLabel = todoElement.querySelector(".todo__label");
  const todoDate = todoElement.querySelector(".todo__date");
  const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");
  todoNameEl.textContent = data.name;
  todoCheckboxEl.checked = data.completed;
  todoTemplate.id = `todo-${data.checkboxElid}`;
  todoCheckboxEl.id = `todo-${data.checkboxElid}`;
  todoLabel.setAttribute("for", `todo-${data.labelid}`);

  const dueDate = new Date(data.date);
  if (!isNaN(dueDate)) {
    todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }

  todoDeleteBtn.addEventListener("click", () => {
    todoElement.remove();
  });

  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

const FormValidator = new FormValidator(validationConfig, addTodoForm);
FormValidator.enableValidation();

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const dateNameId = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4(V4);
  const values = { name, date, id };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);

  resetValidation(addTodoForm);
  addTodoForm.reset();
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

//export default {V4}?

