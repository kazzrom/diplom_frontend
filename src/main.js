import "./assets/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./routes/mainRouter.js";

import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import "primevue/resources/themes/aura-light-purple/theme.css";
import locale_ru from "./locale_ru";

import Button from "primevue/button";
import ButtonGroup from "primevue/buttongroup";

import MultiSelect from "primevue/multiselect";

import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

import Dialog from "primevue/dialog";

import Calendar from "primevue/calendar";

import PanelMenu from "primevue/panelmenu";

import Avatar from "primevue/avatar";

import TabMenu from "primevue/tabmenu";

const app = createApp(App);

app.use(PrimeVue, {
  locale: locale_ru,
});

app.use(ConfirmationService).use(createPinia()).use(router);

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
  .component("InputMask", InputMask)
  .component("InputNumber", InputNumber)
  .component("Dialog", Dialog)
  .component("Calendar", Calendar)
  .component("PanelMenu", PanelMenu)
  .component("Avatar", Avatar)
  .component("TabMenu", TabMenu);

app.mount("#app");
