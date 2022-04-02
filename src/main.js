import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import RestApi from './prototype/RestAPI.js'
import Constant from './prototype/Constant.js'

const app = createApp(App);

app.config.devtools = process.env.NODE_ENV == "production"

app.config.globalProperties.$restApi = new RestApi();
app.config.globalProperties.$constant = new Constant();
app.use(router);

app.mount("#app");
