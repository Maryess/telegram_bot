import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback('Список дел', 'list'),
      Markup.button.callback('Создать', 'create'),
      Markup.button.callback('Выполнить', 'done'),
      Markup.button.callback('Удалить', 'delete'),
    ],
    {},
  );
}
