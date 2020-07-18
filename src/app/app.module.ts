import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./public-pages/login/login.component";
import { RegisterComponent } from "./public-pages/register/register.component";
import { SharedModule } from "./shared/shared.module";
import { ProtectedHomeComponent } from "./protected-pages/protected-home.component";
import { PublicHomeComponent } from "./public-pages/public-home.component";

@NgModule({
  declarations: [
    AppComponent,
    PublicHomeComponent,
    LoginComponent,
    RegisterComponent,
    ProtectedHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
