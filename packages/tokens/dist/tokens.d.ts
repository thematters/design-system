// Auto-generated. Do not edit. Run `node packages/tokens/build.mjs`.
export interface TokenLeaf {
  readonly value: string;
  readonly description?: string;
}
export interface TokenTree {
  readonly [key: string]: TokenLeaf | TokenTree;
}
export declare const tokens: {
  readonly color: TokenTree;
  readonly spacing: TokenTree;
  readonly effect: TokenTree;
  readonly typography: {
    readonly fontFamily: { readonly [k: string]: TokenLeaf };
    readonly system: { readonly [name: string]: { readonly [weight: string]: { readonly fontFamily: string; readonly fontWeight: number; readonly fontSize: string; readonly lineHeight: string; readonly letterSpacing?: string } } };
    readonly article: { readonly [name: string]: { readonly [weight: string]: { readonly fontFamily: string; readonly fontWeight: number; readonly fontSize: string; readonly lineHeight: string; readonly letterSpacing?: string } } };
  };
};
export declare const colorByPath: Record<string, string>;
export type Tokens = typeof tokens;
