import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { ModalWindowModule } from './components/modal-window/modal-window.module';
import { SharedModule } from './shared/shared.module';
import { AuthorizationModule } from './components/authorization/authorization.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthTokenInterceptor } from './services/AuthToken.interceptor';
import { AuthEffects } from './components/authorization/state/authorization.effects';
import { AppReducer } from './store/app.state';
import { customNotifierOptions } from './shared/notifier.options';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    NotifierModule.withConfig(customNotifierOptions),
    ModalWindowModule,
    RouterModule,
    SharedModule,
    AuthorizationModule,
    AppRoutingModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(AppReducer, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  exports: [NotifierModule],
  providers: [
    FirebaseService,
    NotifierService,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
