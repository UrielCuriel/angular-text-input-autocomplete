import {
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Injector,
  OnDestroy,
  ViewContainerRef,
  ApplicationRef
} from '@angular/core';
import { TextInputAutocompleteMenuComponent } from './text-input-autocomplete-menu.component';
export interface ChoiceSelectedEvent {
  choice: any;
  insertedAt: {
    start: number;
    end: number;
  };
}
export declare class TextInputAutocompleteDirective implements OnDestroy {
  private componentFactoryResolver;
  private viewContainerRef;
  private appRef;
  private injector;
  private elm;
  /**
   * The character that will trigger the menu to appear
   */
  triggerCharacter: string;
  /**
   * The regular expression that will match the search text after the trigger character
   */
  searchRegexp: RegExp;
  /**
   * The menu component to show with available options.
   * You can extend the built in `TextInputAutocompleteMenuComponent` component to use a custom template
   */
  menuComponent: typeof TextInputAutocompleteMenuComponent;
  /**
   * Called when the options menu is shown
   */
  menuShown: EventEmitter<{}>;
  /**
   * Called when the options menu is hidden
   */
  menuHidden: EventEmitter<{}>;
  /**
   * Called when a choice is selected
   */
  choiceSelected: EventEmitter<ChoiceSelectedEvent>;
  /**
   * A function that accepts a search string and returns an array of choices. Can also return a promise.
   */
  findChoices: (searchText: string) => any[] | Promise<any[]>;
  /**
   * A function that formats the selected choice once selected.
   */
  getChoiceLabel: (choice: any) => string;
  /**
   * Whether to close the menu when the host textarea loses focus
   */
  closeMenuOnBlur: boolean;
  private menu;
  private menuHidden$;
  menuElem: HTMLElement;
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    appRef: ApplicationRef,
    injector: Injector,
    elm: ElementRef
  );
  onKeypress(key: string): void;
  onChange(value: string): void;
  onBlur(): void;
  private showMenu();
  private hideMenu();
  ngOnDestroy(): void;
}
