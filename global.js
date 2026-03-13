// Global state and components for SOCKD

const GlobalState = {
    cart: [],
    wishlist: [],
    init() {
        this.loadCart();
        this.renderNavbar();
        this.renderFooter();
        this.updateCartBadge();
    },
    
    loadCart() {
        const saved = localStorage.getItem('sockd_cart');
        if (saved) {
            this.cart = JSON.parse(saved);
        }
    },
    
    saveCart() {
        localStorage.setItem('sockd_cart', JSON.stringify(this.cart));
        this.updateCartBadge();
    },
    
    addToCart(product, quantity = 1, size = null, color = null) {
        // Simple logic: if item exists (matching id, size, and color), increase qty
        // otherwise push new item
        
        // Default size/color if not provided but exists on product
        const finalSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'OS');
        const finalColor = color || (product.colors && product.colors.length > 0 ? product.colors[0] : '#000000');
        
        const existingItem = this.cart.find(item => 
            item.id === product.id && 
            item.size === finalSize && 
            item.color === finalColor
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                cartId: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                quantity,
                size: finalSize,
                color: finalColor
            });
        }
        
        this.saveCart();
        this.showToast('✓ ADDED TO CART', 'success');
    },

    removeFromCart(cartId) {
        this.cart = this.cart.filter(item => item.cartId !== cartId);
        this.saveCart();
        this.showToast('REMOVED FROM CART', 'secondary');
        
        // Trigger a custom event so the cart page knows to re-render
        window.dispatchEvent(new Event('cartUpdated'));
    },
    
    updateItemQuantity(cartId, newQuantity) {
        const item = this.cart.find(i => i.cartId === cartId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            this.saveCart();
            window.dispatchEvent(new Event('cartUpdated'));
        }
    },
    
    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        badges.forEach(badge => {
            badge.textContent = totalItems;
            if (totalItems > 0) {
                badge.style.display = 'flex';
                // Trigger an animation class if desired
                badge.style.transform = 'scale(1.2)';
                setTimeout(() => badge.style.transform = 'scale(1)', 200);
            } else {
                badge.style.display = 'none';
            }
        });
    },

    showToast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast`;
        if (type === 'success') {
            toast.style.backgroundColor = 'var(--neon-green)';
        } else if (type === 'secondary') {
            toast.style.backgroundColor = 'var(--hot-pink)';
            toast.style.color = 'var(--white)';
        }
        
        toast.innerHTML = `<span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => {
                if (toast.parentElement) {
                    container.removeChild(toast);
                }
            }, 300); // Wait for animation
        }, 3000);
    },

    renderNavbar() {
        const header = document.getElementById('global-header');
        if (!header) return;

        header.innerHTML = `
            <nav class="navbar">
                <a href="index.html" class="nav-brand">SOCKD.</a>
                <div class="nav-links desktop-only">
                    <a href="categories.html" class="nav-link">SHOP</a>
                    <a href="categories.html?category=SOCKS" class="nav-link">SOCKS</a>
                    <a href="categories.html?category=LACES" class="nav-link">LACES</a>
                </div>
                <div class="nav-actions">
                    <div class="search-icon-wrapper" onclick="window.location.href='search.html'">
                        <!-- Simple Magnifying Glass SVG -->
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <a href="profile.html" class="user-icon-wrapper" style="color: black; border: 3px solid black; padding: 0.5rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s; background: white;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </a>
                    <a href="cart.html" class="cart-icon-wrapper">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span class="cart-badge">0</span>
                    </a>
                </div>
            </nav>
        `;
        
        // Add minimal structural styles for navbar actions
        const style = document.createElement('style');
        style.innerHTML = `
            .search-icon-wrapper, .user-icon-wrapper { cursor: pointer; border: var(--border-thick); padding: 0.5rem; background-color: var(--white); transition: all 0.2s;}
            .search-icon-wrapper:hover, .user-icon-wrapper:hover { background-color: var(--cyan); transform: translate(-2px, -2px); box-shadow: 2px 2px 0px var(--black); }
            @media (max-width: 768px) { 
                .nav-links { gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
                .navbar { flex-wrap: wrap; }
                .nav-brand { width: 100%; text-align: center; margin-bottom: 1rem; }
            }
        `;
        document.head.appendChild(style);
    },

    renderFooter() {
        const footerEle = document.getElementById('global-footer');
        if (!footerEle) return;

        footerEle.innerHTML = `
            <footer class="footer">
                <div class="footer-grid">
                    <div class="footer-col">
                        <h2 style="font-size: 2.5rem; color: var(--neon-yellow); margin-bottom: 1rem; text-shadow: 2px 2px 0px var(--black);">SOCKD.</h2>
                        <p>YOUR FEET DESERVE TO GO HARD.</p>
                        <p style="margin-top: 1rem; color: var(--hot-pink); font-weight: bold;">FREE SHIPPING OVER ₹999</p>
                    </div>
                    <div class="footer-col">
                        <h3>SHOP</h3>
                        <a href="categories.html?category=SOCKS" class="footer-link">SOCKS</a>
                        <a href="categories.html?category=LACES" class="footer-link">LACES</a>
                        <a href="categories.html?category=INSOLES" class="footer-link">INSOLES</a>
                        <a href="categories.html?category=ACCESSORIES" class="footer-link">ACCESSORIES</a>
                    </div>
                    <div class="footer-col">
                        <h3>SUPPORT</h3>
                        <a href="javascript:void(0)" onclick="GlobalState.showToast('COMING SOON', 'secondary')" class="footer-link">FAQ</a>
                        <a href="javascript:void(0)" onclick="GlobalState.showToast('COMING SOON', 'secondary')" class="footer-link">Shipping & Returns</a>
                        <a href="javascript:void(0)" onclick="GlobalState.showToast('COMING SOON', 'secondary')" class="footer-link">Contact Us</a>
                        <a href="javascript:void(0)" onclick="GlobalState.showToast('COMING SOON', 'secondary')" class="footer-link">Size Guide</a>
                    </div>
                    <div class="footer-col">
                        <h3>JOIN THE CULT</h3>
                        <div style="display: flex; margin-top: 1rem;">
                            <input type="email" placeholder="EMAIL ADDRESS" class="brutal-input" style="border-right: none;">
                            <button class="brutal-btn primary" style="padding: 1rem;">GO</button>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 4rem; padding-top: 2rem; border-top: var(--border-thin);">
                    <p>&copy; 2026 SOCKD. ALL RIGHTS RESERVED. NO APOLOGIES.</p>
                </div>
            </footer>
        `;
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    GlobalState.init();
});
