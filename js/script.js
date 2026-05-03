const addBtn = document.getElementById('add-btn');
const inputTask = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() { 
    localStorage.setItem('tasks',JSON.stringify(tasks));    
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

    completeBtn.addEventListener('click', () => {
        const targetTask = tasks.find((item)=>item.id ===task.id);

        targetTask.completed = !targetTask.completed;
        saveTasks();
        renderTasks(); 
    });

    DltButton.addEventListener('click', (event) => {
    event.stopPropagation();
    tasks = tasks.filter((item) => item.id !== task.id);
    saveTasks();
    renderTasks();
    })

    return li;
}
// Add Task
addBtn.addEventListener('click', () => {
    const task = inputTask.value.trim();
    if(task === ''){
        alert('Please enter a task');
        return;
    }
    const newTask={
        id: Date.now(),
        title: task,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();

    inputTask.value = '';
}) 

inputTask.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addBtn.click();
    }
});

renderTasks();