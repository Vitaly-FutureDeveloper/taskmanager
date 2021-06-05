const createFilterMarcup = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<input
          type="radio"
          id="filter__${name}"
          class="filter__input visually-hidden"
          name="filter"
          ${isChecked ? `checked` : ``}
        />
        <label for="filter__${name}" class="filter__label">
          ${name} <span class="filter__all-count">${count}</span></label
        >`
  );
}

export const createFilterTemplate = (filters) => {
  console.log(1)
  const filterMarcup = filters.map((it, i) =>
    createFilterMarcup(it, i === 0)).join(`\n`);


  return(
    `<section class="main__filter filter container">
       ${filterMarcup}
      </section>`
  );
};


