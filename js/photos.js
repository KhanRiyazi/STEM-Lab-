// ---- Student photos on the staircase ----
// Put photos in assets/students/ named classroom, school, district, state, national, international
// (.jpg, .jpeg, .png or .webp). Steps without a photo keep their plain colour.
document.querySelectorAll(".stair[data-photo]").forEach(el => {
  const exts = [".jpg", ".jpeg", ".png", ".webp"];
  const tryNext = i => {
    if (i >= exts.length) return;
    const url = el.dataset.photo + exts[i];
    const img = new Image();
    img.onload = () => { // Make the path absolute so it works from the stylesheet in css/
    const abs = new URL(url, document.baseURI).href;
    el.style.setProperty("--photo", `url("${abs}")`); el.classList.add("has-photo"); };
    img.onerror = () => tryNext(i + 1);
    img.src = url;
  };
  tryNext(0);
});
