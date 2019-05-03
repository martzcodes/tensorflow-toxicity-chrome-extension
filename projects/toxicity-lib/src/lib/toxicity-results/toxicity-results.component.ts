import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { ToxicityLibService } from "../toxicity-lib.service";
import { text } from "@angular/core/src/render3";
import { Observable } from "rxjs";

@Component({
  selector: "lib-toxicity-results",
  templateUrl: "./toxicity-results.component.html",
  styleUrls: ["./toxicity-results.component.css"]
})
export class ToxicityResultsComponent implements OnInit {
  faCoffee = faCoffee;
  assigned: Node;
  predictions$: Observable<any>;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private toxicityService: ToxicityLibService
  ) {
    this.matIconRegistry.addSvgIconLiteral(
      "coffee",
      sanitizer.bypassSecurityTrustHtml(icon(faCoffee).html.join(""))
    );
    this.predictions$ = this.toxicityService.predictions$;
  }

  ngOnInit() {}

  slotChange($event) {
    this.assigned = $event.target.assignedNodes()[0];
    console.log($event);
    console.log(this.assigned);
  }

  analyze() {
    const textToAnalyze = (this.assigned as HTMLTextAreaElement).value;
    this.toxicityService.analyze(textToAnalyze);
  }
}
