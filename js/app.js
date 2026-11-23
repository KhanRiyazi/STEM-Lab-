const FIELDS = ["All","Science","Technology","Engineering","Math"];
const KEY = "stemExhibition";
const state = JSON.parse(localStorage.getItem(KEY) || "null") || {picked:null, done:{}};
const save = () => localStorage.setItem(KEY, JSON.stringify(state));

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
let current = null;
const modal = new bootstrap.Modal(document.getElementById("projectModal"));

function renderFilters(active="All"){
  filters.innerHTML = FIELDS.map(f =>
    `<button class="btn btn-outline-ink ${f===active?"active":""}" data-f="${f}" aria-pressed="${f===active}">${f}</button>`).join("");
}
function renderGrid(f="All"){
  grid.innerHTML = PROJECTS.filter(p => f==="All" || p.field===f).map(p => `
    <div class="col-md-6 col-lg-4">
      <article class="exhibit ${state.picked===p.id?"picked":""}">
        <div class="tag tag-${p.field}">${p.field}</div>
        <div class="pic">${art(p)}</div>
        <div class="body">
          <h3>${p.title}</h3>
          <p class="level mb-2">${p.level}</p>
          <p>${p.summary}</p>
        </div>
        <div class="p-3 pt-0"><button class="btn btn-outline-ink w-100" data-view="${p.id}">View project</button></div>
      </article>
    </div>`).join("");
}
function renderTracker(){
  const p = PROJECTS.find(x => x.id===state.picked);
  document.getElementById("emptyTracker").classList.toggle("d-none", !!p);
  document.getElementById("trackerBox").classList.toggle("d-none", !p);
  if(!p) return;
  document.getElementById("myTitle").textContent = p.title + " — " + p.question;
  const items = ["Write my question in my notebook", "List my materials", ...p.steps, "Practise my 3-minute talk"];
  const done = state.done[p.id] || [];
  document.getElementById("checklist").innerHTML = items.map((t,i) => `
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="c${i}" data-i="${i}" ${done.includes(i)?"checked":""}>
      <label class="form-check-label" for="c${i}">${t}</label>
    </div>`).join("");
  const pct = Math.round(done.length / items.length * 100);
  document.getElementById("bar").style.width = pct + "%";
  document.querySelector(".progress").setAttribute("aria-valuenow", pct);
  document.getElementById("pct").textContent = pct + "% done (" + done.length + " of " + items.length + " tasks)";
}
function openProject(id){
  current = PROJECTS.find(p => p.id===id);
  document.getElementById("pmTitle").textContent = current.title;
  document.getElementById("pmBody").innerHTML = `
    <div class="pic mb-3 border border-2 border-dark">${art(current)}</div>
    <p class="fs-5"><strong>Question:</strong> ${current.question}</p>
    <h4 class="fs-6">Materials</h4><ul>${current.materials.map(m=>`<li>${m}</li>`).join("")}</ul>
    <h4 class="fs-6">Steps</h4><ol>${current.steps.map(s=>`<li>${s}</li>`).join("")}</ol>
    <h4 class="fs-6">A good result looks like</h4><p>${current.result}</p>`;
  modal.show();
}

filters.addEventListener("click", e => {
  const f = e.target.dataset.f; if(!f) return;
  renderFilters(f); renderGrid(f);
});
grid.addEventListener("click", e => {
  const id = e.target.dataset.view; if(id) openProject(id);
});
document.getElementById("pickBtn").addEventListener("click", () => {
  state.picked = current.id; save(); modal.hide();
  renderGrid(document.querySelector("#filters .active").dataset.f); renderTracker();
  document.getElementById("tracker").scrollIntoView({behavior:"smooth"});
});
document.getElementById("checklist").addEventListener("change", e => {
  const i = Number(e.target.dataset.i);
  const list = state.done[state.picked] || [];
  state.done[state.picked] = e.target.checked ? [...new Set([...list,i])] : list.filter(x => x!==i);
  save(); renderTracker();
});
document.getElementById("reset").addEventListener("click", () => {
  state.picked = null; save(); renderGrid(document.querySelector("#filters .active").dataset.f); renderTracker();
});

renderFilters(); renderGrid(); renderTracker();
// ---- Share summary ----
const f = id => document.getElementById(id);
f("fTitle").innerHTML = PROJECTS.map(p => `<option value="${p.id}">${p.title}</option>`).join("");
function buildSummary(){
  const p = PROJECTS.find(x => x.id===f("fTitle").value);
  const lines = [
    "STEM PROJECT SUMMARY",
    "Project: " + p.title + " (" + p.field + ")",
    "Student/Team: " + (f("fName").value || "—"),
    "Class: " + (f("fClass").value || "—"),
    "School: Government Inter College Nishat Ganj, Lucknow",
    "Mentor: Rizwan Ali, Robotics Lab Incharge and STEM Trainer",
    "",
    "Question: " + p.question,
    "What we found: " + (f("fFound").value || "—"),
    "How it helps our community: " + (f("fHelp").value || "—")
  ];
  const text = lines.join("\n");
  f("summary").textContent = text;
  f("waBtn").href = "https://wa.me/?text=" + encodeURIComponent(text);
  return text;
}
["fName","fClass","fTitle","fFound","fHelp"].forEach(id => f(id).addEventListener("input", buildSummary));
f("copyBtn").addEventListener("click", async () => {
  const text = buildSummary();
  try { await navigator.clipboard.writeText(text); f("copyMsg").textContent = "Copied. Now paste it in WhatsApp, email, or a nomination form."; }
  catch { f("copyMsg").textContent = "Copy did not work. Select the text above and copy it by hand."; }
});
f("printBtn").addEventListener("click", () => window.print());
if(state.picked) f("fTitle").value = state.picked;
buildSummary();

// ---- Bebras deadline note (reported date, confirm on official site) ----
(function(){
  const end = new Date("2026-11-28T23:59:59");
  const days = Math.ceil((end - new Date()) / 86400000);
  const el = document.getElementById("bebrasAlert");
  el.textContent = days > 1 ? "Bebras India: school registration is reported to close on 28 November 2026. That is about " + days + " days left. Ask your Principal today."
    : days === 1 ? "Bebras India: school registration is reported to close tomorrow, 28 November 2026. Ask your Principal today."
    : days === 0 ? "Bebras India: school registration is reported to close today, 28 November 2026."
    : "Bebras India: the reported 2026 registration date (28 November) has passed. Check the official page for any extension, and plan for next year.";
})();
document.querySelectorAll("[data-guide]").forEach(a => a.addEventListener("click", () => {
  const t = document.querySelector('[data-bs-target="#g-' + a.dataset.guide + '"]');
  if (t) bootstrap.Tab.getOrCreateInstance(t).show();
}));

// ---- Student photos on the staircase ----
// Put photos in assets/students/ named classroom, school, district, state, national, international
// (.jpg, .jpeg, .png or .webp). Steps without a photo keep their plain colour.
document.querySelectorAll(".stair[data-photo]").forEach(el => {
  const exts = [".jpg", ".jpeg", ".png", ".webp"];
  const tryNext = i => {
    if (i >= exts.length) return;
    const url = el.dataset.photo + exts[i];
    const img = new Image();
    img.onload = () => { el.style.setProperty("--photo", `url("${url}")`); el.classList.add("has-photo"); };
    img.onerror = () => tryNext(i + 1);
    img.src = url;
  };
  tryNext(0);
});
