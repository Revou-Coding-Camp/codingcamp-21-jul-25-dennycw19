console.log("Script loaded successfully");

let tasks=[];

function addTask(){
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("todo-date");
    
    if(taskInput.value === "" || dateInput.value === ""){
        alert("Masukkan Task & Tanggalnya!");
    }else{
        tasks.push({
            title: taskInput.value,
            date: dateInput.value
        });
        console.log("Task added:", taskInput.value, "Date:", dateInput.value);
        console.log("Current tasks:", tasks);

        renderTasks();
        // Clear input fields after adding the task
        taskInput.value="";
        dateInput.value="";

        
    }

    
    
    
}

function deleteTask(){

}

function deleteAllTasks(){
    tasks = [];
    console.log("All tasks deleted");
    renderTasks();
    // Optionally, you can also clear the input fields

}

function filterTasks(){}

function renderTasks(){
    const taskList = document.getElementById("todo-list");
    taskList.innerHTML = "";

    
    tasks.forEach((task, index) => {
        taskList.innerHTML += `
        <li class="todo-item flex justify-between items-center p-4 border-b-1">
                    <span>${task.title} - ${task.date}</span>
                    <div>
                        <button class="px-[10px] py-[2px] bg-green-500 hover:bg-green-600 text-white rounded-[4px] text-center">Edit</button>
                        <button class="px-[10px] py-[2px] bg-red-500 hover:bg-red-600 text-white rounded-[4px] text-center">Delete</button>
                    </div>
                </li>
        `;
    });

    if(tasks.length === 0){
        taskList.innerHTML = "<p>No tasks available</p>";
    }
}