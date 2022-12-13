import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../../../admin/models/pokemon";
import {Tag} from "../../../admin/models/tag";

@Component({
  selector: 'pok-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon
  tags: Tag[] = []

  constructor() {
  }

  ngOnInit(): void {
    this.tags = this.pokemon.tags
  }

}
