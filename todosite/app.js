// Selectors
let checkBoxs = document.querySelectorAll('.todo__check input[type="checkbox"]'),
      todoInput = document.querySelector('.todo__input'),
      todoList = document.querySelector('.todo__list'),
      todoButton = document.getElementById('todo__btn'),
      html= '',
      count,
      todoTrash = document.querySelector('.todo__trash');

      
// Event Listener

todoButton.onclick = addInput;

// Excute when users click checked button
todoList.onclick = (e) => {
  var check = e.target.id.trim() ==='';
  let contentOfTodo = e.target.parentElement.parentElement.parentElement.innerText,
      elementCheckbox = e.target.nextElementSibling,
      elementTodo = e.target.parentElement.parentElement.parentElement,
      elementTodoContent = e.target.parentElement.parentElement.parentElement.querySelector('.todo__content');
  if (!check){

    elementTodoContent.classList.toggle('checked');
    elementTodo.classList.add('done');
    elementCheckbox.addEventListener('transitionend',()=>{
        elementTodo.remove();
    });
    removeSaveLocalStorage(contentOfTodo); 
  }
 if (e.target.className === 'todo__trash'){
     e.target.parentElement.classList.add('delete');
        e.target.parentElement.remove();
     removeSaveLocalStorage(e.target.parentElement.querySelector('.todo__content').innerText);
    
 }
}

//  Excute when press Enter
 window.onkeyup = (e) => {
   if (e.keyCode === 13) {
     addInput();
   }
 }

//  Excute onload
document.addEventListener('DOMContentLoaded',()=>{
    renderTodos();
    count = checkCount();
});

// Excute loadingPage Function first of all;
loadingPage();

// Delete todo;


// Functions

function renderTodos () {
    let todos;
    let html = '';
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
          <a class="todo__trash"><i class="fa fa-trash"></i></a>
      </li>`;
    }); 
    todoList.innerHTML = html;
}

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
  saveLocalTodos(todoInput.value);
  renderTodos ();
  todoInput.value = '';
 
  } else alert('You need enter a value'); 
}

function saveLocalTodos(todo){
    //Check -- Do i already have things in there?
    
    let todos;
    let saveCount;
    if (localStorage.getItem('todos') === null){
        todos = [];
        saveCount = 0;
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function removeSaveLocalStorage (todo) {
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

function loadingPage (){
    setTimeout(() => {
            const loading = document.querySelector('.loading-page');
            loading.style.opacity = "0";
            loading.addEventListener ('transitionend', () => {
                loading.style.display = "none";
                loading.remove();
            })
            
                }
            ,3000)
}
