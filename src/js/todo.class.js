export class Todo {

    // JSON devuelve arreglo de objetos. Proveo de un método que transforme objeto a todo
    static fromJson({ id, tarea, completado, creado }) {
        const tempTodo = new Todo( tarea );

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor( tarea ) {
        this.tarea = tarea;
        this.id = new Date().getTime(); // 3216161651 un número que representa la fecha
        this.completado = false;
        this.creado = new Date();
    }
}