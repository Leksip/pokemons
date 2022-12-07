import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from "@angular/router";
import { DashboardComponent } from '../components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    DashboardComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class LayoutModule { }
