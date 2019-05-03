import { NgModule } from "@angular/core";
import { ToxicityLibComponent } from "./toxicity-lib.component";
import { ToxicityContainerComponent } from "./toxicity-container/toxicity-container.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatChipsModule
} from "@angular/material";
import { ToxicityResultsComponent } from "./toxicity-results/toxicity-results.component";
import { ToxicityButtonComponent } from "./toxicity-button/toxicity-button.component";

@NgModule({
  declarations: [
    ToxicityLibComponent,
    ToxicityContainerComponent,
    ToxicityResultsComponent,
    ToxicityButtonComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule
  ],
  exports: [
    ToxicityLibComponent,
    ToxicityContainerComponent,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule
  ],
  entryComponents: [ToxicityLibComponent, ToxicityContainerComponent]
})
export class ToxicityLibModule {}
