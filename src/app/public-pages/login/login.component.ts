import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { emailValidator } from "src/app/shared/utils/app-validators";
import { SNACKBAR_MESSAGES, PAGES } from "src/app/shared/utils/constant";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, emailValidator])],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  ngOnInit(): void {}

  login() {
    this.loading = true;
    const registeredUsers = JSON.parse(localStorage.getItem("users"));

    const fieldControls = this.form.controls;
    const emailValue = fieldControls.email.value;
    const passwordvalue = fieldControls.password.value;

    if (registeredUsers) {
      const validateUser = registeredUsers.find(
        (user) => user.email === emailValue && user.password === passwordvalue
      );
      if (validateUser) {
        localStorage.setItem("currentUser", JSON.stringify(validateUser));
        this.router.navigate([PAGES.USER]);
        this.snackbar.show(SNACKBAR_MESSAGES.LOGIN_SUCCESS, "SUCCESS");
        this.loading = false;
      } else {
        this.snackbar.show(
          SNACKBAR_MESSAGES.INVALID_CREDENTIALS_ENTERED,
          "FAILED"
        );
        this.loading = false;
      }
      this.loading = false;
    } else {
      this.snackbar.show(SNACKBAR_MESSAGES.USERS_NOT_AVAILABE, "FAILED");
      this.loading = false;
    }
  }
}
