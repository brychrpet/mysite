export default async function decorate(block) {
  // You can build your breadcrumb trail based on the window.location.pathname
  const path = window.location.pathname.split('/').filter(Boolean);
  const wrapper = document.createElement('nav');
  wrapper.classList.add('breadcrumb-wrapper');

  let currentPath = '';
  path.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const link = document.createElement('a');
    link.href = currentPath;
    link.textContent = decodeURIComponent(segment.replace(/-/g, ' '));
    wrapper.appendChild(link);
    if (index < path.length - 1) {
      wrapper.appendChild(document.createTextNode(' / '));
    }
  });

  if (!path.length) {
    wrapper.textContent = 'Home';
  }

  block.append(wrapper);
}
