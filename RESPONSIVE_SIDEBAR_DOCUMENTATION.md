# Dokumentasi Responsive Sidebar Navbar

## Overview

Dokumentasi ini menjelaskan implementasi **Responsive Sidebar Navbar** yang memiliki perilaku berbeda antara mode desktop dan mobile:

- **Desktop (>1024px)**: Sidebar selalu terlihat dengan logo section dan toggle button untuk collapse/expand
- **Mobile (≤1024px)**: Sidebar tersembunyi secara default, muncul sebagai overlay di bawah mobile header saat dibuka, tanpa logo section dan toggle button

## Fitur Utama

1. ✅ Sidebar tersembunyi secara default di mobile
2. ✅ Mobile header dengan logo dan toggle button
3. ✅ Sidebar muncul sebagai overlay di bawah mobile header (tidak menutupi header)
4. ✅ Konten tetap full width tanpa blank space
5. ✅ Sidebar langsung menampilkan menu list (tanpa logo section) di mobile
6. ✅ Tidak ada overlay/blur background saat sidebar dibuka
7. ✅ Sidebar tidak menggeser konten (overlay di atas konten)

---

## Struktur HTML

### 1. Mobile Header

Tambahkan mobile header di dalam `<body>`, sebelum flex container utama:

```html
<!-- Mobile Header -->
<header class="mobile-header">
    <div class="mobile-header-logo">
        <img src="images/logo-sidebar.png" alt="SMART ZISWAF">
        <div class="mobile-header-logo-text">
            <div class="text-sm text-gray-900">SMART</div>
            <div class="text-sm" style="color: #223301;">ZISWAF</div>
        </div>
    </div>
    <button id="mobileToggleBtn" class="mobile-toggle-btn">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>
</header>
```

### 2. Sidebar Overlay (Optional - untuk overlay background, tidak digunakan di implementasi ini)

```html
<!-- Sidebar Overlay for Mobile -->
<div id="sidebarOverlay" class="sidebar-overlay"></div>
```

### 3. Flex Container

```html
<div class="flex h-screen overflow-hidden">
    <!-- Modern Sidebar -->
    <aside id="sidebar" class="sidebar-modern w-72 flex flex-col relative z-50">
        <!-- Logo Section (akan disembunyikan di mobile) -->
        <div class="logo-section px-6 py-6">
            <!-- Logo content -->
        </div>

        <!-- Navigation -->
        <nav class="flex flex-col flex-1 px-2 py-6 space-y-2 overflow-y-auto sidebar-nav">
            <!-- Menu items -->
        </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-content-wrapper flex-1 flex flex-col overflow-hidden">
        <!-- Content -->
    </div>
</div>
```

---

## CSS yang Diperlukan

### 1. Mobile Header Styles

```css
/* Mobile Header */
.mobile-header {
    display: none;
    background: #ffffff;
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    padding: 12px 16px;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.mobile-header-logo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.mobile-header-logo img {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

.mobile-header-logo-text {
    display: flex;
    flex-direction: column;
}

.mobile-header-logo-text .text-sm {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
}

.mobile-toggle-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #223301;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.mobile-toggle-btn:hover {
    background: #2d4a0a;
    transform: scale(1.05);
}

.mobile-toggle-btn svg {
    width: 20px;
    height: 20px;
    color: white;
}
```

### 2. Sidebar Overlay (Optional)

```css
/* Mobile Sidebar Overlay */
.sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-overlay.show {
    opacity: 1;
    visibility: visible;
}
```

### 3. Responsive Styles (PENTING!)

```css
/* Responsive Styles */
@media (max-width: 1024px) {
    /* Show mobile header */
    .mobile-header {
        display: flex;
    }

    /* Hide overlay in mobile - no blur/overlay background */
    .sidebar-overlay {
        display: none !important;
    }

    /* Sidebar as overlay - starts below mobile header */
    .sidebar-modern {
        position: fixed !important;
        left: 0;
        top: 64px !important; /* Below mobile header */
        bottom: 0;
        z-index: 999 !important; /* Below mobile header (1000) but above content */
        width: 288px !important; /* w-72 = 288px */
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        margin: 0 !important;
        padding: 0 !important;
        min-width: 288px !important;
        max-width: 288px !important;
    }

    /* When sidebar is closed - completely hidden */
    .sidebar-modern:not(.mobile-open) {
        box-shadow: none !important;
        border-right: none !important;
        background: transparent !important;
        pointer-events: none !important;
    }

    /* Hide all active menu item styles when sidebar is closed */
    .sidebar-modern:not(.mobile-open) .menu-item-modern.active {
        border-left: none !important;
        background: transparent !important;
        box-shadow: none !important;
    }

    .sidebar-modern:not(.mobile-open) .menu-item-modern.active::before {
        display: none !important;
    }

    /* When sidebar is open */
    .sidebar-modern.mobile-open {
        transform: translateX(0) !important;
        width: 288px !important;
        min-width: 288px !important;
        max-width: 288px !important;
        background: #ffffff !important;
        box-shadow: 4px 0 30px rgba(0, 0, 0, 0.15) !important;
        border-right: 1px solid rgba(226, 232, 240, 0.8) !important;
        pointer-events: auto !important;
    }

    /* Hide logo section and toggle button in mobile sidebar */
    .sidebar-modern .logo-section {
        display: none !important;
    }

    .sidebar-modern .toggle-btn-header {
        display: none !important;
    }

    /* Sidebar navigation starts from top in mobile - minimal padding */
    .sidebar-modern .sidebar-nav {
        padding-top: 12px;
        padding-bottom: 16px;
        margin-top: 0;
    }

    .sidebar-modern {
        padding-top: 0;
    }

    .sidebar-modern .sidebar-nav > *:first-child {
        margin-top: 0;
    }

    .sidebar-modern.collapsed {
        width: 80px;
    }

    /* Sidebar doesn't take space in flex layout - it's fixed overlay */
    body > div.flex > .sidebar-modern:not(.mobile-open) {
        flex: 0 0 0 !important;
        width: 0 !important;
        min-width: 0 !important;
        max-width: 0 !important;
    }

    /* When sidebar is open, it should have width for display */
    body > div.flex > .sidebar-modern.mobile-open,
    .sidebar-modern.mobile-open {
        width: 288px !important;
        min-width: 288px !important;
        max-width: 288px !important;
        transform: translateX(0) !important;
        visibility: visible !important;
        opacity: 1 !important;
    }

    /* Main content always full width - sidebar doesn't affect it */
    .main-content-wrapper {
        width: 100% !important;
        max-width: 100% !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        flex: 1 1 100% !important;
        min-width: 0 !important;
    }

    /* Ensure parent flex container doesn't reserve space for sidebar */
    body > div.flex {
        position: relative;
        overflow-x: hidden;
    }

    /* Ensure dropdown menus work properly on mobile */
    .sidebar-modern.mobile-open .dropdown-menu-modern {
        position: static !important;
        top: auto !important;
        left: auto !important;
    }
}

@media (min-width: 1025px) {
    .mobile-header {
        display: none !important;
    }

    .sidebar-overlay {
        display: none !important;
    }

    .sidebar-modern {
        transform: translateX(0) !important;
    }

    /* Show logo section and toggle button on desktop */
    .sidebar-modern .logo-section {
        display: flex !important;
    }

    .sidebar-modern .toggle-btn-header {
        display: flex !important;
    }
}

/* Adjust header hero for mobile */
@media (max-width: 1024px) {
    .header-hero {
        margin-top: 0;
    }

    /* Ensure no blank space on mobile - full width container */
    body > div.flex {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        gap: 0 !important;
    }

    /* Sidebar is fixed overlay - doesn't take space from flex layout */
    body > div.flex > .sidebar-modern {
        flex: 0 0 0 !important;
        width: 0 !important;
        min-width: 0 !important;
        max-width: 0 !important;
    }

    /* Main content always full width - sidebar doesn't affect it */
    .main-content-wrapper {
        padding-top: 0;
        width: 100% !important;
        max-width: 100% !important;
        flex: 1 1 100% !important;
        min-width: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .main-content-wrapper > * {
        width: 100%;
    }
}
```

---

## JavaScript yang Diperlukan

### 1. Function untuk Check Mobile View

```javascript
// Check if mobile view
function isMobileView() {
    return window.innerWidth <= 1024;
}
```

### 2. Function untuk Close All Dropdowns

```javascript
// Function to close all dropdowns
function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu-modern').forEach(menu => {
        menu.classList.remove('open');
        // Reset all inline styles
        menu.style.top = '';
        menu.style.position = '';
        menu.style.left = '';
    });
    document.querySelectorAll('.dropdown-icon-modern').forEach(icon => {
        icon.classList.remove('rotated');
    });
}
```

### 3. Mobile Toggle Function

```javascript
// Mobile toggle (show/hide)
function toggleMobileSidebar() {
    if (!isMobileView()) return;

    const sidebar = document.getElementById('sidebar');
    const isOpen = sidebar.classList.contains('mobile-open');

    if (isOpen) {
        // Close all dropdown menus before closing sidebar
        closeAllDropdowns();
        
        sidebar.classList.remove('mobile-open');
        // Remove body class to restore scrolling
        document.body.classList.remove('sidebar-mobile-open');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    } else {
        sidebar.classList.add('mobile-open');
        // Prevent body scroll when sidebar is open
        document.body.classList.add('sidebar-mobile-open');
        // Ensure all dropdowns are closed when opening sidebar
        closeAllDropdowns();
    }
}
```

### 4. Event Listeners

```javascript
// Get elements
const sidebar = document.getElementById('sidebar');
const mobileToggleBtn = document.getElementById('mobileToggleBtn');

// Mobile toggle button
if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileSidebar();
    });
}

// Close mobile sidebar when clicking a menu item (but not dropdown toggles)
document.querySelectorAll('.sidebar-modern a[href]:not([href="#"]):not([href="javascript:void(0)"])').forEach(link => {
    link.addEventListener('click', () => {
        if (isMobileView()) {
            // Only close if it's not a dropdown toggle link
            const isDropdownToggle = link.hasAttribute('onclick') && link.getAttribute('onclick').includes('toggleDropdown');
            if (!isDropdownToggle) {
                setTimeout(() => {
                    sidebar.classList.remove('mobile-open');
                    document.body.classList.remove('sidebar-mobile-open');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }, 100);
            }
        }
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (!isMobileView()) {
            // Desktop view - ensure sidebar is visible
            sidebar.classList.remove('mobile-open');
        } else {
            // Mobile view - ensure sidebar is closed by default
            sidebar.classList.remove('mobile-open');
        }
    }, 250);
});
```

---

## Step-by-Step Implementation

### Step 1: Tambahkan Mobile Header

Tambahkan mobile header di dalam `<body>`, sebelum flex container utama.

### Step 2: Tambahkan CSS

Copy semua CSS yang diperlukan ke dalam `<style>` tag atau file CSS terpisah.

### Step 3: Tambahkan JavaScript

Copy semua JavaScript yang diperlukan ke dalam `<script>` tag sebelum closing `</body>`.

### Step 4: Pastikan ID dan Class Sesuai

Pastikan ID dan class berikut ada di HTML:
- `id="mobileToggleBtn"` pada mobile toggle button
- `id="sidebar"` pada sidebar
- `class="main-content-wrapper"` pada main content wrapper
- `class="sidebar-nav"` pada navigation sidebar

### Step 5: Test Responsive

Test di berbagai ukuran layar:
- Desktop (>1024px): Sidebar terlihat dengan logo
- Mobile (≤1024px): Sidebar tersembunyi, muncul saat toggle

---

## Catatan Penting

### 1. Z-Index Hierarchy
- Mobile Header: `z-index: 1000`
- Sidebar: `z-index: 999` (di bawah header, di atas konten)
- Overlay (jika digunakan): `z-index: 1000` (di bawah sidebar)

### 2. Sidebar Position
- Desktop: Normal position dalam flex layout
- Mobile: `position: fixed` dengan `top: 64px` (di bawah mobile header)

### 3. Sidebar Width
- Desktop: `w-72` (288px) atau sesuai kebutuhan
- Mobile: `288px` fixed width saat dibuka

### 4. Transform
- Hidden: `transform: translateX(-100%)`
- Open: `transform: translateX(0)`

### 5. Content Full Width
- Main content selalu `width: 100%` di mobile
- Sidebar tidak mengambil space dari flex layout (`flex: 0 0 0`, `width: 0`)

### 6. Logo Section
- Desktop: Terlihat
- Mobile: `display: none !important`

### 7. Toggle Button
- Desktop: Toggle button di sidebar untuk collapse/expand
- Mobile: Toggle button di mobile header untuk show/hide

---

## Troubleshooting

### Sidebar tidak muncul di mobile
- Pastikan `z-index` sidebar lebih rendah dari mobile header
- Pastikan `transform: translateX(0)` saat `.mobile-open`
- Pastikan `width: 288px` saat dibuka

### Blank space di kiri konten
- Pastikan sidebar menggunakan `position: fixed` di mobile
- Pastikan `flex: 0 0 0` dan `width: 0` pada sidebar di flex container
- Pastikan main content `width: 100%` dan `flex: 1 1 100%`

### Sidebar menutupi mobile header
- Pastikan `top: 64px` pada sidebar (sesuaikan dengan tinggi mobile header)
- Pastikan `z-index` sidebar lebih rendah dari mobile header

### Konten bergeser saat sidebar dibuka
- Pastikan sidebar menggunakan `position: fixed`
- Pastikan sidebar tidak mengambil space dari flex layout

### Elemen visual masih terlihat saat sidebar tersembunyi (border hijau, shadow, dll)
**Masalah:** Ketika sidebar tersembunyi di mobile (tidak memiliki class `.mobile-open`), masih ada elemen visual yang terlihat seperti:
- Border hijau dari menu item active (`border-left: 4px solid #223301`)
- Box-shadow dari sidebar
- Border-right dari sidebar
- Background putih dari sidebar
- Pseudo-element `::before` dari menu item active

**Solusi:** Tambahkan CSS berikut untuk menyembunyikan semua elemen visual ketika sidebar tidak dibuka:

```css
/* When sidebar is closed - completely hidden */
.sidebar-modern:not(.mobile-open) {
    box-shadow: none !important;
    border-right: none !important;
    background: transparent !important;
    pointer-events: none !important;
}

/* Hide all active menu item styles when sidebar is closed */
.sidebar-modern:not(.mobile-open) .menu-item-modern.active {
    border-left: none !important;
    background: transparent !important;
    box-shadow: none !important;
}

.sidebar-modern:not(.mobile-open) .menu-item-modern.active::before {
    display: none !important;
}

/* When sidebar is open - restore all visual elements */
.sidebar-modern.mobile-open {
    background: #ffffff !important;
    box-shadow: 4px 0 30px rgba(0, 0, 0, 0.15) !important;
    border-right: 1px solid rgba(226, 232, 240, 0.8) !important;
    pointer-events: auto !important;
}
```

**Catatan:**
- Gunakan selector `:not(.mobile-open)` untuk menargetkan sidebar yang tersembunyi
- Gunakan `!important` untuk memastikan style override style default
- Pastikan semua elemen visual (border, shadow, background) di-set ke `none` atau `transparent` saat tersembunyi
- Kembalikan semua visual elements saat sidebar dibuka (class `.mobile-open`)

### Scrollbar muncul saat sidebar dibuka di mobile karena dropdown menu terbuka
**Masalah:** Ketika sidebar dibuka di mobile, muncul scrollbar vertikal yang tidak diinginkan. Masalah ini terjadi karena:
- Dropdown menu memiliki state default terbuka (memiliki class `open` dan icon dengan class `rotated`)
- Ketika sidebar dibuka, dropdown menu yang sudah terbuka menyebabkan konten melebihi tinggi viewport
- Scrollbar muncul karena konten sidebar melebihi tinggi yang tersedia

**Solusi:** 

1. **Tutup semua dropdown menu saat sidebar ditutup:**
   Modifikasi fungsi `toggleMobileSidebar()` untuk memanggil `closeAllDropdowns()` saat sidebar ditutup:

```javascript
// Function to close all dropdowns
function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu-modern').forEach(menu => {
        menu.classList.remove('open');
        // Reset all inline styles
        menu.style.top = '';
        menu.style.position = '';
        menu.style.left = '';
    });
    document.querySelectorAll('.dropdown-icon-modern').forEach(icon => {
        icon.classList.remove('rotated');
    });
}

// Mobile toggle (show/hide)
function toggleMobileSidebar() {
    if (!isMobileView()) return;

    const sidebar = document.getElementById('sidebar');
    const isOpen = sidebar.classList.contains('mobile-open');

    if (isOpen) {
        // Close all dropdown menus before closing sidebar
        closeAllDropdowns();
        
        sidebar.classList.remove('mobile-open');
        // Remove body class to restore scrolling
        document.body.classList.remove('sidebar-mobile-open');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    } else {
        sidebar.classList.add('mobile-open');
        // Prevent body scroll when sidebar is open
        document.body.classList.add('sidebar-mobile-open');
        // Ensure all dropdowns are closed when opening sidebar
        closeAllDropdowns();
    }
}
```

2. **Hapus state default terbuka dari dropdown menu di HTML:**
   Pastikan dropdown menu tidak memiliki class `open` dan icon tidak memiliki class `rotated` secara default:

```html
<!-- ❌ SALAH: Dropdown default terbuka -->
<a href="#" class="menu-item-modern active flex items-center justify-between px-4 py-3.5"
    onclick="toggleDropdown(event, 'dataMaster')">
    <div class="flex items-center space-x-4">
        <span class="menu-text text-sm font-medium">Data Master</span>
    </div>
    <svg class="dropdown-icon-modern w-4 h-4 text-gray-500 rotated" fill="none"
        stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
</a>
<div id="dataMaster" class="dropdown-menu-modern open">
    <!-- Menu items -->
</div>

<!-- ✅ BENAR: Dropdown default tertutup -->
<a href="#" class="menu-item-modern active flex items-center justify-between px-4 py-3.5"
    onclick="toggleDropdown(event, 'dataMaster')">
    <div class="flex items-center space-x-4">
        <span class="menu-text text-sm font-medium">Data Master</span>
    </div>
    <svg class="dropdown-icon-modern w-4 h-4 text-gray-500" fill="none"
        stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
</a>
<div id="dataMaster" class="dropdown-menu-modern">
    <!-- Menu items -->
</div>
```

3. **Pastikan dropdown menu tidak otomatis terbuka saat sidebar dibuka:**
   Dengan memanggil `closeAllDropdowns()` saat sidebar dibuka, kita memastikan semua dropdown tertutup dan user harus klik untuk membukanya.

**Catatan Penting:**
- **Selalu tutup semua dropdown saat sidebar ditutup** untuk mencegah scrollbar muncul
- **Jangan set dropdown default terbuka** di HTML (hapus class `open` dan `rotated`)
- **User harus klik dropdown menu** untuk membukanya, tidak otomatis terbuka
- **Fungsi `closeAllDropdowns()` harus dipanggil** baik saat sidebar dibuka maupun ditutup untuk memastikan state konsisten

**Implementasi pada page lain:**
Saat mengimplementasikan responsive sidebar pada page lain, pastikan:
1. Fungsi `closeAllDropdowns()` ada dan dipanggil di `toggleMobileSidebar()`
2. Tidak ada dropdown menu dengan class `open` atau icon dengan class `rotated` secara default di HTML
3. Dropdown menu hanya terbuka saat user mengklik menu item, bukan otomatis

---

## Contoh Implementasi Lengkap

Lihat file `dashboard.html` sebagai referensi implementasi lengkap.

---

## Update History

- **v1.2** (2025-01-XX): Fix scrollbar muncul karena dropdown menu default terbuka
  - Menambahkan `closeAllDropdowns()` di fungsi `toggleMobileSidebar()` untuk menutup semua dropdown saat sidebar ditutup/dibuka
  - Menghapus state default terbuka dari dropdown menu (class `open` dan `rotated`)
  - Memastikan dropdown menu tidak otomatis terbuka saat sidebar dibuka
  - Menambahkan dokumentasi troubleshooting untuk issue scrollbar
  - **PENTING:** Saat implementasi di page lain, pastikan tidak ada dropdown dengan class `open` default dan panggil `closeAllDropdowns()` di `toggleMobileSidebar()`

- **v1.1** (2025-01-XX): Fix elemen visual yang masih terlihat saat sidebar tersembunyi
  - Menambahkan CSS untuk menyembunyikan border, shadow, background saat sidebar tertutup
  - Menyembunyikan border hijau dari menu item active saat sidebar tersembunyi
  - Menambahkan `pointer-events: none` untuk sidebar yang tersembunyi
  - Menambahkan `overflow-x: hidden` pada parent container

- **v1.0** (2025-01-XX): Initial implementation
  - Responsive sidebar dengan mobile header
  - Sidebar overlay di bawah mobile header
  - Konten full width tanpa blank space
  - Tidak ada overlay/blur background

---

## Support

Jika ada pertanyaan atau masalah dalam implementasi, silakan referensi ke file `dashboard.html` atau hubungi tim development.

