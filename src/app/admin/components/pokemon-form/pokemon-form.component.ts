import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PokemonService} from "../../services/pokemon.service";
import {TagService} from "../../services/tag.service";
import {Tag} from "../../models/tag";
import {TuiContextWithImplicit, TuiStringHandler} from "@taiga-ui/cdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {map, Subject, tap} from "rxjs";
import {TuiFileLike} from "@taiga-ui/kit";

@Component({
  selector: 'pok-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  tags: Tag[] = [];
  pokemonId: string
  isSaving: boolean = false;
  readonly stringify: TuiStringHandler<any | TuiContextWithImplicit<Tag>> = item =>
    'name' in item ? item.name : item.$implicit.name

  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    height: [null, Validators.required],
    weight: [null, Validators.required],
    tags: [[], Validators.required],
    description: [null, Validators.required],
    abilities: this.fb.array([], Validators.required),
    level: [null, Validators.required],
    hp: [null, Validators.required],
    attack: [null, Validators.required],
    defend: [null, Validators.required],
    stamina: [null, Validators.required],
    spd: [null, Validators.required],
    staticImage: [null],
    staticImageUrl: [null]
  })
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();


  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    private tagService: TagService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
  ) {
  }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      map(params => params.get('id')),
      tap(id => this.pokemonId = id)
    ).subscribe(
      () => {
        if (this.pokemonId !== 'new') {
          this.pokemonService.getById(+this.pokemonId).subscribe(
            pokemon => {
              this.form.patchValue(pokemon)
              pokemon.abilities.forEach(skill => {
                this.skill.push(this.fb.control(skill))
                console.log(this.form.value)
              })
            }
          )
        }
      }
    )
    this.getTags()
  }

  getTags() {
    this.tagService.getAll().subscribe(tags => {
      this.tags = tags
    })
  }


  createSendData() {
    return {
      pokemon: {
        name: this.form.get('name').value,
        height: this.form.get('height').value,
        weight: this.form.get('weight').value,
        tags: this.form.get('tags').value.map(t => t.id),
        description: this.form.get('description').value,
        abilities: this.form.get('abilities').value,
        level: this.form.get('level').value,
        hp: this.form.get('hp').value,
        attack: this.form.get('attack').value,
        defend: this.form.get('defend').value,
        stamina: this.form.get('stamina').value,
        spd: this.form.get('spd').value,
      }
    }
  }

  create() {
    this.isSaving = true
    const send = this.createSendData();
    this.pokemonService.create(send).subscribe({
      next: pokemon => {
        this.pokemonService.addStaticImage(this.form.get('staticImage').value, pokemon.id).subscribe(
          () => {
            this.isSaving = false
            this.router.navigate(['/admin', 'pokemon-list'])
            this.alertService.open(`Покемон успешно создан`, {
              label: `Успешно!`,
              status: TuiNotification.Success
            }).subscribe();
          }
        )
      },
      error: () => {
        this.alertService.open('Произошла ошибка, попробуйте еще раз!', {
          label: `Ошибка!`,
          status: TuiNotification.Error
        }).subscribe();
        this.isSaving = false
      }
    })
  }

  update() {
    this.isSaving = true
    const send = this.createSendData()
    this.pokemonService.update(send, +this.pokemonId).subscribe(
      {
        next: () => {
          if (this.form.get('staticImageUrl').value) {
             this.next();
          } else
            this.pokemonService.addStaticImage(this.form.get('staticImage').value, +this.pokemonId).subscribe(
              () => {
                this.next();
              }
            )
        },
        error: () => {
          this.alertService.open('Произошла ошибка, попробуйте еще раз!', {
            label: `Ошибка!`,
            status: TuiNotification.Error
          }).subscribe();
          this.isSaving = false
        }
      }
    )
  }

  get skill() {
    return this.form.get('abilities') as FormArray
  }

  deleteSkill(idx) {
    this.skill.removeAt(idx)
  }

  addSkill() {
    const newAbilities = this.fb.control('', Validators.required)
    this.skill.push(newAbilities)
  }

  onSubmit() {
    if (this.pokemonId === 'new') {
      this.create()
    } else this.update()

  }

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.form.get('staticImage').setValue(null);
  }


  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  onRemoveImage() {
    this.form.get('staticImageUrl').patchValue(null)
  }

  next() {
    this.isSaving = false
    this.router.navigate(['/admin', 'pokemon-list'])
    this.alertService.open(`Покемон успешно отредактирован`, {
      label: `Успешно!`,
      status: TuiNotification.Success
    }).subscribe();
  }
}
