import { Todo } from "./todo.class";
import { todoList } from "../index";

// Referencias en el HTML
const divTodoList           = document.querySelector('.todo-list');
const txtInput              = document.querySelector('.new-todo');
const btnBorrarCompletados  = document.querySelector('.clear-completed');
const ulFiltros             = document.querySelector('.filters');       // para capturar un click en cualquiera 
                                                                        // de los filtros
const anchorFiltros         = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {      // uso `` para hacer multilínea e interpolar valores
                                                // el html <li> está extraido del cascarón html de ejemplo
                                                // usamos operador ternario para interpolar valores de completed y check
    const htmlTodo = `
    <li class="${ todo.completado ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement( 'div' );
    div.innerHTML = htmlTodo;
    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

// Eventos: keyup es al soltar la tecla, event me dice qué tecla
txtInput.addEventListener('keyup', ( event ) => {
    if( event.keyCode === 13 && txtInput.value.length > 0 ) {
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }
});

// Por defecto el check se tilda con el click, yo debo extender la funcionalidad al arreglo
divTodoList.addEventListener('click', (event) => {
    // console.log(event.target.localName);    // Puedo experimentar a qué elementos puedo hacerle click dentro de este div
    const nombreElemento    = event.target.localName;  // input, label o button
    const todoElemento      = event.target.parentElement.parentElement;// hago referencia al elemento li para eliminarlo
    const todoId            = todoElemento.getAttribute('data-id');
    
    if( nombreElemento.includes('input') ) { // significa que hizo click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed'); // si existe 'completed' la elimina, sino la agrega
    }
    else if( nombreElemento.includes('button') ) {
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
});

btnBorrarCompletados.addEventListener('click', () => {
    todoList.eliminarCompletados();
    // elimino los elementos html desde el final para que no se modifiquen los índices
    // debo hacer referencia a todos los hijos de divTodoList
    for( let i = divTodoList.children.length-1; i >= 0; i-- ){
        const elemento = divTodoList.children[i];
        if( elemento.classList.contains( 'completed') ) {
            divTodoList.removeChild( elemento );
        }
    }
});

ulFiltros.addEventListener( 'click', ( event ) => {
    const filtro = event.target.text;
    if( !filtro ) { return; }

    anchorFiltros.forEach( elem => elem.classList.remove( 'selected' ) );
    event.target.classList.add( 'selected' );

    for( const elemento of divTodoList.children ) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {
            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});