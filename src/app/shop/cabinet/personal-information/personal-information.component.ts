import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs';
import { User } from 'src/app/models/decodedUser.interface';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  protected editStatus: boolean = false;
  protected changingClass: string = 'btn_inf-disabled';
  protected userData: User;
  protected userId: string;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private titleService: Title
  ) {}
  ngOnInit() {
    this.titleService.setTitle('Особисті данні');
    this.usersService
      .getUser()
      .pipe(
        switchMap((user) => {
          if (user) {
            this.userId = user.uid;
          }
          return this.usersService.getUserInf(user?.uid!);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.userData = data;
          this.form = this.fb.group({
            name: [
              this.userData.name.split(' ')[0],
              Validators.pattern(/^[А-ЩЬЮЯЇІЄҐ][а-щьюяїієґ']*$/u),
            ],
            surname: [
              this.userData.name.split(' ')[1],
              Validators.pattern(/^[А-ЩЬЮЯЇІЄҐ][а-щьюяїієґ']*$/u),
            ],
            date: [
              new Date(
                +this.userData.date.split('.')[2],
                +this.userData.date.split('.')[1] - 1,
                +this.userData.date.split('.')[0]
              ),
              this.customDateValidator,
            ],
            gender: [
              this.userData.gender,
              [
                Validators.required,
                Validators.pattern(/^[А-ЩЬЮЯЇІЄҐа-щьюяїієґ']+$/),
              ],
            ],
            number: [
              this.userData.number,
              [Validators.required, Validators.pattern(/^\+380\d{9}$/)],
            ],
          });
          this.form.valueChanges.subscribe((data) => {
            if (this.form.invalid) {
              this.changingClass = 'btn_inf-disabled';
              return;
            }
            const name = data.name + ' ' + data.surname;
            const formValue = {
              name,
              number: data.number,
              date: this.transformDate(data.date),
              gender: data.gender,
            } as User;
            this.checkChanging(formValue);
          });
        }
      });
  }
  customDateValidator(control: FormControl) {
    const inputDate = new Date(control.value);
    const currentDate = new Date();
    if (inputDate > currentDate) {
      return { futureDate: true }; // Возвращает объект ошибки, если дата в будущем
    }

    return null;
  }
  checkChanging(data: User) {
    let checkStatus = false;
    for (const [key, value] of Object.entries(data)) {
      if (this.userData[key as keyof User] !== value) {
        checkStatus = true;
        break;
      }
    }
    if (checkStatus) {
      this.changingClass = '';
    } else {
      this.changingClass = 'btn_inf-disabled';
    }
  }
  changeEditStatus() {
    if (!this.editStatus) {
      this.editStatus = true;
    } else {
      this.editStatus = false;
    }
  }
  transformDate(date: Date) {
    return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    }.${date.getFullYear()}`;
  }
  updateData() {
    let formValue = {
      gender: this.form.getRawValue().gender,
      number: this.form.getRawValue().number,
      name:
        this.form.getRawValue().name + ' ' + this.form.getRawValue().surname,
      date: this.transformDate(this.form.getRawValue().date),
    } as User;
    if (!this.changingClass) {
      this.usersService.updateUser(formValue, this.userId).then(() => {
        this.editStatus = false;
        this.changingClass = 'btn_inf-disabled';
      });
    }
  }
}
