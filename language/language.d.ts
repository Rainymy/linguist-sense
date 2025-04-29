export declare const LinguistLanguages: Record<string, Language>;

export interface Language {
  name: string
  type: string
  color?: string
  extensions?: string[]
  tm_scope: string
  ace_mode: string
  language_id: number
  aliases?: string[]
  codemirror_mode?: string
  codemirror_mime_type?: string
  interpreters?: string[]
  group?: string
  filenames?: string[]
  wrap?: boolean
  fs_name?: string
  searchable?: boolean
}