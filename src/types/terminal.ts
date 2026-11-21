import type { ReactNode } from 'react';

export type OutputBlock = {
  kind: 'text' | 'success' | 'muted' | 'heading' | 'link' | 'projects';
  content?: ReactNode;
};

export type CommandResult = OutputBlock[];
