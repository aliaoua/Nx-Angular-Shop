import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HeaderComponent } from './shared/header/header.component'
import { FooterComponent } from './shared/footer/footer.component'
import { CommonModule } from '@angular/common'
import { AccordionModule } from 'primeng/accordion'
import { CartService } from '@org/orders'
import { UsersService } from '@org/users'
import { HttpClientModule } from '@angular/common/http'

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FooterComponent,
        HeaderComponent,
        RouterModule,
        AccordionModule,
        HttpClientModule,
    ],
    selector: 'eshop-root',
    templateUrl: './app.component.html',
    providers: [UsersService],
})
export class AppComponent implements OnInit {
    constructor(
        private cartService: CartService,
        private usersService: UsersService
    ) {}
    ngOnInit(): void {
        this.cartService.initCartLocalStorage()
        this.usersService.initAppSession()
    }
}
