import './styles.css';
// import { Todo } from './js/todo.class';
// import { TodoList } from './js/todo-list.class';
import { Todo, TodoList } from './js';  // por defecto importa de un archivo llamado index.js en el directorio indicado
import { crearTodoHtml } from './js/dom';

export const todoList = new TodoList();
todoList.todos.forEach( todo => crearTodoHtml( todo ) );
// todoList.todos.forEach( crearTodoHtml ); - esta línea y la anterior son equivalentes 
// el objeto del argumento y el devuelto son el mismo