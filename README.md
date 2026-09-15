# Bosu Kodelli — Senior DevOps Engineer Portfolio

<div align="center">

![DevOps Banner](https://img.shields.io/badge/Architecture-Cloud%20%26%20DevOps-52796f?style=for-the-badge&logo=azuredevops&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

An ultra-modern, interactive cloud & DevOps engineering portfolio showcasing 6+ years of enterprise architecture, multi-cloud Kubernetes (AKS/EKS), Infrastructure as Code (Terraform), DevSecOps pipelines, FinOps cost governance, and GenAI agent workflows.

[Live Demo](http://localhost:5173) • [Docker Image](#-running-with-docker) • [Architecture](#-project-structure) • [Contact](#-contact)

</div>

---

## 🌟 Key Highlights & Features

- **Full-Screen Editorial Opening Screen**: High-impact editorial poster with an interactive spotlight lens unmasking details on mouse/touch interaction.
- **Interactive DevOps Infinity Loop ($\infty$) HUD Tracker**: Custom SVG animated controller mapping live scroll progress to the 8 stages of the DevOps lifecycle (`PLAN` &rarr; `CODE` &rarr; `BUILD` &rarr; `TEST` &rarr; `RELEASE` &rarr; `DEPLOY` &rarr; `OPERATE` &rarr; `MONITOR`).
- **Smooth 60/120Hz Lenis & GSAP Scroll Engine**: Fluid inertial scrolling linked with GSAP ScrollTrigger for pinned editorial reveals and animated bento cards.
- **Interactive DevOps Shell Terminal**: In-browser command-line interface featuring `neofetch`, `skills`, `experience`, `projects`, `finops`, `certifications`, and `contact` commands.
- **Asymmetric Skills Bento Grid**: Live simulated CI/CD pipelines, Terraform workspace states, and DevSecOps security scanning metrics.
- **FinOps & Performance Metrics**: Showcasing 30% cloud waste reduction, 40% MTTR reduction, and 99.99% enterprise uptime achievements.
- **Containerized & Production Ready**: Multi-stage Docker build served via an optimized Nginx Alpine image with Gzip compression and security headers.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Core Frontend** | React 19, TypeScript, Vite 8, Tailwind CSS v4 |
| **Animation & Scroll** | GSAP 3.15, ScrollTrigger, Lenis Smooth Scroll |
| **Icons & UI** | Lucide React, Custom SVG Infinite Loops |
| **Containerization** | Docker (Multi-stage Build), Nginx 1.27 Alpine, Docker Compose |
| **Linting & Quality** | Oxlint, TypeScript Compiler (`tsc -b`) |

---

## 🚀 Step-by-Step Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20.x or later)
- [npm](https://www.npmjs.com/) (v10.x or later)
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) *(Optional, for containerized deployment)*

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/bosekodelli/BoseDevops-portfolio.git
cd BoseDevops-portfolio
```

---

### Step 2: Install Dependencies

```bash
npm install
```

---

### Step 3: Run the Local Development Server

```bash
npm run dev
```

The development server will start with host exposure enabled:
- **Local URL**: `http://localhost:5173/`
- **Network URL (for Mobile testing)**: `http://<your-local-ip>:5173/`

---

### Step 4: Build for Production

To perform a TypeScript type-check and generate optimized production assets in the `/dist` directory:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🐳 Running with Docker

### Option A: Using Docker Compose (Recommended)

1. **Build and start the container in the background:**
   ```bash
   docker compose up -d --build
   ```

2. **Access the application:**
   Open your browser and navigate to `http://localhost:8080/`

3. **Check container status and health:**
   ```bash
   docker compose ps
   ```

4. **View live logs:**
   ```bash
   docker compose logs -f
   ```

5. **Stop the container:**
   ```bash
   docker compose down
   ```

---

### Option B: Using Docker CLI

1. **Build the Docker image:**
   ```bash
   docker build -t bosu-portfolio:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 8080:80 --name bosu-portfolio --restart unless-stopped bosu-portfolio:latest
   ```

3. **Verify the container is healthy:**
   ```bash
   docker ps
   ```

4. **Stop and remove container:**
   ```bash
   docker stop bosu-portfolio && docker rm bosu-portfolio
   ```

---

## 📱 Testing on Mobile Devices

### Over Local Wi-Fi Network
1. Ensure your mobile phone and computer are on the **same Wi-Fi network**.
2. Run `npm run dev` on your computer.
3. Open your mobile browser (Chrome/Safari) and enter:
   ```text
   http://<YOUR_COMPUTER_IP>:5173/
   ```
   *(e.g., `http://192.168.1.16:5173/`)*

### In Chrome DevTools (Device Emulation)
1. Open `http://localhost:5173/` in Google Chrome.
2. Press **`F12`** (or `Ctrl + Shift + I`) to open Developer Tools.
3. Press **`Ctrl + Shift + M`** to toggle Device Toolbar.
4. Select **iPhone 14/15 Pro**, **Samsung Galaxy**, or **Pixel** to test touch interactions.

---

## 📂 Project Structure

```text
scrollingweb/
├── .dockerignore                 # Excluded files for Docker build context
├── .gitignore                    # Git ignored files & directories
├── docker-compose.yml            # Docker Compose orchestration
├── Dockerfile                    # Multi-stage production Dockerfile
├── nginx.conf                    # Nginx configuration (gzip, caching, SPA routing)
├── index.html                    # Main HTML entry with Google fonts & preload
├── package.json                  # Project dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite build & Tailwind plugin configuration
│
├── public/
│   ├── assets/                   # High-res portraits & editorial assets
│   │   ├── bose-poster.jpg       # Opening editorial cover image
│   │   ├── bose-original.png     # Studio portrait image
│   │   ├── avatar-headshot.png   # Hero badge headshot
│   │   └── executive-portrait.png# About section architecture portrait
│   └── favicon.svg               # Site favicon
│
└── src/
    ├── assets/                   # Static UI assets & logos
    ├── components/               # React components
    │   ├── EditorialOpening.tsx  # Fullscreen opening screen with spotlight
    │   ├── DevOpsScrollController.tsx # Infinity Loop HUD scroll tracker
    │   ├── Navbar.tsx            # Frosted glass floating navigation pill
    │   ├── Hero.tsx              # Hero headline, tech orbits & metrics
    │   ├── About.tsx             # Career background, Jeta/Capital One & pillars
    │   ├── SkillsBento.tsx       # Asymmetric skills grid with live pipelines
    │   ├── ProjectsStack.tsx     # Deep-dive enterprise case studies
    │   ├── ExperienceTimeline.tsx# Deliverables & milestone timeline
    │   ├── InteractiveTerminal.tsx # Interactive terminal shell (neofetch, etc.)
    │   └── ContactFooter.tsx     # Direct inquiry form & quick copy pills
    │
    ├── context/
    │   └── SmoothScrollProvider.tsx # Lenis + GSAP ScrollTrigger engine
    │
    ├── App.tsx                   # Main layout container
    ├── main.tsx                  # React DOM root entry
    └── index.css                 # Natural stone & earth theme CSS design tokens
```

---

## 🔒 Production Nginx Architecture

The production runner uses a minimal `nginx:1.27-alpine` container configured with:
- **Gzip Compression**: Compresses HTML, CSS, JS, JSON, and SVG files for fast load times.
- **SPA Fallback**: `try_files $uri $uri/ /index.html;` to ensure smooth client-side routing.
- **Immutable Static Asset Caching**: 1-year `Cache-Control` for fonts, images, and bundle hashes.
- **Security Headers**:
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: no-referrer-when-downgrade`
- **Health Check Endpoint**: Available at `/healthz` returning HTTP 200 OK.

---

## 📬 Contact & Connect

**Bosu Kodelli**  
*Senior DevOps Engineer • Azure & AWS Cloud Specialist*

- 📧 **Email**: [bose.kodelli09@gmail.com](mailto:bose.kodelli09@gmail.com)
- 📱 **Phone**: [+91 9701237678](tel:+919701237678)
- 💼 **LinkedIn**: [linkedin.com/in/bosu-kodelli](https://linkedin.com)
- 🐙 **GitHub**: [github.com/bosekodelli](https://github.com/bosekodelli)
- 📍 **Location**: Hyderabad, India (Open to Global Remote / Relocation)

---

<div align="center">
  <sub>Built with ❤️ using React 19, TypeScript, GSAP, and Docker. Designed with a Minimalist Natural Stone Theme.</sub>
</div>
