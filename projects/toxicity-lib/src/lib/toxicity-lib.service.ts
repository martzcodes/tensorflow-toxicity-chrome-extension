import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as tf from "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";
import { filter, switchMap, take } from "rxjs/operators";

const threshold = 0.9;

@Injectable({
  providedIn: "root"
})
export class ToxicityLibService {
  predictions$: BehaviorSubject<any> = new BehaviorSubject(null);
  analyzing$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  toxicityModel$: BehaviorSubject<
    toxicity.ToxicityClassifier
  > = new BehaviorSubject(null);

  valid$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _valid: boolean;
  get valid() {
    return this._valid;
  }
  set valid(val: boolean) {
    this._valid = val;
    this.valid$.next(val);
  }

  analyzed$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _analyzed: boolean;
  get analyzed() {
    return this._analyzed;
  }
  set analyzed(val: boolean) {
    this._analyzed = val;
    this.analyzed$.next(val);
  }

  constructor() {
    this.init();
  }

  init() {
    console.log("loading toxicity model...");
    toxicity.load(threshold, []).then(model => {
      console.log("toxicity model loaded");
      this.toxicityModel$.next(model);
    });
  }

  analyze(textToAnalyze: string) {
    console.log(`Analyzing: ${textToAnalyze}`);
    this.analyzing$.next(true);
    this.predictions$.next(null);
    return this.toxicityModel$
      .pipe(
        filter(model => {
          if (model) {
            return true;
          } else {
            return false;
          }
        }),
        switchMap(model => {
          return model.classify(textToAnalyze).then(predictions => {
            console.log("Predictions:", predictions);
            this.predictions$.next(predictions);
            this.analyzing$.next(false);
            return predictions;
          });
        }),
        take(1)
      )
      .toPromise();
  }
}
