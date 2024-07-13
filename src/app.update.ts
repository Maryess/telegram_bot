import {
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { actionButtons } from './app.buttons';
import { AppService } from './app.service';
import { showList } from './app.utils';
import { ContextTelegraf } from './context.interface';

const todos = [
  {
    id: 0,
    name: '',
    isComplete: false,
  },
];

@Update()
export class AppUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<ContextTelegraf>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(ctx: ContextTelegraf) {
    await ctx.reply('Hi! Friend 🌈');
    await ctx.reply('Выберите действие: ', actionButtons());
  }

  @Hears('Список дел')
  async getList(ctx: ContextTelegraf) {
    await ctx.reply(showList(todos));
  }

  @Hears('Создать')
  async createList(ctx: ContextTelegraf) {
    await ctx.reply('Создай новую задачу. Что ты планируешь сделать? ');
    ctx.session.type = 'create';
  }

  @Hears('Выполнить')
  async doneList(ctx: ContextTelegraf) {
    await ctx.reply('Введите  номер задачи: ');
    ctx.session.type = 'done';
  }

  @Hears('Удалить')
  async removeList(ctx: ContextTelegraf) {
    await ctx.reply('Введите номер задачи: ');
    ctx.session.type = 'delete';
  }

  @On('text')
  async getMessage(
    @Message('text') message: string,
    @Ctx() ctx: ContextTelegraf,
  ) {
    if (ctx.session.type === 'done') {
      const todo = todos.find((t) => t.id === Number(message));

      todo.isComplete = !todo.isComplete;
      await ctx.reply(showList(todos));
    }
    if (ctx.session.type === 'create') {
      const count = todos[todos.length - 1].id + 1;
      todos.push({ id: count, name: message, isComplete: false });

      await ctx.reply(showList(todos));
      console.log(todos);
    }
    if (ctx.session.type === 'delete') {
      const todo = todos.find((t) => t.id === Number(message));
      todos.splice(Number(message), 1);
      await ctx.reply(showList(todos.filter((t) => t.id !== Number(message))));
    }
  }
}
