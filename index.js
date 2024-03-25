let form = document.getElementById("addTaskForm");
let taskList = document.getElementById("taskList");

let tasks = []

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
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
    el.innerHTML = `<div><h4>${task['taskName']}</h4><p>${task['taskDescription']}</p></div><button onclick="removeTask(${id})"><i class="fa-solid fa-trash"></i></button>`
    taskList.appendChild(el)
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
        el.innerHTML = `<div><h4>${task['taskName']}</h4><p>${task['taskDescription']}</p></div><button onclick="removeTask(${task.id})"><i class="fa-solid fa-trash"></i></button>`
        taskList.appendChild(el)
    }
}