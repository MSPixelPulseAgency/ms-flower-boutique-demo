(() => {
  const replaceH1WithH2 = () => {
    document.querySelectorAll('h1').forEach((h1) => {
      const h2 = document.createElement('h2');
      for (const attr of h1.attributes) h2.setAttribute(attr.name, attr.value);
      h2.innerHTML = h1.innerHTML;
      h1.replaceWith(h2);
    });
  };

  replaceH1WithH2();

  const observer = new MutationObserver(() => replaceH1WithH2());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
