import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ToxicityLibModule } from "projects/toxicity-lib/src/public-api";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ToxicityLibModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
