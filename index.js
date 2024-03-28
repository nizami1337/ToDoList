let form = document.getElementById("addTaskForm");
let taskList = document.getElementById("taskList");
let buttons = document.getElementsByClassName("buttons")[0];
let editMode = false;
let currentlyEditing;

let tasks = []

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    if (editMode == false) {
        let task = {};
        let id = tasks.length == 0 ? 0 : tasks[tasks.length-1].id+1
        task.id = id
        for(let [key,val] of data.entries()) {
            if (key == "taskName" && val == "") val = "Untitled Task"
            task[key] = val
        }
        tasks.push(task)
        let el = document.createElement('li')
        el.className = 'task'
        el.innerHTML = `<div><h4>${task['taskName']}</h4><p>${task['taskDescription']}</p></div><span><button onclick="editTask(${id})"><i class="fa-solid fa-pen-to-square"></i></button><button onclick="removeTask(${id})"><i class="fa-solid fa-trash"></i></button></span>`
        taskList.appendChild(el)
    } else {
        for(let [key,val] of data.entries()) {
            if (key == "taskName" && val == "") val = "Untitled Task"
            tasks[currentlyEditing][key] = val
        }
        cancel()
        refresh()
    }
})

function removeTask(id) {
    tasks = tasks.filter(task => task.id != id)
    refresh()
}

function refresh() {
    taskList.innerHTML = ''
    for (let task of tasks) {
        let el = document.createElement('li')
        el.className = 'task'
        el.innerHTML = `<div><h4>${task['taskName']}</h4><p>${task['taskDescription']}</p></div><span><button onclick="editTask(${task.id})"><i class="fa-solid fa-pen-to-square"></i></button><button onclick="removeTask(${task.id})"><i class="fa-solid fa-trash"></i></button></span>`
        taskList.appendChild(el)
    }
}

function editTask(id) {
    editMode = true;
    currentlyEditing = id
    document.getElementById('taskNameInput').value = tasks[currentlyEditing]['taskName']
    document.getElementById('taskDescInput').value = tasks[currentlyEditing]['taskDescription']
    buttons.innerHTML = `<button>Save</button><button type="button" onclick="cancel()">Cancel</button>`
}

function cancel() {
    buttons.innerHTML = '<button>Add</button>'
    document.getElementById('taskNameInput').value = ''
    document.getElementById('taskDescInput').value = ''
    editMode = false;
    currentlyEditing = null;
}