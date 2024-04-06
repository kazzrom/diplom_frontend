import "./assets/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./routes/router.js";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-purple/theme.css";

import Button from "primevue/button";
import ButtonGroup from "primevue/buttongroup";

import MultiSelect from "primevue/multiselect";

import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

import Dialog from "primevue/dialog";

import Calendar from "primevue/calendar";

import PanelMenu from "primevue/panelmenu";

import Avatar from "primevue/avatar";

import TabMenu from "primevue/tabmenu";

const app = createApp(App);

app.use(PrimeVue, {
  locale: {
    accept: "Да",
    addRule: "Добавить правило",
    am: "до полудня",
    apply: "Принять",
    cancel: "Отмена",
    choose: "Выбрать",
    chooseDate: "Выбрать дату",
    chooseMonth: "Выбрать месяц",
    chooseYear: "Выбрать год",
    clear: "Очистить",
    completed: "Завершено",
    contains: "Содержит",
    custom: "Пользовательский",
    dateAfter: "Дата после",
    dateBefore: "Дата до",
    dateFormat: "dd.mm.yy",
    dateIs: "Дата равна",
    dateIsNot: "Дата не равна",
    dayNames: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ],
    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    dayNamesShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"],
    emptyFilterMessage: "Результатов не найдено",
    emptyMessage: "Нет доступных вариантов",
    emptySearchMessage: "Результатов не найдено",
    emptySelectionMessage: "Нет выбранного элемента",
    endsWith: "Заканчивается",
    equals: "Равно",
    fileSizeTypes: ["Б", "Кб", "Мб", "Гб", "Тб", "Пб", "Эб", "Зб", "Йб"],
    filter: "Фильтр",
    firstDayOfWeek: 1,
    gt: "Более чем",
    gte: "Более чем или равно",
    lt: "Меньше чем",
    lte: "Меньше чем или равно",
    matchAll: "Сопоставить все",
    matchAny: "Совпадение с любым",
    medium: "Нормальный",
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    monthNamesShort: [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ],
    nextDecade: "Следующее десятилетие",
    nextHour: "Следующий час",
    nextMinute: "Следующая минута",
    nextMonth: "Следующий месяц",
    nextSecond: "Следующая секунда",
    nextYear: "Следующий год",
    noFilter: "Нет фильтра",
    notContains: "Не содержит",
    notEquals: "Не равно",
    now: "Сейчас",
    passwordPrompt: "Введите пароль",
    pending: "В ожидании",
    pm: "после полудня",
    prevDecade: "Предыдущее десятилетие",
    prevHour: "Предыдущий час",
    prevMinute: "Предыдущая минута",
    prevMonth: "Предыдущий месяц",
    prevSecond: "Предыдущая секунда",
    prevYear: "Предыдущий год",
    reject: "Нет",
    removeRule: "Удалить правило",
    searchMessage: "{0} результатов доступно",
    selectionMessage: "{0} элементов выбрано",
    showMonthAfterYear: false,
    startsWith: "Начинается с",
    strong: "Хороший",
    today: "Сегодня",
    upload: "Загрузить",
    weak: "Простой",
    weekHeader: "Нед.",
    aria: {
      cancelEdit: "Отменить правку",
      close: "Закрыть",
      collapseRow: "Строка свёрнута",
      editRow: "Редактирование строки",
      expandRow: "Строка развёрнута",
      falseLabel: "Неверно",
      filterConstraint: "Ограничение фильтра",
      filterOperator: "Оператор фильтра",
      firstPageLabel: "Первая страница",
      gridView: "В виде сетки",
      hideFilterMenu: "Скрыть меню фильтра",
      jumpToPageDropdownLabel: "Перейти к раскрывающемуся списку страниц",
      jumpToPageInputLabel: "Перейти к вводу страницы",
      lastPageLabel: "Последняя страница",
      listView: "В виде списка",
      moveAllToSource: "Переместить всё в источник",
      moveAllToTarget: "Переместить всё в приёмник",
      moveBottom: "Переместить в конец",
      moveDown: "Переместить вниз",
      moveTop: "Переместить в начало",
      moveToSource: "Переместить в источник",
      moveToTarget: "Переместить в приёмник",
      moveUp: "Переместить вверх",
      navigation: "Навигация",
      next: "Следующий",
      nextPageLabel: "Следующая страница",
      nullLabel: "Не выбран",
      otpLabel: "Введите символ одноразового пароля {0}",
      pageLabel: "{page}",
      passwordHide: "Скрыть пароль",
      passwordShow: "Показать пароль",
      previous: "Предыдущий",
      previousPageLabel: "Предыдущая страница",
      rotateLeft: "Повернуть влево",
      rotateRight: "Повернуть вправо",
      rowsPerPageLabel: "Строк на странице",
      saveEdit: "Сохранить правку",
      scrollTop: "Прокрутить в начало",
      selectAll: "Выбраны все элементы",
      selectRow: "Выбрана строка",
      showFilterMenu: "Показать меню фильтра",
      slide: "Слайд",
      slideNumber: "{slideNumber}",
      star: "1 звезда",
      stars: "{star} звёзд",
      trueLabel: "Верно",
      unselectAll: "Все элементы не выбраны",
      unselectRow: "Строка не выбрана",
      zoomImage: "Увеличить изображение",
      zoomIn: "Увеличить",
      zoomOut: "Уменьшить",
    },
  },
});

app.use(createPinia()).use(router);

app
  .component("Button", Button)
  .component("ButtonGroup", ButtonGroup)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("MultiSelect", MultiSelect)
  .component("InputGroup", InputGroup)
  .component("InputGroupAddon", InputGroupAddon)
  .component("IconField", IconField)
  .component("InputIcon", InputIcon)
  .component("InputText", InputText)
  .component("Dialog", Dialog)
  .component("Calendar", Calendar)
  .component("PanelMenu", PanelMenu)
  .component("Avatar", Avatar)
  .component("TabMenu", TabMenu);

app.mount("#app");
