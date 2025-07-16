export default function decorate(block) {
  const sources = block.querySelectorAll('source');
  sources.forEach((src) => {
    if (src.srcset.includes('&#x26;')) {
      src.srcset = src.srcset.replace(/&#x26;/g, '&');
    }
  });
}
