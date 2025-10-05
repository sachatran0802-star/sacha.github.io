const container = document.getElementById('container');
const params = new URLSearchParams(window.location.search);
const currentPage = parseInt(params.get("page")) || 1;

// === Données des images principales ===
const data = [
  // Éléments fixes
  { base:"images/homme.png", hover:"images/homme1.png", x:1740.97, y:494.29, z:1, pages:[1,2,3,4,5,6,7,8,9,10,11,12], goto:10 },
  { base:"images/livre.png", hover:"images/livre1.png", x:195.59, y:490.3, z:1, pages:[1,2,3,4,5,6,7,8,9,10,11,12], goto:11 },
  { base:"images/point.png", hover:"images/point1.png", x:862.18, y:957.47, z:1, pages:[1,2,3,4,5,6,7,8,9,10,11,12], goto:12 },

  // Portfolio
  { base:"images/portfolio1.png", hover:"images/portfolio.png", x:931.93, y:68.78, z:5, pages:[1,2,3,4,5,6,7,8,9,10,11,12], goto:1 },

  // Labos page 1
  { base:"images/fungilab.png", hover:"images/fungilab1.png", x:793.91, y:623.73, z:4, pages:[1], goto:5 },
  { base:"images/lowtechlab.png", hover:"images/lowtechlab1.png", x:899.74, y:567.73, z:3, pages:[1], goto:3 },
  { base:"images/drid.png", hover:"images/drid1.png", x:1002.68, y:509.33, z:2, pages:[1], goto:2 },
  { base:"images/milvi.png", hover:"images/milvi1.png", x:1103.57, y:456.33, z:1, pages:[1], goto:4 },

  // Pages 2–5 : k72-k75
  { base:"images/k72.png", x:1393.46, y:625.42, z:2, pages:[2], goto:6 },
  { base:"images/k73.png", x:1393.46, y:625.42, z:2, pages:[3], goto:7 },
  { base:"images/k74.png", x:1393.46, y:625.42, z:2, pages:[4], goto:8 },
  { base:"images/k75.png", x:1393.46, y:625.42, z:2, pages:[5], goto:9 },

  // Pages finales 6–9 : boîtes et nuages avec retour
  { base:"images/boite6.png", x:1396.82, y:714.64, z:2, pages:[6], gotoPrev:2 },
  { base:"images/nu6.png", x:1396.82, y:315.10, z:1, pages:[6] },
  { base:"images/dshema.png", x:738.72, y:540.43, z:1, pages:[6] },

  { base:"images/boite7.png", x:1396.82, y:714.64, z:2, pages:[7], gotoPrev:3 },
  { base:"images/nu7.png", x:1396.82, y:315.10, z:1, pages:[7] },
  { base:"images/bshema.png", x:709.52, y:512.92, z:1, pages:[7] },
  { base:"images/b1.png", x:1045.99, y:347.27, z:1, pages:[7] },
  { base:"images/b2.png", x:404.56, y:790.63, z:1, pages:[7] },

  { base:"images/boite8.png", x:1396.82, y:714.64, z:2, pages:[8], gotoPrev:4 },
  { base:"images/nu8.png", x:1396.82, y:315.10, z:1, pages:[8] },

  { base:"images/boite9.png", x:1396.82, y:714.64, z:2, pages:[9], gotoPrev:5 },
  { base:"images/nu9.png", x:1396.82, y:315.10, z:1, pages:[9] },
  { base:"images/fshema.png", x:556.01, y:263.29, z:2, pages:[9] },
  { base:"images/flab.png", x:680.25, y:651.85, z:2, pages:[9] },
  { base:"images/milvi.png", x:62569.83, y:592.19, z:10, pages:[9] },
];

// === Génération des images ===
data.forEach(item => {
  if(!item.pages.includes(currentPage)) return;

  // Créer l'image de base
  const base = document.createElement('img');
  base.src = item.base;
  base.classList.add('img-item');
  base.style.left = item.x + 'px';
  base.style.top = item.y + 'px';
  base.style.zIndex = item.z;
  container.appendChild(base);

  // Hover
  if(item.hover){
    const hover = document.createElement('img');
    hover.src = item.hover;
    hover.classList.add('img-item');
    hover.style.left = item.x + 'px';
    hover.style.top = item.y + 'px';
    hover.style.zIndex = item.z + 1; // toujours au-dessus
    hover.style.display = 'none';
    container.appendChild(hover);

    base.addEventListener('mouseover', () => {
      base.style.display = 'none';
      hover.style.display = 'block';
    });
    hover.addEventListener('mouseout', () => {
      hover.style.display = 'none';
      base.style.display = 'block';
    });

    // Clic sur hover
    if(item.goto) hover.addEventListener('click', () => { window.location.search='?page='+item.goto; });
  }

  // Navigation au clic
  if(item.goto) base.addEventListener('click', () => { window.location.search='?page='+item.goto; });

  // Retour page précédente
  if(item.gotoPrev) base.addEventListener('click', () => { window.location.search='?page='+item.gotoPrev; });
});

// === Images supplémentaires pages 10-13 ===
const imagesAAjouter = [
  { base:"images/p10_profil.png", x:800, y:500, z:2, pages:[10] },
  { base:"images/p11_bibliographie.png", x:800, y:500, z:2, pages:[11] },
  { base:"images/t2.png", x:2569.83, y:592.19, z:2, pages:[12] },
  { base:"images/p13_autre.png", x:800, y:500, z:2, pages:[13] }
];

imagesAAjouter.forEach(item => {
  if(!item.pages.includes(currentPage)) return;

  const img = document.createElement('img');
  img.src = item.base;
  img.classList.add('img-item');
  img.style.left = item.x + 'px';
  img.style.top = item.y + 'px';
  img.style.zIndex = item.z;
  container.appendChild(img);
});

// === Redimension adaptatif ===
function resizeContainer(){
  const scale = Math.min(window.innerWidth/1920, window.innerHeight/1080);
  container.style.transform = `translate(-50%, -50%) scale(${scale})`;
}
window.addEventListener('resize', resizeContainer);
resizeContainer();
