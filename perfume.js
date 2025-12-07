document.addEventListener('DOMContentLoaded', () => {
    // 1. 取得所有必要的 DOM 元素 (確保這些 ID 存在於 HTML 中)
    const products = document.querySelectorAll('.perfume-card');
    const filterOptions = document.querySelectorAll('.filter-option');
    const productCountDisplay = document.querySelector('.product-count');
    
    // 取得篩選器按鈕和選單元素
    const filterBtn = document.getElementById('scent-filter-btn');
    const dropdownMenu = document.getElementById('scent-dropdown-menu');

    // **【重要錯誤檢查】**：如果找不到關鍵 HTML 元素，則在 Console 報告錯誤並停止執行。
    if (!filterBtn || !dropdownMenu || !productCountDisplay) {
        console.error("Critical HTML elements missing! Please check if IDs (scent-filter-btn, scent-dropdown-menu) and the class (product-count) are correctly set in your HTML.");
        // 如果找不到，直接結束程式，避免後續錯誤。
        return; 
    }
    
    let currentScentFilter = null;
    let isDropdownOpen = false;

    
    // A. 選單開啟/關閉邏輯
    

    const toggleDropdown = (open) => {
        isDropdownOpen = open;
        if (isDropdownOpen) {
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.display = 'none'; 
        }
    };
    
    // 點擊按鈕時切換選單狀態
    filterBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // 阻止點擊事件冒泡到 document
        toggleDropdown(!isDropdownOpen);
    });

    // 點擊選單外部時關閉選單 (解決選單持續開啟的問題)
    document.addEventListener('click', (event) => {
        // 如果點擊目標不是按鈕本身，也不是選單內部，則關閉
        if (!dropdownMenu.contains(event.target) && event.target !== filterBtn) {
            toggleDropdown(false);
        }
    });

    // B. 商品篩選核心邏輯

    const filterProducts = () => {
        let visibleCount = 0;

        products.forEach(product => {
            // 從 data-scent 屬性取得商品的香調值
            const productScent = product.getAttribute('data-scent');

            // 檢查香調條件 (如果 currentScentFilter 為 null，則表示通過)
            const scentMatch = !currentScentFilter || productScent === currentScentFilter;

            if (scentMatch) {
                product.classList.remove('hidden');
                visibleCount++;
            } else {
                product.classList.add('hidden');
            }
        });

        productCountDisplay.textContent = `共 ${visibleCount} 項產品`;
    };

    //處理篩選連結的點擊事件
     
    const handleFilterClick = (event) => {
        event.preventDefault(); 
        event.stopPropagation(); 

        const clickedLink = event.currentTarget;
        const filterValue = clickedLink.getAttribute('data-filter-value'); 
        
        // 修正點擊兩次的問題：如果點到同一個值，則取消篩選
        if (currentScentFilter === filterValue) {
            currentScentFilter = null; 
        } else {
            currentScentFilter = filterValue; 
        }

        // 更新 active 樣式 (顯示哪個連結被選中)
        filterOptions.forEach(a => a.classList.remove('active'));
        if (currentScentFilter !== null) {
            clickedLink.classList.add('active');
        }

        // 執行篩選
        filterProducts();
        
        // **選完之後，自動關閉選單** (解決雙擊和選單持續開啟的問題)
        toggleDropdown(false);
    };

   
    // C. 初始化

    // 為所有篩選連結添加事件監聽器
    filterOptions.forEach(option => {
        option.addEventListener('click', handleFilterClick);
    });

    // 初始載入時，更新計數和隱藏/顯示商品
    filterProducts();
    
    // 確保選單初始是關閉的
    toggleDropdown(false);
   
    // D. 加入購物車邏輯


    const cartIcons = document.querySelectorAll('.cart-icon');
    
    cartIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            // 阻止事件向上冒泡，避免點擊購物車圖示時觸發整個產品卡片的連結
            event.stopPropagation();
            event.preventDefault(); 
            
            handleAddToCart(event.currentTarget);
        });
    });

    //處理加入購物車的視覺回饋
     
    function handleAddToCart(iconElement) {
        // 1. 取得商品資訊 (選用，但建議實作)
        // 找到最近的 perfume-card 元素，從中讀取產品名稱或 ID
        const card = iconElement.closest('.perfume-card');
        const productName = card ? card.querySelector('.perfume-name').textContent : '未知產品';

        // 2. 提供視覺回饋：讓圖示變色/閃爍
        iconElement.style.color = 'var(--color-soft-gold)'; // 暫時變成強調色
        iconElement.classList.add('added'); // 添加一個 CSS class 用於動畫或額外樣式

        // 3. 幾毫秒後恢復原狀
        setTimeout(() => {
            iconElement.style.color = 'var(--color-dark-taupe)';
            iconElement.classList.remove('added');
            // console.log(`已將 [${productName}] 加入購物車！`); // 可以在 Console 測試
        }, 500); 

    }
});