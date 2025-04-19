"use client"

import { useState, useRef } from "react"
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

// Playlist with actual MP3 files
const playlist = [
  {
    title: "Requiem For You",
    artist: "Cannot Get Over You",
    src: "/audio/requiem-for-you.mp3",
    favorite: true,
  },
  {
    title: "Novulent - Scars",
    artist: "Novulent",
    src: "/audio/novulent-scars.mp3",
    favorite: false,
  },
  {
    title: "Lofi Study",
    artist: "Chill Beats",
    src: "/audio/lofi-study.mp3",
    favorite: false,
  },
  {
    title: "Coding Focus",
    artist: "Deep Concentration",
    src: "/audio/coding-focus.mp3",
    favorite: false,
  },
]

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [isVolumeVisible, setIsVolumeVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      // Set the volume before playing
      audioRef.current.volume = volume / 100
      audioRef.current.play().catch((err) => {
        console.error("Play error:", err)
      })
    }

    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
    setIsPlaying(false) // Reset playing state when changing tracks
  }

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
    setIsPlaying(false) // Reset playing state when changing tracks
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    if (isMuted) {
      setVolume(70)
      setIsMuted(false)
      audioRef.current.volume = 0.7
    } else {
      setVolume(0)
      setIsMuted(true)
      audioRef.current.volume = 0
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return

    setCurrentTime(audioRef.current.currentTime)
    setDuration(audioRef.current.duration || 0)
  }

  const handleEnded = () => {
    handleNext()
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
  }

  return (
    <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#1e40af]/30 to-[#3b82f6]/30 border border-[#3b82f6]/20 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-[#3b82f6]/10">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={playlist[currentTrack].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={(e) => console.log("Audio element error:", e)}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={cn(
              "w-12 h-12 rounded-md bg-gradient-to-br from-[#1e40af] to-[#3b82f6] flex items-center justify-center relative overflow-hidden group",
              isPlaying ? "animate-spin-slow" : "",
            )}
          >
            <svg
              className="h-6 w-6 text-white absolute transition-all duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12 L9 8 L15 12 L9 16 Z" fill="currentColor" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/0 via-[#3b82f6]/30 to-[#3b82f6]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse-slow"></div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h4 className="font-medium text-[#f8fafc] group-hover:text-white transition-colors">
                {playlist[currentTrack].title}
              </h4>
              {playlist[currentTrack].favorite && (
                <Heart className="h-3 w-3 text-pink-400 fill-pink-400 animate-pulse-slow" />
              )}
            </div>
            <p className="text-xs text-[#94a3b8]">{playlist[currentTrack].artist}</p>
          </div>
        </div>
        <div className="text-xs text-[#94a3b8]">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-[#1e293b]/40 rounded-full overflow-hidden cursor-pointer group mb-4">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#1e40af] to-[#3b82f6] transition-all duration-300"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <div className="hover:scale-110 active:scale-90 transition-transform">
          <Button
            variant="outline"
            size="icon"
            className="bg-[#1e293b]/40 border-[#3b82f6]/20 hover:bg-[#3b82f6]/20"
            onClick={handlePrev}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
        </div>

        <div className="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] rounded-full p-1 hover:scale-110 active:scale-90 transition-transform">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-[#1e293b]/40 border-transparent hover:bg-[#1e293b]/60 hover:border-transparent"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        </div>

        <div className="hover:scale-110 active:scale-90 transition-transform">
          <Button
            variant="outline"
            size="icon"
            className="bg-[#1e293b]/40 border-[#3b82f6]/20 hover:bg-[#3b82f6]/20"
            onClick={handleNext}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative mt-4">
        <div
          className="flex items-center gap-2"
          onMouseEnter={() => setIsVolumeVisible(true)}
          onMouseLeave={() => setIsVolumeVisible(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b]/40"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <div
            className={cn(
              "flex-1 transition-all duration-300 overflow-hidden",
              isVolumeVisible ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0",
            )}
          >
            <Slider value={[volume]} min={0} max={100} step={1} onValueChange={handleVolumeChange} className="w-full" />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#3b82f6]/20">
        <p className="text-xs text-center text-[#94a3b8]">
          <span className="text-[#60a5fa]">♪</span> Now playing: aquakun22's Coding Mix{" "}
          <span className="text-[#60a5fa]">♪</span>
        </p>
        <p className="text-xs text-center text-[#94a3b8] mt-1 opacity-70">Click play to start listening</p>
      </div>
    </div>
  )
}
