import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  emailValidator,
  matchingPasswords,
} from "src/app/shared/utils/app-validators";
import {
  GENDERS,
  SNACKBAR_MESSAGES,
  PAGES,
} from "src/app/shared/utils/constant";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  genders = Object.values(GENDERS);

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService,
    private router: Router
  ) {
    this.form = this.formBuilder.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [
          null,
          Validators.compose([Validators.required, emailValidator]),
        ],
        phoneNumber: [
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern("^[0-9]{10}$"),
          ]),
        ],
        gender: [GENDERS.MALE, Validators.required],
        address: [null, Validators.required],
        password: [
          null,
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
        confirmPassword: [null, Validators.required],
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );
  }

  ngOnInit() {
    this.form.markAllAsTouched();
  }

  register() {
    this.loading = true;
    const fieldControls = this.form.controls;

    const firstName = fieldControls.firstName.value;
    const lastName = fieldControls.lastName.value;
    const email = fieldControls.email.value;
    const phoneNumber = fieldControls.phoneNumber.value;
    const gender = fieldControls.gender.value;
    const address = fieldControls.address.value;
    const password = fieldControls.password.value;

    const user = {
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      address,
      password,
    };

    const users = [];

    const existingUsers = JSON.parse(localStorage.getItem("users"));

    if (existingUsers && existingUsers.length > 0) {
      existingUsers.push(user);
      localStorage.setItem("users", JSON.stringify(existingUsers));
    } else {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    }

    this.snackBar.show(SNACKBAR_MESSAGES.REGISTRATION_SUCCESS, "SUCCESS");
    this.form.reset();
    this.loading = false;
    this.router.navigate([PAGES.LOGIN]);
  }
}
