/* scripts/devlogs.js */ 
(function(){
  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // ---- Project page: list rendering + controls ----
  const listEl = document.getElementById('devlogList');

  function initDevlogs() {
    if (!listEl || !window.__DEVLOGS__) return;

    const { entries = [], projectSlug } = window.__DEVLOGS__;
    let current = [...entries];

    // Build tag chips
    // const tagChips = document.getElementById('tagChips');
    // const allTags = Array.from(new Set(entries.flatMap(e => e.tags || []))).sort();
    // if (tagChips) {
    //   allTags.forEach(tag => {
    //     const b = document.createElement('button');
    //     b.className = 'chip';
    //     b.type = 'button';
    //     b.textContent = tag;
    //     b.dataset.tag = tag;
    //     b.setAttribute('aria-pressed', 'false');
    //     tagChips.appendChild(b);
    //   });
    //   tagChips.addEventListener('click', (e) => {
    //     const btn = e.target.closest('.chip');
    //     if (!btn) return;
    //     const pressed = btn.getAttribute('aria-pressed') === 'true';
    //     btn.setAttribute('aria-pressed', String(!pressed));
    //     render();
    //   });
    // }

    const search = document.getElementById('search');
    const sort = document.getElementById('sort');
    search && search.addEventListener('input', render);
    sort && sort.addEventListener('change', render);

    function activeTags(){
      return $$('.devlog-tags .chip[aria-pressed="true"]').map(b => b.dataset.tag);
    }

    function matches(e, q, tags){
      const text = `${e.title} ${e.summary} ${(e.tags||[]).join(' ')}`.toLowerCase();
      const okText = !q || text.includes(q);
      const okTags = tags.length===0 || tags.every(t => (e.tags||[]).includes(t));
      return okText && okTags;
    }

    function render(){
      const q = (search && search.value || '').toLowerCase().trim();
      const tags = activeTags();
      const by = (sort && sort.value) || 'newest';

      current = entries.filter(e => matches(e, q, tags))
        .sort((a,b)=> by==='oldest' ? new Date(a.date)-new Date(b.date) : new Date(b.date)-new Date(a.date));

      listEl.innerHTML = '';
      if (current.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'section-sub';
        empty.textContent = 'No updates match your filters yet.';
        listEl.appendChild(empty);
        return;
      }

      current.forEach(e => {
        const card = document.createElement('article');
        card.className = 'card post';
        card.innerHTML = `
          <div class="post-header">
            <h3 class="post-title">${e.title}</h3>
            <div class="post-meta"><time datetime="${e.date}">${new Date(e.date).toLocaleDateString()}</time></div>
          </div>
          ${e.thumb ? `<div class="post-hero"><img src="${e.thumb}" alt="${e.title}"></div>` : ''}
          <div class="post-body">
            <p>${e.summary || ''}</p>
            <div class="chips">${(e.tags||[]).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
          </div>
          <div class="post-actions">
            <a class="btn" href="${e.url}">Read update →</a>
          </div>`;
        listEl.appendChild(card);
      });
    }

    render();
  }

  if (listEl) {
    if (window.__DEVLOGS__) {
      // Data already loaded, initialize immediately
      initDevlogs();
    } else {
      // Wait for data to load
      window.addEventListener('devlogsReady', initDevlogs);
    }
  }

  // ---- Devlog entry page: load one entry by URL param ----
  function getParams(){
    const u = new URL(location.href);
    return { id: u.searchParams.get('id'), project: u.searchParams.get('project') };
  }

  function setBreadcrumb(project){
    const bc = document.getElementById('breadcrumbs');
    if (!bc) return;
    const link = document.createElement('a');
    link.href = `project-${project||'myproject'}.html`;
    link.className = 'btn ghost';
    link.textContent = '← Back to Project';
    bc.innerHTML = '';
    bc.appendChild(link);
  }

  async function loadEntry(){
    const { id, project } = getParams();
    if (!id) return;
    setBreadcrumb(project);

    // Strategy: look for entries in opener window (project page) or fall back to inline window.__DEVLOGS__ or fetch JSON
    let entries = (window.__DEVLOGS__ && window.__DEVLOGS__.entries) || [];

    // Optional: if you want external JSON per project, uncomment and set the path below
    if (entries.length === 0 && project) {
      try {
        const res = await fetch(`data/devlogs-${project}.json`);
        if (res.ok){
          entries = await res.json();
        } 
        else {
          console.error('Cound not load devlog dat:', res.status);
        }
      } catch (e) { console.error('Error fetching devlog data:', e)}
    }

    const entry = entries.find(e => e.id === id);
    if (!entry) {
      $('#postTitle').textContent = 'Not found';
      $('#postMeta').textContent = 'This devlog entry does not exist.';
      return;
    }

    document.title = `Devlog — ${entry.title}`;
    $('#postTitle').textContent = entry.title;
    $('#postMeta').innerHTML = `${new Date(entry.date).toLocaleDateString()}${entry.tags && entry.tags.length ? ' • ' + entry.tags.map(t=>`<span class="badge">${t}</span>`).join(' ') : ''}`;

    if (entry.hero){
      $('#postHeroImg').src = entry.hero;
      $('#postHeroImg').alt = entry.title;
      $('#postHero').hidden = false;
    }

    // Body: either inline HTML string or build sections here
    const body = document.getElementById('postBody');
    if (entry.html){
      body.innerHTML = entry.html;
    } else {
      // Fallback: basic blocks if provided
      const blocks = [
        entry.problem && `<h2>Problem</h2><p>${entry.problem}</p>`,
        entry.approach && `<h2>Approach</h2><p>${entry.approach}</p>`,
        entry.notes && `<h2>Notes</h2><ul>${entry.notes.map(n=>`<li>${n}</li>`).join('')}</ul>`
      ].filter(Boolean).join('');
      body.innerHTML = blocks || `<p>${entry.summary||''}</p>`;
    }

    // Prev/Next from the same dataset
    const all = entries.slice().sort((a,b)=> new Date(a.date)-new Date(b.date));
    const idx = all.findIndex(e => e.id === entry.id);
    const pager = document.getElementById('postPager');
    if (idx !== -1 && pager){
      pager.hidden = false;
      pager.innerHTML = '';
      if (all[idx-1]){
        const prev = document.createElement('a');
        prev.className = 'btn ghost';
        prev.href = all[idx-1].url;
        prev.textContent = '← Previous';
        pager.appendChild(prev);
      }
      if (all[idx+1]){
        const next = document.createElement('a');
        next.className = 'btn';
        next.href = all[idx+1].url;
        next.textContent = 'Next →';
        pager.appendChild(next);
      }
    }
  }

  window.__BOOT_DEVLOG_ENTRY__ = loadEntry;
})();