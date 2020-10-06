import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/search', name: 'Dashboard', component: Dashboard }
];

export default routes;
