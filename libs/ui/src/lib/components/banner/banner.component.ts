import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'

@Component({
    selector: 'ui-banner',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './banner.component.html',
})
export class BannerComponent {}
