import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { CardState } from './store/interfaces/card-state.interface';
import { cardActions } from './store/actions/card.actions';
import { cardSelectors } from './store/selectors/card.selectors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    public formGroup: FormGroup;

    public cardStatus$: Observable<boolean>;

    private readonly _destroy$: Subject<void> = new Subject<void>();

    public constructor(
        private readonly _store: Store<CardState>,
        private readonly _formBuilder: FormBuilder,
    ) {
        this.formGroup = this._formBuilder.group({
            detailsTitle: this._formBuilder.control(undefined),
        });
    }

    public ngOnInit(): void {
        this.cardStatus$ = this._store.select(cardSelectors.status);

        this.formGroup
            .get('detailsTitle')
            .valueChanges.pipe(
                takeUntil(this._destroy$),
                tap((value: string) =>
                    this._store.dispatch(
                        cardActions.updateDetailsTitle({
                            value: value,
                        }),
                    ),
                ),
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
