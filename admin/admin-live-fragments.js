(() => {
  'use strict';

  const preview = document.getElementById('preview');
  if (!preview) return;

  const TEXT_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,li,a,button,label,span,strong,em,small';
  const SKIP_SELECTOR = 'script,style,noscript,svg,code,pre,input,textarea,select,option';

  function isUsefulText(node) {
    return node && node.nodeType === Node.TEXT_NODE && /\S/.test(node.nodeValue || '');
  }

  function splitSentences(text) {
    const parts = text.match(/[^.!?;·]+(?:[.!?;·]+(?=\s|$)|$)|\s+/g);
    return parts && parts.length ? parts : [text];
  }

  function fragmentize(doc) {
    let counter = 0;
    const elements = [...doc.querySelectorAll(TEXT_SELECTOR)];

    elements.forEach((el) => {
      if (el.closest(SKIP_SELECTOR) || el.dataset.adminFragmentized === '1') return;
      const textNodes = [...el.childNodes].filter(isUsefulText);
      if (!textNodes.length) return;

      textNodes.forEach((node) => {
        const frag = doc.createDocumentFragment();
        splitSentences(node.nodeValue).forEach((part) => {
          if (!/\S/.test(part)) {
            frag.appendChild(doc.createTextNode(part));
            return;
          }
          counter += 1;
          const span = doc.createElement('span');
          span.className = 'admin-text-fragment';
          span.dataset.adminFragment = `f${counter}`;
          span.textContent = part;
          span.style.cursor = 'text';
          span.style.borderRadius = '2px';
          frag.appendChild(span);
        });
        node.replaceWith(frag);
      });
      el.dataset.adminFragmentized = '1';
    });

    const style = doc.createElement('style');
    style.id = 'admin-live-fragment-style';
    style.textContent = `
      .admin-text-fragment{position:relative}
      .admin-text-fragment:hover{outline:1px dashed rgba(212,175,55,.55);outline-offset:2px}
      [data-admin-v3-selected].admin-text-fragment{outline:2px solid #d4af37!important;outline-offset:3px!important}
    `;
    doc.head.appendChild(style);
  }

  function bindFragmentSelection(doc) {
    doc.addEventListener('click', (event) => {
      const fragment = event.target.closest?.('.admin-text-fragment');
      if (!fragment) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (typeof window.selectElement === 'function') window.selectElement(fragment, 'content');
    }, true);
  }

  function setup() {
    const doc = preview.contentDocument;
    if (!doc) return;
    fragmentize(doc);
    if (typeof window.applySaved === 'function') window.applySaved();
    bindFragmentSelection(doc);
    const status = document.getElementById('status');
    if (status) status.textContent = 'Live preview έτοιμο · κάθε πρόταση επιλέγεται ξεχωριστά';
  }

  preview.addEventListener('load', () => setTimeout(setup, 0));
  if (preview.contentDocument?.readyState === 'complete') setTimeout(setup, 0);
})();
