'use strict';


const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed'),
headerButton = document.querySelector('.header-button');

let todoData = [];

window.onunload = function() {
    localStorage.setItem('items', JSON.stringify(todoData));
};


if (localStorage.getItem('items')) {
    todoData = JSON.parse(localStorage.getItem('items'))
}else{
    todoData = [];
};


const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + '<div class="todo-buttons">' + '<button class="todo-remove"></button>' + '<button class="todo-complete"></button>' + '</div>';

        if(item.completed){
            todoCompleted.append(li);
        } else{
            todoList.append(li);
        };

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(i){
                todoData.splice(i, 1);                
                render();      
        });

        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            render();

        });
    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    if(headerInput.value !== ''){       
        todoData.push(newTodo);
        headerInput.value = '';
    };
    render(); 
});

render();
