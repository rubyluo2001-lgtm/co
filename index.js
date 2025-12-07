 // 獲取漢堡圖示和導覽列元素
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // 定義切換選單的函數
    function toggleMenu() {
        // 使用 .toggle() 方法，如果元素有 active 類別就移除，沒有就新增
        mobileNav.classList.toggle('active');
        
        // 可選：切換漢堡圖示為 X 號，增加視覺回饋
        if (mobileNav.classList.contains('active')) {
            menuToggle.textContent = 'close';
        } else {
            menuToggle.textContent = 'menu';
        }
    }

    // 為漢堡圖示添加點擊事件監聽器
    menuToggle.addEventListener('click', toggleMenu);
