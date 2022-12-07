import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../../models/pokemon";

@Component({
  selector: 'pok-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon // получаем одного покемона из pokemon-list и передаем его дальше в шаблон

  constructor() {
  }

  ngOnInit(): void {

  }

}
