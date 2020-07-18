import { Component, OnInit } from "@angular/core";
import { PAGES, SNACKBAR_MESSAGES } from "src/app/shared/utils/constant";
import { Router } from "@angular/router";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  userDetail: any;

  constructor(private router: Router, private snackbar: SnackbarService) {
    this.userDetail = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem("currentUser");
    this.router.navigate([PAGES.LOGIN]);
    this.snackbar.show(SNACKBAR_MESSAGES.LOG_OUT_SUCCESS, "SUCCESS");
  }
}
