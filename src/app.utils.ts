export const showList = (todos) =>
  `Твой список задач:\n\n ${todos
    .filter((todo) => todo.id !== 0)
    .map(
      (todo) =>
        (todo.isComplete ? '☑️' : '🔵') + todo.id + ': ' + todo.name + '\n\n',
    )

    .join(' ')}`;
