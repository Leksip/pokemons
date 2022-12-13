import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule} from "@taiga-ui/core";


import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRouting} from './app.routing';
import {AppComponent} from './app.component';
import {AdminModule} from "./admin/admin.module";
import {PublicModule} from "./public/public.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {of} from "rxjs";
import {TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE} from '@taiga-ui/i18n';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    AdminModule,
    PublicModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    FormsModule,
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}, {
    provide: LOCALE_ID,
    deps: [],
    useFactory: () => 'ru-RU'
  }, {provide: TUI_LANGUAGE, useValue: of(TUI_RUSSIAN_LANGUAGE)}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
