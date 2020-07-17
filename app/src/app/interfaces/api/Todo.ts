import { TodoItem } from '@/types/Todo';

/**
 * Todo api intenfase
 *
 * @interface TodoApiInterface
 */
interface TodoApiInterface {
  /**
   * Make request to get todos
   *
   * @returns Promise<Array<TodoItem>
   */
  getTodos(): Promise<Array<TodoItem>>;
}

export { TodoApiInterface };
