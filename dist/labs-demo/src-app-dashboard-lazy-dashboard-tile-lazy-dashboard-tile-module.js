(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-dashboard-lazy-dashboard-tile-lazy-dashboard-tile-module"],{

/***/ "./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9sYXp5LWRhc2hib2FyZC10aWxlL2xhenktZGFzaGJvYXJkLXRpbGUuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"header\">\n    <h1 class=\"title\">Lazy</h1>\n  </div>\n  <div class=\"content\">\n    <div style=\"height:200px;\">\n      <ngx-charts-bar-vertical [xAxis]=\"true\" [results]=\"data\">\n      </ngx-charts-bar-vertical>\n\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.component.ts ***!
  \********************************************************************************/
/*! exports provided: LazyDashboardTileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyDashboardTileComponent", function() { return LazyDashboardTileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var LazyDashboardTileComponent = /** @class */ (function () {
    function LazyDashboardTileComponent() {
        this.data = {};
    }
    LazyDashboardTileComponent.prototype.ngOnInit = function () {
        this.data = [
            {
                name: 'a',
                value: this.a
            },
            {
                name: 'b',
                value: this.b
            },
            {
                name: 'c',
                value: this.c
            }
        ];
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], LazyDashboardTileComponent.prototype, "a", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], LazyDashboardTileComponent.prototype, "b", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], LazyDashboardTileComponent.prototype, "c", void 0);
    LazyDashboardTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-lazy-dashboard-tile',
            template: __webpack_require__(/*! ./lazy-dashboard-tile.component.html */ "./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.component.html"),
            styles: [__webpack_require__(/*! ./lazy-dashboard-tile.component.css */ "./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LazyDashboardTileComponent);
    return LazyDashboardTileComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.module.ts ***!
  \*****************************************************************************/
/*! exports provided: LazyDashboardTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyDashboardTileModule", function() { return LazyDashboardTileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _lazy_dashboard_tile_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lazy-dashboard-tile.component */ "./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.component.ts");
/* harmony import */ var _angular_elements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/elements */ "./node_modules/@angular/elements/fesm5/elements.js");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/release/esm.js");






var LazyDashboardTileModule = /** @class */ (function () {
    function LazyDashboardTileModule(injector) {
        this.injector = injector;
        var lazyTileCE = Object(_angular_elements__WEBPACK_IMPORTED_MODULE_4__["createCustomElement"])(_lazy_dashboard_tile_component__WEBPACK_IMPORTED_MODULE_3__["LazyDashboardTileComponent"], { injector: this.injector });
        customElements.define('lazy-dashboard-tile', lazyTileCE);
    }
    LazyDashboardTileModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_5__["NgxChartsModule"]
            ],
            declarations: [
                _lazy_dashboard_tile_component__WEBPACK_IMPORTED_MODULE_3__["LazyDashboardTileComponent"]
            ],
            entryComponents: [
                _lazy_dashboard_tile_component__WEBPACK_IMPORTED_MODULE_3__["LazyDashboardTileComponent"]
            ]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"]])
    ], LazyDashboardTileModule);
    return LazyDashboardTileModule;
}());



/***/ })

}]);
//# sourceMappingURL=src-app-dashboard-lazy-dashboard-tile-lazy-dashboard-tile-module.js.map