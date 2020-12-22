/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, Injector, Input, Output, ViewContainerRef, ApplicationRef } from '@angular/core';
import getCaretCoordinates from 'textarea-caret';
import { takeUntil } from 'rxjs/operators';
import { TextInputAutocompleteMenuComponent } from './text-input-autocomplete-menu.component';
import { Subject } from 'rxjs';
/**
 * @record
 */
export function ChoiceSelectedEvent() { }
function ChoiceSelectedEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    ChoiceSelectedEvent.prototype.choice;
    /** @type {?} */
    ChoiceSelectedEvent.prototype.insertedAt;
}
export class TextInputAutocompleteDirective {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} appRef
     * @param {?} injector
     * @param {?} elm
     */
    constructor(componentFactoryResolver, viewContainerRef, appRef, injector, elm) {
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
        this.getChoiceLabel = choice => choice;
        this.menuHidden$ = new Subject();
    }
    /**
     * @param {?} key
     * @return {?}
     */
    onKeypress(key) {
        if ((this.triggerCharacter !== '**' && key === this.triggerCharacter) ||
            (this.triggerCharacter === '**' && /[a-z|A-Z]/.test(key))) {
            this.showMenu();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onChange(value) {
        if (this.menu) {
            if (!value ||
                (value[this.menu.triggerCharacterPosition] !== this.triggerCharacter &&
                    this.triggerCharacter !== '**')) {
                this.hideMenu();
            }
            else {
                const /** @type {?} */ cursor = this.elm.nativeElement.selectionStart;
                if (cursor < this.menu.triggerCharacterPosition) {
                    this.hideMenu();
                }
                else {
                    const /** @type {?} */ searchText = value.slice(this.menu.triggerCharacterPosition +
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
                            .then(choices => {
                            if (this.menu) {
                                this.menu.component.instance.choices = choices;
                                this.menu.component.instance.choiceLoading = false;
                                this.menu.component.changeDetectorRef.detectChanges();
                            }
                        })
                            .catch(err => {
                            if (this.menu) {
                                this.menu.component.instance.choiceLoading = false;
                                this.menu.component.instance.choiceLoadError = err;
                                this.menu.component.changeDetectorRef.detectChanges();
                            }
                        });
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        if (this.menu) {
            this.menu.lastCaretPosition = this.elm.nativeElement.selectionStart;
        }
    }
    /**
     * @return {?}
     */
    showMenu() {
        if (!this.menu) {
            const /** @type {?} */ menuFactory = this.componentFactoryResolver.resolveComponentFactory(this.menuComponent);
            this.menu = {
                component: this.viewContainerRef.createComponent(menuFactory, 0, this.injector),
                triggerCharacterPosition: this.elm.nativeElement.selectionStart
            };
            //Get DOM element from component
            this.menuElem = /** @type {?} */ ((/** @type {?} */ (this.menu.component.hostView))
                .rootNodes[0]);
            // Append Menu element to the body
            document.body.appendChild(this.menuElem);
            const /** @type {?} */ lineHeight = +/** @type {?} */ ((getComputedStyle(this.elm.nativeElement).lineHeight)).replace(/px$/, '');
            const /** @type {?} */ elmPositionTop = this.elm.nativeElement.getBoundingClientRect().top;
            const /** @type {?} */ elmPositionLeft = this.elm.nativeElement.getBoundingClientRect()
                .left;
            const { top, left } = getCaretCoordinates(this.elm.nativeElement, this.elm.nativeElement.selectionStart);
            this.menu.component.instance.position = {
                top: elmPositionTop + top + lineHeight,
                left: elmPositionLeft + left
            };
            this.menu.component.changeDetectorRef.detectChanges();
            this.menu.component.instance.selectChoice
                .pipe(takeUntil(this.menuHidden$))
                .subscribe(choice => {
                const /** @type {?} */ label = this.getChoiceLabel(choice);
                const /** @type {?} */ textarea = this.elm.nativeElement;
                const /** @type {?} */ value = textarea.value;
                const /** @type {?} */ startIndex = /** @type {?} */ ((this.menu)).triggerCharacterPosition;
                const /** @type {?} */ start = value.slice(0, startIndex);
                const /** @type {?} */ caretPosition = /** @type {?} */ ((this.menu)).lastCaretPosition || textarea.selectionStart;
                const /** @type {?} */ end = value.slice(caretPosition);
                textarea.value = start + label + end;
                // force ng model / form control to update
                textarea.dispatchEvent(new Event('input'));
                this.hideMenu();
                const /** @type {?} */ setCursorAt = (start + label).length;
                textarea.setSelectionRange(setCursorAt, setCursorAt);
                textarea.focus();
                this.choiceSelected.emit({
                    choice,
                    insertedAt: {
                        start: startIndex,
                        end: startIndex + label.length
                    }
                });
            });
            this.menuShown.emit();
        }
    }
    /**
     * @return {?}
     */
    hideMenu() {
        if (this.menu) {
            this.menu.component.destroy();
            this.menuHidden$.next();
            this.menuHidden.emit();
            this.menu = undefined;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.hideMenu();
    }
}
TextInputAutocompleteDirective.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[mwlTextInputAutocomplete],input[type="text"][mwlTextInputAutocomplete]'
            },] },
];
/** @nocollapse */
TextInputAutocompleteDirective.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: ApplicationRef },
    { type: Injector },
    { type: ElementRef }
];
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
function TextInputAutocompleteDirective_tsickle_Closure_declarations() {
    /**
     * The character that will trigger the menu to appear
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.triggerCharacter;
    /**
     * The regular expression that will match the search text after the trigger character
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.searchRegexp;
    /**
     * The menu component to show with available options.
     * You can extend the built in `TextInputAutocompleteMenuComponent` component to use a custom template
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.menuComponent;
    /**
     * Called when the options menu is shown
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.menuShown;
    /**
     * Called when the options menu is hidden
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.menuHidden;
    /**
     * Called when a choice is selected
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.choiceSelected;
    /**
     * A function that accepts a search string and returns an array of choices. Can also return a promise.
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.findChoices;
    /**
     * A function that formats the selected choice once selected.
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.getChoiceLabel;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.menu;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.menuHidden$;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.menuElem;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.componentFactoryResolver;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.viewContainerRef;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.appRef;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.injector;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.elm;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC1hdXRvY29tcGxldGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHdCQUF3QixFQUV4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFFTCxNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLGNBQWMsRUFFZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLG1CQUFtQixNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM5RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7Ozs7OztBQWMvQixNQUFNOzs7Ozs7OztJQXNESixZQUNVLDBCQUNBLGtCQUNBLFFBQ0EsVUFDQTtRQUpBLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQjtRQUNoQixXQUFNLEdBQU4sTUFBTTtRQUNOLGFBQVEsR0FBUixRQUFRO1FBQ1IsUUFBRyxHQUFILEdBQUc7Ozs7Z0NBdkR1QixHQUFHOzs7OzRCQUtmLE9BQU87Ozs7OzZCQU1OLGtDQUFrQzs7Ozt5QkFLckMsSUFBSSxZQUFZLEVBQUU7Ozs7MEJBS2pCLElBQUksWUFBWSxFQUFFOzs7OzhCQUtkLElBQUksWUFBWSxFQUF1Qjs7Ozs4QkFVZixNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU07MkJBVzdDLElBQUksT0FBTyxFQUFFO0tBUy9COzs7OztJQUdKLFVBQVUsQ0FBQyxHQUFXO1FBQ3BCLEVBQUUsQ0FBQyxDQUNELENBQUMsSUFB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QUFDO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7U0FDdkI7Ozs7O0lBR0gsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNqQjs7O1lBak5GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQ04saUZBQWlGO2FBQ3BGOzs7O1lBOUJDLHdCQUF3QjtZQVV4QixnQkFBZ0I7WUFDaEIsY0FBYztZQUxkLFFBQVE7WUFIUixVQUFVOzs7K0JBZ0NULEtBQUs7MkJBS0wsS0FBSzs0QkFNTCxLQUFLO3dCQUtMLE1BQU07eUJBS04sTUFBTTs2QkFLTixNQUFNOzBCQUtOLEtBQUs7NkJBS0wsS0FBSzt5QkFzQkwsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQzt1QkFVdkMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO3FCQWdEN0MsWUFBWSxTQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQXBwbGljYXRpb25SZWYsXG4gIEVtYmVkZGVkVmlld1JlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBnZXRDYXJldENvb3JkaW5hdGVzIGZyb20gJ3RleHRhcmVhLWNhcmV0JztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBDaG9pY2VTZWxlY3RlZEV2ZW50IHtcbiAgY2hvaWNlOiBhbnk7XG4gIGluc2VydGVkQXQ6IHtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIGVuZDogbnVtYmVyO1xuICB9O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6XG4gICAgJ3RleHRhcmVhW213bFRleHRJbnB1dEF1dG9jb21wbGV0ZV0saW5wdXRbdHlwZT1cInRleHRcIl1bbXdsVGV4dElucHV0QXV0b2NvbXBsZXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBjaGFyYWN0ZXIgdGhhdCB3aWxsIHRyaWdnZXIgdGhlIG1lbnUgdG8gYXBwZWFyXG4gICAqL1xuICBASW5wdXQoKSB0cmlnZ2VyQ2hhcmFjdGVyOiBzdHJpbmcgPSAnQCc7XG5cbiAgLyoqXG4gICAqIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCB3aWxsIG1hdGNoIHRoZSBzZWFyY2ggdGV4dCBhZnRlciB0aGUgdHJpZ2dlciBjaGFyYWN0ZXJcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaFJlZ2V4cCA9IC9eXFx3KiQvO1xuXG4gIC8qKlxuICAgKiBUaGUgbWVudSBjb21wb25lbnQgdG8gc2hvdyB3aXRoIGF2YWlsYWJsZSBvcHRpb25zLlxuICAgKiBZb3UgY2FuIGV4dGVuZCB0aGUgYnVpbHQgaW4gYFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRgIGNvbXBvbmVudCB0byB1c2UgYSBjdXN0b20gdGVtcGxhdGVcbiAgICovXG4gIEBJbnB1dCgpIG1lbnVDb21wb25lbnQgPSBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIHNob3duXG4gICAqL1xuICBAT3V0cHV0KCkgbWVudVNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIGhpZGRlblxuICAgKi9cbiAgQE91dHB1dCgpIG1lbnVIaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgY2hvaWNlIGlzIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KCkgY2hvaWNlU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENob2ljZVNlbGVjdGVkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGEgc2VhcmNoIHN0cmluZyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBjaG9pY2VzLiBDYW4gYWxzbyByZXR1cm4gYSBwcm9taXNlLlxuICAgKi9cbiAgQElucHV0KCkgZmluZENob2ljZXM6IChzZWFyY2hUZXh0OiBzdHJpbmcpID0+IGFueVtdIHwgUHJvbWlzZTxhbnlbXT47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBmb3JtYXRzIHRoZSBzZWxlY3RlZCBjaG9pY2Ugb25jZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldENob2ljZUxhYmVsOiAoY2hvaWNlOiBhbnkpID0+IHN0cmluZyA9IGNob2ljZSA9PiBjaG9pY2U7XG5cbiAgLyogdHNsaW50OmRpc2FibGUgbWVtYmVyLW9yZGVyaW5nICovXG4gIHByaXZhdGUgbWVudTpcbiAgICB8IHtcbiAgICAgICAgY29tcG9uZW50OiBDb21wb25lbnRSZWY8VGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudD47XG4gICAgICAgIHRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjogbnVtYmVyO1xuICAgICAgICBsYXN0Q2FyZXRQb3NpdGlvbj86IG51bWJlcjtcbiAgICAgIH1cbiAgICB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIG1lbnVIaWRkZW4kID0gbmV3IFN1YmplY3QoKTtcbiAgbWVudUVsZW06IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGVsbTogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5cHJlc3MnLCBbJyRldmVudC5rZXknXSlcbiAgb25LZXlwcmVzcyhrZXk6IHN0cmluZykge1xuICAgIGlmIChcbiAgICAgICh0aGlzLnRyaWdnZXJDaGFyYWN0ZXIgIT09ICcqKicgJiYga2V5ID09PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIpIHx8XG4gICAgICAodGhpcy50cmlnZ2VyQ2hhcmFjdGVyID09PSAnKionICYmIC9bYS16fEEtWl0vLnRlc3Qoa2V5KSlcbiAgICApIHtcbiAgICAgIHRoaXMuc2hvd01lbnUoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50LnRhcmdldC52YWx1ZSddKVxuICBvbkNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgaWYgKFxuICAgICAgICAhdmFsdWUgfHxcbiAgICAgICAgKHZhbHVlW3RoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb25dICE9PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIgJiZcbiAgICAgICAgICB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIgIT09ICcqKicpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgaWYgKGN1cnNvciA8IHRoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb24pIHtcbiAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2VhcmNoVGV4dCA9IHZhbHVlLnNsaWNlKFxuICAgICAgICAgICAgdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbiArXG4gICAgICAgICAgICAgICh0aGlzLnRyaWdnZXJDaGFyYWN0ZXIgPT09ICcqKicgPyAwIDogMSksXG4gICAgICAgICAgICBjdXJzb3JcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICghc2VhcmNoVGV4dC5tYXRjaCh0aGlzLnNlYXJjaFJlZ2V4cCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5zZWFyY2hUZXh0ID0gc2VhcmNoVGV4dDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkRXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUodGhpcy5maW5kQ2hvaWNlcyhzZWFyY2hUZXh0KSlcbiAgICAgICAgICAgICAgLnRoZW4oY2hvaWNlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VzID0gY2hvaWNlcztcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZEVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCkge1xuICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgIHRoaXMubWVudS5sYXN0Q2FyZXRQb3NpdGlvbiA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzaG93TWVudSgpIHtcbiAgICBpZiAoIXRoaXMubWVudSkge1xuICAgICAgY29uc3QgbWVudUZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxcbiAgICAgICAgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudFxuICAgICAgPih0aGlzLm1lbnVDb21wb25lbnQpO1xuICAgICAgdGhpcy5tZW51ID0ge1xuICAgICAgICBjb21wb25lbnQ6IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoXG4gICAgICAgICAgbWVudUZhY3RvcnksXG4gICAgICAgICAgMCxcbiAgICAgICAgICB0aGlzLmluamVjdG9yXG4gICAgICAgICksXG4gICAgICAgIHRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjogdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydFxuICAgICAgfTtcbiAgICAgIC8vR2V0IERPTSBlbGVtZW50IGZyb20gY29tcG9uZW50XG4gICAgICB0aGlzLm1lbnVFbGVtID0gKHRoaXMubWVudS5jb21wb25lbnQuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pXG4gICAgICAgIC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgIC8vIEFwcGVuZCBNZW51IGVsZW1lbnQgdG8gdGhlIGJvZHlcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tZW51RWxlbSk7XG5cbiAgICAgIGNvbnN0IGxpbmVIZWlnaHQgPSArZ2V0Q29tcHV0ZWRTdHlsZShcbiAgICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudFxuICAgICAgKS5saW5lSGVpZ2h0IS5yZXBsYWNlKC9weCQvLCAnJyk7XG5cbiAgICAgIGNvbnN0IGVsbVBvc2l0aW9uVG9wID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICBjb25zdCBlbG1Qb3NpdGlvbkxlZnQgPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIC5sZWZ0O1xuICAgICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IGdldENhcmV0Q29vcmRpbmF0ZXMoXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgICk7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnBvc2l0aW9uID0ge1xuICAgICAgICB0b3A6IGVsbVBvc2l0aW9uVG9wICsgdG9wICsgbGluZUhlaWdodCxcbiAgICAgICAgbGVmdDogZWxtUG9zaXRpb25MZWZ0ICsgbGVmdFxuICAgICAgfTtcblxuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnNlbGVjdENob2ljZVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5tZW51SGlkZGVuJCkpXG4gICAgICAgIC5zdWJzY3JpYmUoY2hvaWNlID0+IHtcbiAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0Q2hvaWNlTGFiZWwoY2hvaWNlKTtcbiAgICAgICAgICBjb25zdCB0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRleHRhcmVhLnZhbHVlO1xuICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLm1lbnUhLnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjtcbiAgICAgICAgICBjb25zdCBzdGFydCA9IHZhbHVlLnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGNhcmV0UG9zaXRpb24gPVxuICAgICAgICAgICAgdGhpcy5tZW51IS5sYXN0Q2FyZXRQb3NpdGlvbiB8fCB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICBjb25zdCBlbmQgPSB2YWx1ZS5zbGljZShjYXJldFBvc2l0aW9uKTtcbiAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHN0YXJ0ICsgbGFiZWwgKyBlbmQ7XG4gICAgICAgICAgLy8gZm9yY2UgbmcgbW9kZWwgLyBmb3JtIGNvbnRyb2wgdG8gdXBkYXRlXG4gICAgICAgICAgdGV4dGFyZWEuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICBjb25zdCBzZXRDdXJzb3JBdCA9IChzdGFydCArIGxhYmVsKS5sZW5ndGg7XG4gICAgICAgICAgdGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2Uoc2V0Q3Vyc29yQXQsIHNldEN1cnNvckF0KTtcbiAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuY2hvaWNlU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgICAgICBjaG9pY2UsXG4gICAgICAgICAgICBpbnNlcnRlZEF0OiB7XG4gICAgICAgICAgICAgIHN0YXJ0OiBzdGFydEluZGV4LFxuICAgICAgICAgICAgICBlbmQ6IHN0YXJ0SW5kZXggKyBsYWJlbC5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLm1lbnVTaG93bi5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoaWRlTWVudSgpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMubWVudUhpZGRlbiQubmV4dCgpO1xuICAgICAgdGhpcy5tZW51SGlkZGVuLmVtaXQoKTtcbiAgICAgIHRoaXMubWVudSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmhpZGVNZW51KCk7XG4gIH1cbn1cbiJdfQ==