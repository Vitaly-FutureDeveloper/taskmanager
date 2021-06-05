const DefaultRepeatingDays = {
  "mo": false,
  "tu": false,
  "we": false,
  "th": false,
  "fr": false,
  "sa": false,
  "su": false,
};

const generateTask = () => {
  return {
    description: `Example default task width default color.`,
    dueDate: new Date(),
    repeatingDays: Object.assign({}, DefaultRepeatingDays, {"mo": Math.random() > 0.5}),
    color: `pink`,
    isArhive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

//const repeatingDays = [];

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTask, generateTasks};
