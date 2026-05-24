export interface LedConfig {
  text: string;
  scrollSpeed: number; // in seconds for marquee duration, default 5s
  fontSize: number; // in px for marquee, default 48px
  letterSpacing: number; // in em, default 0.1em
  textColor: string; // hex string, default '#00f3ff'
  backgroundColor: string; // hex string, default '#131313'
  isBold: boolean;
  effectType: 'scroll' | 'blink' | 'static' | 'pulse';
  fontFamily: string; // font family name
}

export interface LedTheme {
  name: string;
  primary: string;
  secondary: string;
  shadow: string;
  glowColor: string;
}

export interface SavedMessage {
  id: string;
  text: string;
  timestamp: string;
  config: LedConfig;
  isFavorite?: boolean;
}
