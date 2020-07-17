import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { TodoApiInterface } from '@/app/interfaces/api/Todo';
import { TotoApi } from '@/app/provider/api/Todo';
import { TodoApiTypes } from '@/app/provider/types/api/Todo';
import { TodoItem } from '@/types/Todo';
import store from '@/store';

@Module({ name: 'todos', namespaced: true, dynamic: true, store })
class Todos extends VuexModule {
  /**
   * @var _todos Array<TodoItem>
   */
  public _todos: Array<TodoItem> = [];

  /**
   * Getter todos
   *
   * @returns Array<TodoItem>
   */
  public get todos(): Array<TodoItem> {
    return this._todos;
  }

  /**
   * Returns function to get todo by id
   *
   * @returns Function
   */
  public get getById(): Function {
    return (id: string): TodoItem | undefined => {
      return this._todos.find(value => value.id === id);
    };
  }

  /**
   * Add todo to todos
   *
   * @param todo TodoItem
   * @returns void
   */
  @Mutation
  public add(todo: TodoItem): void {
    this._todos = [todo, ...this._todos];
  }

  /**
   * Update todo
   *
   * @param todo TodoItem
   * @returns void
   */
  @Mutation
  public update(todo: TodoItem): void {
    this._todos = this._todos.map((value: TodoItem) => {
      if (value.id === todo.id) {
        return todo;
      }
      return value;
    });
  }

  /**
   * Delete todo
   *
   * @param id string
   * @returns void
   */
  @Mutation
  public delete(id: string): void {
    this._todos = this._todos.filter(item => id !== item.id);
  }

  /**
   * Set todos
   * Mutation created because MutationAction in vuex-module-decorators have bugs
   *
   * @param todos Array<TodoItem>
   * @returns void
   */
  @Mutation
  protected setTodos(todos: Array<TodoItem>): void {
    this._todos = todos;
  }

  /**
   * Fetch todos
   *
   * @returns Promise<Array<TodoItem>>
   */
  @Action({ commit: 'setTodos' })
  public async fetchTodos(): Promise<Array<TodoItem>> {
    let todos: Array<TodoItem> = [];
    const todosLocalStorage: string | null = localStorage.getItem('todos');

    if (todosLocalStorage) {
      todos = JSON.parse(todosLocalStorage);
    } else {
      const todoApi: TodoApiInterface = TotoApi.get<TodoApiInterface>(TodoApiTypes.TodoApi);

      todos = await todoApi.getTodos();

      localStorage.setItem('todos', JSON.stringify(todos));
    }

    return todos;
  }

  @Action
  public addItem(todo: TodoItem): void {
    this.add(todo);

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  @Action
  public updateItem(todo: TodoItem): void {
    this.update(todo);

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  @Action
  public deleteItem(id: string): void {
    this.delete(id);

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}

export default getModule(Todos);
