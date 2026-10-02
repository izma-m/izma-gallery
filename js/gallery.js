const projectGrid = document.getElementById("projectGrid");
const filterRoot = document.getElementById("filters");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
let allProjects = [];
let activeCategory = "All";
const categories = ["All","Engineering","Research","Ventures","Creative"];

function renderFilters(){
  if(!filterRoot) return;
  filterRoot.innerHTML = categories.map(c=>`<button class="filter-btn ${c===activeCategory?"active":""}" data-category="${c}" aria-pressed="${c===activeCategory}">${c}</button>`).join("");
  filterRoot.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{activeCategory=btn.dataset.category;renderFilters();renderProjects();}));
}
function cardMarkup(p,i){
  const tags=(p.tags||[]).slice(0,3).map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join("");
  return `<article class="project-card" tabindex="0" role="button" aria-label="View details for ${escapeHTML(p.title)}" data-index="${i}">
    <div class="artwork tone-${(i%5)+1}"><span class="art-index">${String(i+1).padStart(2,"0")} / ${escapeHTML(p.category)}</span><span class="art-mark">${escapeHTML(p.mark||"✳")}</span><span class="art-label">IZMA / ARCHIVE</span></div>
    <div class="card-meta"><span>${escapeHTML(p.category)}</span><span>${escapeHTML(p.year)}</span></div><h3 class="card-title">${escapeHTML(p.title)}</h3><p class="card-description">${escapeHTML(p.description)}</p><div class="tag-list">${tags}</div></article>`;
}
function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderProjects(){
  if(!projectGrid)return;
  const q=(searchInput?.value||"").toLowerCase().trim();
  const matches=allProjects.map((p,i)=>({p,i})).filter(({p})=>(activeCategory==="All"||p.category===activeCategory)&&[p.title,p.description,p.category,...(p.tags||[])].join(" ").toLowerCase().includes(q));
  projectGrid.innerHTML=matches.map(({p,i})=>cardMarkup(p,i)).join("");
  emptyState.hidden=matches.length>0;
  projectGrid.querySelectorAll(".project-card").forEach(card=>{
    const open=()=>showProject(allProjects[Number(card.dataset.index)]);
    card.addEventListener("click",open);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
  });
}
function showProject(p){
  const modal=document.getElementById("projectModal");if(!modal)return;
  document.getElementById("modalMeta").textContent=`${p.category} / ${p.year} / ${p.status}`;
  document.getElementById("modalTitle").textContent=p.title;
  document.getElementById("modalDescription").textContent=p.description;
  document.getElementById("modalTags").innerHTML=(p.tags||[]).map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join("");
  const link=document.getElementById("modalLink");if(p.url){link.href=p.url;link.hidden=false;}else{link.hidden=true;}
  modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
async function initGallery(){
  if(!projectGrid)return;
  try{const response=await fetch("data/projects.json");if(!response.ok)throw new Error("Could not load project data");allProjects=await response.json();renderFilters();renderProjects();}
  catch(error){projectGrid.innerHTML="<p>Project entries could not be loaded. Check that data/projects.json is in the repository.</p>";console.error(error);}
}
if(searchInput)searchInput.addEventListener("input",renderProjects);
initGallery();
