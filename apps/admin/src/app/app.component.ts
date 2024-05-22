import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { CommonModule } from '@angular/common'

@Component({
    standalone: true,
    imports: [RouterModule, DashboardComponent, CommonModule],
    selector: 'admin-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'admin'
}
