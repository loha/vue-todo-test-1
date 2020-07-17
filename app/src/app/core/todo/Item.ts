import { Objectable } from '@/app/interfaces/support/Objectable';
import { TodoItem } from '@/types/Todo';

/**
 * Todo object
 *
 * @class Todo
 * @implements Objectable
 */
class Todo implements Objectable {
  /**
   * @var id string
   */
  protected readonly id: string;

  /**
   * @var completed boolean
   */
  protected readonly completed: boolean;

  /**
   * @var title string
   */
  protected readonly title: string;

  /**
   * @var text string
   */
  protected readonly text: string;

  /**
   * @constructor Todo
   * @param id string
   * @param title string
   * @param text string
   */
  public constructor(id: string, completed: boolean, title: string, text: string) {
    this.id = id;
    this.completed = completed;
    this.title = title.trim();
    this.text = text.trim();
  }

  /**
   * Getter id
   *
   * @returns string
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Getter completed
   *
   * @returns boolean
   */
  public getCompleted(): boolean {
    return this.completed;
  }

  /**
   * Getter title
   *
   * @returns string
   */
  public getTitle(): string {
    return this.title;
  }

  /**
   * Getter text
   *
   * @returns string
   */
  public getText(): string {
    return this.text;
  }

  /**
   * @returns TodoItem
   */
  public toObject(): TodoItem {
    return {
      id: this.id,
      completed: this.completed,
      title: this.title,
      text: this.text,
    };
  }
}

export { Todo };
