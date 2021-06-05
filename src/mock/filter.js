const filterNames = [`all`,
  `today`,
  `favorites`,
  `arhive`,
  `overdue`];

const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateFilters};
