document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const toggleBtn = document.getElementById('toggle-mode');
  const pdfBtn = document.getElementById('btn-pdf');
  const plimSound = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg');

  const icons = {
    limpeza: '🧹',
    cozinha: '🍽️',
    roupa: '👕',
    outro: '📝'
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const desc = document.getElementById('task-desc').value.trim();
    const day = document.getElementById('task-day').value;
    const person = document.getElementById('task-person').value.trim();

    if (!desc || !person) return;

    let icon = icons.outro;
    if (desc.toLowerCase().includes('lavar') || desc.toLowerCase().includes('limpar')) {
      icon = icons.limpeza;
    } else if (desc.toLowerCase().includes('cozinha') || desc.toLowerCase().includes('prato')) {
      icon = icons.cozinha;
    } else if (desc.toLowerCase().includes('roupa')) {
      icon = icons.roupa;
    }

    const task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML = `
      <span class="icon">${icon}</span>
      <strong>${desc}</strong> - ${person}
      <button class="delete" title="Excluir tarefa">🗑️</button>
    `;

    task.addEventListener('click', () => {
      task.classList.toggle('done');
      plimSound.play();
    });

    task.querySelector('.delete').addEventListener('click', (e) => {
      e.stopPropagation();
      task.remove();
    });

    document.getElementById(day).appendChild(task);

    form.reset();
  });

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });

  pdfBtn.addEventListener('click', () => {
    const semana = document.getElementById('semana');
    const opt = {
      margin: 0.2,
      filename: 'tarefas.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(semana).save();
  });
});
