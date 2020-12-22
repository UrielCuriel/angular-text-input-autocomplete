/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostListener, ViewChild, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
export class TextInputAutocompleteMenuComponent {
    constructor() {
        this.selectChoice = new Subject();
        this.choiceLoading = false;
        this.trackById = (index, choice) => typeof choice.id !== 'undefined' ? choice.id : choice;
    }
    /**
     * @param {?} choices
     * @return {?}
     */
    set choices(choices) {
        this._choices = choices;
        if (choices.indexOf(this.activeChoice) === -1 && choices.length > 0) {
            this.activeChoice = choices[0];
        }
    }
    /**
     * @return {?}
     */
    get choices() {
        return this._choices;
    }
    /**
     * @return {?}
     */
    get top() {
        const /** @type {?} */ screenHeight = window.screen.height;
        const /** @type {?} */ menuHeight = this.dropdownMenuElement
            ? this.dropdownMenuElement.nativeElement.offsetHeight
            : 0;
        return this.position.top + menuHeight < screenHeight
            ? this.position.top
            : this.position.top - menuHeight;
    }
    /**
     * @return {?}
     */
    get left() {
        const /** @type {?} */ screenWidth = window.screen.width;
        const /** @type {?} */ menuWidth = this.dropdownMenuElement
            ? this.dropdownMenuElement.nativeElement.offsetWidth
            : 0;
        return this.position.left + menuWidth < screenWidth
            ? this.position.left
            : this.position.left - menuWidth;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onArrowDown(event) {
        event.preventDefault();
        const /** @type {?} */ index = this.choices.indexOf(this.activeChoice);
        if (this.choices[index + 1]) {
            this.scrollToChoice(index + 1);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onArrowUp(event) {
        event.preventDefault();
        const /** @type {?} */ index = this.choices.indexOf(this.activeChoice);
        if (this.choices[index - 1]) {
            this.scrollToChoice(index - 1);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onEnter(event) {
        if (this.choices.indexOf(this.activeChoice) > -1) {
            event.preventDefault();
            this.selectChoice.next(this.activeChoice);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    scrollToChoice(index) {
        this.activeChoice = this._choices[index];
        if (this.dropdownMenuElement) {
            const /** @type {?} */ ulPosition = this.dropdownMenuElement.nativeElement.getBoundingClientRect();
            const /** @type {?} */ li = this.dropdownMenuElement.nativeElement.children[index];
            const /** @type {?} */ liPosition = li.getBoundingClientRect();
            if (liPosition.top < ulPosition.top) {
                li.scrollIntoView();
            }
            else if (liPosition.bottom > ulPosition.bottom) {
                li.scrollIntoView(false);
            }
        }
    }
}
TextInputAutocompleteMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-text-input-autocomplete-menu',
                template: `
    <div
      *ngIf="choices?.length > 0"
      #dropdownMenu
      class="dropdown-menu">
        <a  *ngFor="let choice of choices; trackBy:trackById"
        [class.active]="activeChoice === choice"
          (click)="selectChoice.next(choice)" class="dropdown-item">
          {{ choice }}
        </a>
    </div>
  `,
                styles: [
                    `
      :host {
        z-index: 100000;
        position: fixed;
      }
      .dropdown-menu {
        display: block;
        max-height: 200px;
        overflow-y: auto;
      }
    `
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLyIsInNvdXJjZXMiOlsidGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUE4Qi9CLE1BQU07OzRCQUdXLElBQUksT0FBTyxFQUFFOzZCQUlaLEtBQUs7eUJBRVQsQ0FBQyxLQUFhLEVBQUUsTUFBVyxFQUFFLEVBQUUsQ0FDekMsT0FBTyxNQUFNLENBQUMsRUFBRSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTTs7Ozs7O0lBRXZELElBQUksT0FBTyxDQUFDLE9BQWM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0tBQ0Y7Ozs7SUFFRCxJQUFJLE9BQU87UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0Qjs7OztJQUNELElBQ0ksR0FBRztRQUNMLHVCQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMxQyx1QkFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLG1C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QUUsQ0FBQzthQUNyQjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7Ozs7WUE3R0osU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7R0FXVDtnQkFDRCxNQUFNLEVBQUU7b0JBQ047Ozs7Ozs7Ozs7S0FVQztpQkFDRjthQUNGOzs7a0NBRUUsU0FBUyxTQUFDLGNBQWM7a0JBcUJ4QixXQUFXLFNBQUMsY0FBYzttQkFXMUIsV0FBVyxTQUFDLGVBQWU7MEJBVzNCLFlBQVksU0FBQyw0QkFBNEIsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFTckQsWUFBWSxTQUFDLDBCQUEwQixFQUFFLENBQUMsUUFBUSxDQUFDO3NCQVNuRCxZQUFZLFNBQUMsd0JBQXdCLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0NoaWxkLFxuICBIb3N0QmluZGluZ1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLW1lbnUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgICpuZ0lmPVwiY2hvaWNlcz8ubGVuZ3RoID4gMFwiXG4gICAgICAjZHJvcGRvd25NZW51XG4gICAgICBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj5cbiAgICAgICAgPGEgICpuZ0Zvcj1cImxldCBjaG9pY2Ugb2YgY2hvaWNlczsgdHJhY2tCeTp0cmFja0J5SWRcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZUNob2ljZSA9PT0gY2hvaWNlXCJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0Q2hvaWNlLm5leHQoY2hvaWNlKVwiIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiPlxuICAgICAgICAgIHt7IGNob2ljZSB9fVxuICAgICAgICA8L2E+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIDpob3N0IHtcbiAgICAgICAgei1pbmRleDogMTAwMDAwO1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICB9XG4gICAgICAuZHJvcGRvd24tbWVudSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBtYXgtaGVpZ2h0OiAyMDBweDtcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgIH1cbiAgICBgXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duTWVudScpIGRyb3Bkb3duTWVudUVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTFVMaXN0RWxlbWVudD47XG4gIHBvc2l0aW9uOiB7IHRvcDogbnVtYmVyOyBsZWZ0OiBudW1iZXIgfTtcbiAgc2VsZWN0Q2hvaWNlID0gbmV3IFN1YmplY3QoKTtcbiAgYWN0aXZlQ2hvaWNlOiBhbnk7XG4gIHNlYXJjaFRleHQ6IHN0cmluZztcbiAgY2hvaWNlTG9hZEVycm9yOiBhbnk7XG4gIGNob2ljZUxvYWRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2hvaWNlczogYW55W107XG4gIHRyYWNrQnlJZCA9IChpbmRleDogbnVtYmVyLCBjaG9pY2U6IGFueSkgPT5cbiAgICB0eXBlb2YgY2hvaWNlLmlkICE9PSAndW5kZWZpbmVkJyA/IGNob2ljZS5pZCA6IGNob2ljZTtcblxuICBzZXQgY2hvaWNlcyhjaG9pY2VzOiBhbnlbXSkge1xuICAgIHRoaXMuX2Nob2ljZXMgPSBjaG9pY2VzO1xuICAgIGlmIChjaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpID09PSAtMSAmJiBjaG9pY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuYWN0aXZlQ2hvaWNlID0gY2hvaWNlc1swXTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2hvaWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlcztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnRvcC5weCcpXG4gIGdldCB0b3AoKSB7XG4gICAgY29uc3Qgc2NyZWVuSGVpZ2h0ID0gd2luZG93LnNjcmVlbi5oZWlnaHQ7XG4gICAgY29uc3QgbWVudUhlaWdodCA9IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudFxuICAgICAgPyB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgICAgIDogMDtcblxuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLnRvcCArIG1lbnVIZWlnaHQgPCBzY3JlZW5IZWlnaHRcbiAgICAgID8gdGhpcy5wb3NpdGlvbi50b3BcbiAgICAgIDogdGhpcy5wb3NpdGlvbi50b3AgLSBtZW51SGVpZ2h0O1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUubGVmdC5weCcpXG4gIGdldCBsZWZ0KCkge1xuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LnNjcmVlbi53aWR0aDtcbiAgICBjb25zdCBtZW51V2lkdGggPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnRcbiAgICAgID8gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGhcbiAgICAgIDogMDtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5sZWZ0ICsgbWVudVdpZHRoIDwgc2NyZWVuV2lkdGhcbiAgICAgID8gdGhpcy5wb3NpdGlvbi5sZWZ0XG4gICAgICA6IHRoaXMucG9zaXRpb24ubGVmdCAtIG1lbnVXaWR0aDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uQXJyb3dEb3duJywgWyckZXZlbnQnXSlcbiAgb25BcnJvd0Rvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIGlmICh0aGlzLmNob2ljZXNbaW5kZXggKyAxXSkge1xuICAgICAgdGhpcy5zY3JvbGxUb0Nob2ljZShpbmRleCArIDEpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uQXJyb3dVcCcsIFsnJGV2ZW50J10pXG4gIG9uQXJyb3dVcChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgaWYgKHRoaXMuY2hvaWNlc1tpbmRleCAtIDFdKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQ2hvaWNlKGluZGV4IC0gMSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5FbnRlcicsIFsnJGV2ZW50J10pXG4gIG9uRW50ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5jaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpID4gLTEpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbGVjdENob2ljZS5uZXh0KHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvQ2hvaWNlKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZUNob2ljZSA9IHRoaXMuX2Nob2ljZXNbaW5kZXhdO1xuICAgIGlmICh0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHVsUG9zaXRpb24gPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGxpID0gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgY29uc3QgbGlQb3NpdGlvbiA9IGxpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKGxpUG9zaXRpb24udG9wIDwgdWxQb3NpdGlvbi50b3ApIHtcbiAgICAgICAgbGkuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgIH0gZWxzZSBpZiAobGlQb3NpdGlvbi5ib3R0b20gPiB1bFBvc2l0aW9uLmJvdHRvbSkge1xuICAgICAgICBsaS5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=