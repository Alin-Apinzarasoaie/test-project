import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { cardActions } from 'src/app/store/actions/card.actions';
import { CardState } from 'src/app/store/interfaces/card-state.interface';
import { cardSelectors } from 'src/app/store/selectors/card.selectors';

type ViewModel = {
    title: string;
    subtitle: string;
    detailsTitle: string;
    active: boolean;
};

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    public viewModel$: Observable<ViewModel>;

    @Input()
    public disabled: boolean = false;

    @Input()
    public theme: 'blue' | 'green' | 'yellow' | 'red' | 'orange' = 'blue';

    public constructor(private readonly _store: Store<CardState>) {}

    public ngOnInit(): void {
        const active$ = this._store.select(cardSelectors.status);

        const title$ = this._store
            .select(cardSelectors.title)
            .pipe(map((value: string) => (value ? value : 'Title')));

        const subtitle$ = this._store
            .select(cardSelectors.subtitle)
            .pipe(map((value: string) => (value ? value : 'Subtitle')));

        const detailsTitle$ = this._store
            .select(cardSelectors.detailsTitle)
            .pipe(map((value: string) => (value ? value : 'Details Title')));

        this.viewModel$ = combineLatest([
            title$,
            subtitle$,
            detailsTitle$,
            active$,
        ]).pipe(
            map(
                ([title, subtitle, detailsTitle, active]: [
                    string,
                    string,
                    string,
                    boolean,
                ]) =>
                    ({
                        title: title,
                        subtitle: subtitle,
                        detailsTitle: detailsTitle,
                        active: active,
                    }) as ViewModel,
            ),
        );
    }

    public onCardClicked(currentStatus: boolean): void {
        if (this.disabled) {
            return;
        }

        this._store.dispatch(
            cardActions.updateStatus({ value: !currentStatus }),
        );
    }

    public onCloseClicked(): void {
        this._store.dispatch(cardActions.updateStatus({ value: false }));
    }
}
