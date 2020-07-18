import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./public-pages/register/register.component";
import { LoginComponent } from "./public-pages/login/login.component";
import { PublicHomeComponent } from "./public-pages/public-home.component";
import { ProtectedHomeComponent } from "./protected-pages/protected-home.component";
import { AuthenticationGuard } from "./shared/guards/authentication.guard";

const routes: Routes = [
  {
    path: "",
    component: ProtectedHomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: "user",
        loadChildren: () =>
          import("./protected-pages/user/user.module").then(
            (m) => m.UserModule
          ),
      },
    ],
  },
  {
    path: "public",
    component: PublicHomeComponent,
    children: [
      { path: "", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
