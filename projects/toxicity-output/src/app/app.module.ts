import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import {
  ToxicityLibModule,
  ToxicityContainerComponent,
  ToxicityPopupComponent
} from "../../../toxicity-lib/src/public-api";
import { createCustomElement } from "@angular/elements";

@NgModule({
  declarations: [],
  imports: [BrowserModule, ToxicityLibModule],
  providers: [],
  bootstrap: [],
  entryComponents: [ToxicityContainerComponent, ToxicityPopupComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    console.log("toxicity output constructor");
  }

  ngDoBootstrap() {
    console.log("bootstrapping");
    const toxicContainer = createCustomElement(ToxicityContainerComponent, {
      injector: this.injector
    });
    customElements.define("toxicity-container", toxicContainer);
    const toxicPopup = createCustomElement(ToxicityPopupComponent, {
      injector: this.injector
    });
    customElements.define("toxicity-popup", toxicPopup);
  }
}
