import { Container } from 'inversify';
import { TodoApiInterface } from '@/app/interfaces/api/Todo';
import { TodoApi } from '@/app/core/api/Todo';
import { TodoApiTypes } from '@/app/provider/types/api/Todo';

const TotoApi = new Container();
TotoApi.bind<TodoApiInterface>(TodoApiTypes.TodoApi).to(TodoApi);

export { TotoApi };
