import { Component, ChangeDetectorRef } from "@angular/core";
import { ToxicityLibService } from "../toxicity-lib.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ChangeDetectionStrategy } from "@angular/compiler/src/core";

@Component({
  selector: "lib-toxicity-results",
  templateUrl: "./toxicity-results.component.html",
  styleUrls: ["./toxicity-results.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToxicityResultsComponent {
  predictions$: Observable<any>;

  constructor(
    private toxicityService: ToxicityLibService,
    private cd: ChangeDetectorRef
  ) {
    this.predictions$ = this.toxicityService.predictions$.pipe(
      tap(predictions => {
        this.cd.markForCheck();
      })
    );
  }
}
