import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  Input,
  AfterViewInit
} from "@angular/core";
import { ToxicityLibService } from "../toxicity-lib.service";
import { take } from "rxjs/operators";

@Component({
  selector: "lib-toxicity-popup",
  templateUrl: "./toxicity-popup.component.html",
  styleUrls: ["./toxicity-popup.component.css"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ToxicityPopupComponent implements AfterViewInit {
  @Input() texttoanalyze: string;
  analyzed: boolean = false;
  jerk: boolean = false;

  constructor(
    private toxicityService: ToxicityLibService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    console.log(this.texttoanalyze);
    this.cd.markForCheck();
    this.cd.detectChanges();
    if (this.texttoanalyze) {
      this.analyze();
    }
  }

  analyze() {
    this.toxicityService.analyzed = false;
    this.toxicityService.analyze(this.texttoanalyze).then(predictions => {
      this.toxicityService.analyzed = true;
      this.analyzed = true;
      predictions.forEach(pred => {
        if (pred.label === "toxicity") {
          if (pred.results.filter(res => res.match).length > 0) {
            this.jerk = true;
            this.cd.markForCheck();
            this.cd.detectChanges();
          }
        }
      });
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }
}
