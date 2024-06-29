import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input()
    public disabled: boolean = false;

    @Input()
    public title: string = 'Title';

    @Input()
    public subtitle: string = 'Subtitle';

    public active: boolean = false;

    public theme: 'blue' | 'green' | 'yellow' | 'red' | 'orange' = 'orange';

    public onCardClicked(): void {
        if (this.disabled) {
            return;
        }

        this.active = !this.active;
    }

    public onCloseClicked(): void {
        this.active = false;
    }
}
