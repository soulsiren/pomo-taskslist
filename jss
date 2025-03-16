let timer;
let isTimerRunning = false;
let timeLeft = 25 * 60; // 25 minutes
let taskCategories = ['Work', 'Stream', 'Study', 'Personal'];
let tasks = {
  Work: [],
  Stream: [],
  Study: [],
  Personal: []
};

// Add tasks to simulate loading
let taskCounter = 0;  // Keep track of added tasks
const maxTaskCount = 50;  // Max number of tasks to show before stopping the scroll

const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCategorySelect = document.getElementById('taskCategory');

// Update Timer Display
function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Start/Stop Timer
function toggleTimer() {
  if (isTimerRunning) {
    clearInterval(timer);
    isTimerRunning = false;
    startBtn.textContent = "Start";
  } else {
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert('Pomodoro Finished! Take a break.');
        isTimerRunning = false;
        startBtn.textContent = "Start";
        timeLeft = 25 * 60;
        updateTimerDisplay();
      }
    }, 1000);
    isTimerRunning = true;
    startBtn.textContent = "Stop";
  }
}

// Reset Timer
function resetTimer() {
  clearInterval(timer);
  timeLeft = 25 * 60;
  updateTimerDisplay();
  isTimerRunning = false;
  startBtn.textContent = "Start";
}

// Add Task to Selected Category
function addTask() {
  const task = taskInput.value.trim();
  const category = taskCategorySelect.value;
  if (task) {
    tasks[category].push(task);
    updateTaskList();
    taskInput.value = "";
    scrollToBottom();  // Scroll to the bottom when a new task is added
  }
}

// Simulate adding more tasks to a category
function loadMoreTasks() {
  const selectedCategory = taskCategorySelect.value;
  if (taskCounter < maxTaskCount) {
    // Add 5 more tasks to the selected category
    for (let i = 0; i < 5; i++) {
      taskCounter++;
      tasks[selectedCategory].push(`${selectedCategory} Task #${taskCounter}`);
    }
    updateTaskList();
    scrollToBottom();  // Ensure the list scrolls to the bottom after tasks are added
  }
}

// Scroll the task list to the bottom
function scrollToBottom() {
  taskList.scrollTop = taskList.scrollHeight;
}

// Update Task List UI for Current Category
function updateTaskList() {
  const selectedCategory = taskCategorySelect.value;
  taskList.innerHTML = '';  // Clear the current task list
  const currentTasks = tasks[selectedCategory];

  // Add tasks to the task list
  currentTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${task} <button class="removeBtn" data-index="${index}">Remove</button>`;
    taskList.appendChild(listItem);
  });
}

// Remove Task
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('removeBtn')) {
    const category = taskCategorySelect.value;
    const taskIndex = event.target.getAttribute('data-index');
    tasks[category].splice(taskIndex, 1);
    updateTaskList();
    scrollToBottom();  // Ensure we scroll to the bottom when a task is removed
  }
});

// Event Listeners
startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
addTaskBtn.addEventListener('click', addTask);

// Initial display update
updateTimerDisplay();
loadMoreTasks(); // Load initial set of tasks
