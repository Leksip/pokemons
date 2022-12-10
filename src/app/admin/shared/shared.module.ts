import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiDataListModule} from "@taiga-ui/core";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiInputModule,
    TuiButtonModule,
    TuiMultiSelectModule,
    TuiDataListWrapperModule,
    TuiDataListModule,
  ],
  exports: [
    TuiInputModule,
    TuiButtonModule,
    TuiMultiSelectModule,
    TuiDataListWrapperModule,
    TuiDataListModule,

  ]
})
export class SharedModule { }
