const form = document.getElementById("task-form");
const descInput = document.getElementById("task-desc");
const dayInput = document.getElementById("task-day");
const personInput = document.getElementById("task-person");
const printBtn = document.getElementById("print-btn");
const modeBtn = document.getElementById("toggle-mode");

let tarefas = JSON.parse(localStorage.getItem("tarefasCasa")) || [];

function salvar() {
  localStorage.setItem("tarefasCasa", JSON.stringify(tarefas));
}

function criarElemento(tarefa, index) {
  const div = document.createElement("div");
  div.className = "task";
  if (tarefa.feita) div.classList.add("done");
  div.dataset.person = tarefa.pessoa.toLowerCase();
  div.innerHTML = `
    <strong>${tarefa.descricao}</strong><br />
    👤 ${tarefa.pessoa}
    <div class="actions">
      <button onclick="toggleFeito(${index})">✅</button>
      <button onclick="excluirTarefa(${index})">❌</button>
    </div>
  `;
  return div;
}

function render() {
  document.querySelectorAll(".semana section").forEach(sec => sec.innerHTML = `<h2>${sec.id.charAt(0).toUpperCase() + sec.id.slice(1)}</h2>`);
  tarefas.forEach((tarefa, i) => {
    const elem = criarElemento(tarefa, i);
    document.getElementById(tarefa.dia).appendChild(elem);
  });
}

function toggleFeito(i) {
  tarefas[i].feita = !tarefas[i].feita;
  salvar();
  render();
}

function excluirTarefa(i) {
  tarefas.splice(i, 1);
  salvar();
  render();
}

form.onsubmit = e => {
  e.preventDefault();
  tarefas.push({
    descricao: descInput.value,
    dia: dayInput.value,
    pessoa: personInput.value,
    feita: false
  });
  salvar();
  render();
  form.reset();
};

printBtn.onclick = () => window.print();

modeBtn.onclick = () => {
  document.body.classList.toggle("dark");
};

render();

