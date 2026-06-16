/* Customer Account Dashboard — client-side behavior (no app, no backend)
   - Tab switching between panels
   - Wishlist + Recently Viewed rendered from localStorage product handles
   Storage keys are shared with the product-page snippets:
     snippets/wishlist-button.liquid        -> "acct:wishlist"
     snippets/track-recently-viewed.liquid  -> "acct:recentlyViewed"
*/
(function () {
  'use strict';

  var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
  var WISHLIST_KEY = 'acct:wishlist';
  var RECENT_KEY = 'acct:recentlyViewed';

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch (e) { return []; }
  }

  function formatMoney(cents) {
    // Shopify product JSON prices are in cents; fall back to a simple format.
    var amount = (cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 });
    var symbol = (window.Shopify && window.Shopify.currency && window.Shopify.currency.active) ? '' : '';
    return symbol + amount;
  }

  /* ---------- Tab switching ---------- */
  function initTabs(scope) {
    var navItems = scope.querySelectorAll('[data-panel-target]');
    var panels = scope.querySelectorAll('[data-panel]');

    function activate(name) {
      panels.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-panel') === name); });
      scope.querySelectorAll('.acct-nav__item').forEach(function (n) {
        if (n.hasAttribute('data-panel-target')) {
          n.classList.toggle('is-active', n.getAttribute('data-panel-target') === name);
        }
      });
      if (window.matchMedia('(max-width: 900px)').matches) {
        scope.querySelector('.acct-main').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    navItems.forEach(function (item) {
      item.addEventListener('click', function () { activate(item.getAttribute('data-panel-target')); });
    });
  }

  /* ---------- Render product cards from handles ---------- */
  function renderProducts(handles, grid, emptySel) {
    var empty = grid.querySelector(emptySel);
    if (!handles.length) { if (empty) empty.style.display = ''; return; }
    if (empty) empty.style.display = 'none';

    // Fetch each product's JSON; render in original order.
    Promise.all(handles.map(function (handle) {
      return fetch(root + 'products/' + handle + '.js')
        .then(function (r) { return r.ok ? r.json() : null; })
        .catch(function () { return null; });
    })).then(function (products) {
      products.forEach(function (p) {
        if (!p) return;
        var a = document.createElement('a');
        a.className = 'acct-pcard';
        a.href = root + 'products/' + p.handle;
        var img = p.featured_image || (p.images && p.images[0]) || '';
        a.innerHTML =
          (img ? '<img src="' + img + '" alt="" loading="lazy">' : '<img alt="">') +
          '<div class="acct-pcard__body">' +
            '<p class="acct-pcard__title">' + p.title + '</p>' +
            '<p class="acct-pcard__price">' + formatMoney(p.price) + '</p>' +
          '</div>';
        grid.appendChild(a);
      });
    });
  }

  /* ---------- Wishlist count + grid ---------- */
  function initWishlist(scope) {
    var handles = read(WISHLIST_KEY);
    scope.querySelectorAll('[data-wishlist-count]').forEach(function (el) { el.textContent = handles.length; });
    var grid = scope.querySelector('[data-wishlist-grid]');
    if (grid) renderProducts(handles, grid, '[data-wishlist-empty]');
  }

  function initRecentlyViewed(scope) {
    var handles = read(RECENT_KEY);
    var grid = scope.querySelector('[data-recently-grid]');
    if (grid) renderProducts(handles, grid, '[data-recently-empty]');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var scope = document.querySelector('[data-customer-dashboard]');
    if (!scope) return;
    initTabs(scope);
    initWishlist(scope);
    initRecentlyViewed(scope);
  });
})();
