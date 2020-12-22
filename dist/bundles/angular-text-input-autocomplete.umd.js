(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('textarea-caret'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-text-input-autocomplete', ['exports', '@angular/core', 'rxjs', 'textarea-caret', 'rxjs/operators', '@angular/common'], factory) :
    (factory((global['angular-text-input-autocomplete'] = {}),global.ng.core,global.rxjs,global.getCaretCoordinates,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,rxjs,getCaretCoordinates,operators,common) { 'use strict';

    getCaretCoordinates = getCaretCoordinates && getCaretCoordinates.hasOwnProperty('default') ? getCaretCoordinates['default'] : getCaretCoordinates;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TextInputAutocompleteMenuComponent = (function () {
        function TextInputAutocompleteMenuComponent() {
            this.selectChoice = new rxjs.Subject();
            this.choiceLoading = false;
            this.trackById = function (index, choice) {
                return typeof choice.id !== 'undefined' ? choice.id : choice;
            };
        }
        Object.defineProperty(TextInputAutocompleteMenuComponent.prototype, "choices", {
            get: /**
             * @return {?}
             */ function () {
                return this._choices;
            },
            set: /**
             * @param {?} choices
             * @return {?}
             */ function (choices) {
                this._choices = choices;
                if (choices.indexOf(this.activeChoice) === -1 && choices.length > 0) {
                    this.activeChoice = choices[0];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInputAutocompleteMenuComponent.prototype, "top", {
            get: /**
             * @return {?}
             */ function () {
                var /** @type {?} */ screenHeight = window.screen.height;
                var /** @type {?} */ menuHeight = this.dropdownMenuElement
                    ? this.dropdownMenuElement.nativeElement.offsetHeight
                    : 0;
                return this.position.top + menuHeight < screenHeight
                    ? this.position.top
                    : this.position.top - menuHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInputAutocompleteMenuComponent.prototype, "left", {
            get: /**
             * @return {?}
             */ function () {
                var /** @type {?} */ screenWidth = window.screen.width;
                var /** @type {?} */ menuWidth = this.dropdownMenuElement
                    ? this.dropdownMenuElement.nativeElement.offsetWidth
                    : 0;
                return this.position.left + menuWidth < screenWidth
                    ? this.position.left
                    : this.position.left - menuWidth;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} event
         * @return {?}
         */
        TextInputAutocompleteMenuComponent.prototype.onArrowDown = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                event.preventDefault();
                var /** @type {?} */ index = this.choices.indexOf(this.activeChoice);
                if (this.choices[index + 1]) {
                    this.scrollToChoice(index + 1);
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        TextInputAutocompleteMenuComponent.prototype.onArrowUp = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                event.preventDefault();
                var /** @type {?} */ index = this.choices.indexOf(this.activeChoice);
                if (this.choices[index - 1]) {
                    this.scrollToChoice(index - 1);
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        TextInputAutocompleteMenuComponent.prototype.onEnter = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.choices.indexOf(this.activeChoice) > -1) {
                    event.preventDefault();
                    this.selectChoice.next(this.activeChoice);
                }
            };
        /**
         * @param {?} index
         * @return {?}
         */
        TextInputAutocompleteMenuComponent.prototype.scrollToChoice = /**
         * @param {?} index
         * @return {?}
         */
            function (index) {
                this.activeChoice = this._choices[index];
                if (this.dropdownMenuElement) {
                    var /** @type {?} */ ulPosition = this.dropdownMenuElement.nativeElement.getBoundingClientRect();
                    var /** @type {?} */ li = this.dropdownMenuElement.nativeElement.children[index];
                    var /** @type {?} */ liPosition = li.getBoundingClientRect();
                    if (liPosition.top < ulPosition.top) {
                        li.scrollIntoView();
                    }
                    else if (liPosition.bottom > ulPosition.bottom) {
                        li.scrollIntoView(false);
                    }
                }
            };
        TextInputAutocompleteMenuComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-text-input-autocomplete-menu',
                        template: "\n    <div\n      *ngIf=\"choices?.length > 0\"\n      #dropdownMenu\n      class=\"dropdown-menu\">\n        <a  *ngFor=\"let choice of choices; trackBy:trackById\"\n        [class.active]=\"activeChoice === choice\"\n          (click)=\"selectChoice.next(choice)\" class=\"dropdown-item\">\n          {{ choice }}\n        </a>\n    </div>\n  ",
                        styles: [
                            "\n      :host {\n        z-index: 100000;\n        position: fixed;\n      }\n      .dropdown-menu {\n        display: block;\n        max-height: 200px;\n        overflow-y: auto;\n      }\n    "
                        ]
                    },] },
        ];
        TextInputAutocompleteMenuComponent.propDecorators = {
            dropdownMenuElement: [{ type: core.ViewChild, args: ['dropdownMenu',] }],
            top: [{ type: core.HostBinding, args: ['style.top.px',] }],
            left: [{ type: core.HostBinding, args: ['style.left.px',] }],
            onArrowDown: [{ type: core.HostListener, args: ['document:keydown.ArrowDown', ['$event'],] }],
            onArrowUp: [{ type: core.HostListener, args: ['document:keydown.ArrowUp', ['$event'],] }],
            onEnter: [{ type: core.HostListener, args: ['document:keydown.Enter', ['$event'],] }]
        };
        return TextInputAutocompleteMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TextInputAutocompleteDirective = (function () {
        function TextInputAutocompleteDirective(componentFactoryResolver, viewContainerRef, appRef, injector, elm) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.viewContainerRef = viewContainerRef;
            this.appRef = appRef;
            this.injector = injector;
            this.elm = elm;
            /**
             * The character that will trigger the menu to appear
             */
            this.triggerCharacter = '@';
            /**
             * The regular expression that will match the search text after the trigger character
             */
            this.searchRegexp = /^\w*$/;
            /**
             * The menu component to show with available options.
             * You can extend the built in `TextInputAutocompleteMenuComponent` component to use a custom template
             */
            this.menuComponent = TextInputAutocompleteMenuComponent;
            /**
             * Called when the options menu is shown
             */
            this.menuShown = new core.EventEmitter();
            /**
             * Called when the options menu is hidden
             */
            this.menuHidden = new core.EventEmitter();
            /**
             * Called when a choice is selected
             */
            this.choiceSelected = new core.EventEmitter();
            /**
             * A function that formats the selected choice once selected.
             */
            this.getChoiceLabel = function (choice) { return choice; };
            this.menuHidden$ = new rxjs.Subject();
        }
        /**
         * @param {?} key
         * @return {?}
         */
        TextInputAutocompleteDirective.prototype.onKeypress = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                if ((this.triggerCharacter !== '**' && key === this.triggerCharacter) ||
                    (this.triggerCharacter === '**' && /[a-z|A-Z]/.test(key))) {
                    this.showMenu();
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        TextInputAutocompleteDirective.prototype.onChange = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                var _this = this;
                if (this.menu) {
                    if (!value ||
                        (value[this.menu.triggerCharacterPosition] !== this.triggerCharacter &&
                            this.triggerCharacter !== '**')) {
                        this.hideMenu();
                    }
                    else {
                        var /** @type {?} */ cursor = this.elm.nativeElement.selectionStart;
                        if (cursor < this.menu.triggerCharacterPosition) {
                            this.hideMenu();
                        }
                        else {
                            var /** @type {?} */ searchText = value.slice(this.menu.triggerCharacterPosition +
                                (this.triggerCharacter === '**' ? 0 : 1), cursor);
                            if (!searchText.match(this.searchRegexp)) {
                                this.hideMenu();
                            }
                            else {
                                this.menu.component.instance.searchText = searchText;
                                this.menu.component.instance.choices = [];
                                this.menu.component.instance.choiceLoadError = undefined;
                                this.menu.component.instance.choiceLoading = true;
                                this.menu.component.changeDetectorRef.detectChanges();
                                Promise.resolve(this.findChoices(searchText))
                                    .then(function (choices) {
                                    if (_this.menu) {
                                        _this.menu.component.instance.choices = choices;
                                        _this.menu.component.instance.choiceLoading = false;
                                        _this.menu.component.changeDetectorRef.detectChanges();
                                    }
                                })
                                    .catch(function (err) {
                                    if (_this.menu) {
                                        _this.menu.component.instance.choiceLoading = false;
                                        _this.menu.component.instance.choiceLoadError = err;
                                        _this.menu.component.changeDetectorRef.detectChanges();
                                    }
                                });
                            }
                        }
                    }
                }
            };
        /**
         * @return {?}
         */
        TextInputAutocompleteDirective.prototype.onBlur = /**
         * @return {?}
         */
            function () {
                if (this.menu) {
                    this.menu.lastCaretPosition = this.elm.nativeElement.selectionStart;
                }
            };
        /**
         * @return {?}
         */
        TextInputAutocompleteDirective.prototype.showMenu = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.menu) {
                    var /** @type {?} */ menuFactory = this.componentFactoryResolver.resolveComponentFactory(this.menuComponent);
                    this.menu = {
                        component: this.viewContainerRef.createComponent(menuFactory, 0, this.injector),
                        triggerCharacterPosition: this.elm.nativeElement.selectionStart
                    };
                    //Get DOM element from component
                    this.menuElem = /** @type {?} */ (((this.menu.component.hostView))
                        .rootNodes[0]);
                    // Append Menu element to the body
                    document.body.appendChild(this.menuElem);
                    var /** @type {?} */ lineHeight = +((getComputedStyle(this.elm.nativeElement).lineHeight)).replace(/px$/, '');
                    var /** @type {?} */ elmPositionTop = this.elm.nativeElement.getBoundingClientRect().top;
                    var /** @type {?} */ elmPositionLeft = this.elm.nativeElement.getBoundingClientRect()
                        .left;
                    var _a = getCaretCoordinates(this.elm.nativeElement, this.elm.nativeElement.selectionStart), top_1 = _a.top, left = _a.left;
                    this.menu.component.instance.position = {
                        top: elmPositionTop + top_1 + lineHeight,
                        left: elmPositionLeft + left
                    };
                    this.menu.component.changeDetectorRef.detectChanges();
                    this.menu.component.instance.selectChoice
                        .pipe(operators.takeUntil(this.menuHidden$))
                        .subscribe(function (choice) {
                        var /** @type {?} */ label = _this.getChoiceLabel(choice);
                        var /** @type {?} */ textarea = _this.elm.nativeElement;
                        var /** @type {?} */ value = textarea.value;
                        var /** @type {?} */ startIndex = ((_this.menu)).triggerCharacterPosition;
                        var /** @type {?} */ start = value.slice(0, startIndex);
                        var /** @type {?} */ caretPosition = ((_this.menu)).lastCaretPosition || textarea.selectionStart;
                        var /** @type {?} */ end = value.slice(caretPosition);
                        textarea.value = start + label + end;
                        // force ng model / form control to update
                        textarea.dispatchEvent(new Event('input'));
                        _this.hideMenu();
                        var /** @type {?} */ setCursorAt = (start + label).length;
                        textarea.setSelectionRange(setCursorAt, setCursorAt);
                        textarea.focus();
                        _this.choiceSelected.emit({
                            choice: choice,
                            insertedAt: {
                                start: startIndex,
                                end: startIndex + label.length
                            }
                        });
                    });
                    this.menuShown.emit();
                }
            };
        /**
         * @return {?}
         */
        TextInputAutocompleteDirective.prototype.hideMenu = /**
         * @return {?}
         */
            function () {
                if (this.menu) {
                    this.menu.component.destroy();
                    this.menuHidden$.next();
                    this.menuHidden.emit();
                    this.menu = undefined;
                }
            };
        /**
         * @return {?}
         */
        TextInputAutocompleteDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.hideMenu();
            };
        TextInputAutocompleteDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'textarea[mwlTextInputAutocomplete],input[type="text"][mwlTextInputAutocomplete]'
                    },] },
        ];
        /** @nocollapse */
        TextInputAutocompleteDirective.ctorParameters = function () {
            return [
                { type: core.ComponentFactoryResolver },
                { type: core.ViewContainerRef },
                { type: core.ApplicationRef },
                { type: core.Injector },
                { type: core.ElementRef }
            ];
        };
        TextInputAutocompleteDirective.propDecorators = {
            triggerCharacter: [{ type: core.Input }],
            searchRegexp: [{ type: core.Input }],
            menuComponent: [{ type: core.Input }],
            menuShown: [{ type: core.Output }],
            menuHidden: [{ type: core.Output }],
            choiceSelected: [{ type: core.Output }],
            findChoices: [{ type: core.Input }],
            getChoiceLabel: [{ type: core.Input }],
            onKeypress: [{ type: core.HostListener, args: ['keypress', ['$event.key'],] }],
            onChange: [{ type: core.HostListener, args: ['input', ['$event.target.value'],] }],
            onBlur: [{ type: core.HostListener, args: ['blur',] }]
        };
        return TextInputAutocompleteDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TextInputAutocompleteContainerComponent = (function () {
        function TextInputAutocompleteContainerComponent() {
        }
        TextInputAutocompleteContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-text-input-autocomplete-container',
                        styles: [
                            "\n    :host {\n      position: relative;\n      display: block;\n    }\n  "
                        ],
                        template: '<ng-content></ng-content>'
                    },] },
        ];
        return TextInputAutocompleteContainerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TextInputAutocompleteModule = (function () {
        function TextInputAutocompleteModule() {
        }
        TextInputAutocompleteModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            TextInputAutocompleteDirective,
                            TextInputAutocompleteContainerComponent,
                            TextInputAutocompleteMenuComponent
                        ],
                        imports: [common.CommonModule],
                        exports: [
                            TextInputAutocompleteDirective,
                            TextInputAutocompleteContainerComponent,
                            TextInputAutocompleteMenuComponent
                        ],
                        entryComponents: [TextInputAutocompleteMenuComponent]
                    },] },
        ];
        return TextInputAutocompleteModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.TextInputAutocompleteMenuComponent = TextInputAutocompleteMenuComponent;
    exports.TextInputAutocompleteModule = TextInputAutocompleteModule;
    exports.ɵb = TextInputAutocompleteContainerComponent;
    exports.ɵa = TextInputAutocompleteDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9hbmd1bGFyLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBWaWV3Q2hpbGQsXG4gIEhvc3RCaW5kaW5nXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgKm5nSWY9XCJjaG9pY2VzPy5sZW5ndGggPiAwXCJcbiAgICAgICNkcm9wZG93bk1lbnVcbiAgICAgIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPlxuICAgICAgICA8YSAgKm5nRm9yPVwibGV0IGNob2ljZSBvZiBjaG9pY2VzOyB0cmFja0J5OnRyYWNrQnlJZFwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlQ2hvaWNlID09PSBjaG9pY2VcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RDaG9pY2UubmV4dChjaG9pY2UpXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCI+XG4gICAgICAgICAge3sgY2hvaWNlIH19XG4gICAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgOmhvc3Qge1xuICAgICAgICB6LWluZGV4OiAxMDAwMDA7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgIH1cbiAgICAgIC5kcm9wZG93bi1tZW51IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZCgnZHJvcGRvd25NZW51JykgZHJvcGRvd25NZW51RWxlbWVudDogRWxlbWVudFJlZjxIVE1MVUxpc3RFbGVtZW50PjtcbiAgcG9zaXRpb246IHsgdG9wOiBudW1iZXI7IGxlZnQ6IG51bWJlciB9O1xuICBzZWxlY3RDaG9pY2UgPSBuZXcgU3ViamVjdCgpO1xuICBhY3RpdmVDaG9pY2U6IGFueTtcbiAgc2VhcmNoVGV4dDogc3RyaW5nO1xuICBjaG9pY2VMb2FkRXJyb3I6IGFueTtcbiAgY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9jaG9pY2VzOiBhbnlbXTtcbiAgdHJhY2tCeUlkID0gKGluZGV4OiBudW1iZXIsIGNob2ljZTogYW55KSA9PlxuICAgIHR5cGVvZiBjaG9pY2UuaWQgIT09ICd1bmRlZmluZWQnID8gY2hvaWNlLmlkIDogY2hvaWNlO1xuXG4gIHNldCBjaG9pY2VzKGNob2ljZXM6IGFueVtdKSB7XG4gICAgdGhpcy5fY2hvaWNlcyA9IGNob2ljZXM7XG4gICAgaWYgKGNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSkgPT09IC0xICYmIGNob2ljZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5hY3RpdmVDaG9pY2UgPSBjaG9pY2VzWzBdO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaG9pY2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUudG9wLnB4JylcbiAgZ2V0IHRvcCgpIHtcbiAgICBjb25zdCBzY3JlZW5IZWlnaHQgPSB3aW5kb3cuc2NyZWVuLmhlaWdodDtcbiAgICBjb25zdCBtZW51SGVpZ2h0ID0gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50XG4gICAgICA/IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodFxuICAgICAgOiAwO1xuXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24udG9wICsgbWVudUhlaWdodCA8IHNjcmVlbkhlaWdodFxuICAgICAgPyB0aGlzLnBvc2l0aW9uLnRvcFxuICAgICAgOiB0aGlzLnBvc2l0aW9uLnRvcCAtIG1lbnVIZWlnaHQ7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5sZWZ0LnB4JylcbiAgZ2V0IGxlZnQoKSB7XG4gICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuc2NyZWVuLndpZHRoO1xuICAgIGNvbnN0IG1lbnVXaWR0aCA9IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudFxuICAgICAgPyB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aFxuICAgICAgOiAwO1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLmxlZnQgKyBtZW51V2lkdGggPCBzY3JlZW5XaWR0aFxuICAgICAgPyB0aGlzLnBvc2l0aW9uLmxlZnRcbiAgICAgIDogdGhpcy5wb3NpdGlvbi5sZWZ0IC0gbWVudVdpZHRoO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5BcnJvd0Rvd24nLCBbJyRldmVudCddKVxuICBvbkFycm93RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgaWYgKHRoaXMuY2hvaWNlc1tpbmRleCArIDFdKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQ2hvaWNlKGluZGV4ICsgMSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5BcnJvd1VwJywgWyckZXZlbnQnXSlcbiAgb25BcnJvd1VwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICBpZiAodGhpcy5jaG9pY2VzW2luZGV4IC0gMV0pIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9DaG9pY2UoaW5kZXggLSAxKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLkVudGVyJywgWyckZXZlbnQnXSlcbiAgb25FbnRlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSkgPiAtMSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VsZWN0Q2hvaWNlLm5leHQodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9DaG9pY2UoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlQ2hvaWNlID0gdGhpcy5fY2hvaWNlc1tpbmRleF07XG4gICAgaWYgKHRoaXMuZHJvcGRvd25NZW51RWxlbWVudCkge1xuICAgICAgY29uc3QgdWxQb3NpdGlvbiA9IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgbGkgPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZHJlbltpbmRleF07XG4gICAgICBjb25zdCBsaVBvc2l0aW9uID0gbGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAobGlQb3NpdGlvbi50b3AgPCB1bFBvc2l0aW9uLnRvcCkge1xuICAgICAgICBsaS5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgfSBlbHNlIGlmIChsaVBvc2l0aW9uLmJvdHRvbSA+IHVsUG9zaXRpb24uYm90dG9tKSB7XG4gICAgICAgIGxpLnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBBcHBsaWNhdGlvblJlZixcbiAgRW1iZWRkZWRWaWV3UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGdldENhcmV0Q29vcmRpbmF0ZXMgZnJvbSAndGV4dGFyZWEtY2FyZXQnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENob2ljZVNlbGVjdGVkRXZlbnQge1xuICBjaG9pY2U6IGFueTtcbiAgaW5zZXJ0ZWRBdDoge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG4gIH07XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAndGV4dGFyZWFbbXdsVGV4dElucHV0QXV0b2NvbXBsZXRlXSxpbnB1dFt0eXBlPVwidGV4dFwiXVttd2xUZXh0SW5wdXRBdXRvY29tcGxldGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGNoYXJhY3RlciB0aGF0IHdpbGwgdHJpZ2dlciB0aGUgbWVudSB0byBhcHBlYXJcbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJDaGFyYWN0ZXI6IHN0cmluZyA9ICdAJztcblxuICAvKipcbiAgICogVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0aGF0IHdpbGwgbWF0Y2ggdGhlIHNlYXJjaCB0ZXh0IGFmdGVyIHRoZSB0cmlnZ2VyIGNoYXJhY3RlclxuICAgKi9cbiAgQElucHV0KCkgc2VhcmNoUmVnZXhwID0gL15cXHcqJC87XG5cbiAgLyoqXG4gICAqIFRoZSBtZW51IGNvbXBvbmVudCB0byBzaG93IHdpdGggYXZhaWxhYmxlIG9wdGlvbnMuXG4gICAqIFlvdSBjYW4gZXh0ZW5kIHRoZSBidWlsdCBpbiBgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudGAgY29tcG9uZW50IHRvIHVzZSBhIGN1c3RvbSB0ZW1wbGF0ZVxuICAgKi9cbiAgQElucHV0KCkgbWVudUNvbXBvbmVudCA9IFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBvcHRpb25zIG1lbnUgaXMgc2hvd25cbiAgICovXG4gIEBPdXRwdXQoKSBtZW51U2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBvcHRpb25zIG1lbnUgaXMgaGlkZGVuXG4gICAqL1xuICBAT3V0cHV0KCkgbWVudUhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBjaG9pY2UgaXMgc2VsZWN0ZWRcbiAgICovXG4gIEBPdXRwdXQoKSBjaG9pY2VTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2hvaWNlU2VsZWN0ZWRFdmVudD4oKTtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgYSBzZWFyY2ggc3RyaW5nIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIGNob2ljZXMuIENhbiBhbHNvIHJldHVybiBhIHByb21pc2UuXG4gICAqL1xuICBASW5wdXQoKSBmaW5kQ2hvaWNlczogKHNlYXJjaFRleHQ6IHN0cmluZykgPT4gYW55W10gfCBQcm9taXNlPGFueVtdPjtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGZvcm1hdHMgdGhlIHNlbGVjdGVkIGNob2ljZSBvbmNlIHNlbGVjdGVkLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0Q2hvaWNlTGFiZWw6IChjaG9pY2U6IGFueSkgPT4gc3RyaW5nID0gY2hvaWNlID0+IGNob2ljZTtcblxuICAvKiB0c2xpbnQ6ZGlzYWJsZSBtZW1iZXItb3JkZXJpbmcgKi9cbiAgcHJpdmF0ZSBtZW51OlxuICAgIHwge1xuICAgICAgICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50PjtcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGxhc3RDYXJldFBvc2l0aW9uPzogbnVtYmVyO1xuICAgICAgfVxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgbWVudUhpZGRlbiQgPSBuZXcgU3ViamVjdCgpO1xuICBtZW51RWxlbTogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmXG4gICkge31cblxuICBASG9zdExpc3RlbmVyKCdrZXlwcmVzcycsIFsnJGV2ZW50LmtleSddKVxuICBvbktleXByZXNzKGtleTogc3RyaW5nKSB7XG4gICAgaWYgKFxuICAgICAgKHRoaXMudHJpZ2dlckNoYXJhY3RlciAhPT0gJyoqJyAmJiBrZXkgPT09IHRoaXMudHJpZ2dlckNoYXJhY3RlcikgfHxcbiAgICAgICh0aGlzLnRyaWdnZXJDaGFyYWN0ZXIgPT09ICcqKicgJiYgL1thLXp8QS1aXS8udGVzdChrZXkpKVxuICAgICkge1xuICAgICAgdGhpcy5zaG93TWVudSgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQudGFyZ2V0LnZhbHVlJ10pXG4gIG9uQ2hhbmdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICBpZiAoXG4gICAgICAgICF2YWx1ZSB8fFxuICAgICAgICAodmFsdWVbdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbl0gIT09IHRoaXMudHJpZ2dlckNoYXJhY3RlciAmJlxuICAgICAgICAgIHRoaXMudHJpZ2dlckNoYXJhY3RlciAhPT0gJyoqJylcbiAgICAgICkge1xuICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBpZiAoY3Vyc29yIDwgdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbikge1xuICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzZWFyY2hUZXh0ID0gdmFsdWUuc2xpY2UoXG4gICAgICAgICAgICB0aGlzLm1lbnUudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uICtcbiAgICAgICAgICAgICAgKHRoaXMudHJpZ2dlckNoYXJhY3RlciA9PT0gJyoqJyA/IDAgOiAxKSxcbiAgICAgICAgICAgIGN1cnNvclxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCFzZWFyY2hUZXh0Lm1hdGNoKHRoaXMuc2VhcmNoUmVnZXhwKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnNlYXJjaFRleHQgPSBzZWFyY2hUZXh0O1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VzID0gW107XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRFcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLmZpbmRDaG9pY2VzKHNlYXJjaFRleHQpKVxuICAgICAgICAgICAgICAudGhlbihjaG9pY2VzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZXMgPSBjaG9pY2VzO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgdGhpcy5tZW51Lmxhc3RDYXJldFBvc2l0aW9uID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNob3dNZW51KCkge1xuICAgIGlmICghdGhpcy5tZW51KSB7XG4gICAgICBjb25zdCBtZW51RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PFxuICAgICAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50XG4gICAgICA+KHRoaXMubWVudUNvbXBvbmVudCk7XG4gICAgICB0aGlzLm1lbnUgPSB7XG4gICAgICAgIGNvbXBvbmVudDogdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgICBtZW51RmFjdG9yeSxcbiAgICAgICAgICAwLFxuICAgICAgICAgIHRoaXMuaW5qZWN0b3JcbiAgICAgICAgKSxcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICB9O1xuICAgICAgLy9HZXQgRE9NIGVsZW1lbnQgZnJvbSBjb21wb25lbnRcbiAgICAgIHRoaXMubWVudUVsZW0gPSAodGhpcy5tZW51LmNvbXBvbmVudC5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PilcbiAgICAgICAgLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgLy8gQXBwZW5kIE1lbnUgZWxlbWVudCB0byB0aGUgYm9keVxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1lbnVFbGVtKTtcblxuICAgICAgY29uc3QgbGluZUhlaWdodCA9ICtnZXRDb21wdXRlZFN0eWxlKFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50XG4gICAgICApLmxpbmVIZWlnaHQhLnJlcGxhY2UoL3B4JC8sICcnKTtcblxuICAgICAgY29uc3QgZWxtUG9zaXRpb25Ub3AgPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgIGNvbnN0IGVsbVBvc2l0aW9uTGVmdCA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgLmxlZnQ7XG4gICAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gZ2V0Q2FyZXRDb29yZGluYXRlcyhcbiAgICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudCxcbiAgICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydFxuICAgICAgKTtcbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UucG9zaXRpb24gPSB7XG4gICAgICAgIHRvcDogZWxtUG9zaXRpb25Ub3AgKyB0b3AgKyBsaW5lSGVpZ2h0LFxuICAgICAgICBsZWZ0OiBlbG1Qb3NpdGlvbkxlZnQgKyBsZWZ0XG4gICAgICB9O1xuXG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2Uuc2VsZWN0Q2hvaWNlXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm1lbnVIaWRkZW4kKSlcbiAgICAgICAgLnN1YnNjcmliZShjaG9pY2UgPT4ge1xuICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5nZXRDaG9pY2VMYWJlbChjaG9pY2UpO1xuICAgICAgICAgIGNvbnN0IHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50ID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGV4dGFyZWEudmFsdWU7XG4gICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMubWVudSEudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uO1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdmFsdWUuc2xpY2UoMCwgc3RhcnRJbmRleCk7XG4gICAgICAgICAgY29uc3QgY2FyZXRQb3NpdGlvbiA9XG4gICAgICAgICAgICB0aGlzLm1lbnUhLmxhc3RDYXJldFBvc2l0aW9uIHx8IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgIGNvbnN0IGVuZCA9IHZhbHVlLnNsaWNlKGNhcmV0UG9zaXRpb24pO1xuICAgICAgICAgIHRleHRhcmVhLnZhbHVlID0gc3RhcnQgKyBsYWJlbCArIGVuZDtcbiAgICAgICAgICAvLyBmb3JjZSBuZyBtb2RlbCAvIGZvcm0gY29udHJvbCB0byB1cGRhdGVcbiAgICAgICAgICB0ZXh0YXJlYS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgICAgIGNvbnN0IHNldEN1cnNvckF0ID0gKHN0YXJ0ICsgbGFiZWwpLmxlbmd0aDtcbiAgICAgICAgICB0ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZShzZXRDdXJzb3JBdCwgc2V0Q3Vyc29yQXQpO1xuICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5jaG9pY2VTZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgICAgIGNob2ljZSxcbiAgICAgICAgICAgIGluc2VydGVkQXQ6IHtcbiAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgIGVuZDogc3RhcnRJbmRleCArIGxhYmVsLmxlbmd0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMubWVudVNob3duLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZGVNZW51KCkge1xuICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5tZW51SGlkZGVuJC5uZXh0KCk7XG4gICAgICB0aGlzLm1lbnVIaWRkZW4uZW1pdCgpO1xuICAgICAgdGhpcy5tZW51ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1jb250YWluZXInLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgOmhvc3Qge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICBgXG4gIF0sXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pidcbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50IHt9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRleHRJbnB1dEF1dG9jb21wbGV0ZURpcmVjdGl2ZSB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRleHRJbnB1dEF1dG9jb21wbGV0ZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50IH0gZnJvbSAnLi90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1tZW51LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZURpcmVjdGl2ZSxcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVDb250YWluZXJDb21wb25lbnQsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZURpcmVjdGl2ZSxcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVDb250YWluZXJDb21wb25lbnQsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVNb2R1bGUge31cbiJdLCJuYW1lcyI6WyJTdWJqZWN0IiwiQ29tcG9uZW50IiwiVmlld0NoaWxkIiwiSG9zdEJpbmRpbmciLCJIb3N0TGlzdGVuZXIiLCJFdmVudEVtaXR0ZXIiLCJ0YWtlVW50aWwiLCJEaXJlY3RpdmUiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJWaWV3Q29udGFpbmVyUmVmIiwiQXBwbGljYXRpb25SZWYiLCJJbmplY3RvciIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIk91dHB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Z0NBd0NpQixJQUFJQSxZQUFPLEVBQUU7aUNBSVosS0FBSzs2QkFFVCxVQUFDLEtBQWEsRUFBRSxNQUFXO2dCQUNyQyxPQUFBLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxXQUFXLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxNQUFNO2FBQUE7O1FBRXZELHNCQUFJLHVEQUFPOzs7Z0JBT1g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3RCOzs7O2dCQVRELFVBQVksT0FBYztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7Z0JBQ3hCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ25FLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoQzthQUNGOzs7V0FBQTtRQUtELHNCQUNJLG1EQUFHOzs7Z0JBRFA7Z0JBRUUscUJBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUMxQyxxQkFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQjtzQkFDdkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxZQUFZO3NCQUNuRCxDQUFDLENBQUM7Z0JBRU4sT0FBTyxJQUFJLENBQUMs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