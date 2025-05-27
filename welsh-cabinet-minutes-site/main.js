
async function fetchData() {
  const res = await fetch('data/minutes.json');
  const data = await res.json();
  populate(data);
}

function populate(minutes) {
  const list = document.getElementById('minutesList');
  list.innerHTML = '';

  minutes.forEach(entry => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${entry.date}:</strong> <a href="${entry.url}" target="_blank">${entry.title}</a>
                      <br><em>${entry.minister} — ${entry.subject}</em>`;
    list.appendChild(item);
  });
}

fetchData();
