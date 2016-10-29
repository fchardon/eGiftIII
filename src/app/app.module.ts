import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/primeng';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';
import { XLarge } from './home/x-large';
import { Menu } from './menu/menu.component';
import { Lists } from './lists/lists.component';
import { List } from './list/list.component';
import { MyGifts } from './mygifts/mygifts.component';
import { MyGift } from './mygift/mygift.component';
import { Register } from './register/register.component';
import { Login } from './login/login.component';
import { ListService } from './services/list.service';
import { Personne } from './personne/personne.component';
import { PersonneService } from './services/personne.service';
import { AllGifts } from './allgifts/allgifts.component';
import { GiftService } from './services/gift.service';
import { DataTableModule,SharedModule } from 'primeng/primeng';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';
import { EventComponent } from './page/event/event.component';
import { UserComponent } from './page/user/user.component';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { WishService } from './services/wish.service';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    About,
    Home,
    Menu,
    List,
    Lists,
    MyGift,
    MyGifts,
    AllGifts,
    Personne,
    Register,
    Login,
    NoContent,
    EventComponent,
    UserComponent,

    XLarge
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule, SharedModule, TooltipModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    ListService,
    PersonneService,
    GiftService,
    EventService,
    UserService,
    WishService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

