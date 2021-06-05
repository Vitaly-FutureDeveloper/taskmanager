import {MONTH_NAMES} from "../const.js";
import {COLORS} from "../const";
import {formatTime} from "../utils.js";

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];
const DefaultRepeatingDays = {
  "mo": false,
  "tu": false,
  "we": false,
  "th": false,
  "fr": false,
  "sa": false,
  "su": false
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    "mo" : Math.random() > 0.5,
  });
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomArrayItem(COLORS),
    isArhive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
}

export {generateTask, generateTasks};


export const createTaskTemplate = (task) => {
  const {description, dueDate, color, repeatingDays, isArhive,
    isFavorite} = task;


  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;


  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;


  const arhiveButtonInactiveClass = isArhive ? `` :  `card__btn--disabled`;
  const favoriteButtonInactiveClass = isFavorite ? `` :  `card__btn--disabled`;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
			<div class="card__form">
				<div class="card__inner">
					<div class="card__control">
						<button type="button" class="card__btn card__btn--edit">
							edit
						</button>
						<button type="button" class="card__btn card__btn--archive ${arhiveButtonInactiveClass}">
							archive
						</button>
						<button
							type="button"
							class="card__btn card__btn--favorites ${favoriteButtonInactiveClass}"
						>
							favorites
						</button>
					</div>

					<div class="card__color-bar">
						<svg class="card__color-bar-wave" width="100%" height="10">
							<use xlink:href="#wave"></use>
						</svg>
					</div>

					<div class="card__textarea-wrap">
						<p class="card__text">${description}</p>
					</div>

					<div class="card__settings">
						<div class="card__details">
							<div class="card__dates">
								<div class="card__date-deadline">
									<p class="card__input-deadline-wrap">
										<span class="card__date">${date}</span>
										<span class="card__time">${time}</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>`
  );
};
