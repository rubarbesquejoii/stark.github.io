import { PRICES, formatPrice, calculateTax, calculateTotal } from '../constants/price.js';

document.addEventListener('DOMContentLoaded', () => {
    const validateCardNumber = (number) => {
        const cardRegex = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
        return cardRegex.test(number);
    };

    const validateExpiryDate = (date) => {
        const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryRegex.test(date)) return false;

        const [month, year] = date.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        if (parseInt(year) < currentYear || 
            (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            return false;
        }

        return true;
    };

    const validateCVV = (cvv) => {
        return /^[0-9]{3,4}$/.test(cvv);
    };

    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            if (value.length > 16) value = value.slice(0, 16);
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }

    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 4) value = value.slice(0, 4);
            if (value.length > 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });
    }

    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });
    }

    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const cardNumber = document.getElementById('cardNumber').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const state = document.getElementById('state').value;
            const zipCode = document.getElementById('zipCode').value;
            const country = document.getElementById('country').value;
            const notes = document.getElementById('notes').value;

            let isValid = true;
            let errorMessage = '';

            if (!validateCardNumber(cardNumber)) {
                isValid = false;
                errorMessage += 'Please enter a valid card number\n';
            }

            if (!validateExpiryDate(expiryDate)) {
                isValid = false;
                errorMessage += 'Please enter a valid expiry date (MM/YY)\n';
            }

            if (!validateCVV(cvv)) {
                isValid = false;
                errorMessage += 'Please enter a valid CVV\n';
            }

            if (!name.trim()) {
                isValid = false;
                errorMessage += 'Please enter your full name\n';
            }

            if (!email.trim()) {
                isValid = false;
                errorMessage += 'Please enter your email\n';
            }

            if (!address.trim()) {
                isValid = false;
                errorMessage += 'Please enter your address\n';
            }

            if (!city.trim()) {
                isValid = false;
                errorMessage += 'Please enter your city\n';
            }

            if (!state.trim()) {
                isValid = false;
                errorMessage += 'Please enter your state\n';
            }

            if (!zipCode.trim()) {
                isValid = false;
                errorMessage += 'Please enter your ZIP code\n';
            }

            if (!country.trim()) {
                isValid = false;
                errorMessage += 'Please enter your country\n';
            }

            if (!isValid) {
                alert(errorMessage);
                return;
            }

            alert('Order placed successfully! Thank you for your purchase.');
            
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        });
    }
}); 