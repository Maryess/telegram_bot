import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('Список дел', 'list'),
      Markup.button.callback('Обновить', 'edit'),
      Markup.button.callback('Удалить', 'delete'),
    ],
    {},
  );
}
