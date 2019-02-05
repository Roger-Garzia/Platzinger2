  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { LoginComponent } from './login/login.component';
  import { HomeComponent } from './home/home.component';
  import { ConversationComponent } from './conversation/conversation.component';
  import { ProfileComponent } from './profile/profile.component';
  import { RouterModule, Routes } from '@angular/router';
  import { MenuComponent } from './menu/menu.component';
  import { SearchPipe } from './pipes/search';
  import { FormsModule } from '@angular/forms';
  import { AngularFireModule } from '@angular/fire';
  import { AngularFirestoreModule } from '@angular/fire/firestore';
  import { AngularFireAuthModule } from '@angular/fire/auth';
  import { AngularFireStorageModule } from '@angular/fire/storage';
  import { AngularFireDatabaseModule } from '@angular/fire/database';
  import { environment } from '../environments/environment';
  import { AuthenticationGuard } from './services/authentication.guard';
  import { ImageCropperModule } from 'ngx-image-cropper';

  const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent, canActivate: [AuthenticationGuard]},
    {path: 'home', component: HomeComponent},
    {path: 'conversation/:uid', component: ConversationComponent},
    {path: 'profile', component: ProfileComponent}
  ]

  @NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      ConversationComponent,
      ProfileComponent,
      MenuComponent,
      SearchPipe
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes),
      FormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
      AngularFireStorageModule, // imports firebase/storage only needed for storage features
      AngularFireDatabaseModule,
      ImageCropperModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
