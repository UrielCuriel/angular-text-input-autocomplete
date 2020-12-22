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
        /**
         * Whether to close the menu when the host textarea loses focus
         */
        this.closeMenuOnBlur = false;
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
            if (this.closeMenuOnBlur === true) {
                this.hideMenu();
            }
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
    closeMenuOnBlur: [{ type: Input }],
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
    /**
     * Whether to close the menu when the host textarea loses focus
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.closeMenuOnBlur;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC1hdXRvY29tcGxldGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHdCQUF3QixFQUV4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFFTCxNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLGNBQWMsRUFFZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLG1CQUFtQixNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM5RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7Ozs7OztBQWMvQixNQUFNOzs7Ozs7OztJQTJESixZQUNVLDBCQUNBLGtCQUNBLFFBQ0EsVUFDQTtRQUpBLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQjtRQUNoQixXQUFNLEdBQU4sTUFBTTtRQUNOLGFBQVEsR0FBUixRQUFRO1FBQ1IsUUFBRyxHQUFILEdBQUc7Ozs7Z0NBNUR1QixHQUFHOzs7OzRCQUtmLE9BQU87Ozs7OzZCQU1OLGtDQUFrQzs7Ozt5QkFLckMsSUFBSSxZQUFZLEVBQUU7Ozs7MEJBS2pCLElBQUksWUFBWSxFQUFFOzs7OzhCQUtkLElBQUksWUFBWSxFQUF1Qjs7Ozs4QkFVZixNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU07Ozs7K0JBS3hDLEtBQUs7MkJBV1YsSUFBSSxPQUFPLEVBQUU7S0FTL0I7Ozs7O0lBR0osVUFBVSxDQUFDLEdBQVc7UUFDcEIsRUFBRSxDQUFD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Q0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ3ZCOzs7OztJQUdILFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7OztZQXpORixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUNOLGlGQUFpRjthQUNwRjs7OztZQTlCQyx3QkFBd0I7WUFVeEIsZ0JBQWdCO1lBQ2hCLGNBQWM7WUFMZCxRQUFRO1lBSFIsVUFBVTs7OytCQWdDVCxLQUFLOzJCQUtMLEtBQUs7NEJBTUwsS0FBSzt3QkFLTCxNQUFNO3lCQUtOLE1BQU07NkJBS04sTUFBTTswQkFLTixLQUFLOzZCQUtMLEtBQUs7OEJBS0wsS0FBSzt5QkFzQkwsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQzt1QkFVdkMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO3FCQWdEN0MsWUFBWSxTQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQXBwbGljYXRpb25SZWYsXG4gIEVtYmVkZGVkVmlld1JlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBnZXRDYXJldENvb3JkaW5hdGVzIGZyb20gJ3RleHRhcmVhLWNhcmV0JztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBDaG9pY2VTZWxlY3RlZEV2ZW50IHtcbiAgY2hvaWNlOiBhbnk7XG4gIGluc2VydGVkQXQ6IHtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIGVuZDogbnVtYmVyO1xuICB9O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6XG4gICAgJ3RleHRhcmVhW213bFRleHRJbnB1dEF1dG9jb21wbGV0ZV0saW5wdXRbdHlwZT1cInRleHRcIl1bbXdsVGV4dElucHV0QXV0b2NvbXBsZXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBjaGFyYWN0ZXIgdGhhdCB3aWxsIHRyaWdnZXIgdGhlIG1lbnUgdG8gYXBwZWFyXG4gICAqL1xuICBASW5wdXQoKSB0cmlnZ2VyQ2hhcmFjdGVyOiBzdHJpbmcgPSAnQCc7XG5cbiAgLyoqXG4gICAqIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCB3aWxsIG1hdGNoIHRoZSBzZWFyY2ggdGV4dCBhZnRlciB0aGUgdHJpZ2dlciBjaGFyYWN0ZXJcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaFJlZ2V4cCA9IC9eXFx3KiQvO1xuXG4gIC8qKlxuICAgKiBUaGUgbWVudSBjb21wb25lbnQgdG8gc2hvdyB3aXRoIGF2YWlsYWJsZSBvcHRpb25zLlxuICAgKiBZb3UgY2FuIGV4dGVuZCB0aGUgYnVpbHQgaW4gYFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRgIGNvbXBvbmVudCB0byB1c2UgYSBjdXN0b20gdGVtcGxhdGVcbiAgICovXG4gIEBJbnB1dCgpIG1lbnVDb21wb25lbnQgPSBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIHNob3duXG4gICAqL1xuICBAT3V0cHV0KCkgbWVudVNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIGhpZGRlblxuICAgKi9cbiAgQE91dHB1dCgpIG1lbnVIaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgY2hvaWNlIGlzIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KCkgY2hvaWNlU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENob2ljZVNlbGVjdGVkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGEgc2VhcmNoIHN0cmluZyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBjaG9pY2VzLiBDYW4gYWxzbyByZXR1cm4gYSBwcm9taXNlLlxuICAgKi9cbiAgQElucHV0KCkgZmluZENob2ljZXM6IChzZWFyY2hUZXh0OiBzdHJpbmcpID0+IGFueVtdIHwgUHJvbWlzZTxhbnlbXT47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBmb3JtYXRzIHRoZSBzZWxlY3RlZCBjaG9pY2Ugb25jZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldENob2ljZUxhYmVsOiAoY2hvaWNlOiBhbnkpID0+IHN0cmluZyA9IGNob2ljZSA9PiBjaG9pY2U7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gY2xvc2UgdGhlIG1lbnUgd2hlbiB0aGUgaG9zdCB0ZXh0YXJlYSBsb3NlcyBmb2N1c1xuICAgKi9cbiAgQElucHV0KCkgY2xvc2VNZW51T25CbHVyID0gZmFsc2U7XG5cbiAgLyogdHNsaW50OmRpc2FibGUgbWVtYmVyLW9yZGVyaW5nICovXG4gIHByaXZhdGUgbWVudTpcbiAgICB8IHtcbiAgICAgICAgY29tcG9uZW50OiBDb21wb25lbnRSZWY8VGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudD47XG4gICAgICAgIHRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjogbnVtYmVyO1xuICAgICAgICBsYXN0Q2FyZXRQb3NpdGlvbj86IG51bWJlcjtcbiAgICAgIH1cbiAgICB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIG1lbnVIaWRkZW4kID0gbmV3IFN1YmplY3QoKTtcbiAgbWVudUVsZW06IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGVsbTogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5cHJlc3MnLCBbJyRldmVudC5rZXknXSlcbiAgb25LZXlwcmVzcyhrZXk6IHN0cmluZykge1xuICAgIGlmIChcbiAgICAgICh0aGlzLnRyaWdnZXJDaGFyYWN0ZXIgIT09ICcqKicgJiYga2V5ID09PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIpIHx8XG4gICAgICAodGhpcy50cmlnZ2VyQ2hhcmFjdGVyID09PSAnKionICYmIC9bYS16fEEtWl0vLnRlc3Qoa2V5KSlcbiAgICApIHtcbiAgICAgIHRoaXMuc2hvd01lbnUoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50LnRhcmdldC52YWx1ZSddKVxuICBvbkNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgaWYgKFxuICAgICAgICAhdmFsdWUgfHxcbiAgICAgICAgKHZhbHVlW3RoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb25dICE9PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIgJiZcbiAgICAgICAgICB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIgIT09ICcqKicpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgaWYgKGN1cnNvciA8IHRoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb24pIHtcbiAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2VhcmNoVGV4dCA9IHZhbHVlLnNsaWNlKFxuICAgICAgICAgICAgdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbiArXG4gICAgICAgICAgICAgICh0aGlzLnRyaWdnZXJDaGFyYWN0ZXIgPT09ICcqKicgPyAwIDogMSksXG4gICAgICAgICAgICBjdXJzb3JcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICghc2VhcmNoVGV4dC5tYXRjaCh0aGlzLnNlYXJjaFJlZ2V4cCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5zZWFyY2hUZXh0ID0gc2VhcmNoVGV4dDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkRXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUodGhpcy5maW5kQ2hvaWNlcyhzZWFyY2hUZXh0KSlcbiAgICAgICAgICAgICAgLnRoZW4oY2hvaWNlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VzID0gY2hvaWNlcztcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZEVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCkge1xuICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgIHRoaXMubWVudS5sYXN0Q2FyZXRQb3NpdGlvbiA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICBpZiAodGhpcy5jbG9zZU1lbnVPbkJsdXIgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvd01lbnUoKSB7XG4gICAgaWYgKCF0aGlzLm1lbnUpIHtcbiAgICAgIGNvbnN0IG1lbnVGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8XG4gICAgICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgICAgID4odGhpcy5tZW51Q29tcG9uZW50KTtcbiAgICAgIHRoaXMubWVudSA9IHtcbiAgICAgICAgY29tcG9uZW50OiB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICAgIG1lbnVGYWN0b3J5LFxuICAgICAgICAgIDAsXG4gICAgICAgICAgdGhpcy5pbmplY3RvclxuICAgICAgICApLFxuICAgICAgICB0cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb246IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgIH07XG4gICAgICAvL0dldCBET00gZWxlbWVudCBmcm9tIGNvbXBvbmVudFxuICAgICAgdGhpcy5tZW51RWxlbSA9ICh0aGlzLm1lbnUuY29tcG9uZW50Lmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KVxuICAgICAgICAucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAvLyBBcHBlbmQgTWVudSBlbGVtZW50IHRvIHRoZSBib2R5XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWVudUVsZW0pO1xuXG4gICAgICBjb25zdCBsaW5lSGVpZ2h0ID0gK2dldENvbXB1dGVkU3R5bGUoXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnRcbiAgICAgICkubGluZUhlaWdodCEucmVwbGFjZSgvcHgkLywgJycpO1xuXG4gICAgICBjb25zdCBlbG1Qb3NpdGlvblRvcCA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgY29uc3QgZWxtUG9zaXRpb25MZWZ0ID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAubGVmdDtcbiAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBnZXRDYXJldENvb3JkaW5hdGVzKFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICApO1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5wb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiBlbG1Qb3NpdGlvblRvcCArIHRvcCArIGxpbmVIZWlnaHQsXG4gICAgICAgIGxlZnQ6IGVsbVBvc2l0aW9uTGVmdCArIGxlZnRcbiAgICAgIH07XG5cbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5zZWxlY3RDaG9pY2VcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubWVudUhpZGRlbiQpKVxuICAgICAgICAuc3Vic2NyaWJlKGNob2ljZSA9PiB7XG4gICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdldENob2ljZUxhYmVsKGNob2ljZSk7XG4gICAgICAgICAgY29uc3QgdGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQgPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5tZW51IS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb247XG4gICAgICAgICAgY29uc3Qgc3RhcnQgPSB2YWx1ZS5zbGljZSgwLCBzdGFydEluZGV4KTtcbiAgICAgICAgICBjb25zdCBjYXJldFBvc2l0aW9uID1cbiAgICAgICAgICAgIHRoaXMubWVudSEubGFzdENhcmV0UG9zaXRpb24gfHwgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgY29uc3QgZW5kID0gdmFsdWUuc2xpY2UoY2FyZXRQb3NpdGlvbik7XG4gICAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBzdGFydCArIGxhYmVsICsgZW5kO1xuICAgICAgICAgIC8vIGZvcmNlIG5nIG1vZGVsIC8gZm9ybSBjb250cm9sIHRvIHVwZGF0ZVxuICAgICAgICAgIHRleHRhcmVhLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcpKTtcbiAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgICAgY29uc3Qgc2V0Q3Vyc29yQXQgPSAoc3RhcnQgKyBsYWJlbCkubGVuZ3RoO1xuICAgICAgICAgIHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKHNldEN1cnNvckF0LCBzZXRDdXJzb3JBdCk7XG4gICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmNob2ljZVNlbGVjdGVkLmVtaXQoe1xuICAgICAgICAgICAgY2hvaWNlLFxuICAgICAgICAgICAgaW5zZXJ0ZWRBdDoge1xuICAgICAgICAgICAgICBzdGFydDogc3RhcnRJbmRleCxcbiAgICAgICAgICAgICAgZW5kOiBzdGFydEluZGV4ICsgbGFiZWwubGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5tZW51U2hvd24uZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlkZU1lbnUoKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICB0aGlzLm1lbnVIaWRkZW4kLm5leHQoKTtcbiAgICAgIHRoaXMubWVudUhpZGRlbi5lbWl0KCk7XG4gICAgICB0aGlzLm1lbnUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5oaWRlTWVudSgpO1xuICB9XG59XG4iXX0=