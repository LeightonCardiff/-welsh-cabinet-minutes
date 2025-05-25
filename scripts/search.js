
document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('data/minutes.json');
  const data = await response.json();
  const list = document.getElementById('minutesList');
  const searchBox = document.getElementById('searchBox');
  const ministerFilter = document.getElementById('ministerFilter');
  const subjectFilter = document.getElementById('subjectFilter');

  const ministers = new Set();
  const subjects = new Set();

  data.forEach(item => {
    if (item.minister) ministers.add(item.minister);
    if (item.subject) subjects.add(item.subject);
  });

  [...ministers].sort().forEach(minister => {
    const opt = document.createElement('option');
    opt.value = opt.textContent = minister;
    ministerFilter.appendChild(opt);
  });

  [...subjects].sort().forEach(subject => {
    const opt = document.createElement('option');
    opt.value = opt.textContent = subject;
    subjectFilter.appendChild(opt);
  });

  function render() {
    const search = searchBox.value.toLowerCase();
    const minister = ministerFilter.value;
    const subject = subjectFilter.value;
    list.innerHTML = '';
    data.filter(item =>
      (!search || item.title.toLowerCase().includes(search)) &&
      (!minister || item.minister === minister) &&
      (!subject || item.subject === subject)
    ).forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${item.url}" target="_blank">${item.title}</a>`;
      list.appendChild(li);
    });
  }

  searchBox.addEventListener('input', render);
  ministerFilter.addEventListener('change', render);
  subjectFilter.addEventListener('change', render);
  render();
});
