import translate from './translate.js';
import { settings } from './settings.js';

export const todoOptions = {
  windowActive: false,
  items: []
};

const showTodoWindow = () => {
  const todoWindow = document.querySelector('.todo-window');
  todoWindow.classList.add('todo-window-active');
}

const toggleTodoWindow = () => {
  const todoWindow = document.querySelector('.todo-window');
  todoWindow.classList.toggle('todo-window-active');

  todoOptions.windowActive = !todoOptions.windowActive;
}

const toggleTodoItem = (event) => {
  const label = event.target.parentNode.children[1];
  label.classList.toggle('todo-item-text-checked');

  const item = event.target.parentNode.parentNode;
  const todoList = document.querySelector('.todo-list');
  todoOptions.items[Array.from(todoList.children).indexOf(item) - 1].checked = event.target.checked;
}

const addTodoItem = (text, isChecked = false) => {
  if (text.length === 0) {
    return;
  }

  const todoList = document.querySelector('.todo-list');

  const newTodoItem = document.querySelector('.todo-item-template').cloneNode(true);
  newTodoItem.classList.replace('todo-item-template', 'todo-item');

  const checkbox = newTodoItem.firstElementChild.children[0];
  checkbox.id += `-${todoList.children.length}`;
  checkbox.addEventListener('click', toggleTodoItem);

  const label = newTodoItem.firstElementChild.children[1];
  label.htmlFor = checkbox.id;
  label.textContent = text;

  if (isChecked) {
    checkbox.checked = true;
    label.classList.toggle('todo-item-text-checked');
  }

  const trash = newTodoItem.lastElementChild;
  trash.addEventListener('click', () => removeTodoItem(newTodoItem));

  todoList.append(newTodoItem);
}

const removeTodoItem = (item) => {
  const todoList = document.querySelector('.todo-list');
  todoOptions.items.splice(Array.from(todoList.children).indexOf(item) - 1, 1);
  todoList.removeChild(item);
}

const loadTodoItemsFromOptions = () => {
  todoOptions.items.forEach((item, index) => addTodoItem(item.text, item.checked));
}

export const setTodoWindow = () => {
  if (todoOptions.windowActive && settings.blocks.includes('todo')) {
    showTodoWindow();
  }

  const todoButton = document.querySelector('.todo');
  todoButton.addEventListener('click', toggleTodoWindow);

  const todoCloseButton = document.querySelector('.todo-window-close-button');
  todoCloseButton.addEventListener('click', toggleTodoWindow);

  const todoTitle = document.querySelector('.todo-title');
  todoTitle.textContent = translate[settings.language].todo.title;

  const todoInput = document.querySelector('.todo-input');
  todoInput.placeholder = translate[settings.language].todo.placeholder;

  const todoAddItem = document.querySelector('.todo-create-new');
  todoAddItem.addEventListener('click',
    () => {
      addTodoItem(todoInput.value);
      todoOptions.items.push({ checked: false, text: todoInput.value })
      todoInput.value = '';
    }
  );

  todoInput.addEventListener('keypress', (event) => { if (event.key === 'Enter') todoAddItem.click(); });

  loadTodoItemsFromOptions();
}
