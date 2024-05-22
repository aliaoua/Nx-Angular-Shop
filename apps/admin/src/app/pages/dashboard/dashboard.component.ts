import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardModule } from 'primeng/card'
import {
    DashboardService,
    TotalOrders,
    TotalProducts,
    TotalSales,
    TotalUsers,
} from '@org/users'
import { Observable } from 'rxjs'

@Component({
    selector: 'admin-dashboard',
    standalone: true,
    imports: [CommonModule, CardModule],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    totalSales!: Observable<TotalSales>
    totalUsers!: Observable<TotalUsers>
    totalOrders!: Observable<TotalOrders>
    totalProducts!: Observable<TotalProducts>
    constructor(private dashboardService: DashboardService) {}
    ngOnInit(): void {
        this.totalOrders = this.dashboardService.getTotalOrders()
        this.totalSales = this.dashboardService.getTotalSales()
        this.totalUsers = this.dashboardService.getTotalUsers()
        this.totalProducts = this.dashboardService.getTotalProducts()
    }
}
