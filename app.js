
// Selectors
let checkBoxs = document.querySelectorAll('.todo__check input[type="checkbox"]'),
      todoInput = document.querySelector('.todo__input'),
      todoList = document.querySelector('.todo__list'),
      todoButton = document.getElementById('todo__btn'),
      html= '',
      count;

// Event Listener
todoList.onclick = (e) => {
  var check = e.target.id.trim() ==='';
  if (!check){
    let todos;
    let saveCount;
    let todoContent = e.target.parentElement.parentElement.parentElement.innerText;
    let todoCheckbox = e.target.nextElementSibling;
    let todoItem = e.target.parentElement.parentElement.parentElement;
    let todoChecked = e.target.parentElement.parentElement.parentElement.querySelector('.todo__content');

    todoChecked.classList.toggle('checked');
    todoItem.classList.add('done');
    todoCheckbox.addEventListener('transitionend',()=>{
        todoItem.remove();
    });
    removeSaveLocalStorage(todoContent); 
  }
}

 todoButton.onclick = addInput;
 window.onkeyup = (e) => {
   if (e.keyCode === 13) {
     addInput();
   }
 }
document.addEventListener('DOMContentLoaded',()=>{
    getTodos();
    count = checkCount();
});

// Functions
function checkCount() {
    let saveCount;
    if (localStorage.getItem('todos') === null){
        todos = [];
        saveCount = 0;
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        saveCount = todos.length;
    }
    return saveCount;
}
function addInput() {
  if ((todoInput.value.trim() !='')){
  count++;
  html += `<li class="todo__item">
  <div class="checkbox__container">
    <label class="todo__check" for="todo__toggle${count}">
<input type="checkbox" id="todo__toggle${count}">
<div class="checkbox"></div>
</label></div>
    <p class="todo__content">${todoInput.value}</p>
</li>`;
  todoList.innerHTML = html;
  saveLocalTodos(todoInput.value);
  todoInput.value = '';
 
  } else alert('You need enter a value'); 
}

function saveLocalTodos(todo){
    //Check -- Do i already have things in there?
    
    let todos;
    let saveCount
    if (localStorage.getItem('todos') === null){
        todos = [];
        saveCount = 0;
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos (){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo, index) => {
        html += `<li class="todo__item">
  <div class="checkbox__container">
    <label class="todo__check" for="todo__toggle${index+1}">
<input type="checkbox" id="todo__toggle${index+1}">
<div class="checkbox"></div>
</label></div>
    <p class="todo__content">${todo}</p>
</li>`;
    });
    todoList.innerHTML = html;
}

function removeSaveLocalStorage (todoIndex) {
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
        saveCount = 0;
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        saveCount = todos.length;
    }

    todos.splice(todos.indexOf(todo),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}