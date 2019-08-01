import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  HostBinding
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
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
})
export class TextInputAutocompleteMenuComponent {
  @ViewChild('dropdownMenu') dropdownMenuElement: ElementRef<HTMLUListElement>;
  position: { top: number; left: number };
  selectChoice = new Subject();
  activeChoice: any;
  searchText: string;
  choiceLoadError: any;
  choiceLoading = false;
  private _choices: any[];
  trackById = (index: number, choice: any) =>
    typeof choice.id !== 'undefined' ? choice.id : choice;

  set choices(choices: any[]) {
    this._choices = choices;
    if (choices.indexOf(this.activeChoice) === -1 && choices.length > 0) {
      this.activeChoice = choices[0];
    }
  }

  get choices() {
    return this._choices;
  }
  @HostBinding('style.top.px')
  get top() {
    const screenHeight = window.screen.height;
    const menuHeight = this.dropdownMenuElement
      ? this.dropdownMenuElement.nativeElement.offsetHeight
      : 0;

    return this.position.top + menuHeight < screenHeight
      ? this.position.top
      : this.position.top - menuHeight;
  }
  @HostBinding('style.left.px')
  get left() {
    const screenWidth = window.screen.width;
    const menuWidth = this.dropdownMenuElement
      ? this.dropdownMenuElement.nativeElement.offsetWidth
      : 0;
    return this.position.left + menuWidth < screenWidth
      ? this.position.left
      : this.position.left - menuWidth;
  }

  @HostListener('document:keydown.ArrowDown', ['$event'])
  onArrowDown(event: KeyboardEvent) {
    event.preventDefault();
    const index = this.choices.indexOf(this.activeChoice);
    if (this.choices[index + 1]) {
      this.scrollToChoice(index + 1);
    }
  }

  @HostListener('document:keydown.ArrowUp', ['$event'])
  onArrowUp(event: KeyboardEvent) {
    event.preventDefault();
    const index = this.choices.indexOf(this.activeChoice);
    if (this.choices[index - 1]) {
      this.scrollToChoice(index - 1);
    }
  }

  @HostListener('document:keydown.Enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    if (this.choices.indexOf(this.activeChoice) > -1) {
      event.preventDefault();
      this.selectChoice.next(this.activeChoice);
    }
  }

  private scrollToChoice(index: number) {
    this.activeChoice = this._choices[index];
    if (this.dropdownMenuElement) {
      const ulPosition = this.dropdownMenuElement.nativeElement.getBoundingClientRect();
      const li = this.dropdownMenuElement.nativeElement.children[index];
      const liPosition = li.getBoundingClientRect();
      if (liPosition.top < ulPosition.top) {
        li.scrollIntoView();
      } else if (liPosition.bottom > ulPosition.bottom) {
        li.scrollIntoView(false);
      }
    }
  }
}
