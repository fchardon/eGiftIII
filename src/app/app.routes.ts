import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';
import { Lists } from './lists/lists.component';
import { Register } from './register/register.component';
import { Login } from './login/login.component';
import { List } from './list/list.component';
import { AllGifts } from './allgifts/allgifts.component';
import { EventComponent } from './page/event/event.component';
import { UserComponent } from './page/user/user.component';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },

  { path: 'login',  component: Login },
  { path: 'register',  component: Register },

  { path: 'lists/:listId',  component: List },
  { path: 'lists',  component: Lists},
  { path: 'gifts/:listId', component: AllGifts},
  { path: 'about', component: About },

  { path: 'events/:eventId/gifts/:listId',  component: List },
  { path: 'events/:eventId/lists/:listId',  component: List },
  { path: 'events/:eventId', component: EventComponent },

  { path: 'users/:userId/gifts/:eventId',  component: AllGifts },
  { path: 'users/:userId/events/:eventId',  component: EventComponent },
  { path: 'users/:userId',  component: UserComponent },


  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  { path: '**',    component: NoContent },
];
