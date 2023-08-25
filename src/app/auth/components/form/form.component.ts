import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ILoginRequest, IRegisterRequest } from "src/app/auth/types/auth.interface";
import { DataService } from "src/app/shared/services/data.service";
import { StateService } from "src/app/shared/services/state.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  @Input()
  public headerProps!: string;
  public errorMessage = "";
  public isSubmitted = false;
  public form!: FormGroup;

  constructor(
    private router: Router,
    private dataService: DataService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    if (this.headerProps === "Регистрация") {
      this.form = new FormGroup({
        email: new FormControl("", [
          Validators.required,
          Validators.pattern(/^[^@\s]+@[^@\s][\w]+\.[a-z]{2,}$/i),
        ]),
        name: new FormControl("", [
          Validators.required,
          Validators.pattern(/^[а-яё][а-яё]+[ _]?[А-ЯЁ]*$/i),
        ]),
        password: new FormControl("", [
          Validators.required,
          // Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])[^(+,"=.№{|}?`;'~[/\]):\\_-]{6,}$/),
          Validators.pattern(/^[^(+,"=.№{|}?`;'~[/\]):\\_-]{6,}$/),
        ]),
      });
      return;
    }

    this.form = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[^@\s]+@[^@\s][\w]+\.[a-z]{2,}$/i),
      ]),
      password: new FormControl("", [
        Validators.required,
        // Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])[^(+,"=.№{|}?`;'~[/\]):\\_-]{6,}$/),
        Validators.pattern(/^[^(+,"=.№{|}?`;'~[/\]):\\_-]{6,}$/),
      ]),
    });
  }

  public getBtnText() {
    if (this.headerProps !== "Регистрация") return "Войти";
    return "Зарегистрироваться";
  }

  public onGoTo(value: string) {
    this.router.navigate([`/${value}`]);
  }

  private addNewUser(data: IRegisterRequest) {
    const newUser = { id: 0, ...data, phone: "", avatar: "", posts: [] };
    this.dataService.addUser(newUser).subscribe(user => {
      this.stateService.setUser$(user);
    });
  }

  public onAuthSubmit() {
    if (!this.form.valid) {
      return;
    }

    if (this.headerProps === "Регистрация") {
      this.isEmail(this.form.value.email);
      return;
    }

    this.isUser(this.form.value);
  }

  private isEmail(email: string) {
    return this.dataService.isUser(email).subscribe(data => {
      if (data === true) {
        this.errorMessage = "Такой пользователь уже существует, введите другую почту";
      } else {
        this.addNewUser(this.form.value);
        this.errorMessage = "";
        this.onGoTo("");
      }
    });
  }
  private isUser(form: ILoginRequest) {
    return this.dataService.isUser(form.email, form.password).subscribe(data => {
      if (data === false) {
        this.errorMessage = "Почта или пароль указаны неверно";
      } else if (data !== true) {
        this.stateService.setUser$(data);
        this.errorMessage = "";
        this.onGoTo("");
      }
    });
  }
}
