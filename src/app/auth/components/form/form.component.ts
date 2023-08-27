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
  public unacceptableSymbols = "\"№;|^:?*)(_-}{+='><,`.~][/\\";
  public isInputType = true;
  public isSubmitted = false;
  public formErrorMessage = "";
  public form!: FormGroup;

  @Input()
  public headerProps!: string;

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
          Validators.pattern(/^[a-zа-яё][a-zа-яё]+[ _]?[A-ZА-ЯЁ]*$/i),
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[\d])(?=.*[A-ZА-ЯЁ])[^+},"=\]>.№{|?`^*;'~[/<):\\_(-]{6,}$/),
        ]),
      });
      return;
    }

    this.form = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[^@\s]+@[^@\s][\w]+\.[a-z]{2,}$/i),
      ]),
      password: new FormControl("", [Validators.required]),
    });
  }

  public getBtnText() {
    if (this.headerProps !== "Регистрация") return "Войти";
    return "Зарегистрироваться";
  }

  public onGoTo(value: string) {
    this.router.navigate([`/${value}`]);
  }

  public onChangeInputType() {
    this.isInputType = !this.isInputType;
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
        this.formErrorMessage = "Такой пользователь уже существует, введите другую почту";
      } else {
        this.addNewUser(this.form.value);
        this.formErrorMessage = "";
        this.onGoTo("");
      }
    });
  }
  private isUser(form: ILoginRequest) {
    return this.dataService.isUser(form.email, form.password).subscribe(data => {
      if (data === false) {
        this.formErrorMessage = "Почта или пароль указаны неверно";
      } else if (data !== true) {
        this.stateService.setUser$(data);
        this.formErrorMessage = "";
        this.onGoTo("");
      }
    });
  }
  public getTextInvalidFormPass() {
    let message!: string;
    if (this.form.value.password.length <= 6) {
      message = "Должно быть не менее 7 символов";
    } else if (this.form.value.password.length > 20) {
      message = "Должно быть не более 20 символов";
    } else if (this.validCharactersFilter()) {
      message = `Не допустимые символы: ${this.unacceptableSymbols}`;
    } else {
      message = "Пароль должен содержать как минимум 1 заглавную букву и 1 цифру.";
    }
    return message;
  }

  private validCharactersFilter() {
    let isValid = false;
    for (let j = 0; j < this.unacceptableSymbols.length; j++) {
      for (let i = 0; i < this.form.value.password.length; i++) {
        if (this.form.value.password[i] === this.unacceptableSymbols[j]) isValid = true;
      }
    }
    return isValid;
  }
}
