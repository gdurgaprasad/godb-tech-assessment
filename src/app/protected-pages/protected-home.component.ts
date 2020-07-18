import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PAGES, SNACKBAR_MESSAGES } from "../shared/utils/constant";
import { SnackbarService } from "../shared/services/snackbar.service";
@Component({
  selector: "app-protected-home",
  templateUrl: "./protected-home.component.html",
  styleUrls: ["./protected-home.component.scss"],
})
export class ProtectedHomeComponent implements OnInit {
  constructor(private router: Router, private snackbar: SnackbarService) {}

  ngOnInit() {}

  logout() {
    localStorage.removeItem("currentUser");
    this.router.navigate([PAGES.LOGIN]);
    this.snackbar.show(SNACKBAR_MESSAGES.LOG_OUT_SUCCESS, "SUCCESS");
  }
}
