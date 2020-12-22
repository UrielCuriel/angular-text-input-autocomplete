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
            /**
             * Whether to close the menu when the host textarea loses focus
             */
            this.closeMenuOnBlur = false;
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
                    if (this.closeMenuOnBlur === true) {
                        this.hideMenu();
                    }
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
            closeMenuOnBlur: [{ type: core.Input }],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9hbmd1bGFyLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBWaWV3Q2hpbGQsXG4gIEhvc3RCaW5kaW5nXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgKm5nSWY9XCJjaG9pY2VzPy5sZW5ndGggPiAwXCJcbiAgICAgICNkcm9wZG93bk1lbnVcbiAgICAgIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPlxuICAgICAgICA8YSAgKm5nRm9yPVwibGV0IGNob2ljZSBvZiBjaG9pY2VzOyB0cmFja0J5OnRyYWNrQnlJZFwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlQ2hvaWNlID09PSBjaG9pY2VcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RDaG9pY2UubmV4dChjaG9pY2UpXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCI+XG4gICAgICAgICAge3sgY2hvaWNlIH19XG4gICAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgOmhvc3Qge1xuICAgICAgICB6LWluZGV4OiAxMDAwMDA7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgIH1cbiAgICAgIC5kcm9wZG93bi1tZW51IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZCgnZHJvcGRvd25NZW51JykgZHJvcGRvd25NZW51RWxlbWVudDogRWxlbWVudFJlZjxIVE1MVUxpc3RFbGVtZW50PjtcbiAgcG9zaXRpb246IHsgdG9wOiBudW1iZXI7IGxlZnQ6IG51bWJlciB9O1xuICBzZWxlY3RDaG9pY2UgPSBuZXcgU3ViamVjdCgpO1xuICBhY3RpdmVDaG9pY2U6IGFueTtcbiAgc2VhcmNoVGV4dDogc3RyaW5nO1xuICBjaG9pY2VMb2FkRXJyb3I6IGFueTtcbiAgY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9jaG9pY2VzOiBhbnlbXTtcbiAgdHJhY2tCeUlkID0gKGluZGV4OiBudW1iZXIsIGNob2ljZTogYW55KSA9PlxuICAgIHR5cGVvZiBjaG9pY2UuaWQgIT09ICd1bmRlZmluZWQnID8gY2hvaWNlLmlkIDogY2hvaWNlO1xuXG4gIHNldCBjaG9pY2VzKGNob2ljZXM6IGFueVtdKSB7XG4gICAgdGhpcy5fY2hvaWNlcyA9IGNob2ljZXM7XG4gICAgaWYgKGNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSkgPT09IC0xICYmIGNob2ljZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5hY3RpdmVDaG9pY2UgPSBjaG9pY2VzWzBdO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaG9pY2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUudG9wLnB4JylcbiAgZ2V0IHRvcCgpIHtcbiAgICBjb25zdCBzY3JlZW5IZWlnaHQgPSB3aW5kb3cuc2NyZWVuLmhlaWdodDtcbiAgICBjb25zdCBtZW51SGVpZ2h0ID0gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50XG4gICAgICA/IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodFxuICAgICAgOiAwO1xuXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24udG9wICsgbWVudUhlaWdodCA8IHNjcmVlbkhlaWdodFxuICAgICAgPyB0aGlzLnBvc2l0aW9uLnRvcFxuICAgICAgOiB0aGlzLnBvc2l0aW9uLnRvcCAtIG1lbnVIZWlnaHQ7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5sZWZ0LnB4JylcbiAgZ2V0IGxlZnQoKSB7XG4gICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuc2NyZWVuLndpZHRoO1xuICAgIGNvbnN0IG1lbnVXaWR0aCA9IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudFxuICAgICAgPyB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aFxuICAgICAgOiAwO1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLmxlZnQgKyBtZW51V2lkdGggPCBzY3JlZW5XaWR0aFxuICAgICAgPyB0aGlzLnBvc2l0aW9uLmxlZnRcbiAgICAgIDogdGhpcy5wb3NpdGlvbi5sZWZ0IC0gbWVudVdpZHRoO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5BcnJvd0Rvd24nLCBbJyRldmVudCddKVxuICBvbkFycm93RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgaWYgKHRoaXMuY2hvaWNlc1tpbmRleCArIDFdKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQ2hvaWNlKGluZGV4ICsgMSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5BcnJvd1VwJywgWyckZXZlbnQnXSlcbiAgb25BcnJvd1VwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICBpZiAodGhpcy5jaG9pY2VzW2luZGV4IC0gMV0pIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9DaG9pY2UoaW5kZXggLSAxKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLkVudGVyJywgWyckZXZlbnQnXSlcbiAgb25FbnRlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSkgPiAtMSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VsZWN0Q2hvaWNlLm5leHQodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9DaG9pY2UoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlQ2hvaWNlID0gdGhpcy5fY2hvaWNlc1tpbmRleF07XG4gICAgaWYgKHRoaXMuZHJvcGRvd25NZW51RWxlbWVudCkge1xuICAgICAgY29uc3QgdWxQb3NpdGlvbiA9IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgbGkgPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZHJlbltpbmRleF07XG4gICAgICBjb25zdCBsaVBvc2l0aW9uID0gbGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAobGlQb3NpdGlvbi50b3AgPCB1bFBvc2l0aW9uLnRvcCkge1xuICAgICAgICBsaS5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgfSBlbHNlIGlmIChsaVBvc2l0aW9uLmJvdHRvbSA+IHVsUG9zaXRpb24uYm90dG9tKSB7XG4gICAgICAgIGxpLnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBBcHBsaWNhdGlvblJlZixcbiAgRW1iZWRkZWRWaWV3UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGdldENhcmV0Q29vcmRpbmF0ZXMgZnJvbSAndGV4dGFyZWEtY2FyZXQnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENob2ljZVNlbGVjdGVkRXZlbnQge1xuICBjaG9pY2U6IGFueTtcbiAgaW5zZXJ0ZWRBdDoge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG4gIH07XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAndGV4dGFyZWFbbXdsVGV4dElucHV0QXV0b2NvbXBsZXRlXSxpbnB1dFt0eXBlPVwidGV4dFwiXVttd2xUZXh0SW5wdXRBdXRvY29tcGxldGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGNoYXJhY3RlciB0aGF0IHdpbGwgdHJpZ2dlciB0aGUgbWVudSB0byBhcHBlYXJcbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJDaGFyYWN0ZXI6IHN0cmluZyA9ICdAJztcblxuICAvKipcbiAgICogVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0aGF0IHdpbGwgbWF0Y2ggdGhlIHNlYXJjaCB0ZXh0IGFmdGVyIHRoZSB0cmlnZ2VyIGNoYXJhY3RlclxuICAgKi9cbiAgQElucHV0KCkgc2VhcmNoUmVnZXhwID0gL15cXHcqJC87XG5cbiAgLyoqXG4gICAqIFRoZSBtZW51IGNvbXBvbmVudCB0byBzaG93IHdpdGggYXZhaWxhYmxlIG9wdGlvbnMuXG4gICAqIFlvdSBjYW4gZXh0ZW5kIHRoZSBidWlsdCBpbiBgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudGAgY29tcG9uZW50IHRvIHVzZSBhIGN1c3RvbSB0ZW1wbGF0ZVxuICAgKi9cbiAgQElucHV0KCkgbWVudUNvbXBvbmVudCA9IFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBvcHRpb25zIG1lbnUgaXMgc2hvd25cbiAgICovXG4gIEBPdXRwdXQoKSBtZW51U2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBvcHRpb25zIG1lbnUgaXMgaGlkZGVuXG4gICAqL1xuICBAT3V0cHV0KCkgbWVudUhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBjaG9pY2UgaXMgc2VsZWN0ZWRcbiAgICovXG4gIEBPdXRwdXQoKSBjaG9pY2VTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2hvaWNlU2VsZWN0ZWRFdmVudD4oKTtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgYSBzZWFyY2ggc3RyaW5nIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIGNob2ljZXMuIENhbiBhbHNvIHJldHVybiBhIHByb21pc2UuXG4gICAqL1xuICBASW5wdXQoKSBmaW5kQ2hvaWNlczogKHNlYXJjaFRleHQ6IHN0cmluZykgPT4gYW55W10gfCBQcm9taXNlPGFueVtdPjtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGZvcm1hdHMgdGhlIHNlbGVjdGVkIGNob2ljZSBvbmNlIHNlbGVjdGVkLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0Q2hvaWNlTGFiZWw6IChjaG9pY2U6IGFueSkgPT4gc3RyaW5nID0gY2hvaWNlID0+IGNob2ljZTtcblxuICAvKipcbiAgICogV2hldGhlciB0byBjbG9zZSB0aGUgbWVudSB3aGVuIHRoZSBob3N0IHRleHRhcmVhIGxvc2VzIGZvY3VzXG4gICAqL1xuICBASW5wdXQoKSBjbG9zZU1lbnVPbkJsdXIgPSBmYWxzZTtcblxuICAvKiB0c2xpbnQ6ZGlzYWJsZSBtZW1iZXItb3JkZXJpbmcgKi9cbiAgcHJpdmF0ZSBtZW51OlxuICAgIHwge1xuICAgICAgICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50PjtcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGxhc3RDYXJldFBvc2l0aW9uPzogbnVtYmVyO1xuICAgICAgfVxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgbWVudUhpZGRlbiQgPSBuZXcgU3ViamVjdCgpO1xuICBtZW51RWxlbTogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmXG4gICkge31cblxuICBASG9zdExpc3RlbmVyKCdrZXlwcmVzcycsIFsnJGV2ZW50LmtleSddKVxuICBvbktleXByZXNzKGtleTogc3RyaW5nKSB7XG4gICAgaWYgKFxuICAgICAgKHRoaXMudHJpZ2dlckNoYXJhY3RlciAhPT0gJyoqJyAmJiBrZXkgPT09IHRoaXMudHJpZ2dlckNoYXJhY3RlcikgfHxcbiAgICAgICh0aGlzLnRyaWdnZXJDaGFyYWN0ZXIgPT09ICcqKicgJiYgL1thLXp8QS1aXS8udGVzdChrZXkpKVxuICAgICkge1xuICAgICAgdGhpcy5zaG93TWVudSgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQudGFyZ2V0LnZhbHVlJ10pXG4gIG9uQ2hhbmdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICBpZiAoXG4gICAgICAgICF2YWx1ZSB8fFxuICAgICAgICAodmFsdWVbdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbl0gIT09IHRoaXMudHJpZ2dlckNoYXJhY3RlciAmJlxuICAgICAgICAgIHRoaXMudHJpZ2dlckNoYXJhY3RlciAhPT0gJyoqJylcbiAgICAgICkge1xuICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBpZiAoY3Vyc29yIDwgdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbikge1xuICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzZWFyY2hUZXh0ID0gdmFsdWUuc2xpY2UoXG4gICAgICAgICAgICB0aGlzLm1lbnUudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uICtcbiAgICAgICAgICAgICAgKHRoaXMudHJpZ2dlckNoYXJhY3RlciA9PT0gJyoqJyA/IDAgOiAxKSxcbiAgICAgICAgICAgIGN1cnNvclxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCFzZWFyY2hUZXh0Lm1hdGNoKHRoaXMuc2VhcmNoUmVnZXhwKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnNlYXJjaFRleHQgPSBzZWFyY2hUZXh0O1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VzID0gW107XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRFcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLmZpbmRDaG9pY2VzKHNlYXJjaFRleHQpKVxuICAgICAgICAgICAgICAudGhlbihjaG9pY2VzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZXMgPSBjaG9pY2VzO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgdGhpcy5tZW51Lmxhc3RDYXJldFBvc2l0aW9uID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgIGlmICh0aGlzLmNsb3NlTWVudU9uQmx1ciA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzaG93TWVudSgpIHtcbiAgICBpZiAoIXRoaXMubWVudSkge1xuICAgICAgY29uc3QgbWVudUZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxcbiAgICAgICAgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudFxuICAgICAgPih0aGlzLm1lbnVDb21wb25lbnQpO1xuICAgICAgdGhpcy5tZW51ID0ge1xuICAgICAgICBjb21wb25lbnQ6IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoXG4gICAgICAgICAgbWVudUZhY3RvcnksXG4gICAgICAgICAgMCxcbiAgICAgICAgICB0aGlzLmluamVjdG9yXG4gICAgICAgICksXG4gICAgICAgIHRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjogdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydFxuICAgICAgfTtcbiAgICAgIC8vR2V0IERPTSBlbGVtZW50IGZyb20gY29tcG9uZW50XG4gICAgICB0aGlzLm1lbnVFbGVtID0gKHRoaXMubWVudS5jb21wb25lbnQuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pXG4gICAgICAgIC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgIC8vIEFwcGVuZCBNZW51IGVsZW1lbnQgdG8gdGhlIGJvZHlcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tZW51RWxlbSk7XG5cbiAgICAgIGNvbnN0IGxpbmVIZWlnaHQgPSArZ2V0Q29tcHV0ZWRTdHlsZShcbiAgICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudFxuICAgICAgKS5saW5lSGVpZ2h0IS5yZXBsYWNlKC9weCQvLCAnJyk7XG5cbiAgICAgIGNvbnN0IGVsbVBvc2l0aW9uVG9wID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICBjb25zdCBlbG1Qb3NpdGlvbkxlZnQgPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIC5sZWZ0O1xuICAgICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IGdldENhcmV0Q29vcmRpbmF0ZXMoXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgICk7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnBvc2l0aW9uID0ge1xuICAgICAgICB0b3A6IGVsbVBvc2l0aW9uVG9wICsgdG9wICsgbGluZUhlaWdodCxcbiAgICAgICAgbGVmdDogZWxtUG9zaXRpb25MZWZ0ICsgbGVmdFxuICAgICAgfTtcblxuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnNlbGVjdENob2ljZVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5tZW51SGlkZGVuJCkpXG4gICAgICAgIC5zdWJzY3JpYmUoY2hvaWNlID0+IHtcbiAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0Q2hvaWNlTGFiZWwoY2hvaWNlKTtcbiAgICAgICAgICBjb25zdCB0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRleHRhcmVhLnZhbHVlO1xuICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLm1lbnUhLnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjtcbiAgICAgICAgICBjb25zdCBzdGFydCA9IHZhbHVlLnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGNhcmV0UG9zaXRpb24gPVxuICAgICAgICAgICAgdGhpcy5tZW51IS5sYXN0Q2FyZXRQb3NpdGlvbiB8fCB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICBjb25zdCBlbmQgPSB2YWx1ZS5zbGljZShjYXJldFBvc2l0aW9uKTtcbiAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHN0YXJ0ICsgbGFiZWwgKyBlbmQ7XG4gICAgICAgICAgLy8gZm9yY2UgbmcgbW9kZWwgLyBmb3JtIGNvbnRyb2wgdG8gdXBkYXRlXG4gICAgICAgICAgdGV4dGFyZWEuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICBjb25zdCBzZXRDdXJzb3JBdCA9IChzdGFydCArIGxhYmVsKS5sZW5ndGg7XG4gICAgICAgICAgdGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2Uoc2V0Q3Vyc29yQXQsIHNldEN1cnNvckF0KTtcbiAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuY2hvaWNlU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgICAgICBjaG9pY2UsXG4gICAgICAgICAgICBpbnNlcnRlZEF0OiB7XG4gICAgICAgICAgICAgIHN0YXJ0OiBzdGFydEluZGV4LFxuICAgICAgICAgICAgICBlbmQ6IHN0YXJ0SW5kZXggKyBsYWJlbC5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLm1lbnVTaG93bi5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoaWRlTWVudSgpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMubWVudUhpZGRlbiQubmV4dCgpO1xuICAgICAgdGhpcy5tZW51SGlkZGVuLmVtaXQoKTtcbiAgICAgIHRoaXMubWVudSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmhpZGVNZW51KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtY29udGFpbmVyJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0IHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZUNvbnRhaW5lckNvbXBvbmVudCB7fVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsiU3ViamVjdCIsIkNvbXBvbmVudCIsIlZpZXdDaGlsZCIsIkhvc3RCaW5kaW5nIiwiSG9zdExpc3RlbmVyIiwiRXZlbnRFbWl0dGVyIiwidGFrZVVudGlsIiwiRGlyZWN0aXZlIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiVmlld0NvbnRhaW5lclJlZiIsIkFwcGxpY2F0aW9uUmVmIiwiSW5qZWN0b3IiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O2dDQXdDaUIsSUFBSUEsWUFBTyxFQUFFO2lDQUlaLEtBQUs7NkJBRVQsVUFBQyxLQUFhLEVBQUUsTUFBVztnQkFDckMsT0FBQSxPQUFPLE1BQU0sQ0FBQyxFQUFFLEtBQUssV0FBVyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEdBQUcsTUFBTTthQUFBOztRQUV2RCxzQkFBSSx1REFBTzs7O2dCQU9YO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN0Qjs7OztnQkFURCxVQUFZLE9BQWM7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO2dCQUN4QixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNuRSxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7YUFDRjs7O1dBQUE7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