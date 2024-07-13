import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { AppService } from './app.service';
import { AppUpdate } from './app.update';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: '7358886222:AAEOwlPiQyERP7FG4jhwugBvpNRgyioC3Z0',
    }),
  ],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
