const addBtn = document.getElementById('add-btn');
const inputTask = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let tasks = [];
const API_URL = 'https://69f763a9dd0c226688edae63.mockapi.io/todo/v1/TodoMockAPI';

async function fetchTasks() {
    const response = await fetch(API_URL);
    tasks = await response.json();
    renderTasks();
}

function renderTasks() {
    todoList.innerHTML = '';

    tasks.forEach((task) => {
        const taskElement = createTaskElement(task);
        todoList.appendChild(taskElement);
    });
}

function createTaskElement(task) {
    const li = document.createElement('li');
    const completeBtn= document.createElement('button');
    const taskText = document.createElement('span');
    const DltButton = document.createElement('button');

    completeBtn.classList.add('complete-btn');
    
    taskText.textContent = task.title;

    if(task.completed){
        taskText.classList.add('completed');
        //completeBtn.classList.add('done'); 
         completeBtn.textContent = "✓";
    }
    
    DltButton.textContent = 'Delete';
    DltButton.classList.add('btn', 'btn-sm' ,'btn-outline-danger','float-end');

    li.appendChild(completeBtn);
    li.appendChild(taskText);
    li.appendChild(DltButton);

    li.classList.add('d-flex', 'align-items-center', 'gap-2','justify-content-between', 'list-group-item', 'mb-2','w-100');

    completeBtn.addEventListener('click', async() => {
        await fetch(`${API_URL}/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                completed: !task.completed,
            })
        });
        await fetchTasks();
        
    });

    DltButton.addEventListener('click', async (event) => {
    event.stopPropagation();
    await fetch(`${API_URL}/${task.id}`, {
        method: 'DELETE', 
    });
    await fetchTasks();
    })

    return li;
}
// Add Task
addBtn.addEventListener('click', async() => {
    const task = inputTask.value.trim();
    if(task === ''){
        alert('Please enter a task');
        return;
    }
    const newTask = {
        title: task,
        completed: false,
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(newTask),
    });
    await fetchTasks();

    inputTask.value = '';
}) 

inputTask.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addBtn.click();
    }
});

fetchTasks();