/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostListener, ViewChild, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
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
export { TextInputAutocompleteMenuComponent };
function TextInputAutocompleteMenuComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.dropdownMenuElement;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.position;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.selectChoice;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.activeChoice;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.searchText;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.choiceLoadError;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.choiceLoading;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype._choices;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.trackById;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLyIsInNvdXJjZXMiOlsidGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs0QkFpQ2QsSUFBSSxPQUFPLEVBQUU7NkJBSVosS0FBSzt5QkFFVCxVQUFDLEtBQWEsRUFBRSxNQUFXO1lBQ3JDLE9BQUEsT0FBTyxNQUFNLENBQUMsRUFBRSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUFyRCxDQUFxRDs7SUFFdkQsc0JBQUksdURBQU87Ozs7UUFPWDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3RCOzs7OztRQVRELFVBQVksT0FBYztZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7OztPQUFBO0lBS0Qsc0JBQ0ksbURBQUc7Ozs7UUFEUDtZQUVFLHFCQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUMxQyxxQkFBTSxVQUFVLEdBQUcsSUFB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Q0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUNyQjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7OztnQkE3R0osU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLFFBQVEsRUFBRSwyVkFXVDtvQkFDRCxNQUFNLEVBQUU7d0JBQ04scU1BVUM7cUJBQ0Y7aUJBQ0Y7OztzQ0FFRSxTQUFTLFNBQUMsY0FBYztzQkFxQnhCLFdBQVcsU0FBQyxjQUFjO3VCQVcxQixXQUFXLFNBQUMsZUFBZTs4QkFXM0IsWUFBWSxTQUFDLDRCQUE0QixFQUFFLENBQUMsUUFBUSxDQUFDOzRCQVNyRCxZQUFZLFNBQUMsMEJBQTBCLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBU25ELFlBQVksU0FBQyx3QkFBd0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7NkNBbkdwRDs7U0FxQ2Esa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDaGlsZCxcbiAgSG9zdEJpbmRpbmdcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1tZW51JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cImNob2ljZXM/Lmxlbmd0aCA+IDBcIlxuICAgICAgI2Ryb3Bkb3duTWVudVxuICAgICAgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgIDxhICAqbmdGb3I9XCJsZXQgY2hvaWNlIG9mIGNob2ljZXM7IHRyYWNrQnk6dHJhY2tCeUlkXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVDaG9pY2UgPT09IGNob2ljZVwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdENob2ljZS5uZXh0KGNob2ljZSlcIiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIj5cbiAgICAgICAgICB7eyBjaG9pY2UgfX1cbiAgICAgICAgPC9hPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICA6aG9zdCB7XG4gICAgICAgIHotaW5kZXg6IDEwMDAwMDtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgfVxuICAgICAgLmRyb3Bkb3duLW1lbnUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbWF4LWhlaWdodDogMjAwcHg7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICB9XG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQge1xuICBAVmlld0NoaWxkKCdkcm9wZG93bk1lbnUnKSBkcm9wZG93bk1lbnVFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxVTGlzdEVsZW1lbnQ+O1xuICBwb3NpdGlvbjogeyB0b3A6IG51bWJlcjsgbGVmdDogbnVtYmVyIH07XG4gIHNlbGVjdENob2ljZSA9IG5ldyBTdWJqZWN0KCk7XG4gIGFjdGl2ZUNob2ljZTogYW55O1xuICBzZWFyY2hUZXh0OiBzdHJpbmc7XG4gIGNob2ljZUxvYWRFcnJvcjogYW55O1xuICBjaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2Nob2ljZXM6IGFueVtdO1xuICB0cmFja0J5SWQgPSAoaW5kZXg6IG51bWJlciwgY2hvaWNlOiBhbnkpID0+XG4gICAgdHlwZW9mIGNob2ljZS5pZCAhPT0gJ3VuZGVmaW5lZCcgPyBjaG9pY2UuaWQgOiBjaG9pY2U7XG5cbiAgc2V0IGNob2ljZXMoY2hvaWNlczogYW55W10pIHtcbiAgICB0aGlzLl9jaG9pY2VzID0gY2hvaWNlcztcbiAgICBpZiAoY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKSA9PT0gLTEgJiYgY2hvaWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmFjdGl2ZUNob2ljZSA9IGNob2ljZXNbMF07XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNob2ljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXM7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS50b3AucHgnKVxuICBnZXQgdG9wKCkge1xuICAgIGNvbnN0IHNjcmVlbkhlaWdodCA9IHdpbmRvdy5zY3JlZW4uaGVpZ2h0O1xuICAgIGNvbnN0IG1lbnVIZWlnaHQgPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnRcbiAgICAgID8gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgICA6IDA7XG5cbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi50b3AgKyBtZW51SGVpZ2h0IDwgc2NyZWVuSGVpZ2h0XG4gICAgICA/IHRoaXMucG9zaXRpb24udG9wXG4gICAgICA6IHRoaXMucG9zaXRpb24udG9wIC0gbWVudUhlaWdodDtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmxlZnQucHgnKVxuICBnZXQgbGVmdCgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5zY3JlZW4ud2lkdGg7XG4gICAgY29uc3QgbWVudVdpZHRoID0gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50XG4gICAgICA/IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoXG4gICAgICA6IDA7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ubGVmdCArIG1lbnVXaWR0aCA8IHNjcmVlbldpZHRoXG4gICAgICA/IHRoaXMucG9zaXRpb24ubGVmdFxuICAgICAgOiB0aGlzLnBvc2l0aW9uLmxlZnQgLSBtZW51V2lkdGg7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLkFycm93RG93bicsIFsnJGV2ZW50J10pXG4gIG9uQXJyb3dEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICBpZiAodGhpcy5jaG9pY2VzW2luZGV4ICsgMV0pIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9DaG9pY2UoaW5kZXggKyAxKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLkFycm93VXAnLCBbJyRldmVudCddKVxuICBvbkFycm93VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIGlmICh0aGlzLmNob2ljZXNbaW5kZXggLSAxXSkge1xuICAgICAgdGhpcy5zY3JvbGxUb0Nob2ljZShpbmRleCAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uRW50ZXInLCBbJyRldmVudCddKVxuICBvbkVudGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKSA+IC0xKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZWxlY3RDaG9pY2UubmV4dCh0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxUb0Nob2ljZShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5hY3RpdmVDaG9pY2UgPSB0aGlzLl9jaG9pY2VzW2luZGV4XTtcbiAgICBpZiAodGhpcy5kcm9wZG93bk1lbnVFbGVtZW50KSB7XG4gICAgICBjb25zdCB1bFBvc2l0aW9uID0gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCBsaSA9IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW2luZGV4XTtcbiAgICAgIGNvbnN0IGxpUG9zaXRpb24gPSBsaS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmIChsaVBvc2l0aW9uLnRvcCA8IHVsUG9zaXRpb24udG9wKSB7XG4gICAgICAgIGxpLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICB9IGVsc2UgaWYgKGxpUG9zaXRpb24uYm90dG9tID4gdWxQb3NpdGlvbi5ib3R0b20pIHtcbiAgICAgICAgbGkuc2Nyb2xsSW50b1ZpZXcoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19