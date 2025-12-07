document.addEventListener('DOMContentLoaded', () => {
    
    // 獲取所有需要捲動淡入效果的元素 (所有左右排版的區塊)
    const fadeElements = document.querySelectorAll('.feature-block');
    
    // 創建 Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 進入視窗時添加可見類別
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        // 當元素 10% 進入視窗時觸發
        threshold: 0.1 
    });

    fadeElements.forEach(el => {
        // 設置淡入前的初始狀態 (CSS)
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)'; 
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
});