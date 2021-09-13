var todos = [];

var input = document.getElementById('todo-input');

var btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  newtodo ={
    text:input.value,
    done:false,
    id:todos.length 
 }
  todos.push(newtodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodo();
  document.getElementById('todo-input').value = ''; 
})

function drawTodo(todo) {
  var newTodoHTML =`
  <div class="col col-12 p-2 todo-item" todo-id="${todo.id}">
  <div class="input-group">
  <div class="input-group-prepend">
    <div class="input-group-text">
      <input type="checkbox" onchange="TodoChecked(${todo.id})"  ${todo.done&&"checked"} >
    </div>
  </div>
  <input type="text" readonly class="form-control ${todo.done&&"todo-done"} "value="${todo.text}">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary bg-danger text-white" type="button" onclick="deleteTodo(${todo.id})">X</button>
  </div>
  </div>
  </div>
  `;

    var dummy = document.createElement("DIV");
    dummy.innerHTML = newTodoHTML;
    document.getElementById("todo-container").appendChild(dummy.children[0]);
    
}

function showTodo() {
    var todos = JSON.parse(localStorage.getItem('todos'));
    var container = document.getElementById("todo-container");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    for (var i = 0; i < todos.length; i++) {
      drawTodo(todos[i]);
    }
}

showTodo();

function deleteTodo(id){
  todos.splice( id, 1 );
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo();
}

function TodoChecked(id){
  let result = window.localStorage.getItem("todos");
  todos = JSON.parse(result);
  if(todos[id].done == false){
      todos[id].done = true
  }else{
    todos[id].done = false;
  }

  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo();
}

showTodo();
