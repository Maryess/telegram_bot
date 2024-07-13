import { Context } from 'telegraf';

export interface ContextTelegraf extends Context {
  session: {
    type?: 'done' | 'create' | 'delete';
  };
}
