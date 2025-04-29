export interface Language {
  name: string;
  extensions?: string[];
  filenames?: string[];
  type?: string;
  tm_scope?: string;
  color?: string;
  ace_mode?: string;
  codemirror_mode?: string;
  codemirror_mime_type?: string;
  aliases?: string[];
}

export function detectByExtension(filename: string): Language | null {
  // TODO: Your extension detection logic
  return null;
}

export function detectByContent(fileContent: string): Language | null {
  // TODO: Your content detection logic
  return null;
}