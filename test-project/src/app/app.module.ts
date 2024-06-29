import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DisplayComponent } from './components/display/display.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { cardReducer } from './store/reducers/card.reducer';
import { AppState } from './store/interfaces/app-state.interface';

const reducers: ActionReducerMap<AppState> = {
    card: cardReducer,
};

@NgModule({
    declarations: [AppComponent, CardComponent, DisplayComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
