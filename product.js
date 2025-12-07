document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    // --- 數量增減功能 ---
    incrementBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        let maxValue = parseInt(quantityInput.max);
        
        if (currentValue < maxValue) {
            quantityInput.value = currentValue + 1;
        }
    });

    decrementBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        let minValue = parseInt(quantityInput.min);
        
        if (currentValue > minValue) {
            quantityInput.value = currentValue - 1;
        }
    });

    // --- 加入購物車提示功能 (示範用) ---
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault(); // 阻止按鈕預設行為
        const quantity = quantityInput.value;
        const volume = document.getElementById('volume').value;
        const productTitle = document.querySelector('.product-title').textContent;
        
        alert(`已將 ${volume} ${productTitle} (數量: ${quantity}) 加入購物車！`);
        
        
    });
});