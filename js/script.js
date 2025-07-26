console.log("Script loaded successfully");

let tasks=[];
let filterType = "all";

function addTask(){
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("todo-date");
    
    if(taskInput.value === "" || dateInput.value === ""){
        alert("Masukkan Task & Tanggalnya!");
    }else{
        tasks.push({
            title: taskInput.value,
            date: dateInput.value,
            completed: false
        });
        console.log("Task added:", taskInput.value, "Date:", dateInput.value);
        console.log("Current tasks:", tasks);

        renderTasks();
        // Clear input fields after adding the task
        taskInput.value="";
        dateInput.value="";

        
    }

    
    
    
}

function deleteTask(index){
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus task ini?");
    if(confirmDelete){
        tasks.splice(index, 1);
        console.log("Task deleted at index:", index);
        renderTasks();
    }
}

function deleteAllTasks(){
    const confirmDeleteAll = confirm("Apakah Anda yakin ingin menghapus semua task?");
    if(confirmDeleteAll){
        tasks = [];
        console.log("All tasks deleted");
        renderTasks();
    }

}

function toggleFilterMenu(){
    const menu = document.getElementById("filter-menu");
    menu.classList.toggle("hidden");

    document.addEventListener("click", function handler(e){
        if(!menu.contains(e.target) && e.target.id !== "filter-btn"){
            menu.classList.add("hidden");
            document.removeEventListener("click", handler);
        }
    });
}

function filterTasks(type){
    filterType = type;
    renderTasks();
    document.getElementById("filter-menu").classList.add("hidden");
}

function completeTask(index){
    tasks[index].completed = true;
    console.log("Task completed:", tasks[index].title);
    renderTasks();
}

function pendingTask(index){
    tasks[index].completed = false;
    console.log("Task marked as pending:", tasks[index].title);
    renderTasks();
}

function renderTasks(){
    const taskList = document.getElementById("todo-list");
    taskList.innerHTML = "";

    let filteredTasks = tasks;
    if(filterType === "pending"){
        filteredTasks = tasks.filter(task => !task.completed);
    }else if(filterType === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const realIndex = tasks.indexOf(task);
        console.log(`Rendering task at index ${realIndex}:`, task);
        const opacityClass = task.completed ? "opacity-50" : "";
        const titleClass = task.completed ? "line-through" : "";
        taskList.innerHTML += `
        <li class="todo-item flex justify-between items-center p-4 border-b-1 ${opacityClass}">
                    <span class="${titleClass} mr-4">${task.title} - ${task.date} - ${task.completed ? "Completed" : "Pending"}</span>
                    <div class="flex gap-2">
                        ${!task.completed ? `<button type="button" class="px-[10px] py-[2px] bg-green-500 hover:bg-green-600 text-white rounded-[4px] text-center" onclick="completeTask(${realIndex})">Complete</button>` : `<button type="button" class="px-[10px] py-[2px] bg-yellow-500 hover:bg-yellow-600 text-white rounded-[4px] text-center" onclick="pendingTask(${realIndex})">Pending</button>`
    }
                        <button type="button" class="px-[10px] py-[2px] bg-red-500 hover:bg-red-600 text-white rounded-[4px] text-center" onclick="deleteTask(${realIndex})">Delete</button>
                    </div>
                </li>
        `;
    });

    if(filteredTasks.length === 0){
        if(filterType === "pending"){
            taskList.innerHTML = "<p>No PENDING tasks available</p>";
        }else if(filterType === "completed"){
            taskList.innerHTML = "<p>No COMPLETED tasks available</p>";
        }else{
            taskList.innerHTML = "<p>No tasks available</p>";
        }
    }

    if(tasks.length === 0){
        taskList.innerHTML = "<p>No tasks available</p>";
    }
}