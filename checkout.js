document.addEventListener('DOMContentLoaded', () => {
    
    // --- 獲取所有相關 DOM 元素 ---
    const listContainer = document.querySelector('.cart-items-list');
    const subtotalDisplay = document.getElementById('subtotal-display');
    const totalDisplay = document.getElementById('total-display');
    const shippingFee = 50; // 假設運費固定
    const discount = 100;   // 假設折抵固定

    // --- 核心函數：計算總價 ---
    function updateOrderSummary() {
        let currentSubtotal = 0;
        
        // 遍歷所有購物車商品
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.dataset.price);
            // 獲取當前商品數量，可能透過 input 元素或 data 屬性
            const quantityInput = item.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput ? quantityInput.value : item.dataset.quantity);
            
            currentSubtotal += price * quantity;
        });

        // 格式化價格
        const finalSubtotal = currentSubtotal;
        const finalTotal = finalSubtotal - discount + shippingFee;

        // 更新顯示
        subtotalDisplay.textContent = `NT$${finalSubtotal.toLocaleString()}`;
        totalDisplay.textContent = `NT$${finalTotal.toLocaleString()}`;
    }

    // 數量
    listContainer.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.classList.contains('decrement-btn') || target.classList.contains('increment-btn')) {
            const quantityControl = target.closest('.quantity-control');
            const input = quantityControl.querySelector('.quantity-input');
            let quantity = parseInt(input.value);
            
            if (target.classList.contains('increment-btn')) {
                quantity++;
            } else if (target.classList.contains('decrement-btn') && quantity > 1) {
                quantity--;
            }
            
            input.value = quantity;
            updateOrderSummary(); // 數量變動後重新計算總價
        } 
        
        else if (target.classList.contains('remove-item')) {
            const item = target.closest('.cart-item');
            if (confirm('確定要移除此商品嗎？')) {
                item.remove(); // 從 DOM 中移除商品
                updateOrderSummary(); // 重新計算總價
                
                // 實際應用中，還需更新 #item-count 的數量
                const itemCount = document.querySelectorAll('.cart-item').length;
                document.getElementById('item-count').textContent = itemCount;
            }
        }
    });

    // 初始載入時計算一次總價
    updateOrderSummary();
});