# Shree Dharidevar Raith Krushi Seva Kendra Website

A premium, bilingual (English & Kannada) Single Page Application (SPA) designed for farmers and B2B agricultural suppliers in Kanamadi, Karnataka.

## 🚀 Features
- **Bilingual Interface:** Toggle between English and Kannada (ಕನ್ನಡ) seamlessly.
- **Farmer Crop Calculator:** Select crop (Maize, Jowar, Cotton, Sugarcane, Wheat), acreage, and soil profile (Black, Red, Sandy) for dynamic, customized seed and N-P-K fertilizer volume suggestions.
- **Product Catalog:** Filter products by category (Seeds, Fertilizers, Protection, Equipment) with instantaneous keyword searching and details modal window.
- **Pest & Disease Advisory:** Simple "Crop Doctor" reference for common regional crop ailments and remedies.
- **Live Local Weather & Market Rate Simulation:** Keeps the interface feeling alive and highly useful to farmers.
- **Responsive Layout:** Optimized for mobile phone screens, tablets, and desktop computers.

---

## 🛠️ Technology Stack
- **HTML5 & Vanilla CSS3** (Custom properties, grid, flexbox, micro-animations, glassmorphism)
- **JavaScript & AngularJS v1.8.2** (Direct CDNs used for routing, controllers, and two-way binding)
- **FontAwesome 6** (Vector icons)
- **Google Fonts** (Outfit & Inter)

---

## 💻 Local Testing
To run the project locally, open your terminal/command prompt, navigate to the folder, and start a web server:

### Option A: Using Node.js (Recommended)
```bash
# Serve files directly using npx
npx http-server -p 8080
```
Then open [http://localhost:8080](http://localhost:8080) in your web browser.

### Option B: Using Python
```bash
python -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080) in your web browser.

---

## ☁️ How to Host on GitHub Pages (Free Hosting)

Since the website is built entirely as a static Single Page Application (SPA), it can be hosted on GitHub Pages for free in less than 2 minutes. Follow these simple steps:

### Step 1: Create a GitHub Repository
1. Log into your account on [GitHub](https://github.com).
2. Click **New** to create a new repository.
3. Name your repository (e.g., `seva-kendra`).
4. Set it to **Public** and do *not* initialize it with a README (as we already have one).
5. Click **Create Repository**.

### Step 2: Push the Files to GitHub
Open your terminal in the website folder (`seva kendra`) and run:

```bash
# Initialize git repository
git init

# Add all files to staging area
git add .

# Create your first commit
git commit -m "Initial commit: Seva Kendra website"

# Rename branch to main
git branch -M main

# Link to your GitHub remote repository (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/seva-kendra.git

# Push the code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository page on GitHub.
2. Click on the **Settings** tab (the gear icon on the top menu).
3. Scroll down the left sidebar and click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** -> **Branch**:
   - Change **None** to **main**.
   - Leave the folder as `/ (root)`.
   - Click **Save**.
5. Wait about 30 seconds. Refresh the page, and GitHub will provide your live URL at the top of the Pages section:
   `https://YOUR_USERNAME.github.io/seva-kendra/`

---

## 📁 File Structure
```
seva kendra/
├── index.html        # Main container shell
├── styles.css        # Premium styles and layout
├── app.js            # AngularJS routing & controllers
├── README.md         # This instructions file
├── views/            # Single-page template views
│   ├── home.html     # Landing page, weather, rates
│   ├── about.html    # Company profile, licenses
│   ├── products.html # Searchable product list & modal
│   ├── advisory.html # Dynamic farm calculator
│   └── contact.html  # Location map & dynamic form
└── images/           # Generated high-quality images
    ├── hero-banner.png
    ├── seeds-category.png
    ├── fertilizers-category.png
    └── equipment-category.png
```
