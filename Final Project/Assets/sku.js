document.addEventListener('DOMContentLoaded', () => {
    const skuModal = document.getElementById('skuModal');
    const skuModalClose = document.querySelector('.sku-modal-close');
    const skuCards = document.querySelectorAll('.sku-card');

    function getItemName(imagePath) {
        const fileName = imagePath.split('/').pop();
        const name = fileName.replace('item_', '').replace('.png', '');
        return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function extractNumbers(str) {
        return str.match(/\d+/g) || [];
    }

    function populateModal(card) {
        const title = card.querySelector('.sku-card__title').textContent;
        const tag = card.querySelector('.sku-card__tag')?.textContent || '';
        const image = card.querySelector('.sku-card__image').src;
        const purchaseLimit = card.querySelector('.sku-card__purchase-limit')?.textContent || '';
        const price = card.querySelector('.buy-button').textContent;
        const bundledItems = card.querySelectorAll('.sku-card__bundled-items .bundled-item');

        document.getElementById('skuModalTitle').textContent = title;
        document.getElementById('skuModalTag').textContent = tag;
        document.getElementById('skuModalImage').src = image;
        document.getElementById('skuModalBuyButton').textContent = price;

        if (title.includes('PokéCoins')) {
            const numbers = extractNumbers(title);
            const bonusCoins = extractNumbers(purchaseLimit);
            const baseCoins = numbers[0] || '0';
            const bonus = bonusCoins[0] || '0';
            const total = parseInt(baseCoins) + parseInt(bonus);

            document.getElementById('skuModalPurchaseLimit').innerHTML = `
                <div class="coin-details">
                    <div class="coin-amount">${baseCoins} PokéCoins</div>
                    <div class="coin-bonus">${bonus} Web Store Bonus Coins</div>
                    <div class="coin-total">${baseCoins} + ${bonus} Web Store Bonus = ${total} total PokéCoins</div>
                </div>
            `;
        } else {
            document.getElementById('skuModalPurchaseLimit').textContent = purchaseLimit;
        }

        const productDetailsContainer = document.getElementById('skuModalProductDetails');
        productDetailsContainer.innerHTML = '';
        
        bundledItems.forEach(item => {
            const itemImage = item.querySelector('.bundled-item-image').src;
            const itemCount = item.querySelector('.item-image-badge__badge').textContent;
            const itemName = getItemName(itemImage);
            
            const detailElement = document.createElement('div');
            detailElement.className = 'sku-modal-product-detail';
            detailElement.innerHTML = `
                <img src="${itemImage}" alt="${itemName}">
                <span>${itemName} ${itemCount}</span>
            `;
            productDetailsContainer.appendChild(detailElement);
        });
    }

    function showModal() {
        skuModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }

    function hideModal() {
        skuModal.style.display = 'none';
        document.body.style.overflow = ''; 
    }

    skuCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.buy-button')) {
                return;
            }
            populateModal(card);
            showModal();
        });
    });

    skuModalClose.addEventListener('click', hideModal);

    skuModal.addEventListener('click', (e) => {
        if (e.target === skuModal) {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && skuModal.style.display === 'flex') {
            hideModal();
        }
    });

    document.getElementById('skuModalBuyButton').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Processing purchase...');
        hideModal();
    });
}); 