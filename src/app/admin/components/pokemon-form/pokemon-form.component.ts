import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'pok-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: [null],
    description: [null],
  })

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
  }

}
