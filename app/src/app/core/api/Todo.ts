import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { TodoApiInterface } from '@/app/interfaces/api/Todo';
import { TodoItem } from '@/types/Todo';

/**
 * Todo api
 *
 * @class TodoApi
 * @implements TodoApiInterface
 */
@injectable()
class TodoApi implements TodoApiInterface {
  /**
   * Make request to get todos
   *
   * @returns Promise<Array<TodoItem> | null>
   */
  public async getTodos(): Promise<Array<TodoItem>> {
    const todos: Array<TodoItem> = [
      {
        id: uuidv4(),
        completed: true,
        title: 'Todo 1',
        text:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quidem deserunt eligendi cumque rerum eos rem assumenda illum pariatur, laudantium, omnis, cum architecto laboriosam dolore sapiente id ad placeat in.',
      },
      {
        id: uuidv4(),
        completed: false,
        title: 'Todo 2',
        text:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quidem deserunttium, omnis, cum architecto laboriosam dolore sapiente id ad placeat in.',
      },
      {
        id: uuidv4(),
        completed: false,
        title: 'Todo 3',
        text:
          'Lorem ipsum dolunt eligendi cumque rerum eos rem assumenda illum pariatur, laudantium, omnis, cum architecto laboriosam dolore sapiente id ad placeat in.',
      },
    ];

    return todos;
  }
}

export { TodoApi };
