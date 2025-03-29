// Item Prices
const PRICES = {
    // PokéCoins
    POKECOINS_100: 0.99,
    POKECOINS_550: 4.99,
    POKECOINS_1200: 9.99,
    POKECOINS_2500: 19.99,
    POKECOINS_5200: 39.99,
    POKECOINS_14500: 99.99,

    INCENSE: 0.99,
    LUCKY_EGG: 0.99,
    STAR_PIECE: 0.99,
    MYSTERY_BUNDLE: 4.99,

    TAX_RATE: 0.1
};

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function calculateTax(subtotal) {
    return subtotal * PRICES.TAX_RATE;
}

function calculateTotal(subtotal) {
    const tax = calculateTax(subtotal);
    return subtotal + tax;
}

export { PRICES, formatPrice, calculateTax, calculateTotal };
