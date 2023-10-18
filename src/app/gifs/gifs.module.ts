import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from "../shared/shared.module";
import { CardListComponent } from './components/card-list/card-list.component';
import { GifsCardComponent } from './components/card/card.component';

@NgModule({
    declarations: [
        HomePageComponent,
        CardListComponent,
        GifsCardComponent,
    ],
    exports: [
        HomePageComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class GifsModule { }
