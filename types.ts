
import React from 'react';

export type AppState = 'locked' | 'desktop';

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  color: string;
  // Fix: Added React import to resolve missing namespace error
  component?: React.ComponentType;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}