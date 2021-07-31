import Vue from 'vue'
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  Icon,
  Search,
  NavBar,
  Toast,
  PullRefresh,
  List,
  Tabbar,
  TabbarItem,
  Rate,
  Col,
  Row,
  Image as VanImage,
  Notify,
  Grid,
  GridItem,
  Uploader,
  ActionSheet,
  Popup,
  Button,
  Form,
  Field,
} from 'vant'



import 'vant/lib/index.css';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Search);
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Rate);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Uploader);
Vue.use(ActionSheet);
Vue.use(Popup);
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);

Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.prototype.$Toast = Toast
Vue.prototype.$Notify = Notify
