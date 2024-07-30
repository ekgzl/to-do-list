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

// todoList} alanına her tıklandığında deleteCheck methodunu çalıştırır.
todoList.addEventListener('click', deleteCheck);

// todoFilter
todoFilter.addEventListener('click', filterTodo);
// Functions

// sayfa yüklenirken getTodos kısmını çağırır.
document.addEventListener('DOMContentLoaded', function () {
  getTodos();
});

// {e} tarayıcı üzerinden yapılan bütüni işlemleri temsil eder.
function addTodo(e) {
  // event ile sayfanın yenilenmesi kaldırıldı.
  e.preventDefault();

  // string alan bir fonksiyon ve boş olup olmadığını döner
  //trim()  gereksiz whitespace'leri stringden kaldırır.
  // 0 harici bütün değerler false döner 0 ise true döner.
  const isEmpty = (str) => !str.trim().length;

  if (isEmpty(todoInput.value)) {
    // style ile css dosyasına ekleniyor gibi display değeri block olarak güncellenebilir.
    alertWarning.style.display = 'block';
    setTimeout(() => {
      alertWarning.style.display = 'none';
    }, 2500);

    // entera bastıktan sona {todoInput} value sıfırlama
    todoInput.value = '';
  } else {
    alertSuccess.style.display = 'block';
    setTimeout(() => {
      alertSuccess.style.display = 'none';
    }, 2500);

    saveLocalTodos(todoInput.value);

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
}

function deleteCheck(e) {
  // item {todoList} içerisinde hangi elemente tıklandığını döner
  const item = e.target;

  // target {trash-btn} class'ı içeren kırmızı kısma tıkladığında if bloğu çalışır.
  if (item.classList[0] === 'trash-btn') {
    // item'in üst class'ı yani {todo} div'ini atar.
    const todo = item.parentElement;
    //todo'nun class listini class="todo fall" yapar
    // fall ise efektlere sahiptir.
    todo.classList.add('fall');
    removeLocalStorage(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;

    // eğer completed değilse ekler eğer completed varsa kaldırır.
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  // {todoList}'in altındaki tüm divleri gönderir.
  const todos = todoList.childNodes;
  todos.forEach(function (item) {
    // {todoFilter}'daki select yapısında en son ne seçildiyse onu döner.
    switch (e.target.value) {
      case 'all':
        item.style.display = 'flex';
        break;

      case 'completed':
        //classlarda completed var mı geçer mi
        if (item.classList.contains('completed')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (item.classList.contains('completed')) {
          item.style.display = 'none';
        } else {
          item.style.display = 'flex';
        }

      default:
        break;
    }
  });
}

//? local storage

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    // bunu js'e çevir
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // todo elemanını todos'a ekler.
  todos.push(todo);

  // todos'u jsona çevirme ve locale kaydetme işlemi.
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    // bunu js'e çevir
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach((todo) => {
    // !!!! BU KISIM YUKARIDAKİ FONKSİYONDAN ALINDI LOCALDEN OTOMAİK SİTEYE YÜKLEME YAPAR.

    const todoDiv = document.createElement('div');

    todoDiv.classList.add('todo');

    const completedButton = document.createElement('button');

    completedButton.innerHTML = "<i class='fa fa-check-circle'></i>";
    completedButton.classList.add('complete-btn');

    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fa fa-minus-circle'> </i>";
    trashButton.classList.add('trash-btn');

    const newTodo = document.createElement('li');

    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    // bunu js'e çevir
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // {todo} iteminin 1. childi olan li elementinin içindeki text'i todoIndex'e eşitler.
  const todoIndex = todo.children[1].innerText;

  // indexOf ile yukarıda alınen text'in indexini alır ve 1 item siler. yani todoIndex'i siler.
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
