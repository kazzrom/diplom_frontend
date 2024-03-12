import "./assets/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-purple/theme.css";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const app = createApp(App);
app.use(PrimeVue);
app.use(store);

app.component("Button", Button);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("MultiSelect", MultiSelect);
app.component("InputGroup", InputGroup);
app.component("InputGroupAddon", InputGroupAddon);
app.component("InputText", InputText);

app.mount("#app");
