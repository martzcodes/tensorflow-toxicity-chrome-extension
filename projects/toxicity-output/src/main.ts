import "hammerjs";

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import "@webcomponents/custom-elements";
import "@webcomponents/custom-elements/src/native-shim.js";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, { ngZone: "noop" })
  .catch(err => console.error(err));
