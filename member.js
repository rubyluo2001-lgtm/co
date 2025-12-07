document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('loginModal'); // 登入視窗的容器
    const memberIconLink = document.getElementById('memberIconLink'); // Header 上的會員圖標
    const closeBtn = document.querySelector('.login-modal .close-btn'); // 登入視窗內的關閉按鈕
    const passwordInput = document.getElementById('password'); // 密碼輸入框
    const togglePasswordBtn = document.querySelector('.toggle-password'); // 密碼顯示/隱藏按鈕
    const loginForm = document.getElementById('loginForm'); // 登入表單

    

    // 開啟視窗函數
    function openLoginModal(e) {
        // 確保元素存在
        if (modal) {
            if (e) e.preventDefault(); // 阻止連結的預設跳轉行為
            modal.classList.remove('hidden'); // 移除 CSS 隱藏類別
            document.body.style.overflow = 'hidden'; // 阻止背景頁面捲動
        }
    }

    // 關閉視窗函數
    function closeLoginModal() {
        if (modal) {
            modal.classList.add('hidden'); // 加入 CSS 隱藏類別
            document.body.style.overflow = ''; // 恢復背景頁面捲動
            loginForm.reset(); // 清空表單內容
        }
    }

    
    // 檢查 Header 連結是否存在
    if (memberIconLink) {
        memberIconLink.addEventListener('click', openLoginModal);
    }
    
    // 點擊 Modal 內的關閉按鈕
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLoginModal);
    }
    
    // 點擊 Modal 外部的遮罩層
    if (modal) {
        modal.addEventListener('click', (e) => {
            // 如果點擊的目標剛好是 modal 元素本身 
            if (e.target === modal) {
                closeLoginModal();
            }
        });
    }

    // 密碼顯示/隱藏功能
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            // 切換圖標 
            const icon = togglePasswordBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye-slash');
                icon.classList.toggle('fa-eye');
            }
        });
    }

    // 表單提交處理 
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 模擬登入成功後的回饋和關閉
            console.log('嘗試登入...');
            setTimeout(() => {
                alert('登入成功！'); 
                closeLoginModal();
            }, 500);
        });
    }
});