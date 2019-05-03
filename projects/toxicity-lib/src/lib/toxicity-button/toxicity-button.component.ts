import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import {
  faCoffee,
  faQuestionCircle,
  faSync
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { ToxicityLibService } from "../toxicity-lib.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "lib-toxicity-button",
  templateUrl: "./toxicity-button.component.html",
  styleUrls: ["./toxicity-button.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToxicityButtonComponent implements OnInit, OnDestroy {
  @Input() valid: boolean;
  @Input() analyzed: boolean;
  @Output() analyze: EventEmitter<void> = new EventEmitter();
  analyzing$: Subscription;
  icon: string = "question";

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private toxicityService: ToxicityLibService
  ) {
    this.matIconRegistry.addSvgIconLiteral(
      "coffee",
      this.sanitizer.bypassSecurityTrustHtml(icon(faCoffee).html.join(""))
    );
    this.matIconRegistry.addSvgIconLiteral(
      "question",
      this.sanitizer.bypassSecurityTrustHtml(
        icon(faQuestionCircle).html.join("")
      )
    );
    this.matIconRegistry.addSvgIconLiteral(
      "sync",
      this.sanitizer.bypassSecurityTrustHtml(icon(faSync).html.join(""))
    );
  }

  ngOnInit() {
    this.analyzing$ = this.toxicityService.analyzing$.subscribe(analyzing => {
      if (analyzing) {
        this.icon = "sync";
      } else {
        if (this.analyzed) {
          this.icon = "coffee";
        } else {
          this.icon = "question";
        }
      }
    });
  }

  ngOnDestroy() {
    this.analyzing$.unsubscribe();
  }

  submit() {
    this.analyze.emit();
  }
}
