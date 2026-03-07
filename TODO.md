# VinaUAV Phase 2 - TODO List

Based on the architecture and UX brainstorm, here is the prioritized list of tasks to execute for Phase 2:

## 1. Web Ecosystem (`apps/web`)
- [x] **Implement the Interactive Landing Page**
  - Use `framer-motion` for dynamic tilt and glow effects on high-res flight controller PNG.
  - Build the layout with the dynamic HUD theme, data tickers, and micro-animations.
  - Implement the Prominent Download CTA flow with glowing borders.
- [/] **E-commerce & Booking Flow**
  - Build the "Loadout Builder" wizard for buying components (with hardcoded Vietnamese products).
  - Implement the 1-on-1 Setup Booking flow with craft specs upload.
  - Create the Unified Account Dashboard for order history and tunes.
- [ ] **Interactive Documentation**
  - Build interactive SVG wiring diagrams (dynamic highlighting based on rx/vtx selection).
  - Implement one-click CLI snippet copy-paste for guides.
  - Integrate a smart search bar linking to desktop app tabs.

## 2. Desktop Configurator (`apps/desktop`)
- [ ] **Build the "Connection & Global Header" Shell**
  - Invoke Tauri Rust commands to list available serial/USB COM ports.
  - Build the persistent header UI (Connection State, Voltage, Save button).
  - Wire it up to establish a basic handshake with the hardware.
- [ ] **Core Layout & Progressive Disclosure UI**
  - Implement Dashboard (Home) with 3D drone model & quick status.
  - Build Ports & Hardware visual drag-and-drop UI.
  - Implement Rates & Feel with interactive curve graphs.
  - Build PID & Filters section with sliders and blackbox spectral analysis.
  - Create visual Motor reordering & testing tab.
  - Add Firmware Flasher tab connecting to NestJS API.

## 3. Backend & Cloud API (`apps/api`)
- [ ] **Scaffold Authentication & User Dashboard**
  - Create JWT authentication endpoints in `apps/api` (NestJS).
  - Build the login flow in `apps/web`.
- [ ] **Killer Features Integrations**
  - **Cloud-Sync Profiles ("Tune Locker"):** API endpoints for saving and retrieving PIDs, rates, and OSD layouts.
  - **"Share My Tune" Link Generation:** Setup short link generation and resolution (e.g., `vinauav.com/tune/xyz`).

## 4. Advanced "Killer Features" Implementation
- [ ] **Visual "Smart" Motor Remapping**
  - Implement logic in desktop app to detect hand-spun motors (reading slight voltage).
  - Create UI for clicking physical motor locations and auto-generating CLI resource remapping commands.
