import { NgModule } from "@angular/core";
import { ToxicityLibComponent } from "./toxicity-lib.component";
import { ToxicityContainerComponent } from "./toxicity-container/toxicity-container.component";

@NgModule({
  declarations: [ToxicityLibComponent, ToxicityContainerComponent],
  imports: [],
  exports: [ToxicityLibComponent, ToxicityContainerComponent],
  entryComponents: [ToxicityLibComponent, ToxicityContainerComponent]
})
export class ToxicityLibModule {}
