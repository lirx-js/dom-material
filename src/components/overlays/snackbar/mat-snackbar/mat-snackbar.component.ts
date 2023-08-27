import { function$$, IObservable, IObserver, map$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  VirtualComponentNode,
  Component,
  Input,
  AsymmetricInput,
  Output,
  input,
  asymmetricInput,
  output,
} from '@lirx/dom';
import { MatBasicButtonSecondaryModifier } from '../../../buttons/mat-button/built-in/basic/secondary/mat-basic-button-secondary.modifier';
import { IMatSnackbarComponentHorizontalPosition } from './types/mat-snackbar-component-horizontal-position.type';
import { IMatSnackbarComponentVerticalPosition } from './types/mat-snackbar-component-vertical-position.type';
import { IMatSnackbarComponentWidth } from './types/mat-snackbar-component-width.type';

// @ts-ignore
import html from './mat-snackbar.component.html?raw';
// @ts-ignore
import style from './mat-snackbar.component.scss?inline';

/**
 * COMPONENT: 'mat-snackbar'
 */

export interface IMatSnackbarComponentData {
  readonly message: Input<string>;
  readonly actionText: AsymmetricInput<string | undefined, string>;
  readonly horizontalPosition: AsymmetricInput<IMatSnackbarComponentHorizontalPosition | undefined, IMatSnackbarComponentHorizontalPosition>;
  readonly verticalPosition: AsymmetricInput<IMatSnackbarComponentVerticalPosition | undefined, IMatSnackbarComponentVerticalPosition>;
  readonly width: AsymmetricInput<IMatSnackbarComponentWidth | undefined, IMatSnackbarComponentWidth>;
  readonly clickAction: Output<MouseEvent>;
}

interface ITemplateData {
  readonly message$: IObservable<string>;
  readonly hasAction$: IObservable<boolean>;
  readonly actionText$: IObservable<string>;
  readonly $onClickActionButton: IObserver<MouseEvent>;
}

export type IMatSnackbarVirtualComponentNode = VirtualComponentNode<HTMLElement, IMatSnackbarComponentData>;

export const MatSnackbarComponent = new Component<HTMLElement, IMatSnackbarComponentData, ITemplateData>({
  name: 'mat-snackbar',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    modifiers: [
      MatBasicButtonSecondaryModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatSnackbarComponentData => {
    return {
      message: input<string>(),
      actionText: asymmetricInput<string | undefined, string>((value: string | undefined): string => {
        return (value === void 0)
          ? ''
          : value;
      }, ''),
      horizontalPosition: asymmetricInput<IMatSnackbarComponentHorizontalPosition | undefined, IMatSnackbarComponentHorizontalPosition>((value: IMatSnackbarComponentHorizontalPosition | undefined): IMatSnackbarComponentHorizontalPosition => {
        return (value === void 0)
          ? MAT_SNACKBAR_COMPONENT_DEFAULT_HORIZONTAL_POSITION
          : value;
      }, MAT_SNACKBAR_COMPONENT_DEFAULT_HORIZONTAL_POSITION),
      verticalPosition: asymmetricInput<IMatSnackbarComponentVerticalPosition | undefined, IMatSnackbarComponentVerticalPosition>((value: IMatSnackbarComponentVerticalPosition | undefined): IMatSnackbarComponentVerticalPosition => {
        return (value === void 0)
          ? MAT_SNACKBAR_COMPONENT_DEFAULT_VERTICAL_POSITION
          : value;
      }, MAT_SNACKBAR_COMPONENT_DEFAULT_VERTICAL_POSITION),
      width: asymmetricInput<IMatSnackbarComponentWidth | undefined, IMatSnackbarComponentWidth>((value: IMatSnackbarComponentWidth | undefined): IMatSnackbarComponentWidth => {
        return (value === void 0)
          ? MAT_SNACKBAR_COMPONENT_DEFAULT_WIDTH
          : value;
      }, MAT_SNACKBAR_COMPONENT_DEFAULT_WIDTH),
      clickAction: output<MouseEvent>(),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IMatSnackbarComponentData>): ITemplateData => {
    // INPUTS
    const message$ = node.input$('message');
    const actionText$ = node.input$('actionText');
    const horizontalPosition$ = node.input$('horizontalPosition');
    const verticalPosition$ = node.input$('verticalPosition');
    const width$ = node.input$('width');

    // OUTPUTS
    const $clickAction = node.$output('clickAction');

    // ACTION
    const hasAction$ = map$$(actionText$, (actionText: string): boolean => {
      return (actionText !== '');
    });

    const $onClickActionButton = $clickAction;

    // POSITIONS & WIDTH
    const classList$ = function$$(
      [horizontalPosition$, verticalPosition$, width$],
      (horizontalPosition, verticalPosition, width) => {
        return new Set([
          `mat--position-${horizontalPosition}`,
          `mat--position-${verticalPosition}`,
          `mat--width-${width}`,
        ]);
      },
    );
    node.setReactiveClassNamesList(classList$);

    return {
      message$,
      hasAction$,
      actionText$,
      $onClickActionButton,
    };
  },
});

/** CONSTANTS **/

export const MAT_SNACKBAR_COMPONENT_DEFAULT_HORIZONTAL_POSITION: IMatSnackbarComponentHorizontalPosition = 'right';
export const MAT_SNACKBAR_COMPONENT_DEFAULT_VERTICAL_POSITION: IMatSnackbarComponentVerticalPosition = 'bottom';
export const MAT_SNACKBAR_COMPONENT_DEFAULT_WIDTH: IMatSnackbarComponentWidth = 'static';
