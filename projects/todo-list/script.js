const addBtn = document.getElementsByClassName('create-task-btn')[0];
const rmvBtn = document.querySelector('.delete-btn');
const rmvAllBtn = document.querySelector('.delete-all-btn');
const taskTxt = document.getElementById('texto-tarefa');
const taskList = document.querySelector('.task-list');
const saveBtn = document.querySelector('.save-btn');
const mvUp = document.querySelector('.up');
const rmvSelected = document.querySelector('.rmv-selected-btn');
const mvDown = document.querySelector('.down');
const error = document.querySelector('.error');

// criar tarefas novas

function createTask(text) {
  // if (!taskTxt.value) {
  //   error.innerHTML = 'Digite uma tarefa para adicionar à lista';
  //   return;
  // }
  error.innerHTML = '';
  const newTask = document.createElement('li');
  newTask.classList.add('task');
  newTask.innerHTML = text;
  taskList.appendChild(newTask);
  taskTxt.value = '';
  return newTask;
}

addBtn.addEventListener('click', () => {
  createTask(taskTxt.value);
});

const task = document.getElementsByTagName('li');

// trocar background de item clicado

taskList.addEventListener('click', (event) => {
  const evt = event.target;
  for (let index = 0; index < task.length; index += 1) {
    task[index].classList.remove('selected');
  }
  evt.classList.add('selected');
});

// riscar tarefas prontas

taskList.addEventListener('dblclick', (event) => {
  const evt = event.target;
  if (evt.classList.contains('completed')) {
    evt.classList.remove('completed');
  } else {
    evt.classList.add('completed');
  }
});

// apagar tudo

rmvAllBtn.addEventListener('click', () => {
  taskList.innerHTML = '';
});

// apagar tarefas finalizadas

rmvBtn.addEventListener('click', () => {
  const completedTasks = document.getElementsByClassName('completed');
  // if (!completedTasks.length) {
  //   error.innerHTML = 'Nenhuma';
  // }
  for (let index = completedTasks.length - 1; index >= 0; index -= 1) {
    taskList.removeChild(completedTasks[index]);
  }
});

// salvar lista

function save() {
  if (!Storage) {
    return;
  }
  const getList = [];
  if (!task.length) {
    localStorage.removeItem('savedList');
    return;
  }
  for (let index = 0; index < task.length; index += 1) {
    getList.push({
      innerText: task[index].innerText,
      completed: task[index].classList.contains('completed'),
    });
  }
  const savedList = JSON.stringify(getList);
  localStorage.setItem('taskList', savedList);
}

saveBtn.addEventListener('click', save);

function loadTasks() {
  if (!Storage || !localStorage.taskList) {
    return;
  }
  const savedTasks = JSON.parse(localStorage.taskList);
  for (let index = 0; index < savedTasks.length; index += 1) {
    const newTask = createTask(savedTasks[index].innerText);
    if (savedTasks[index].completed) {
      newTask.classList.add('completed');
    }
  }
}

loadTasks();

// mover itens cima

function getSelected() {
  const selected = document.querySelector('.selected');
  return selected;
}

mvUp.addEventListener('click', () => {
  const selected = getSelected();
  if (!selected) {
    console.log('falhou');
    return;
  }
  const above = selected.previousSibling;
  if (!above) {
    return;
  }
  const clone = above.cloneNode(true);
  above.innerHTML = selected.innerHTML;
  selected.innerHTML = clone.innerHTML;
  selected.classList.remove('selected');
  above.classList.add('selected');
});

// mover itens baixo

mvDown.addEventListener('click', () => {
  const selected = getSelected();
  if (!selected) {
    console.log('falhou');
    return;
  }
  const below = selected.nextSibling;
  if (!below) {
    return;
  }
  const clone = below.cloneNode(true);
  below.innerHTML = selected.innerHTML;
  selected.innerHTML = clone.innerHTML;
  selected.classList.remove('selected');
  below.classList.add('selected');
});

// remover selecionado

rmvSelected.addEventListener('click', () => {
  getSelected().remove();
});
