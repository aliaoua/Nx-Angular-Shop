import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { LocalsStorageService } from '@org/users'
import { AuthService } from '@org/users'

@Component({
    selector: 'admin-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    providers: [LocalsStorageService, AuthService],
})
export class SidebarComponent {
    constructor(
        private localsstoragesercie: LocalsStorageService,
        private router: Router,
        private authService: AuthService
    ) {}
    logout() {
        this.authService.logout()
    }
}
