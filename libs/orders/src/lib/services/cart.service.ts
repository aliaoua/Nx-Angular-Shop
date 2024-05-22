import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, map } from 'rxjs'
import { Cart, CartItem } from '../models/cart'

const CART_KEY = 'cart'

@Injectable({
    providedIn: 'root',
})
export class CartService {
    public cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
        this.loadCartFromLocalStorage()
    )
    public cart$: Observable<Cart> = this.cartSubject.asObservable()

    constructor() {}

    loadCartFromLocalStorage(): Cart {
        const cartData = localStorage.getItem(CART_KEY)
        return cartData ? JSON.parse(cartData) : { cartItems: [] }
    }

    clearCart(): void {
        const emptyCart = { cartItems: [] }
        this.saveCartToLocalStorage(emptyCart)
    }
    saveCartToLocalStorage(cart: Cart): void {
        localStorage.setItem(CART_KEY, JSON.stringify(cart))
        this.cartSubject.next(cart)
    }

    initCartLocalStorage(): void {
        const storedCart = this.loadCartFromLocalStorage()
        if (!storedCart.cartItems) {
            this.saveCartToLocalStorage({ cartItems: [] })
        }
    }

    setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
        const storedCart = this.loadCartFromLocalStorage()
        const existingProduct = storedCart.cartItems.find(
            (item) => item.productId === cartItem.productId
        )

        if (existingProduct) {
            existingProduct.quantity = updateCartItem
                ? cartItem.quantity
                : (existingProduct.quantity || 0) + (cartItem.quantity || 0)
        } else {
            storedCart.cartItems.push(cartItem)
        }

        this.saveCartToLocalStorage(storedCart)
        return storedCart
    }

    getCart(): Observable<Cart> {
        return this.cart$ // Simply return the cart observable
    }
    deleteItem(id: any): void {
        const storedCart = this.loadCartFromLocalStorage()
        const newCart = storedCart.cartItems.filter(
            (item) => item.productId !== id
        )

        // Update the cart in local storage (already handled in saveCartToLocalStorage)
        this.saveCartToLocalStorage({ ...storedCart, cartItems: newCart })

        // Trigger update through the subject (no need to pass the cart again)
    }
}
