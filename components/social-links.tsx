"use client"

import { Separator } from "@/components/ui/separator"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Github,
  TextIcon as Telegram,
  Linkedin,
  Youtube,
  ExternalLink,
  Twitch,
  DiscIcon as Discord,
  Music,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { socialConfig } from "@/lib/social-config"

export default function SocialLinks() {
  const [links, setLinks] = useState(socialConfig)

  // Icon mapping
  const iconMap: Record<string, React.ReactNode> = {
    github: <Github className="h-5 w-5" />,
    telegram: <Telegram className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
    twitch: <Twitch className="h-5 w-5" />,
    discord: <Discord className="h-5 w-5" />,
    spotify: <Music className="h-5 w-5" />,
    steam: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
      </svg>
    ),
    default: <ExternalLink className="h-5 w-5" />,
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    show: { opacity: 1, scale: 1, y: 0 },
  }

  return (
    <TooltipProvider>
      <motion.div className="grid grid-cols-4 gap-3" variants={container} initial="hidden" animate="show">
        {links
          .filter((link) => !link.disabled)
          .map((link, index) => {
            // Special case for Steam with multiple accounts
            if (link.name === "Steam") {
              return (
                <motion.div key={index} variants={item} className="flex justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full bg-gradient-to-br from-[#1e40af]/50 to-[#3b82f6]/50 border-[#3b82f6]/20 hover:bg-[#3b82f6]/20 transition-all duration-300 flex flex-col items-center gap-2 p-3 h-auto"
                      >
                        <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} className="text-[#60a5fa]">
                          {iconMap[link.name.toLowerCase()] || iconMap.default}
                        </motion.div>
                        <span className="text-xs mt-1">{link.name}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 bg-[#0f172a] border-[#3b82f6]/30">
                      <div className="space-y-2 p-2">
                        <h4 className="font-medium text-[#f8fafc] text-sm">My Steam Accounts</h4>
                        <Separator className="bg-[#3b82f6]/20" />
                        <a
                          href="https://steamcommunity.com/id/aquapeek"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-[#1e293b] transition-colors"
                        >
                          <svg className="h-4 w-4 text-[#60a5fa]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
                          </svg>
                          <span className="text-[#94a3b8] text-sm">aquapeek</span>
                        </a>
                        <a
                          href="https://steamcommunity.com/id/ayanamipeek"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-[#1e293b] transition-colors"
                        >
                          <svg className="h-4 w-4 text-[#60a5fa]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
                          </svg>
                          <span className="text-[#94a3b8] text-sm">ayanamipeek</span>
                        </a>
                      </div>
                    </PopoverContent>
                  </Popover>
                </motion.div>
              )
            }

            // Regular social links
            return (
              <motion.div key={index} variants={item} className="flex justify-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full bg-gradient-to-br from-[#1e40af]/50 to-[#3b82f6]/50 border-[#3b82f6]/20 hover:bg-[#3b82f6]/20 transition-all duration-300 flex flex-col items-center gap-2 p-3 h-auto"
                      asChild
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                        <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} className="text-[#60a5fa]">
                          {iconMap[link.name.toLowerCase()] || iconMap.default}
                        </motion.div>
                        <span className="text-xs mt-1">{link.name}</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit my {link.name}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            )
          })}
      </motion.div>
    </TooltipProvider>
  )
}
