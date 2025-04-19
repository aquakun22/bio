"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function SpotifyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(70)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (isMuted) {
      setVolume(70) // Restore previous volume
    } else {
      setVolume(0)
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(value[0] === 0)
  }

  useEffect(() => {
    // Auto-play when component mounts
    const timer = setTimeout(() => {
      setIsPlaying(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-md bg-black/30 aspect-video">
        {isPlaying ? (
          <iframe
            ref={iframeRef}
            src="https://open.spotify.com/embed/playlist/6AVW9XJI3yMMmZ5EbKxDTK?utm_source=generator&theme=0"
            width="100%"
            height="100%"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700" onClick={togglePlay}>
                <Play className="h-6 w-6" />
                <span className="ml-2">Play My Playlist</span>
              </Button>
            </motion.div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="bg-background/10 border-purple-500/20 hover:bg-purple-500/20"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="bg-background/10 border-purple-500/20 hover:bg-purple-500/20"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        <div className="flex-1">
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="text-xs text-center text-muted-foreground">Playlist: aquakun22's Coding Mix</div>
    </div>
  )
}
