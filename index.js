//! selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter-todo');

//? alerts

const alertWarning = document.querySelector('.alert-warning');
const alertSuccess = document.querySelector('.alert-success');

//* events

// todoButton'a click yapıldığı an addTodo methodunu çalıştır.
todoButton.addEventListener('click', addTodo);

// Functions

function addTodo(e) {
  // event ile sayfanın yenilenmesi kaldırıldı.
  e.preventDefault();

  // yeni bir div oluşturuyoruz bu todo'lar olacak.
  const todoDiv = document.createElement('div');

  // html ile oluşturduğumuz {todo} divini bizim oluşturdumuz {todoDiv} adlı elemente class olarak ekliyoruz.
  todoDiv.classList.add('todo');

  // burada <> hangi türden bir element istediğini yazmalısın
  const completedButton = document.createElement('button');

  /* OLAN ŞEY ŞU: HTML'deki butonları burada oluşturuyoruz.
  <button class="complete-btn">
  <i class="fa fa-check-circle"> </i>
  </button>
  innerHTML htmlnin içine yazılan yerdir.
  */
  completedButton.innerHTML = "<i class='fa fa-check-circle'></i>";
  completedButton.classList.add('complete-btn');

  //? {trashbutton}'u check ediyoruz

  const trashButton = document.createElement('button');
  trashButton.innerHTML = "<i class='fa fa-minus-circle'> </i>";
  trashButton.classList.add('trash-btn');

  //? todo içindeki li elementini oluşturuyoruz.
  const newTodo = document.createElement('li');

  // todoInput'un içerisindekini burada li elementine yolluyoruz.
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');

  // todoDiv elementinin içine elementleri ekle. !![SIRAYLA EKLER]
  todoDiv.appendChild(completedButton);
  todoDiv.appendChild(newTodo);
  todoDiv.appendChild(trashButton);

  // todoList'e todoDiv ekliyoruz yani listeye yeni bir element ekliyoruz.
  todoList.appendChild(todoDiv);

  // entera bastıktan sona {todoInput} value sıfırlama
  todoInput.value = '';
}
