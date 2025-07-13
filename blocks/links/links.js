export default function decorate(block) {
  const rows = [...block.querySelectorAll('div')];
  const [header, ...entries] = rows;
  entries.forEach((row) => {
    const text = row.children[0]?.textContent;
    const href = row.children[1]?.textContent;
    if (text && href) {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = text;
      row.innerHTML = '';
      row.appendChild(a);
    }
  });
}
