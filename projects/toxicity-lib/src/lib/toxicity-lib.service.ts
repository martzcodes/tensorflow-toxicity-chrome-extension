import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as tf from "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";

const threshold = 0.9;

@Injectable({
  providedIn: "root"
})
export class ToxicityLibService {
  predictions$: BehaviorSubject<any> = new BehaviorSubject(null);
  analyzing$: BehaviorSubject<any> = new BehaviorSubject(false);
  toxicityModel: toxicity.ToxicityClassifier = null;

  constructor() {
    this.init();
  }

  init() {
    console.log("loading toxicity model...");
    toxicity.load(threshold, []).then(model => {
      console.log("toxicity model loaded");
      this.toxicityModel = model;
    });
  }

  analyze(textToAnalyze: string) {
    this.analyzing$.next(true);
    this.predictions$.next(null);
    return this.toxicityModel.classify(textToAnalyze).then(predictions => {
      this.predictions$.next(predictions);
      this.analyzing$.next(false);
    });
  }
}
