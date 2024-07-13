import { Action, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { actionButtons } from './app.buttons';
import { AppService } from './app.service';

const todos = [
  {
    id: 1,
    name: 'Sleep',
    isComplete: false,
  },
  {
    id: 2,
    name: 'Eat',
    isComplete: false,
  },
  {
    id: 3,
    name: 'Watch',
    isComplete: false,
  },
];

@Update()
export class AppUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Hi! Friend 🌈');
    await ctx.reply('Выберите действие: ', actionButtons());
  }

  @Action('list')
  async createList(ctx: Context) {
    await ctx.reply(
      `${todos.map((todo) => (todo.isComplete ? '✅' : '❌') + todo.name + '\n')}`,
    );
  }
}
