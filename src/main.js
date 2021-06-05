'use strict';

import {createSiteMenuTemplate} from "./components/menu";
import {createFilterTemplate} from "./components/filter";
import {createTaskTemplate} from "./components/task";
import {createTaskEditTemplate} from "./components/task-edit";
import {createBoardTemplate} from "./components/board";
import {createLoadMoreButtonTemplate} from "./components/load-more";
//import {generateTasks} from "./mock/tasks"

import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/tasks"



const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);



const render = (container, template, place=`beforeend`) => {
    container.insertAdjacentHTML(place,template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);


render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTaskCount = SHOWING_TASKS_COUNT_ON_START;
// for(let i = 1; i < showingTaskCount; i++) {
//     render(taskListElement, createTaskTemplate(tasks[i]), `beforeend`);
// }
tasks.slice(1, showingTaskCount)
  .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = boardElement.querySelector('.load-more');
loadMoreButton.addEventListener('click', () => {
  const prevTaskCount = showingTaskCount;
  showingTaskCount = showingTaskCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTaskCount)
    .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));
    if (showingTaskCount >= tasks.length){
      loadMoreButton.remove();
    }
});
