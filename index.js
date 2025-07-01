import {Router} from '@vaadin/router';

const router = new Router(document.getElementById('outlet'));
router.setRoutes([
  {path: '/', component: 'employee-records'},
  {path: '/add-employee', component: 'add-employee'},
  {path: '/edit-employee', component: 'edit-employee'},
]);
