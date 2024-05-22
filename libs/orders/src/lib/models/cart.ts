export interface Cart {
    cartItems: CartItem[]
}
export interface CartItem {
    productId?: string
    quantity?: number
}
export interface CartItemDetailed {
    product?: any
    quantity?: number | undefined
}
