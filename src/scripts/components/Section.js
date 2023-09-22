export default class Section { //получает разметку через функцию-колбэк и вставляет её в контейнер.
    constructor(
      renderer, //колбэк функция с инструкцией создания элементов на странице
      containerSelector) //селектор контейнера, в который нужно добавлять созданные элементы.
      {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
      }   
      
    //метод, который отвечает за отрисовку всех элементов
    renderItems(items) {
      //перебор массива
      items.forEach(item => {
        //Отрисовка каждого отдельного элемента функцией renderer.
        this._renderer(item);
      });
    }

    //принимает DOM-элемент и добавляет его в контейнер
    addItem(element) { 
      this._container.prepend(element)
    }
}