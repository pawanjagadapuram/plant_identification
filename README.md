# PlantID - AI Plant Identification App 🌿

PlantID is a modern web application that uses AI to identify plants from photos and provide detailed information about their characteristics and care requirements. Built with Next.js, TypeScript, and powered by Google's Generative AI.

## ✨ Features

- 📸 Upload photos or capture directly using device camera
- 🤖 AI-powered plant identification
- 📊 Detailed plant information including:
  - Scientific name and family
  - Physical characteristics
  - Care instructions
  - Growing conditions
  - Native regions
- 📱 Responsive design for all devices
- 🎨 Beautiful, animated gradient UI
- 🖼️ Drag-and-drop image upload

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Google Cloud API key with Gemini Vision API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pawanjagadapuram/plant_identification.git
cd plantid
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Google API key:
```
GOOGLE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Google Generative AI](https://cloud.google.com/vertex-ai) - AI model
- [Lucide React](https://lucide.dev/) - Icons
- [shadcn/ui](https://ui.shadcn.com/) - UI components

## 🎯 Core Components

- `UploadZone`: Handles image upload and camera capture
- `PlantInfoCard`: Displays plant information
- `Navbar`: Navigation component
- `Footer`: Footer component

## 🔒 Environment Variables

Create a `.env.local` file with the following variables:

```
GOOGLE_API_KEY=your_google_api_key
```
