import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
export declare class TextInputAutocompleteMenuComponent {
  dropdownMenuElement: ElementRef<HTMLUListElement>;
  position: {
    top: number;
    left: number;
  };
  selectChoice: Subject<{}>;
  activeChoice: any;
  searchText: string;
  choiceLoadError: any;
  choiceLoading: boolean;
  private _choices;
  trackById: (index: number, choice: any) => any;
  choices: any[];
  readonly top: number;
  readonly left: number;
  onArrowDown(event: KeyboardEvent): void;
  onArrowUp(event: KeyboardEvent): void;
  onEnter(event: KeyboardEvent): void;
  private scrollToChoice(index);
}
