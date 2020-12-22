import { Component, ElementRef, HostListener, ViewChild, HostBinding, ComponentFactoryResolver, Directive, EventEmitter, Injector, Input, Output, ViewContainerRef, ApplicationRef, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import getCaretCoordinates from 'textarea-caret';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TextInputAutocompleteMenuComponent = /** @class */ (function () {
    function TextInputAutocompleteMenuComponent() {
        this.selectChoice = new Subject();
        this.choiceLoading = false;
        this.trackById = function (index, choice) {
            return typeof choice.id !== 'undefined' ? choice.id : choice;
        };
    }
    Object.defineProperty(TextInputAutocompleteMenuComponent.prototype, "choices", {
        get: /**
         * @return {?}
         */
        function () {
            return this._choices;
        },
        set: /**
         * @param {?} choices
         * @return {?}
         */
        function (choices) {
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
         */
        function () {
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
         */
        function () {
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
        { type: Component, args: [{
                    selector: 'mwl-text-input-autocomplete-menu',
                    template: "\n    <div\n      *ngIf=\"choices?.length > 0\"\n      #dropdownMenu\n      class=\"dropdown-menu\">\n        <a  *ngFor=\"let choice of choices; trackBy:trackById\"\n        [class.active]=\"activeChoice === choice\"\n          (click)=\"selectChoice.next(choice)\" class=\"dropdown-item\">\n          {{ choice }}\n        </a>\n    </div>\n  ",
                    styles: [
                        "\n      :host {\n        z-index: 100000;\n        position: fixed;\n      }\n      .dropdown-menu {\n        display: block;\n        max-height: 200px;\n        overflow-y: auto;\n      }\n    "
                    ]
                },] },
    ];
    TextInputAutocompleteMenuComponent.propDecorators = {
        dropdownMenuElement: [{ type: ViewChild, args: ['dropdownMenu',] }],
        top: [{ type: HostBinding, args: ['style.top.px',] }],
        left: [{ type: HostBinding, args: ['style.left.px',] }],
        onArrowDown: [{ type: HostListener, args: ['document:keydown.ArrowDown', ['$event'],] }],
        onArrowUp: [{ type: HostListener, args: ['document:keydown.ArrowUp', ['$event'],] }],
        onEnter: [{ type: HostListener, args: ['document:keydown.Enter', ['$event'],] }]
    };
    return TextInputAutocompleteMenuComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TextInputAutocompleteDirective = /** @class */ (function () {
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
        this.menuShown = new EventEmitter();
        /**
         * Called when the options menu is hidden
         */
        this.menuHidden = new EventEmitter();
        /**
         * Called when a choice is selected
         */
        this.choiceSelected = new EventEmitter();
        /**
         * A function that formats the selected choice once selected.
         */
        this.getChoiceLabel = function (choice) { return choice; };
        this.menuHidden$ = new Subject();
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
            this.menuElem = /** @type {?} */ ((/** @type {?} */ (this.menu.component.hostView))
                .rootNodes[0]);
            // Append Menu element to the body
            document.body.appendChild(this.menuElem);
            var /** @type {?} */ lineHeight = +/** @type {?} */ ((getComputedStyle(this.elm.nativeElement).lineHeight)).replace(/px$/, '');
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
                .pipe(takeUntil(this.menuHidden$))
                .subscribe(function (choice) {
                var /** @type {?} */ label = _this.getChoiceLabel(choice);
                var /** @type {?} */ textarea = _this.elm.nativeElement;
                var /** @type {?} */ value = textarea.value;
                var /** @type {?} */ startIndex = /** @type {?} */ ((_this.menu)).triggerCharacterPosition;
                var /** @type {?} */ start = value.slice(0, startIndex);
                var /** @type {?} */ caretPosition = /** @type {?} */ ((_this.menu)).lastCaretPosition || textarea.selectionStart;
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
        { type: Directive, args: [{
                    selector: 'textarea[mwlTextInputAutocomplete],input[type="text"][mwlTextInputAutocomplete]'
                },] },
    ];
    /** @nocollapse */
    TextInputAutocompleteDirective.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: ApplicationRef },
        { type: Injector },
        { type: ElementRef }
    ]; };
    TextInputAutocompleteDirective.propDecorators = {
        triggerCharacter: [{ type: Input }],
        searchRegexp: [{ type: Input }],
        menuComponent: [{ type: Input }],
        menuShown: [{ type: Output }],
        menuHidden: [{ type: Output }],
        choiceSelected: [{ type: Output }],
        findChoices: [{ type: Input }],
        getChoiceLabel: [{ type: Input }],
        onKeypress: [{ type: HostListener, args: ['keypress', ['$event.key'],] }],
        onChange: [{ type: HostListener, args: ['input', ['$event.target.value'],] }],
        onBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return TextInputAutocompleteDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TextInputAutocompleteContainerComponent = /** @class */ (function () {
    function TextInputAutocompleteContainerComponent() {
    }
    TextInputAutocompleteContainerComponent.decorators = [
        { type: Component, args: [{
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
var TextInputAutocompleteModule = /** @class */ (function () {
    function TextInputAutocompleteModule() {
    }
    TextInputAutocompleteModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        TextInputAutocompleteDirective,
                        TextInputAutocompleteContainerComponent,
                        TextInputAutocompleteMenuComponent
                    ],
                    imports: [CommonModule],
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

export { TextInputAutocompleteMenuComponent, TextInputAutocompleteModule, TextInputAutocompleteContainerComponent as ɵb, TextInputAutocompleteDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtY29udGFpbmVyLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDaGlsZCxcbiAgSG9zdEJpbmRpbmdcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1tZW51JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cImNob2ljZXM/Lmxlbmd0aCA+IDBcIlxuICAgICAgI2Ryb3Bkb3duTWVudVxuICAgICAgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgIDxhICAqbmdGb3I9XCJsZXQgY2hvaWNlIG9mIGNob2ljZXM7IHRyYWNrQnk6dHJhY2tCeUlkXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVDaG9pY2UgPT09IGNob2ljZVwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdENob2ljZS5uZXh0KGNob2ljZSlcIiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIj5cbiAgICAgICAgICB7eyBjaG9pY2UgfX1cbiAgICAgICAgPC9hPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICA6aG9zdCB7XG4gICAgICAgIHotaW5kZXg6IDEwMDAwMDtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgfVxuICAgICAgLmRyb3Bkb3duLW1lbnUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbWF4LWhlaWdodDogMjAwcHg7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICB9XG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQge1xuICBAVmlld0NoaWxkKCdkcm9wZG93bk1lbnUnKSBkcm9wZG93bk1lbnVFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxVTGlzdEVsZW1lbnQ+O1xuICBwb3NpdGlvbjogeyB0b3A6IG51bWJlcjsgbGVmdDogbnVtYmVyIH07XG4gIHNlbGVjdENob2ljZSA9IG5ldyBTdWJqZWN0KCk7XG4gIGFjdGl2ZUNob2ljZTogYW55O1xuICBzZWFyY2hUZXh0OiBzdHJpbmc7XG4gIGNob2ljZUxvYWRFcnJvcjogYW55O1xuICBjaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2Nob2ljZXM6IGFueVtdO1xuICB0cmFja0J5SWQgPSAoaW5kZXg6IG51bWJlciwgY2hvaWNlOiBhbnkpID0+XG4gICAgdHlwZW9mIGNob2ljZS5pZCAhPT0gJ3VuZGVmaW5lZCcgPyBjaG9pY2UuaWQgOiBjaG9pY2U7XG5cbiAgc2V0IGNob2ljZXMoY2hvaWNlczogYW55W10pIHtcbiAgICB0aGlzLl9jaG9pY2VzID0gY2hvaWNlcztcbiAgICBpZiAoY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKSA9PT0gLTEgJiYgY2hvaWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmFjdGl2ZUNob2ljZSA9IGNob2ljZXNbMF07XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNob2ljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXM7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS50b3AucHgnKVxuICBnZXQgdG9wKCkge1xuICAgIGNvbnN0IHNjcmVlbkhlaWdodCA9IHdpbmRvdy5zY3JlZW4uaGVpZ2h0O1xuICAgIGNvbnN0IG1lbnVIZWlnaHQgPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnRcbiAgICAgID8gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgICA6IDA7XG5cbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi50b3AgKyBtZW51SGVpZ2h0IDwgc2NyZWVuSGVpZ2h0XG4gICAgICA/IHRoaXMucG9zaXRpb24udG9wXG4gICAgICA6IHRoaXMucG9zaXRpb24udG9wIC0gbWVudUhlaWdodDtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmxlZnQucHgnKVxuICBnZXQgbGVmdCgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5zY3JlZW4ud2lkdGg7XG4gICAgY29uc3QgbWVudVdpZHRoID0gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50XG4gICAgICA/IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoXG4gICAgICA6IDA7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ubGVmdCArIG1lbnVXaWR0aCA8IHNjcmVlbldpZHRoXG4gICAgICA/IHRoaXMucG9zaXRpb24ubGVmdFxuICAgICAgOiB0aGlzLnBvc2l0aW9uLmxlZnQgLSBtZW51V2lkdGg7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLkFycm93RG93bicsIFsnJGV2ZW50J10pXG4gIG9uQXJyb3dEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICBpZiAodGhpcy5jaG9pY2VzW2luZGV4ICsgMV0pIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9DaG9pY2UoaW5kZXggKyAxKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLkFycm93VXAnLCBbJyRldmVudCddKVxuICBvbkFycm93VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIGlmICh0aGlzLmNob2ljZXNbaW5kZXggLSAxXSkge1xuICAgICAgdGhpcy5zY3JvbGxUb0Nob2ljZShpbmRleCAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uRW50ZXInLCBbJyRldmVudCddKVxuICBvbkVudGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKSA+IC0xKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZWxlY3RDaG9pY2UubmV4dCh0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxUb0Nob2ljZShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5hY3RpdmVDaG9pY2UgPSB0aGlzLl9jaG9pY2VzW2luZGV4XTtcbiAgICBpZiAodGhpcy5kcm9wZG93bk1lbnVFbGVtZW50KSB7XG4gICAgICBjb25zdCB1bFBvc2l0aW9uID0gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCBsaSA9IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW2luZGV4XTtcbiAgICAgIGNvbnN0IGxpUG9zaXRpb24gPSBsaS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmIChsaVBvc2l0aW9uLnRvcCA8IHVsUG9zaXRpb24udG9wKSB7XG4gICAgICAgIGxpLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICB9IGVsc2UgaWYgKGxpUG9zaXRpb24uYm90dG9tID4gdWxQb3NpdGlvbi5ib3R0b20pIHtcbiAgICAgICAgbGkuc2Nyb2xsSW50b1ZpZXcoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEFwcGxpY2F0aW9uUmVmLFxuICBFbWJlZGRlZFZpZXdSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgZ2V0Q2FyZXRDb29yZGluYXRlcyBmcm9tICd0ZXh0YXJlYS1jYXJldCc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50IH0gZnJvbSAnLi90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hvaWNlU2VsZWN0ZWRFdmVudCB7XG4gIGNob2ljZTogYW55O1xuICBpbnNlcnRlZEF0OiB7XG4gICAgc3RhcnQ6IG51bWJlcjtcbiAgICBlbmQ6IG51bWJlcjtcbiAgfTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOlxuICAgICd0ZXh0YXJlYVttd2xUZXh0SW5wdXRBdXRvY29tcGxldGVdLGlucHV0W3R5cGU9XCJ0ZXh0XCJdW213bFRleHRJbnB1dEF1dG9jb21wbGV0ZV0nXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgY2hhcmFjdGVyIHRoYXQgd2lsbCB0cmlnZ2VyIHRoZSBtZW51IHRvIGFwcGVhclxuICAgKi9cbiAgQElucHV0KCkgdHJpZ2dlckNoYXJhY3Rlcjogc3RyaW5nID0gJ0AnO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVndWxhciBleHByZXNzaW9uIHRoYXQgd2lsbCBtYXRjaCB0aGUgc2VhcmNoIHRleHQgYWZ0ZXIgdGhlIHRyaWdnZXIgY2hhcmFjdGVyXG4gICAqL1xuICBASW5wdXQoKSBzZWFyY2hSZWdleHAgPSAvXlxcdyokLztcblxuICAvKipcbiAgICogVGhlIG1lbnUgY29tcG9uZW50IHRvIHNob3cgd2l0aCBhdmFpbGFibGUgb3B0aW9ucy5cbiAgICogWW91IGNhbiBleHRlbmQgdGhlIGJ1aWx0IGluIGBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50YCBjb21wb25lbnQgdG8gdXNlIGEgY3VzdG9tIHRlbXBsYXRlXG4gICAqL1xuICBASW5wdXQoKSBtZW51Q29tcG9uZW50ID0gVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudDtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIG9wdGlvbnMgbWVudSBpcyBzaG93blxuICAgKi9cbiAgQE91dHB1dCgpIG1lbnVTaG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIG9wdGlvbnMgbWVudSBpcyBoaWRkZW5cbiAgICovXG4gIEBPdXRwdXQoKSBtZW51SGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGNob2ljZSBpcyBzZWxlY3RlZFxuICAgKi9cbiAgQE91dHB1dCgpIGNob2ljZVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxDaG9pY2VTZWxlY3RlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhIHNlYXJjaCBzdHJpbmcgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgY2hvaWNlcy4gQ2FuIGFsc28gcmV0dXJuIGEgcHJvbWlzZS5cbiAgICovXG4gIEBJbnB1dCgpIGZpbmRDaG9pY2VzOiAoc2VhcmNoVGV4dDogc3RyaW5nKSA9PiBhbnlbXSB8IFByb21pc2U8YW55W10+O1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgZm9ybWF0cyB0aGUgc2VsZWN0ZWQgY2hvaWNlIG9uY2Ugc2VsZWN0ZWQuXG4gICAqL1xuICBASW5wdXQoKSBnZXRDaG9pY2VMYWJlbDogKGNob2ljZTogYW55KSA9PiBzdHJpbmcgPSBjaG9pY2UgPT4gY2hvaWNlO1xuXG4gIC8qIHRzbGludDpkaXNhYmxlIG1lbWJlci1vcmRlcmluZyAqL1xuICBwcml2YXRlIG1lbnU6XG4gICAgfCB7XG4gICAgICAgIGNvbXBvbmVudDogQ29tcG9uZW50UmVmPFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQ+O1xuICAgICAgICB0cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb246IG51bWJlcjtcbiAgICAgICAgbGFzdENhcmV0UG9zaXRpb24/OiBudW1iZXI7XG4gICAgICB9XG4gICAgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBtZW51SGlkZGVuJCA9IG5ldyBTdWJqZWN0KCk7XG4gIG1lbnVFbGVtOiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBlbG06IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQua2V5J10pXG4gIG9uS2V5cHJlc3Moa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoXG4gICAgICAodGhpcy50cmlnZ2VyQ2hhcmFjdGVyICE9PSAnKionICYmIGtleSA9PT0gdGhpcy50cmlnZ2VyQ2hhcmFjdGVyKSB8fFxuICAgICAgKHRoaXMudHJpZ2dlckNoYXJhY3RlciA9PT0gJyoqJyAmJiAvW2EtenxBLVpdLy50ZXN0KGtleSkpXG4gICAgKSB7XG4gICAgICB0aGlzLnNob3dNZW51KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudC50YXJnZXQudmFsdWUnXSlcbiAgb25DaGFuZ2UodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIXZhbHVlIHx8XG4gICAgICAgICh2YWx1ZVt0aGlzLm1lbnUudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uXSAhPT0gdGhpcy50cmlnZ2VyQ2hhcmFjdGVyICYmXG4gICAgICAgICAgdGhpcy50cmlnZ2VyQ2hhcmFjdGVyICE9PSAnKionKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIGlmIChjdXJzb3IgPCB0aGlzLm1lbnUudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uKSB7XG4gICAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNlYXJjaFRleHQgPSB2YWx1ZS5zbGljZShcbiAgICAgICAgICAgIHRoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb24gK1xuICAgICAgICAgICAgICAodGhpcy50cmlnZ2VyQ2hhcmFjdGVyID09PSAnKionID8gMCA6IDEpLFxuICAgICAgICAgICAgY3Vyc29yXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoIXNlYXJjaFRleHQubWF0Y2godGhpcy5zZWFyY2hSZWdleHApKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2Uuc2VhcmNoVGV4dCA9IHNlYXJjaFRleHQ7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZEVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZmluZENob2ljZXMoc2VhcmNoVGV4dCkpXG4gICAgICAgICAgICAgIC50aGVuKGNob2ljZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlcyA9IGNob2ljZXM7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIG9uQmx1cigpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICB0aGlzLm1lbnUubGFzdENhcmV0UG9zaXRpb24gPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvd01lbnUoKSB7XG4gICAgaWYgKCF0aGlzLm1lbnUpIHtcbiAgICAgIGNvbnN0IG1lbnVGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8XG4gICAgICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgICAgID4odGhpcy5tZW51Q29tcG9uZW50KTtcbiAgICAgIHRoaXMubWVudSA9IHtcbiAgICAgICAgY29tcG9uZW50OiB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICAgIG1lbnVGYWN0b3J5LFxuICAgICAgICAgIDAsXG4gICAgICAgICAgdGhpcy5pbmplY3RvclxuICAgICAgICApLFxuICAgICAgICB0cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb246IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgIH07XG4gICAgICAvL0dldCBET00gZWxlbWVudCBmcm9tIGNvbXBvbmVudFxuICAgICAgdGhpcy5tZW51RWxlbSA9ICh0aGlzLm1lbnUuY29tcG9uZW50Lmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KVxuICAgICAgICAucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAvLyBBcHBlbmQgTWVudSBlbGVtZW50IHRvIHRoZSBib2R5XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWVudUVsZW0pO1xuXG4gICAgICBjb25zdCBsaW5lSGVpZ2h0ID0gK2dldENvbXB1dGVkU3R5bGUoXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnRcbiAgICAgICkubGluZUhlaWdodCEucmVwbGFjZSgvcHgkLywgJycpO1xuXG4gICAgICBjb25zdCBlbG1Qb3NpdGlvblRvcCA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgY29uc3QgZWxtUG9zaXRpb25MZWZ0ID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAubGVmdDtcbiAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBnZXRDYXJldENvb3JkaW5hdGVzKFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICApO1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5wb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiBlbG1Qb3NpdGlvblRvcCArIHRvcCArIGxpbmVIZWlnaHQsXG4gICAgICAgIGxlZnQ6IGVsbVBvc2l0aW9uTGVmdCArIGxlZnRcbiAgICAgIH07XG5cbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5zZWxlY3RDaG9pY2VcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubWVudUhpZGRlbiQpKVxuICAgICAgICAuc3Vic2NyaWJlKGNob2ljZSA9PiB7XG4gICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdldENob2ljZUxhYmVsKGNob2ljZSk7XG4gICAgICAgICAgY29uc3QgdGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQgPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5tZW51IS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb247XG4gICAgICAgICAgY29uc3Qgc3RhcnQgPSB2YWx1ZS5zbGljZSgwLCBzdGFydEluZGV4KTtcbiAgICAgICAgICBjb25zdCBjYXJldFBvc2l0aW9uID1cbiAgICAgICAgICAgIHRoaXMubWVudSEubGFzdENhcmV0UG9zaXRpb24gfHwgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgY29uc3QgZW5kID0gdmFsdWUuc2xpY2UoY2FyZXRQb3NpdGlvbik7XG4gICAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBzdGFydCArIGxhYmVsICsgZW5kO1xuICAgICAgICAgIC8vIGZvcmNlIG5nIG1vZGVsIC8gZm9ybSBjb250cm9sIHRvIHVwZGF0ZVxuICAgICAgICAgIHRleHRhcmVhLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcpKTtcbiAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgICAgY29uc3Qgc2V0Q3Vyc29yQXQgPSAoc3RhcnQgKyBsYWJlbCkubGVuZ3RoO1xuICAgICAgICAgIHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKHNldEN1cnNvckF0LCBzZXRDdXJzb3JBdCk7XG4gICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmNob2ljZVNlbGVjdGVkLmVtaXQoe1xuICAgICAgICAgICAgY2hvaWNlLFxuICAgICAgICAgICAgaW5zZXJ0ZWRBdDoge1xuICAgICAgICAgICAgICBzdGFydDogc3RhcnRJbmRleCxcbiAgICAgICAgICAgICAgZW5kOiBzdGFydEluZGV4ICsgbGFiZWwubGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5tZW51U2hvd24uZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlkZU1lbnUoKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICB0aGlzLm1lbnVIaWRkZW4kLm5leHQoKTtcbiAgICAgIHRoaXMubWVudUhpZGRlbi5lbWl0KCk7XG4gICAgICB0aGlzLm1lbnUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5oaWRlTWVudSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lcicsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICA6aG9zdCB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gIGBcbiAgXSxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVDb250YWluZXJDb21wb25lbnQge31cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlRGlyZWN0aXZlIH0gZnJvbSAnLi90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLW1lbnUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlRGlyZWN0aXZlLFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlRGlyZWN0aXZlLFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1vZHVsZSB7fVxuIl0sIm5hbWVz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