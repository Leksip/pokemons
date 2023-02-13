import {Component, OnInit} from '@angular/core';
import {animate, group, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'pok-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        query(':enter, :leave', style({position: 'fixed', width: '100%'}), {
          optional: true,
        }),
        group([
          query(
            ':enter',
            [
              style({transform: 'translateX(100%)'}),
              animate('0.5s ease-in-out', style({transform: 'translateX(0%)'})),
            ],
            {optional: true}
          ),
          query(
            ':leave',
            [
              style({transform: 'translateX(0%)'}),
              animate(
                '0.5s ease-in-out',
                style({transform: 'translateX(-100%)'})
              ),
            ],
            {optional: true}
          ),
        ]),
      ]),
    ])
  ]
})
export class LayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
