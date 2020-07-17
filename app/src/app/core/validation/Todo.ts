import { TodoItem } from '@/types/Todo';
import validator from 'validator';

/**
 * Todo validation
 *
 * @class TodoValidation
 */
class TodoValidation {
  /**
   * @var todo TodoItem
   */
  protected todo: TodoItem;

  /**
   * @var _errors Array<string>
   */
  protected _errors: Array<string>;

  /**
   * @constructor TodoValidation
   * @param todo TodoItem
   */
  public constructor(todo: TodoItem) {
    this.todo = todo;
    this._errors = [];
  }

  /**
   * Make validation
   *
   * @returns void
   */
  public validate(): void {
    this.id();
    this.completed();
    this.title();
    this.text();
  }

  /**
   * Get validation errors
   *
   * @returns Array<string>
   */
  public get errors(): Array<string> {
    return this._errors;
  }

  /**
   * Id validation
   *
   * @returns void
   */
  protected id(): void {
    if (!validator.isUUID(this.todo.id, 4)) {
      this._errors.push('id');
    }
  }

  /**
   * Id validation
   *
   * @returns void
   */
  protected completed(): void {
    if (!validator.isBoolean(this.todo.completed.toString())) {
      this._errors.push('completed');
    }
  }

  /**
   * Title validation
   *
   * @returns void
   */
  protected title(): void {
    if (!validator.isLength(this.todo.title, { min: 1, max: 200 })) {
      this._errors.push('title');
    }
  }

  /**
   * Text validation
   *
   * @returns void
   */
  protected text(): void {
    if (!validator.isLength(this.todo.text, { min: 1, max: 5000 })) {
      this._errors.push('text');
    }
  }
}

export { TodoValidation };
