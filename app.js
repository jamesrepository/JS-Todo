// Define UI
const form = document.querySelector('#taskForm');
const clearTaskBtn = document.querySelector('#clearTask');

// Input
const taskInput = document.querySelector('#newTask');
const filterInput = document.querySelector('#filterTask');

const taskLists = document.querySelector('#taskLists');

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasksList);
    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task
    taskLists.addEventListener('click', removeTask);

    // Clear all task
    clearTaskBtn.addEventListener('click', clearTask);

    // Filter task
    filterInput.addEventListener('keyup', filterTask);
}

// Add task
function addTask(e) {
    // Create li
    createLi(taskInput.value);

    // Store in LocalStorage
    storeTaskLocalStorage(taskInput.value);

    // Clear taskInput
    taskInput.value = '';

    e.preventDefault();
}

// Create li
function createLi(text) {
    if(text === '') {
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    
    // Add class to li
    li.className = 'list-group-item';

    // Create text node andd append to li
    li.appendChild(document.createTextNode(text));
    
    // Create new link element
    const link = document.createElement('a');

    // Add class link
    link.className = 'delete-task';

    // Add icon html
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    
    // Append the link to li
    li.appendChild(link);
    
    // Append to ul
    taskLists.appendChild(li);

}

// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-task')) {
        e.target.parentElement.parentElement.remove();
        
        // Remove task from localstorage
        removeTaskFromLS(e.target.parentElement.parentElement);
    }

    e.preventDefault();
}

// Clear task
function clearTask() {
    taskLists.innerHTML = '';
    localStorage.clear();
}

// Filter task
function filterTask(e) {
    const text = e.target.value.toLowerCase();

    // Loop all tasklist li
    document.querySelectorAll('.list-group-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Get task from local storage
function getTasksList() {
    checkLocalStorage().forEach((task) => {
        createLi(task);
    });
}

// Check local storage
function checkLocalStorage() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
}

// Store in localstorage
function storeTaskLocalStorage(task) {
    const tasks = checkLocalStorage();

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task in local storage
function removeTaskFromLS(taskItem) {
    const tasks = checkLocalStorage();
    
    checkLocalStorage().forEach((task, index) => {
        if(taskItem.textContent == task) {
            tasks.splice(index, 1);
        }
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
}
