const addBtn = document.getElementById('add-btn');
const inputTask = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function createTaskElement(task) {
    const li = document.createElement('li');
    const completeBtn= document.createElement('button');
    const taskText = document.createElement('span');
    const DltButton = document.createElement('button');

    taskText.textContent = task;
    DltButton.textContent = 'Delete';
    DltButton.classList.add('btn', 'btn-sm' ,'btn-outline-danger','float-end');

    completeBtn.textContent = "";
    completeBtn.classList.add('complete-btn');
    
    

    li.appendChild(completeBtn);
    li.appendChild(taskText);
    li.appendChild(DltButton);

    li.classList.add('d-flex', 'align-items-center', 'gap-2','justify-content-between', 'list-group-item', 'mb-2','w-100');

    completeBtn.addEventListener('click', () => {
        taskText.classList.toggle('completed');
        completeBtn.classList.toggle('done');
    });

    DltButton.addEventListener('click', (event) => {
    event.stopPropagation();
    li.remove();
    })

    return li;
}

addBtn.addEventListener('click', () => {
    const task = inputTask.value.trim();
    if(task === ''){
        alert('Please enter a task');
        return;
    }
    

    const taskElement = createTaskElement(task);
    todoList.appendChild(taskElement);

    inputTask.value = '';


    
}) 
inputTask.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addBtn.click();
    }
});
