
const form = document.querySelector("#toDoForm");
const list = document.querySelector("#toDoList");
const removeAllBtn = document.querySelector("#removeAllBtn");

// when task is removed with remove button - task is not removed from local storage
// when task is marked completed - task completion is not stored in local storage

// Retrieve saved list from local storage and add to list
let savedList = JSON.parse(localStorage.getItem("tasks")) || [];
for (let i = 0; i < savedList.length; i++) {
  let savedTask = document.createElement("li");
  savedTask.innerText = savedList[i].task;
  savedTask.isCompleted = savedList[i].isCompleted ? true : false;
    if (savedTask.isCompleted) {
      savedTask.innerText.style.textDecoration = "line-through";
    }
  let removeBtn = document.createElement('button');
  removeBtn.innerText = "X";

  savedTask.appendChild(removeBtn);
  list.appendChild(savedTask);
}

  //Output today's date
  let date = document.getElementById("date");
  options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  }
  let today = new Date();
  date.innerHTML = today.toLocaleDateString("en-US", options);


// Add event listener to form
form.addEventListener("submit", function(e){
  e.preventDefault();
  // Create new to do from input on submit
  let inputTask = document.querySelector("#task").value;
  // If input field isn't empty add task to list with remove button
  if(inputTask !== "") {
      let newTask = document.createElement('li');
      newTask.innerText = inputTask;
      newTask.isCompleted = false;
      form.reset(); 
      // Save Todo list to local storage
      savedList.push({
        task: newTask.innerText,
        isCompleted: false,
      });
      localStorage.setItem("tasks", JSON.stringify(savedList));

      let removeBtn = document.createElement('button');
      removeBtn.innerText = "X";
       
      newTask.appendChild(removeBtn);
      list.appendChild(newTask);
  }    
});

// Add event listener to list
list.addEventListener('click', function(e){
// If task is clicked add line-through
if (e.target.tagName === "LI") {
let clickedTask = e.target;
  if(!clickedTask.isCompleted) {
   clickedTask.classList.add("strikethrough");
   clickedTask.isCompleted = true;
  //  localStorage.setItem("isCompleted", true)
   console.log(localStorage.setItem("isCompleted", true))
  }
} 

// If remove button is clicked
if (e.target.tagName === "BUTTON") {
  for (let i = 0; i < savedList.length; i++) {
    let task = savedList[i]
    if (task.task === e.target.parentElement.innerText.substr(0,task.task.length)) {
      savedList.splice(i, 1)
      localStorage.setItem('tasks',JSON.stringify(savedList));
      break;
    }
  }
  e.target.parentElement.remove();
}
});


// Add event listener to REMOVE ALL button
removeAllBtn.addEventListener('click', function(e){
  localStorage.removeItem('tasks'); 
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
})


