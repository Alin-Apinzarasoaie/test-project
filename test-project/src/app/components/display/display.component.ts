import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { cardActions } from 'src/app/store/actions/card.actions';
import { CardState } from 'src/app/store/interfaces/card-state.interface';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit, OnDestroy {
    public formGroup: FormGroup;

    private readonly _destroy$: Subject<void> = new Subject<void>();

    public constructor(
        private readonly _store: Store<CardState>,
        private readonly _formBuilder: FormBuilder,
    ) {
        this.formGroup = this._formBuilder.group({
            title: this._formBuilder.control(undefined),
            subtitle: this._formBuilder.control(undefined),
        });
    }

    public ngOnInit(): void {
        this.formGroup
            .get('title')
            .valueChanges.pipe(
                takeUntil(this._destroy$),
                tap((value: string) =>
                    this._store.dispatch(
                        cardActions.updateTitle({
                            value: value,
                        }),
                    ),
                ),
            )
            .subscribe();

        this.formGroup
            .get('subtitle')
            .valueChanges.pipe(
                takeUntil(this._destroy$),
                tap((value: string) =>
                    this._store.dispatch(
                        cardActions.updateSubtitle({
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
