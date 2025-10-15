# 🎬 DubMix - AI Video Dubbing Web App

Create viral dubbed videos with AI-powered lip-sync technology!

## ✨ Features

### MVP Features (Fully Functional)
- 📹 **Video Recording & Upload**: Record directly or upload existing videos
- 🎵 **Viral Audio Library**: Curated collection of trending sounds and memes
- 🤖 **AI Lip-Sync Simulation**: Automatic video processing (simulated)
- 🎨 **Video Editing Tools**:
  - 5 Professional filters (Vintage, Dramatic, Cool, Warm)
  - Speed control (0.5x, 1x, 2x)
  - Caption/text overlay
  - Video trimming
- 💾 **Export & Share**: Download videos and share to social media
- 🎭 **Modern UI/UX**: Beautiful gradient design with smooth animations

### Tech Stack
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Video**: HTML5 MediaRecorder API

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Installation

1. **Install Dependencies**
\`\`\`bash
npm install
\`\`\`

2. **Run Development Server**
\`\`\`bash
npm run dev
\`\`\`

3. **Open Browser**
Navigate to `http://localhost:3000`

### Build for Production
\`\`\`bash
npm run build
npm run preview
\`\`\`

## 📱 How to Use

1. **Start Creating**
   - Click "Record Video" to use your camera
   - Or "Upload Video" to import existing files

2. **Choose Audio**
   - Browse the viral audio library
   - Select trending sounds updated weekly
   - Preview before applying

3. **AI Processing**
   - Click "Generate Dub with AI"
   - Watch the magic happen (AI lip-sync simulation)

4. **Edit Your Video**
   - Apply filters (Vintage, Dramatic, Cool, Warm)
   - Adjust playback speed
   - Add captions and text
   - Trim unwanted parts

5. **Export & Share**
   - Download your creation
   - Share directly to TikTok, Instagram, YouTube
   - Create more viral content!

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (#d946ef → #c026d3)
- **Secondary**: Teal gradient (#14b8a6 → #0d9488)
- **Background**: Soft multi-gradient (purple → pink → cyan)

### Components
- Modern card-based UI
- Smooth micro-interactions
- Responsive mobile-first design
- Glass morphism effects

## 📂 Project Structure

\`\`\`
dubmix/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles & Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind theme
└── postcss.config.js    # PostCSS setup
\`\`\`

## 🔮 Future Enhancements

- Real AI lip-sync integration (Wav2Lip, Synthesia API)
- User authentication and profiles
- Video project history
- Community feed and discovery
- Advanced editing tools
- Mobile app (React Native)
- Premium features and monetization
- Backend with Supabase/Firebase
- Real social media API integration

## 🛠️ Development Notes

### Camera Access
The app requires camera and microphone permissions for recording. Make sure to:
- Use HTTPS in production (required for getUserMedia)
- Grant browser permissions when prompted

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Video Formats
- Recording: WebM (VP8/VP9)
- Upload: MP4, WebM, MOV, AVI
- Export: WebM (can be converted to MP4 with backend)

## 🤝 Contributing

This is a demonstration project. For production use:
1. Implement real AI lip-sync backend
2. Add user authentication
3. Integrate video storage (S3, Cloudflare R2)
4. Connect social media APIs
5. Add analytics and monitoring

## 📄 License

MIT License - feel free to use for your projects!

## 🎯 MVP Completion Status

✅ Video recording and upload
✅ Audio library with categories
✅ Processing simulation with progress
✅ Video editing tools (filters, speed, captions)
✅ Export and download functionality
✅ Modern responsive UI
✅ Smooth animations and transitions
✅ Social media sharing buttons

## 🚀 Next Steps for Production

1. **Backend Setup**
   - Deploy API server (Node.js/Python)
   - Integrate real AI lip-sync (Wav2Lip)
   - Setup video storage (AWS S3)

2. **Authentication**
   - Firebase Auth or Auth0
   - User profiles and history

3. **Deployment**
   - Deploy frontend to Vercel/Netlify
   - Setup CDN for video delivery
   - Configure domain and SSL

4. **Monetization**
   - Implement Stripe for payments
   - Premium tier features
   - Usage analytics

---

**Made with ❤️ for creators everywhere**

*DubMix - The CapCut of Dubbing* ✨
