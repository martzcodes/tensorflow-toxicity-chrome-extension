import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from "@angular/core";
import { ToxicityLibService } from "../toxicity-lib.service";

@Component({
  selector: "lib-toxicity-container",
  templateUrl: "./toxicity-container.component.html",
  styleUrls: ["./toxicity-container.component.css"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ToxicityContainerComponent {
  assigned: Node;
  textToAnalyze: string;
  valid: boolean;
  analyzed: boolean;

  @ViewChild("slot") public slot: ElementRef;
  @ViewChild("toxicButton") public toxicButton: ElementRef;
  @ViewChild("results") public results: ElementRef;

  constructor(
    private toxicityService: ToxicityLibService,
    private cd: ChangeDetectorRef
  ) {}

  slotChange($event) {
    console.log(this.slot);
    console.log(this.toxicButton);
    console.log(this.results);

    this.assigned = $event.target.assignedNodes()[0];
    (this.assigned as any).oninput = ev => {
      if (this.textToAnalyze !== (this.assigned as HTMLTextAreaElement).value) {
        this.textToAnalyze = (this.assigned as HTMLTextAreaElement).value;
        if (this.toxicityService.analyzed) {
          this.toxicityService.valid = true;
        } else {
          if (this.textToAnalyze.length === 0) {
            this.toxicityService.valid = false;
          } else {
            this.toxicityService.valid = true;
          }
        }
      }
      this.cd.detectChanges();
    };
  }

  analyze() {
    const textToAnalyze = (this.assigned as HTMLTextAreaElement).value;
    this.toxicityService.analyzed = false;
    this.toxicityService.analyze(textToAnalyze).then(() => {
      this.toxicityService.analyzed = true;
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }
}
