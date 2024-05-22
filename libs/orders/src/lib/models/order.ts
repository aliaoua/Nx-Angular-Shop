import { Product } from '../../../../products/src'
import { User } from '../../../../users/src'

export interface Order {
    id?: string
    orderItems?: OrderItem[]
    phone?: string
    ShippingAddress1?: string
    ShippingAddress2?: string
    zip?: string
    city?: string
    country?: string
    status?: string
    totalPrice?: number
    user?: User
    dateOrdered?: string
}
export interface OrderItem {
    product?: Product
    quantity?: number
}
