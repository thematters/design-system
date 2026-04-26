import type { Browser } from "@playwright/test";

export const REPO_ROOT: string;
export const TEMPLATES_DIR: string;

export class TemplateNotFoundError extends Error {
  template: string;
  constructor(name: string);
}

export interface RenderResult {
  buffer: Buffer;
  width: number;
  height: number;
  scale: number;
}

export interface ResolvedTemplate {
  templateDir: string;
  templateHtml: string;
}

export function substitutePlaceholders(
  html: string,
  data: Record<string, unknown>,
  onMissing?: (key: string) => void
): string;

export function resolveTemplate(name: string): Promise<ResolvedTemplate>;

export function extractCanvasSize(html: string): {
  width: number;
  height: number;
};

export interface RenderInBrowserArgs {
  browser: Browser;
  templateDir: string;
  templateHtml: string;
  data: Record<string, unknown>;
  scale?: number;
  onMissingKey?: (key: string) => void;
}

export function renderInBrowser(args: RenderInBrowserArgs): Promise<RenderResult>;

export interface RenderTemplateArgs {
  name: string;
  data: Record<string, unknown>;
  scale?: number;
  onMissingKey?: (key: string) => void;
}

export function renderTemplate(args: RenderTemplateArgs): Promise<RenderResult>;

export function listTemplates(): Promise<string[]>;
