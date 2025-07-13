export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  if (rows.length < 2) return; // Exit if there's no content beyond header

  const list = document.createElement('ul');

  // Process all rows except the first (header row)
  rows.slice(1).forEach((row) => {
    const [textCell, urlCell] = row.children;
    const text = textCell?.textContent?.trim();
    const href = urlCell?.textContent?.trim();

    if (text && href) {
      const li = document.createElement('li');
      const a = document.createElement('a');

      // Make internal links relative
      a.href = href.startsWith('/') ? href : href;
      a.textContent = text;
      li.appendChild(a);
      list.appendChild(li);
    }
  });

  // Clear the original block and inject the new list
  block.innerHTML = '';
  block.appendChild(list);
}
