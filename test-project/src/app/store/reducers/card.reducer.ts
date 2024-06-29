import { createReducer, on } from '@ngrx/store';
import { CardState } from '../interfaces/card-state.interface';
import { cardActions } from '../actions/card.actions';

const initialState: CardState = {
    title: undefined,
    subtitle: undefined,
    detailsTitle: undefined,
    active: false,
};

export const cardReducer = createReducer(
    initialState,
    on(cardActions.resetState, () => ({
        ...initialState,
    })),
    on(
        cardActions.updateTitle,
        (state: CardState, { value }) =>
            ({ ...state, title: value }) as CardState,
    ),
    on(
        cardActions.updateSubtitle,
        (state: CardState, { value }) =>
            ({ ...state, subtitle: value }) as CardState,
    ),
    on(
        cardActions.updateDetailsTitle,
        (state: CardState, { value }) =>
            ({ ...state, detailsTitle: value }) as CardState,
    ),
    on(
        cardActions.updateStatus,
        (state: CardState, { value }) =>
            ({ ...state, active: value }) as CardState,
    ),
);
