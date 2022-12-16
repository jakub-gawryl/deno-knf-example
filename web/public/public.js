fetch('/api/short/list/paper/CDPROJEKT')
  .then(res => res.json())
  .then(data => {
    const cdp = document.getElementById('cdp').getElementsByTagName('span')[0];
    const cdpList = document.getElementById('cdp-list');

    cdp.textContent = `${data.totalShortValue}%`;

    data.items.forEach(item => {
      const p = document.createElement('p');
      const nameSpan = document.createElement('span');
      nameSpan.className = 'name';
      nameSpan.textContent = item.name;
      p.appendChild(nameSpan);

      const paperSpan = document.createElement('span');
      paperSpan.className = 'paper';
      paperSpan.textContent = item.paper;
      p.appendChild(paperSpan);

      const valueSpan = document.createElement('span');
      valueSpan.className = 'value';
      valueSpan.textContent = `${item.value}%`.replace('.',',');
      p.appendChild(valueSpan);

      const dateSpan = document.createElement('span');
      dateSpan.className = 'date';
      dateSpan.textContent = item.date;
      p.appendChild(dateSpan);

      cdpList.appendChild(p);
    });
    
    console.log(data)
  });