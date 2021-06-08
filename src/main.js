'use strict';

import {renderTemplate, RenderPosition, renderElement} from "./utils";
import SiteMenuWiew from "./view/site-menu";
import {createSiteMenuTemplate} from "./view/site-menu";
import {createFilterTemplate} from "./view/filter";
import {generateTasks, createTaskTemplate} from "./view/task";
import {createTaskEditTemplate} from "./view/task-edit";
import {BoardView} from "./view/board";
import {LoadMoreButtonView} from "./view/load-more";
import {SortView} from "./view/sort";
import {TaskListView} from "./view/task-list";

import {generateFilters} from "./mock/filter";
//import {generateTasks} from "./mock/tasks"



const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const filters = generateFilters();
// const tasks = generateTasks(TASK_COUNT);
const tasks = new Array(TASK_COUNT).fill().map(generateTasks);


const render = (container, template, place=`beforeend`) => {
    container.insertAdjacentHTML(place,template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);


renderElement(siteHeaderElement, new SiteMenuWiew().getElement(), `beforeend`);
renderTemplate(siteMainElement, createFilterTemplate(filters), `beforeend`);

const boardComponent = new BoardView();
renderTemplate(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderTemplate(boardComponent.getElement(), new SortView().getElement(), RenderPosition.BEFOREEND);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

const taskListComponent = new TaskListView();
renderElement(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);
renderTemplate(taskListComponent.getElement(), createTaskEditTemplate(tasks[0]), RenderPosition.BEFOREEND);

let showingTaskCount = SHOWING_TASKS_COUNT_ON_START;
for(let i = 1; i < showingTaskCount; i++) {
    renderTemplate(taskListComponent.getElement(), createTaskTemplate(tasks[i]), RenderPosition.BEFOREEND);
}
// tasks.slice(1, showingTaskCount)
//   .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

const LoadMoreButtonComponent = new LoadMoreButtonView();
renderElement(boardComponent.getElement(), LoadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

const loadMoreButton = boardElement.querySelector('.load-more');
LoadMoreButtonComponent.getElement().addEventListener('click', () => {
  const prevTaskCount = showingTaskCount;
  showingTaskCount = showingTaskCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTaskCount)
    .forEach((task) => render(taskListComponent.getElement(), createTaskTemplate(task), `beforeend`));
    if (showingTaskCount >= tasks.length){
      LoadMoreButtonComponent.getElement().remove();
      LoadMoreButtonComponent.removeElement();
    }
});
