import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardState } from '../interfaces/card-state.interface';

const selectCardFeature = createFeatureSelector<CardState>('card');

const titleSelector = createSelector(
    selectCardFeature,
    (state: CardState) => state.title,
);

const subtitleSelector = createSelector(
    selectCardFeature,
    (state: CardState) => state.subtitle,
);

const detailsTitleSelector = createSelector(
    selectCardFeature,
    (state: CardState) => state.detailsTitle,
);

const statusSelector = createSelector(
    selectCardFeature,
    (state: CardState) => state.active,
);

export const cardSelectors = {
    title: titleSelector,
    subtitle: subtitleSelector,
    detailsTitle: detailsTitleSelector,
    status: statusSelector,
};
