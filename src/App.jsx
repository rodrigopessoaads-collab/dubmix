import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Upload, Music, Sparkles, Download, Share2, 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  Camera, Film, Star, TrendingUp, X, Check,
  Scissors, Wand2, Type, Image as ImageIcon, Zap
} from 'lucide-react';

// Sample audio library data
const AUDIO_LIBRARY = [
  { id: 1, name: "Viral Sound 1", category: "Memes", duration: "0:15", trend: "🔥 Trending", plays: "2.5M" },
  { id: 2, name: "Funny Quote", category: "Comedy", duration: "0:08", trend: "⭐ Popular", plays: "1.8M" },
  { id: 3, name: "Dance Beat", category: "Music", duration: "0:30", trend: "🔥 Trending", plays: "3.2M" },
  { id: 4, name: "Movie Line", category: "Famous", duration: "0:12", trend: "⚡ New", plays: "890K" },
  { id: 5, name: "Meme Audio", category: "Memes", duration: "0:10", trend: "🔥 Trending", plays: "4.1M" },
  { id: 6, name: "Romantic Song", category: "Music", duration: "0:25", trend: "💖 Love", plays: "2.9M" },
];

const FILTERS = [
  { id: 'none', name: 'Original', class: '' },
  { id: 'vintage', name: 'Vintage', class: 'sepia(0.5) contrast(1.2)' },
  { id: 'dramatic', name: 'Dramatic', class: 'contrast(1.5) saturate(1.3)' },
  { id: 'cool', name: 'Cool', class: 'hue-rotate(180deg) saturate(1.2)' },
  { id: 'warm', name: 'Warm', class: 'sepia(0.3) saturate(1.4)' },
];

function App() {
  const [currentStep, setCurrentStep] = useState('home'); // home, record, select-audio, processing, edit, export
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [videoSpeed, setVideoSpeed] = useState(1);
  const [captionText, setCaptionText] = useState('');
  const [showCaptions, setShowCaptions] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  // Start camera recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setVideoFile(blob);
        setCurrentStep('select-audio');
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please grant permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsRecording(false);
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setVideoFile(file);
      setCurrentStep('select-audio');
    }
  };

  // Process video with AI lip-sync (simulated)
  const processVideo = () => {
    setIsProcessing(true);
    setCurrentStep('processing');
    setProcessingProgress(0);

    // Simulate AI processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setCurrentStep('edit');
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  // Video playback controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const applyFilter = (filterId) => {
    setSelectedFilter(filterId);
  };

  const changeSpeed = (speed) => {
    setVideoSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Export/Download video
  const exportVideo = () => {
    if (videoFile) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = 'dubmix-video.webm';
      link.click();
    }
  };

  const shareVideo = (platform) => {
    alert(\`Sharing to \${platform}! (In production, this would integrate with social media APIs)\`);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">DubMix</h1>
          </div>
          <nav className="flex items-center gap-4">
            <button className="btn-secondary text-sm py-2">Sign In</button>
            <button className="btn-primary text-sm py-2">
              <Star className="w-4 h-4 inline mr-1" />
              Go Premium
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* HOME SCREEN */}
          {currentStep === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-8"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-400 to-secondary-400 rounded-3xl flex items-center justify-center mb-4">
                  <Film className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              <h2 className="text-5xl font-bold mb-4 gradient-text">
                Create Viral Dubs in Seconds
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                AI-powered lip-sync technology that makes your videos perfectly dubbed. 
                Choose your audio, and watch the magic happen! ✨
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep('record')}
                  className="card p-8 hover:border-primary-500"
                >
                  <Camera className="w-12 h-12 mx-auto mb-4 text-primary-500" />
                  <h3 className="text-xl font-bold mb-2">Record Video</h3>
                  <p className="text-gray-600">Start recording with your camera</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('file-upload').click()}
                  className="card p-8 hover:border-secondary-500"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-secondary-500" />
                  <h3 className="text-xl font-bold mb-2">Upload Video</h3>
                  <p className="text-gray-600">Import from your device</p>
                </motion.button>
              </div>

              <input
                id="file-upload"
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
                <div className="card p-6">
                  <Zap className="w-10 h-10 mx-auto mb-3 text-yellow-500" />
                  <h4 className="font-bold mb-2">AI Lip-Sync</h4>
                  <p className="text-sm text-gray-600">Perfect synchronization powered by AI</p>
                </div>
                <div className="card p-6">
                  <Music className="w-10 h-10 mx-auto mb-3 text-blue-500" />
                  <h4 className="font-bold mb-2">Viral Audio Library</h4>
                  <p className="text-sm text-gray-600">Trending sounds updated weekly</p>
                </div>
                <div className="card p-6">
                  <Share2 className="w-10 h-10 mx-auto mb-3 text-green-500" />
                  <h4 className="font-bold mb-2">Easy Sharing</h4>
                  <p className="text-sm text-gray-600">Export to TikTok, Instagram & more</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* RECORD SCREEN */}
          {currentStep === 'record' && (
            <motion.div
              key="record"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Record Your Video</h2>
                  <button onClick={() => setCurrentStep('home')} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="bg-black rounded-2xl overflow-hidden mb-6 aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex justify-center gap-4">
                  {!isRecording ? (
                    <button onClick={startRecording} className="btn-primary">
                      <Camera className="w-5 h-5 inline mr-2" />
                      Start Recording
                    </button>
                  ) : (
                    <button onClick={stopRecording} className="btn-primary bg-red-500 hover:bg-red-600">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse inline-block mr-2" />
                      Stop Recording
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* SELECT AUDIO SCREEN */}
          {currentStep === 'select-audio' && (
            <motion.div
              key="select-audio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto"
            >
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Choose Your Audio</h2>
                  <button onClick={() => setCurrentStep('home')} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary-500" />
                      Trending This Week
                    </h3>
                    <div className="space-y-3">
                      {AUDIO_LIBRARY.map(audio => (
                        <motion.div
                          key={audio.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedAudio(audio)}
                          className={\`p-4 rounded-xl cursor-pointer transition-all \${
                            selectedAudio?.id === audio.id 
                              ? 'bg-gradient-to-r from-primary-100 to-secondary-100 border-2 border-primary-500' 
                              : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                          }\`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
                                <Music className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold">{audio.name}</div>
                                <div className="text-sm text-gray-500">
                                  {audio.category} • {audio.duration}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{audio.trend}</div>
                              <div className="text-xs text-gray-500">{audio.plays}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Video Preview</h3>
                    <div className="bg-black rounded-xl overflow-hidden aspect-video mb-4">
                      <video src={videoUrl} controls className="w-full h-full object-cover" />
                    </div>
                    {selectedAudio && (
                      <div className="bg-white rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Music className="w-5 h-5 text-primary-500" />
                          <div>
                            <div className="font-semibold">{selectedAudio.name}</div>
                            <div className="text-sm text-gray-500">{selectedAudio.category}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={processVideo}
                      disabled={!selectedAudio}
                      className="btn-primary w-full"
                    >
                      <Wand2 className="w-5 h-5 inline mr-2" />
                      Generate Dub with AI
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PROCESSING SCREEN */}
          {currentStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="card p-12 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 mx-auto mb-6"
                >
                  <Sparkles className="w-24 h-24 text-primary-500" />
                </motion.div>

                <h2 className="text-3xl font-bold mb-4">AI Magic in Progress ✨</h2>
                <p className="text-gray-600 mb-8">
                  Synchronizing your lips with the audio...
                </p>

                <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                    initial={{ width: 0 }}
                    animate={{ width: \`\${processingProgress}%\` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="text-2xl font-bold gradient-text">
                  {processingProgress}%
                </div>
              </div>
            </motion.div>
          )}

          {/* EDIT SCREEN */}
          {currentStep === 'edit' && (
            <motion.div
              key="edit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto"
            >
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Edit Your Dub</h2>
                  <button onClick={() => setCurrentStep('export')} className="btn-primary">
                    Next: Export
                  </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Video Preview */}
                  <div className="lg:col-span-2">
                    <div className="bg-black rounded-2xl overflow-hidden mb-4 aspect-video relative">
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        className="w-full h-full object-cover"
                        style={{ filter: FILTERS.find(f => f.id === selectedFilter)?.class }}
                        loop
                      />
                      {showCaptions && captionText && (
                        <div className="absolute bottom-8 left-0 right-0 text-center">
                          <div className="inline-block bg-black/80 text-white px-6 py-2 rounded-lg text-xl font-bold">
                            {captionText}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Playback Controls */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                          <SkipBack className="w-5 h-5" />
                        </button>
                        <button
                          onClick={togglePlay}
                          className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center hover:shadow-lg"
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6 text-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white ml-1" />
                          )}
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                          <SkipForward className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-gray-500" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Editing Tools */}
                  <div className="space-y-4">
                    {/* Filters */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        Filters
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {FILTERS.map(filter => (
                          <button
                            key={filter.id}
                            onClick={() => applyFilter(filter.id)}
                            className={\`p-2 rounded-lg text-sm \${
                              selectedFilter === filter.id
                                ? 'bg-primary-500 text-white'
                                : 'bg-white hover:bg-gray-100'
                            }\`}
                          >
                            {filter.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Speed */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Speed
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {[0.5, 1, 2].map(speed => (
                          <button
                            key={speed}
                            onClick={() => changeSpeed(speed)}
                            className={\`p-2 rounded-lg text-sm \${
                              videoSpeed === speed
                                ? 'bg-primary-500 text-white'
                                : 'bg-white hover:bg-gray-100'
                            }\`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Captions */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Type className="w-5 h-5" />
                        Add Caption
                      </h3>
                      <input
                        type="text"
                        placeholder="Enter text..."
                        value={captionText}
                        onChange={(e) => setCaptionText(e.target.value)}
                        className="input-field mb-2"
                      />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showCaptions}
                          onChange={(e) => setShowCaptions(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Show caption</span>
                      </label>
                    </div>

                    {/* Trim */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Scissors className="w-5 h-5" />
                        Trim Video
                      </h3>
                      <button className="btn-secondary w-full text-sm py-2">
                        Open Trimmer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* EXPORT SCREEN */}
          {currentStep === 'export' && (
            <motion.div
              key="export"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="card p-8">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4"
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2">Your Dub is Ready! 🎉</h2>
                  <p className="text-gray-600">Time to share your creation with the world</p>
                </div>

                <div className="bg-black rounded-2xl overflow-hidden mb-8 aspect-video">
                  <video src={videoUrl} controls className="w-full h-full object-cover" />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <button onClick={exportVideo} className="btn-primary">
                    <Download className="w-5 h-5 inline mr-2" />
                    Download Video
                  </button>
                  <button onClick={() => setCurrentStep('home')} className="btn-secondary">
                    Create Another
                  </button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 text-center">Share to Social Media</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => shareVideo('TikTok')}
                      className="card p-4 hover:shadow-xl text-center"
                    >
                      <Share2 className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                      <div className="text-sm font-semibold">TikTok</div>
                    </button>
                    <button
                      onClick={() => shareVideo('Instagram')}
                      className="card p-4 hover:shadow-xl text-center"
                    >
                      <Share2 className="w-8 h-8 mx-auto mb-2 text-pink-500" />
                      <div className="text-sm font-semibold">Instagram</div>
                    </button>
                    <button
                      onClick={() => shareVideo('YouTube')}
                      className="card p-4 hover:shadow-xl text-center"
                    >
                      <Share2 className="w-8 h-8 mx-auto mb-2 text-red-500" />
                      <div className="text-sm font-semibold">YouTube</div>
                    </button>
                  </div>
                </div>

                {/* Upgrade CTA */}
                <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border-2 border-primary-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg mb-1">Remove Watermark</h4>
                      <p className="text-sm text-gray-600">Upgrade to Premium for watermark-free exports</p>
                    </div>
                    <button className="btn-primary whitespace-nowrap">
                      <Star className="w-4 h-4 inline mr-1" />
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p className="mb-2">© 2025 DubMix. All rights reserved.</p>
          <p>Made with ❤️ for creators everywhere</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
