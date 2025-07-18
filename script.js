document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("task-form");
  const daySelect = document.getElementById("day");
  const taskInput = document.getElementById("task");
  const table = document.getElementById("tasks-table");
  const toggleModeButton = document.querySelector(".toggle-mode");

  function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || {};
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTaskToTable(day, taskText, completed = false, icon = "🧹") {
    const tasks = getTasks();

    if (!tasks[day]) tasks[day] = [];
    tasks[day].push({ text: taskText, completed, icon });
    saveTasks(tasks);
    renderTasks();
  }

  function renderTasks() {
    const tasks = getTasks();
    const days = Object.keys(tasks);
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < 7; i++) {
      const day = daySelect.options[i].value;
      const row = document.createElement("tr");
      const dayCell = document.createElement("td");
      dayCell.textContent = day.charAt(0).toUpperCase() + day.slice(1);
      row.appendChild(dayCell);

      const taskCell = document.createElement("td");
      if (tasks[day]) {
        tasks[day].forEach((task, index) => {
          const div = document.createElement("div");
          div.classList.add("task");
          if (task.completed) div.classList.add("done");

          const iconSpan = document.createElement("span");
          iconSpan.textContent = task.icon;
          div.appendChild(iconSpan);

          const span = document.createElement("span");
          span.textContent = " " + task.text;
          div.appendChild(span);

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = task.completed;
          checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            if (checkbox.checked) {
              new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_d1aa3982fa.mp3").play();
            }
            tasks[day][index] = task;
            saveTasks(tasks);
            renderTasks();
          });
          div.appendChild(checkbox);

          const delBtn = document.createElement("button");
          delBtn.textContent = "❌";
          delBtn.addEventListener("click", () => {
            tasks[day].splice(index, 1);
            saveTasks(tasks);
            renderTasks();
          });
          div.appendChild(delBtn);

          taskCell.appendChild(div);
        });
      }
      row.appendChild(taskCell);
      tbody.appendChild(row);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const day = daySelect.value;
    const task = taskInput.value.trim();
    if (task !== "") {
      let icon = "🧹"; // default
      if (/louça|prato/i.test(task)) icon = "🍽️";
      else if (/cozinhar|comida/i.test(task)) icon = "🍳";
      else if (/varrer|limpar/i.test(task)) icon = "🧹";
      else if (/lavar/i.test(task)) icon = "🧼";
      else if (/banheiro/i.test(task)) icon = "🚽";
      else if (/cama/i.test(task)) icon = "🛏️";

      addTaskToTable(day, task, false, icon);
      taskInput.value = "";
    }
  });

  toggleModeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    const icon = toggleModeButton.querySelector("i");
    icon.classList.toggle("fa-sun");
    icon.classList.toggle("fa-moon");
  });

  renderTasks();
});
