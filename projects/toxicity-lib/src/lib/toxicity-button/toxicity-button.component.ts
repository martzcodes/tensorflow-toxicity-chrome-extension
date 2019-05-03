import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
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
import { Observable, Subscription, BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "lib-toxicity-button",
  templateUrl: "./toxicity-button.component.html",
  styleUrls: ["./toxicity-button.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToxicityButtonComponent implements OnInit {
  @Output() analyze: EventEmitter<void> = new EventEmitter();
  valid$: Observable<boolean>;
  icon$: Observable<string>;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private toxicityService: ToxicityLibService,
    private cd: ChangeDetectorRef
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
    this.valid$ = this.toxicityService.valid$.pipe(
      tap(valid => {
        this.cd.markForCheck();
        this.cd.detectChanges();
      })
    );
    this.icon$ = this.toxicityService.analyzing$.pipe(
      map(analyzing => {
        let icon = "coffee";
        if (analyzing) {
          icon = "sync";
        } else {
          if (this.toxicityService.analyzed) {
            icon = "coffee";
          } else {
            icon = "question";
          }
        }
        return icon;
      }),
      tap(() => {
        this.cd.markForCheck();
        this.cd.detectChanges();
      })
    );
  }

  submit() {
    this.analyze.emit();
  }
}
