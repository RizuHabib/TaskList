const form = document.querySelector('form');
const filterForm = document.querySelector('#filter');
const task = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
let lis;

console.log(filterForm);
function addTask(e) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.setAttribute('href', '#');
    const itag = document.createElement('i');
    itag.className = 'fa fa-remove';
    link.appendChild(itag);
    li.appendChild(link);
    document.querySelector('.collection').appendChild(li);
    //console.log(link);
    e.preventDefault();
    //store into the local storage
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task.value);
    localStorage.setItem('tasks', JSON.stringify(tasks));





}
function removeAll() {
    //document.querySelector('.collection').innerHTML = ``;
    while (document.querySelector('.collection').firstChild) {
        document.querySelector('.collection').removeChild(document.querySelector('.collection').firstChild)
    }
}
function removeTask(e) {
    console.log(e.target);
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?'))
            e.target.parentElement.parentElement.remove();
    }
    //remove from localStorage
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        let i = 0;
        console.log("here", tasks[0]);
        for (i = 0; i < tasks.length; i++) {
            console.log(e.target.parentElement.parentElement.textContent);
            console.log(tasks[i]);
            if (tasks[i] === e.target.parentElement.parentElement.textContent) {
                tasks.splice(i, i);
                break;
            }
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
function filterTasks(e) {
    console.log(e.target.value);
    var count = document.querySelector('.collection').childElementCount;
    const list = Array.from(document.querySelectorAll('.collection-item'));
    for (var i = 0; i < list.length; i++) {
        if (list[i].textContent.indexOf(e.target.value) == -1) {
            list[i].style.display = 'none';
        }
        else {
            list[i].style.display = 'block';
        }
    }
}
function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    for (var i = 0; i < tasks.length; i++) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(tasks[i]));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.setAttribute('href', '#');
        const itag = document.createElement('i');
        itag.className = 'fa fa-remove';
        link.appendChild(itag);
        li.appendChild(link);
        document.querySelector('.collection').appendChild(li);
    }
}
function runEvent() {
    form.addEventListener('submit', addTask);
    clearBtn.addEventListener('click', removeAll);
    document.querySelector('ul.collection').addEventListener('click', removeTask);
    filterForm.addEventListener('keyup', filterTasks);
    document.addEventListener('DOMContentLoaded', loadTasks);
}
runEvent();