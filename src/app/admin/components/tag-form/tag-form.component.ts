import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {defaultEditorColors} from "@taiga-ui/addon-editor";
import {TagService} from "../../services/tag.service";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {ActivatedRoute, Router} from "@angular/router";
import {map, tap} from "rxjs";

@Component({
  selector: 'pok-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {
  tagId: string
  isSaving: boolean = false;
  readonly palette = defaultEditorColors;
  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    color: [null, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private tagService: TagService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')), // получаем id которую мы указали в роутинге(adminRouting) у активной страницы
      tap((id => this.tagId = id) // в переменную записываем id
      )
    ).subscribe(
      () => {
        if (this.tagId !== 'new') {
          this.tagService.getById(+this.tagId).subscribe(
            tag => {
              this.form.patchValue(tag)
            }
          )
        }
      }
    )
  }

  update() {
    this.isSaving = true
    const sand = {
      tag: {
        name: this.form.get('name').value,
        color: this.form.get('color').value
      }
    }
    this.tagService.update(sand, +this.tagId).subscribe({
      next: () => {
        this.router.navigate(['/admin', 'tags-list'])
        this.isSaving = false
        this.alertService.open(`Тэг успешно отредактирован`, {label: `Успешно!`, status: TuiNotification.Success}).subscribe();
      },//если запрос выполняется успешно
      error: err => {
        this.alertService.open('Произошла ошибка, попробуйте еще раз!', {
          label: `Ошибка!`,
          status: TuiNotification.Error
        }).subscribe();//если происходит ошибка
        this.isSaving = false
      }
    })

  }


  create() {
    this.isSaving = true
    const sand = {
      tag: {
        name: this.form.get('name').value,
        color: this.form.get('color').value
      }
    }
    this.tagService.create(sand).subscribe({
      next: () => {
        this.router.navigate(['/admin', 'tags-list'])
        this.isSaving = false
        this.alertService.open(`Тэг успешно создан`, {label: `Успешно!`, status: TuiNotification.Success}).subscribe();
      },//если запрос выполняется успешно
      error: err => {
        this.alertService.open('Произошла ошибка, попробуйте еще раз!', {
          label: `Ошибка!`,
          status: TuiNotification.Error
        }).subscribe();//если происходит ошибка
        this.isSaving = false
      }
    })

  }

  onSubmit() {
    if(this.tagId === 'new'){
      this.create()
    } else
    this.update()
  }
}
