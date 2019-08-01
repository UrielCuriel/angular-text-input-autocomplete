import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  Output,
  ViewContainerRef,
  ApplicationRef,
  EmbeddedViewRef
} from '@angular/core';
import getCaretCoordinates from 'textarea-caret';
import { takeUntil } from 'rxjs/operators';
import { TextInputAutocompleteMenuComponent } from './text-input-autocomplete-menu.component';
import { Subject } from 'rxjs';

export interface ChoiceSelectedEvent {
  choice: any;
  insertedAt: {
    start: number;
    end: number;
  };
}

@Directive({
  selector:
    'textarea[mwlTextInputAutocomplete],input[type="text"][mwlTextInputAutocomplete]'
})
export class TextInputAutocompleteDirective implements OnDestroy {
  /**
   * The character that will trigger the menu to appear
   */
  @Input() triggerCharacter: string = '@';

  /**
   * The regular expression that will match the search text after the trigger character
   */
  @Input() searchRegexp = /^\w*$/;

  /**
   * The menu component to show with available options.
   * You can extend the built in `TextInputAutocompleteMenuComponent` component to use a custom template
   */
  @Input() menuComponent = TextInputAutocompleteMenuComponent;

  /**
   * Called when the options menu is shown
   */
  @Output() menuShown = new EventEmitter();

  /**
   * Called when the options menu is hidden
   */
  @Output() menuHidden = new EventEmitter();

  /**
   * Called when a choice is selected
   */
  @Output() choiceSelected = new EventEmitter<ChoiceSelectedEvent>();

  /**
   * A function that accepts a search string and returns an array of choices. Can also return a promise.
   */
  @Input() findChoices: (searchText: string) => any[] | Promise<any[]>;

  /**
   * A function that formats the selected choice once selected.
   */
  @Input() getChoiceLabel: (choice: any) => string = choice => choice;

  /* tslint:disable member-ordering */
  private menu:
    | {
        component: ComponentRef<TextInputAutocompleteMenuComponent>;
        triggerCharacterPosition: number;
        lastCaretPosition?: number;
      }
    | undefined;

  private menuHidden$ = new Subject();
  menuElem: HTMLElement;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private appRef: ApplicationRef,
    private injector: Injector,
    private elm: ElementRef
  ) {}

  @HostListener('keypress', ['$event.key'])
  onKeypress(key: string) {
    if (
      (this.triggerCharacter !== '**' && key === this.triggerCharacter) ||
      (this.triggerCharacter === '**' && /[a-z|A-Z]/.test(key))
    ) {
      this.showMenu();
    }
  }

  @HostListener('input', ['$event.target.value'])
  onChange(value: string) {
    if (this.menu) {
      if (
        !value ||
        (value[this.menu.triggerCharacterPosition] !== this.triggerCharacter &&
          this.triggerCharacter !== '**')
      ) {
        this.hideMenu();
      } else {
        const cursor = this.elm.nativeElement.selectionStart;
        if (cursor < this.menu.triggerCharacterPosition) {
          this.hideMenu();
        } else {
          const searchText = value.slice(
            this.menu.triggerCharacterPosition +
              (this.triggerCharacter === '**' ? 0 : 1),
            cursor
          );
          if (!searchText.match(this.searchRegexp)) {
            this.hideMenu();
          } else {
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

  @HostListener('blur')
  onBlur() {
    if (this.menu) {
      this.menu.lastCaretPosition = this.elm.nativeElement.selectionStart;
    }
  }

  private showMenu() {
    if (!this.menu) {
      const menuFactory = this.componentFactoryResolver.resolveComponentFactory<
        TextInputAutocompleteMenuComponent
      >(this.menuComponent);
      this.menu = {
        component: this.viewContainerRef.createComponent(
          menuFactory,
          0,
          this.injector
        ),
        triggerCharacterPosition: this.elm.nativeElement.selectionStart
      };
      //Get DOM element from component
      this.menuElem = (this.menu.component.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      // Append Menu element to the body
      document.body.appendChild(this.menuElem);

      const lineHeight = +getComputedStyle(
        this.elm.nativeElement
      ).lineHeight!.replace(/px$/, '');

      const elmPositionTop = this.elm.nativeElement.getBoundingClientRect().top;
      const elmPositionLeft = this.elm.nativeElement.getBoundingClientRect()
        .left;
      const { top, left } = getCaretCoordinates(
        this.elm.nativeElement,
        this.elm.nativeElement.selectionStart
      );
      this.menu.component.instance.position = {
        top: elmPositionTop + top + lineHeight,
        left: elmPositionLeft + left
      };

      this.menu.component.changeDetectorRef.detectChanges();
      this.menu.component.instance.selectChoice
        .pipe(takeUntil(this.menuHidden$))
        .subscribe(choice => {
          const label = this.getChoiceLabel(choice);
          const textarea: HTMLTextAreaElement = this.elm.nativeElement;
          const value: string = textarea.value;
          const startIndex = this.menu!.triggerCharacterPosition;
          const start = value.slice(0, startIndex);
          const caretPosition =
            this.menu!.lastCaretPosition || textarea.selectionStart;
          const end = value.slice(caretPosition);
          textarea.value = start + label + end;
          // force ng model / form control to update
          textarea.dispatchEvent(new Event('input'));
          this.hideMenu();
          const setCursorAt = (start + label).length;
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

  private hideMenu() {
    if (this.menu) {
      this.menu.component.destroy();
      this.menuHidden$.next();
      this.menuHidden.emit();
      this.menu = undefined;
    }
  }

  ngOnDestroy() {
    this.hideMenu();
  }
}
