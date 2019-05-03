import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// import {
//   ToxicityLibModule,
//   ToxicityContainerComponent,
//   ToxicityLibComponent
// } from "../../../toxicity-lib/src/public-api";
// import { createCustomElement } from "@angular/elements";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  // constructor(private injector: Injector) {
  //   const toxicContainer = createCustomElement(ToxicityContainerComponent, {
  //     injector: this.injector
  //   });
  //   customElements.define("toxicity-container", toxicContainer);
  //   const toxicLib = createCustomElement(ToxicityLibComponent, {
  //     injector: this.injector
  //   });
  //   customElements.define("toxicity-lib", toxicLib);
  // }
}
