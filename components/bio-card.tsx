"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import SocialLinks from "./social-links"
import AudioPlayer from "./audio-player"
import { Code2, User, Gamepad2, Music, Languages, Sparkles, Rocket, Coffee, Brain } from "lucide-react"
import { calculateAge } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function BioCard() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("about")
  const birthDate = "2007-07-20" // Format: YYYY-MM-DD
  const age = calculateAge(birthDate)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <Card className="backdrop-blur-md bg-[#0f172a]/60 border-[#3b82f6]/30 overflow-hidden shadow-xl shadow-[#3b82f6]/20 hover:shadow-[#3b82f6]/30 transition-all duration-500">
        <div className="relative h-32 bg-gradient-to-r from-[#1e40af] to-[#3b82f6] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.3],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="relative flex justify-center">
          <motion.div
            className="absolute -top-16 rounded-full border-4 border-[#0f172a] overflow-hidden shadow-lg shadow-[#3b82f6]/20"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="https://cdn.discordapp.com/avatars/749221870754070549/39b4579473385758426465b8955d5d1c.webp"
              alt="aquakun22"
              className="h-32 w-32 object-cover"
            />
          </motion.div>
        </div>

        <CardContent className="pt-20 pb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6"
          >
            <motion.h1
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#60a5fa] to-[#93c5fd]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              aquakun22 ✧˖°
            </motion.h1>
            <motion.p
              className="text-[#94a3b8] mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {age} years old • Born: 20.07.2007 • pronouns: he/him/aqua
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-2 mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Badge variant="outline" className="bg-[#1e40af]/10 text-[#93c5fd] border-[#3b82f6]/30">
                <Languages className="h-3 w-3 mr-1" />
                Russian
              </Badge>
              <Badge variant="outline" className="bg-[#1e3a8a]/10 text-[#93c5fd] border-[#3b82f6]/30">
                <Languages className="h-3 w-3 mr-1" />
                Ukrainian
              </Badge>
              <Badge variant="outline" className="bg-[#1e3a8a]/10 text-[#93c5fd] border-[#3b82f6]/30">
                <Languages className="h-3 w-3 mr-1" />
                English
              </Badge>
            </motion.div>
          </motion.div>

          <Separator className="my-4 bg-[#3b82f6]/20" />

          <TooltipProvider>
            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="grid grid-cols-5 bg-[#1e293b]/40 backdrop-blur-sm">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="about">
                      <User className="h-4 w-4 mr-1" />
                      <span className="sr-only sm:not-sr-only sm:inline-block">About</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>About Me</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="skills">
                      <Code2 className="h-4 w-4 mr-1" />
                      <span className="sr-only sm:not-sr-only sm:inline-block">Skills</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>My Skills</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="interests">
                      <Rocket className="h-4 w-4 mr-1" />
                      <span className="sr-only sm:not-sr-only sm:inline-block">Interests</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>My Interests</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="social">
                      <Sparkles className="h-4 w-4 mr-1" />
                      <span className="sr-only sm:not-sr-only sm:inline-block">Social</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Connect With Me</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="music">
                      <Music className="h-4 w-4 mr-1" />
                      <span className="sr-only sm:not-sr-only sm:inline-block">Music</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>My Playlist</TooltipContent>
                </Tooltip>
              </TabsList>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {activeTab === "about" && (
                    <motion.div
                      key="about-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value="about" className="mt-4 space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-lg font-medium mb-2 text-[#f8fafc] flex items-center">
                            <User className="h-5 w-5 mr-2 text-[#60a5fa]" /> About Me
                          </h3>
                          <div className="text-[#94a3b8] space-y-2 leading-relaxed">
                            <p>aquakun22, {age}yo developer residing in the UK.</p>
                            <p>
                              Working hours: 10 AM - 10 PM every day.{" "}
                              <Coffee className="inline h-4 w-4 text-amber-400" />
                            </p>
                            <p>
                              Timezone: UTC+1 <span className="text-[#60a5fa]">⏰</span>
                            </p>
                            <p>
                              Very friendly, dont be shy to dm me if you feel like.{" "}
                              <span className="text-pink-400">♡</span>
                            </p>
                            <p>
                              Passionate about coding software, games and ai technologies.
                            </p>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="italic"
                            >
                              Always open for having new conversations, giving feedback and just chatting :3
                            </motion.p>
                          </div>
                        </motion.div>
                      </TabsContent>
                    </motion.div>
                  )}

                  {activeTab === "skills" && (
                    <motion.div
                      key="skills-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value="skills" className="mt-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <h3 className="text-lg font-medium mb-2 text-[#f8fafc] flex items-center">
                            <Code2 className="h-5 w-5 mr-2 text-[#60a5fa]" /> My Skills
                          </h3>

                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-[#f8fafc] flex items-center">
                                  <span className="text-yellow-400 mr-1">⚡</span> Node.js
                                </span>
                                <span className="text-xs text-[#94a3b8]">95%</span>
                              </div>
                              <div className="h-2 bg-[#1e293b]/40 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6]"
                                  initial={{ width: 0 }}
                                  animate={{ width: "95%" }}
                                  transition={{ duration: 1, delay: 0.1 }}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-[#f8fafc] flex items-center">
                                  <span className="text-green-400 mr-1">🐍</span> Python
                                </span>
                                <span className="text-xs text-[#94a3b8]">85%</span>
                              </div>
                              <div className="h-2 bg-[#1e293b]/40 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6]"
                                  initial={{ width: 0 }}
                                  animate={{ width: "85%" }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-[#f8fafc] flex items-center">
                                  <span className="text-red-400 mr-1">☕</span> Java
                                </span>
                                <span className="text-xs text-[#94a3b8]">30%</span>
                              </div>
                              <div className="h-2 bg-[#1e293b]/40 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6]"
                                  initial={{ width: 0 }}
                                  animate={{ width: "30%" }}
                                  transition={{ duration: 1, delay: 0.3 }}
                                />
                              </div>
                            </div>
                          </div>

                          <motion.div
                            className="flex flex-wrap gap-2 mt-4"
                            variants={{
                              hidden: { opacity: 0 },
                              show: {
                                opacity: 1,
                                transition: {
                                  staggerChildren: 0.1,
                                },
                              },
                            }}
                            initial="hidden"
                            animate="show"
                          >
                            {[
                              { name: "Python", emoji: "🐍" },
                              { name: "TypeScript", emoji: "💙" },
                              { name: "LLM-Knowledge", emoji: "🧠" },
                              { name: "Next.js", emoji: "▲" },
                              { name: "Godot", emoji: "🎮" },
                            ].map((skill, index) => (
                              <motion.div
                                key={index}
                                variants={{
                                  hidden: { opacity: 0, scale: 0.8 },
                                  show: { opacity: 1, scale: 1 },
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                              >
                                <Badge className="bg-gradient-to-r from-[#1e40af]/20 to-[#3b82f6]/20 hover:from-[#1e40af]/30 hover:to-[#3b82f6]/30 text-[#f8fafc]">
                                  <span className="mr-1">{skill.emoji}</span> {skill.name}
                                </Badge>
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>
                      </TabsContent>
                    </motion.div>
                  )}

                  {activeTab === "interests" && (
                    <motion.div
                      key="interests-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value="interests" className="mt-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-lg font-medium mb-2 text-[#f8fafc] flex items-center">
                            <Rocket className="h-5 w-5 mr-2 text-[#60a5fa]" /> My Interests
                          </h3>

                          <div className="grid grid-cols-2 gap-3">
                            <motion.div
                              whileHover={{ scale: 1.05, y: -5 }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5 }}
                              className="p-3 rounded-lg bg-gradient-to-br from-[#1e40af]/10 to-[#3b82f6]/10 border border-[#3b82f6]/20 hover:shadow-md hover:shadow-[#3b82f6]/10 transition-all duration-300"
                            >
                              <Gamepad2 className="h-8 w-8 mb-2 text-[#60a5fa]" />
                              <h4 className="font-medium text-[#f8fafc]">
                                Gaming <span className="text-purple-400">🎮</span>
                              </h4>
                              <p className="text-sm text-[#94a3b8]">Passionate about gaming and game development</p>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.05, y: -5 }}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className="p-3 rounded-lg bg-gradient-to-br from-[#1e40af]/10 to-[#3b82f6]/10 border border-[#3b82f6]/20 hover:shadow-md hover:shadow-[#3b82f6]/10 transition-all duration-300"
                            >
                              <Brain className="h-8 w-8 mb-2 text-[#60a5fa]" />
                              <h4 className="font-medium text-[#f8fafc]">
                                AI Technology <span className="text-green-400">🤖</span>
                              </h4>
                              <p className="text-sm text-[#94a3b8]">Exploring AI and machine learning</p>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.05, y: -5 }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="p-3 rounded-lg bg-gradient-to-br from-[#1e40af]/10 to-[#3b82f6]/10 border border-[#3b82f6]/20 hover:shadow-md hover:shadow-[#3b82f6]/10 transition-all duration-300"
                            >
                              <Coffee className="h-8 w-8 mb-2 text-[#60a5fa]" />
                              <h4 className="font-medium text-[#f8fafc]">
                                Programming <span className="text-amber-400">💻</span>
                              </h4>
                              <p className="text-sm text-[#94a3b8]">Making discord bots and different projects</p>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.05, y: -5 }}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              className="p-3 rounded-lg bg-gradient-to-br from-[#1e40af]/10 to-[#3b82f6]/10 border border-[#3b82f6]/20 hover:shadow-md hover:shadow-[#3b82f6]/10 transition-all duration-300"
                            >
                              <Music className="h-8 w-8 mb-2 text-[#60a5fa]" />
                              <h4 className="font-medium text-[#f8fafc]">
                                Music <span className="text-pink-400">♪</span>
                              </h4>
                              <p className="text-sm text-[#94a3b8]">Listening to music and spending time with pals:D</p>
                            </motion.div>
                          </div>
                        </motion.div>
                      </TabsContent>
                    </motion.div>
                  )}

                  {activeTab === "social" && (
                    <motion.div
                      key="social-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value="social" className="mt-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-lg font-medium mb-2 text-[#f8fafc] flex items-center">
                            <Sparkles className="h-5 w-5 mr-2 text-[#60a5fa]" /> Connect With Me
                          </h3>
                          <p className="text-sm text-[#94a3b8] mb-4">
                            Find me on these platforms and let's connect! <span className="text-pink-400">♡</span>
                          </p>

                          <div className="bg-gradient-to-br from-[#1e40af]/30 to-[#3b82f6]/30 p-4 rounded-lg border border-[#3b82f6]/20 hover:shadow-md hover:shadow-[#3b82f6]/10 transition-all duration-300">
                            <SocialLinks />
                          </div>
                        </motion.div>
                      </TabsContent>
                    </motion.div>
                  )}

                  {activeTab === "music" && (
                    <motion.div
                      key="music-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value="music" className="mt-4 block">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium mb-2 text-[#f8fafc] flex items-center">
                            <Music className="h-5 w-5 mr-2 text-[#60a5fa]" /> My Playlist
                          </h3>
                          <p className="text-sm text-[#94a3b8] mb-4">
                            Background music that keeps me in the zone while coding{" "}
                            <span className="text-[#60a5fa]">♪</span>
                          </p>

                          <AudioPlayer />
                        </div>
                      </TabsContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Tabs>
          </TooltipProvider>
        </CardContent>
      </Card>
    </motion.div>
  )
}
