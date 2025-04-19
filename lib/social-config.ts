// Social media configuration
// Set disabled to true to hide a social media link

export type SocialLink = {
  name: string
  url: string
  disabled: boolean
}

export const socialConfig: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/aquakun22",
    disabled: false,
  },
  {
    name: "Telegram",
    url: "https://t.me/aquakun22",
    disabled: false,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/aquakun22",
    disabled: true,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@aquakun22",
    disabled: false,
  },
  {
    name: "Twitch",
    url: "https://twitch.tv/aquakun222",
    disabled: false,
  },
  {
    name: "Discord",
    url: "http://discordapp.com/users/749221870754070549",
    disabled: false,
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/user/31y2ttzjoddjxwriqu5gkaacokua",
    disabled: false,
  },
  {
    name: "Steam",
    url: "https://steamcommunity.com/id/aquapeek",
    disabled: false,
  },
]
