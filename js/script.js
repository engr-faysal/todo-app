const addBtn = document.getElementById('add-btn');
const inputTask = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    const task = inputTask.value.trim();
    if(task === ''){
        alert('Please enter a task');
        return;
    }
    const li = document.createElement('li');
    li.classList.add('d-flex', 'align-items-center', 'gap-2', 'list-group-item', 'mb-2');

    const completeBtn= document.createElement('button');
    completeBtn.textContent = "";
    completeBtn.classList.add('complete-btn');

    const taskText = document.createElement('span');
    taskText.textContent = task;

    const DltButton = document.createElement('button');
    DltButton.classList.add('btn', 'btn-sm' ,'btn-outline-danger');
    DltButton.textContent = 'Delete';

    li.appendChild(completeBtn);
    li.appendChild(taskText);
    li.appendChild(DltButton);
    todoList.appendChild(li);

    inputTask.value = '';

    completeBtn.addEventListener('click', () => {
        taskText.classList.toggle('completed');
        completeBtn.classList.toggle('done');
    });


    DltButton.addEventListener('click', (event) => {
    event.stopPropagation();
    todoList.removeChild(li);
    })
    
}) 
inputTask.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addBtn.click();
    }
});
