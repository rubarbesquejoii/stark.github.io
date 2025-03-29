import { PRICES, formatPrice, calculateTax, calculateTotal } from '../constants/price.js';

document.addEventListener('DOMContentLoaded', () => {
    const removeButtons = document.querySelectorAll('.remove-item');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cartItem = button.closest('.cart-item');
            cartItem.style.opacity = '0';
            cartItem.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                cartItem.remove();
                updateCartSummary();
            }, 300);
        });
    });

    function updateCartSummary() {
        const cartItems = document.querySelectorAll('.cart-item');
        let subtotal = 0;
        
        cartItems.forEach(item => {
            const priceText = item.querySelector('.cart-item-price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            subtotal += price;
        });
        
        const tax = calculateTax(subtotal);
        const total = calculateTotal(subtotal);
        
        document.querySelector('.summary-item:nth-child(1) span:last-child').textContent = formatPrice(subtotal);
        document.querySelector('.summary-item:nth-child(2) span:last-child').textContent = formatPrice(tax);
        document.querySelector('.summary-item.total span:last-child').textContent = formatPrice(total);
        
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }
    }

    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            alert('Checkout functionality coming soon!');
        });
    }
}); 