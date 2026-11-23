# STEM Projects Exhibition

A classroom landing page for project-based learning (PBL). Students choose a STEM project, follow the steps, track progress, and learn how to join national and international competitions (Bebras, INSPIRE - MANAK, NCSC, ATL Marathon, Indian Computing Olympiad, IOAI).

Built for the Robotics Lab at Government Inter College Nishat Ganj, Lucknow, with the American India Foundation Trust (Digital Equalizer Program).

Built with plain HTML, CSS, [Bootstrap 5](https://getbootstrap.com/) (loaded from a CDN) and vanilla JavaScript. No build step.

## Folder structure

```
stem-exhibition/
├── index.html              page structure and text
├── css/style.css           all styling
├── js/
│   ├── data.js             the project list (edit this to add projects)
│   ├── art.js              the drawing for each project
│   └── app.js              filters, pop-up, tracker, share summary, deadline note
├── assets/aif-logo.png     American India Foundation logo
├── assets/students/        your student photos for the staircase
├── .github/workflows/pages.yml   auto-deploy to GitHub Pages
├── .nojekyll
├── .gitignore
├── LICENSE
└── README.md
```

## Run on your computer

Open `index.html` in a browser. An internet connection is needed for Bootstrap and Google Fonts.

Or start a small local server:

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `stem-exhibition`.
2. Upload these files, or push them:
   ```bash
   git init
   git add .
   git commit -m "STEM Projects Exhibition"
   git branch -M main
   git remote add origin https://github.com/<your-username>/stem-exhibition.git
   git push -u origin main
   ```
3. On GitHub, open **Settings > Pages** and set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/pages.yml` runs on every push to `main`. Your site appears at `https://<your-username>.github.io/stem-exhibition/`.

## Add or change a project

Open `js/data.js` and copy one project block. Change these fields:

| Field | Meaning |
|---|---|
| `id` | short unique name, no spaces |
| `title`, `field` | name, and one of Science, Technology, Engineering, Math |
| `level` | difficulty and time |
| `question` | the question students will answer |
| `summary` | one line shown on the card |
| `materials`, `steps` | lists shown in the pop-up and in the student checklist |
| `result` | what a good result looks like |
| `photo` (optional) | path to your own photo, such as `assets/solar-oven.jpg`. It replaces the drawing |

If you add a project without a `photo`, add a drawing for its `id` in `js/art.js`, or give it a photo.

## Add student photos to the staircase

Put photos named `classroom`, `school`, `district`, `state`, `national` and `international` (.jpg, .jpeg, .png or .webp) in `assets/students/`. Each one becomes the background of its step in the "One project. Many stages." section. Read `assets/students/README.md` for sizes and student-privacy rules. Get permission from parents and the school first, because the repository is public.

## Before you publish: check these

- [ ] **Intermediate recognition year** in the "Our school and lab" section of `index.html` is written as 1871. Confirm it is correct.
- [ ] **Hindi school name** spelling in the blue banner.
- [ ] **Competition dates.** Pages show what was found at the time of writing. Always confirm on each official website. The Bebras India note in `js/app.js` uses the reported registration date of 28 November 2026.
- [ ] **Links** in the header dropdowns. Click each one once.
- [ ] **Student data.** Progress is saved only in each student's own browser (localStorage). Nothing is sent to a server.

## Official sources

- INSPIRE Awards - MANAK: https://inspireawards-dst.gov.in/
- National Children's Science Congress: http://www.ncsc.co.in/
- Bebras India (CSpathshala): https://sites.google.com/view/bebrasindia
- Atal Tinkering Labs: https://aim.gov.in/atl.php
- Indian Computing Olympiad (IARCS): https://www.iarcs.org.in/inoi/
- IOAI (ACM India): https://india.acm.org/education/ai-olympiad-faq

## Credits

Prepared by Rizwan Ali, STEM Trainer and Robotics Lab Incharge.

## License

MIT. See `LICENSE`. The AIF logo belongs to the American India Foundation Trust and is not covered by this license.
