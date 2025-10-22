// script.js - Client-side logic for Asset Playground

(function(){
  // Elements
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('closeModal');
  const logList = document.getElementById('logList');
  const fileInput = document.getElementById('fileInput');
  const uploadPreview = document.getElementById('uploadPreview');

  // Data store in localStorage
  const STORAGE_KEY = 'asset_playground_files';
  const DEFAULT_FILES = {
    'ashravan.txt': `Brandon Sanderson-inspired short story: Ashravan's awakening after Shai's restoration builds toward a dramatic climax...\n`+
    `Ashravan staggers to his feet in a ruined city of glass and ash, memories flickering like embers. Shai's restoration left him with a strange blend of fear and purpose. He recalls a name, a vow, a sky full of promises, and the weight of what he must do. The wind gnaws at his cloak as the world around him breaks open with a crack like thunder.\n`+
    `In the distance, the edge of a wave of shadow rises, a horde of enemies seeking to reclaim what was lost. He finds a fragment of light in his palm, a shard of the oath he swore to protect those who cannot protect themselves. He races toward the center of the ruin, where the beacon hidden by Shai's magic still glows. He has one last choice: save a child caught under debris or confront the dark force directly. He chooses to cut through the shadow, catching the child as the building collapses, and with the act, the city seems to breathe again. The climax erupts as the light crystallizes into a force that repels the darkness, but at a cost: his own life hangs in the balance, his memories fading into the bright dawn.`,

    `"Remember me, Shai," he whispers, as the last shard of night dissolves.`,
  ``,
  `
  `,
  ``,
  ``,
  `,
  ``,
  `
  `,
  `
`,
  ``,
    },
    'dilemma.json': JSON.stringify({
      case_1: { swerve: true, reason: "To spare two lives if it can, especially if at risk are criminals; a single child deserves protection when possible." },
      case_2: { swerve: false, reason: "Criminals are responsible for harm; a child is an innocent life. Avoid compromising the child." }
    }, null, 2),
    'about.md': "Describe yourself in three words.",
    'pelican.svg': `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 120\" width=\"200\" height=\"120\"> <defs> <linearGradient id=\"g\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"> <stop stop-color=\"#ffd\" offset=\"0%\"/> <stop stop-color=\"#88f\" offset=\"100%\"/> </linearGradient> </defs> <rect width=\"200\" height=\"120\" fill=\"#cfe7ff\"/> <path d=\"M40,90 C60,40 140,40 160,90\" stroke=\"#555\" stroke-width=\"6\" fill=\"none\"/> <circle cx=\"60\" cy=\"40\" r=\"8\" fill=\"#333\"/> <polyline points=\"50,70 80,50 90,60 60,40 40,60\" stroke=\"#555\" stroke-width=\"3\" fill=\"none\"/> </svg>`,
    'restaurant.json': JSON.stringify({ city: 'Kolkata', lat: 22.5726, long: 88.3639, name: 'Kaiyani’, what_to_eat: 'Hilsa with mustard sauce' }, null, 2),
    'prediction.json': JSON.stringify({ rate: 0.04, reason: 'A cautious projection given current inflation trends and Fed guidance.' }, null, 2),
    'uid.txt': 'UID-PLACEHOLDER-12345-ABCDE',
    'LICENSE': 'MIT License\n\nCopyright (c) 2024 Your Name. All rights reserved.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy...\n',
  };

  // Initialize storage if absent
  function loadFiles(){
    const existing = localStorage.getItem(STORAGE_KEY);
    if(!existing){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FILES));
      return DEFAULT_FILES;
    }
    try {
      return JSON.parse(existing);
    } catch(e){
      console.error('Failed parsing storage, resetting defaults', e);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FILES));
      return DEFAULT_FILES;
    }
  }

  function saveFile(name, content){
    const data = loadFiles();
    data[name] = content;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // Preview modal
  function openPreview(name, content){
    modalContent.textContent = content;
    modal.setAttribute('aria-hidden', 'false');
  }
  function closePreview(){ modal.setAttribute('aria-hidden','true'); }

  closeModal.addEventListener('click', closePreview);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closePreview(); });

  // Wire up asset previews/downloads
  document.querySelectorAll('.card .btn.preview').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.file;
      const files = loadFiles();
      const content = files[name] ?? '';
      openPreview(name, content);
    });
  });
  document.querySelectorAll('.card .btn.download').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.file;
      const files = loadFiles();
      const content = files[name] ?? '';
      const blob = new Blob([content], {type: 'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      const li = document.createElement('li'); li.textContent = `Downloaded ${name}`; logList.appendChild(li);
    });
  });

  // Attachment handling for CSV/Image
  fileInput.addEventListener('change', async (ev)=>{
    const file = ev.target.files?.[0];
    if(!file){ return; }
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      const ext = file.name.split('.').pop().toLowerCase();
      if(ext === 'csv'){
        // naive CSV render
        const rows = text.split('\n').slice(0,10).join('\n');
        uploadPreview.innerHTML = '<strong>CSV Preview (first 10 lines):</strong><pre>'+rows+'</pre>';
      } else {
        // image
        if(text.startsWith('data:')){
          uploadPreview.innerHTML = `<img src="${text}" alt="uploaded"/>`;
        }else{
          // treat as data URL via blob
          const blob = new Blob([text]);
          const url = URL.createObjectURL(blob);
          uploadPreview.innerHTML = `<img src="${url}" alt="uploaded"/>`;
          URL.revokeObjectURL(url);
        }
      }
    };
    if(file.type.startsWith('image/')){
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  });

  // Initialize by ensuring defaults exist
  loadFiles();

  // Keyboard close for accessibility
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closePreview(); });
})();
