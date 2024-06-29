import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const cardActions = createActionGroup({
    source: 'Card',
    events: {
        'Update Title': props<{
            value: string;
        }>(),
        'Update Subtitle': props<{
            value: string;
        }>(),
        'Update Details Title': props<{
            value: string;
        }>(),
        'Update Status': props<{
            value: boolean;
        }>(),
        'Reset State': emptyProps(),
    },
});
