const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
const toggle=document.getElementById("menuToggle"),nav=document.getElementById("mainNav");
if(toggle&&nav){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));}
const modal=document.getElementById("projectModal");
if(modal){modal.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeModal));document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});}
function closeModal(){if(!modal)return;modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";}