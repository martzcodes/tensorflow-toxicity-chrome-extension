import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ToxicityLibService } from "../toxicity-lib.service";

@Component({
  selector: "lib-toxicity-container",
  templateUrl: "./toxicity-container.component.html",
  styleUrls: ["./toxicity-container.component.css"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ToxicityContainerComponent implements OnInit {
  assigned: Node;
  textToAnalyze: string;
  valid: boolean;
  analyzed: boolean;

  constructor(private toxicityService: ToxicityLibService) {}

  ngOnInit() {}

  slotChange($event) {
    this.assigned = $event.target.assignedNodes()[0];
    (this.assigned as any).oninput = ev => {
      if (this.textToAnalyze !== (this.assigned as HTMLTextAreaElement).value) {
        this.textToAnalyze = (this.assigned as HTMLTextAreaElement).value;
        if (this.analyzed) {
          this.valid = true;
        } else {
          if (this.textToAnalyze.length === 0) {
            this.valid = false;
          } else {
            this.valid = true;
          }
        }
      }
    };
  }

  analyze() {
    const textToAnalyze = (this.assigned as HTMLTextAreaElement).value;
    this.analyzed = false;
    this.toxicityService.analyze(textToAnalyze).then(() => {
      this.analyzed = true;
    });
  }
}
