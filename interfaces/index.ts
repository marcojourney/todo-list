export interface Todo {
   id: string;
   todo: string;
   isCompleted: boolean;
   createdAt?: string;
}
 
export interface State {
   searchTerm: string;
   todoItems: string;
   currentTodo: string;
   editingTodo: Todo;
   error: string;
}