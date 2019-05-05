import { NgModule } from "@angular/core";
import { ToxicityContainerComponent } from "./toxicity-container/toxicity-container.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  MatButtonModule,
  MatIconModule,
  MatChipsModule
} from "@angular/material";
import { ToxicityResultsComponent } from "./toxicity-results/toxicity-results.component";
import { ToxicityButtonComponent } from "./toxicity-button/toxicity-button.component";

import "hammerjs";
import { ToxicityPopupComponent } from "./toxicity-popup/toxicity-popup.component";

@NgModule({
  declarations: [
    ToxicityContainerComponent,
    ToxicityResultsComponent,
    ToxicityButtonComponent,
    ToxicityPopupComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  exports: [
    ToxicityContainerComponent,
    ToxicityPopupComponent,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  entryComponents: [ToxicityContainerComponent, ToxicityPopupComponent]
})
export class ToxicityLibModule {}
