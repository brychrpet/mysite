export default function decorate(block) {
  // Check if the block has a table
  const table = block.querySelector('table');
  if (table) {
    const rows = [...table.querySelectorAll('tbody tr')];
    rows.forEach((row) => {
      const cells = row.querySelectorAll('td');
      const text = cells[0]?.textContent?.trim();
      const href = cells[1]?.textContent?.trim();
      if (text && href) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = href;
        a.textContent = text;
        li.appendChild(a);
        block.appendChild(li);
      }
    });
    // Remove the original table
    table.remove();
  } else {
    // Fallback: div-based structure
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
}
