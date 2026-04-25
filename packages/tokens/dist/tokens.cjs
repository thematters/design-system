// Auto-generated. Do not edit. Run `node packages/tokens/build.mjs`.
const tokens = {
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "$metadata": {
    "source": "Figma: Design System 1.5 (fileKey JDKpHezhllOvJF42xbKcNN)",
    "version": "v2",
    "extractedAt": "2026-04-24",
    "extractedVia": "Figma MCP get_variable_defs (11 frames)",
    "notes": [
      "DS 1.5 ships TWO color palettes: legacy (Matters Green) + New Palette (Matters 2.0 purple/lime direction).",
      "DS 1.5 ships TWO font families for two contexts: System/* = PingFang TC (UI), Article/* = Noto Serif TC title + PingFang TC body (reading).",
      "Product code should migrate legacy → New Palette gradually (PM decision 2026-04-24).",
      "Spacing scale is 8-point grid with 2-unit fine-grain (sp2, sp4, sp6, sp10, sp14).",
      "ar17-* line-height variants skipped — appear to be computed article body line heights at 17px base; derive rather than tokenize.",
      "PM decision 2026-04-24 (post 2.0 Colors extraction): brand primary = New Palette purple/lime per Brand Guidelines PDF. The 'Matters 2.0 Colors' Figma file (wzoAKeR1Aa5PFx7zXdyLIT) is a semantic/state cleanup of the legacy green palette only — it does NOT supersede brand direction. color.brand.new.* remains canonical; color.brand.legacy.* retained for gradual migration.",
      "PM decision 2026-04-24: 七日書 (Freewrite) landing uses color.freewrite.* as its theme palette (not purple/lime). These tokens are copied verbatim from Matters 2.0 Colors."
    ]
  },
  "color": {
    "brand": {
      "legacy": {
        "green": {
          "value": "#0D6763",
          "description": "Matters Green (legacy primary)"
        },
        "greenHover": {
          "value": "#0A524F"
        },
        "greenPress": {
          "value": "#074643"
        },
        "greenLighter": {
          "value": "#F2FAF7"
        },
        "gold": {
          "value": "#C0A46B",
          "description": "Matters Gold (legacy secondary)"
        },
        "goldHover": {
          "value": "#AB8840"
        },
        "goldPress": {
          "value": "#8A6B2C"
        },
        "yellowLighter": {
          "value": "#FAF7F0"
        }
      },
      "new": {
        "purple": {
          "value": "#7258FF",
          "description": "Matters 2.0 primary (New Palette/Logo/Purple)"
        },
        "green": {
          "value": "#C3F432",
          "description": "Matters 2.0 secondary (New Palette/Logo/Green)"
        }
      }
    },
    "primary": {
      "0": {
        "value": "#F5F3FF"
      },
      "100": {
        "value": "#EAE7FF"
      },
      "200": {
        "value": "#DFDAFF"
      },
      "300": {
        "value": "#D5CFFE"
      },
      "400": {
        "value": "#B9AEF4"
      },
      "500": {
        "value": "#9280F5"
      },
      "600": {
        "value": "#735BF3"
      },
      "700": {
        "value": "#5A43E5"
      },
      "800": {
        "value": "#4B0AD6"
      },
      "900": {
        "value": "#32009B"
      },
      "$description": "New Palette/Primary scale (Matters 2.0 purple)"
    },
    "secondary": {
      "0": {
        "value": "#F2FBD9"
      },
      "100": {
        "value": "#E8F8B7"
      },
      "200": {
        "value": "#DAF48E"
      },
      "300": {
        "value": "#C8EB62"
      },
      "400": {
        "value": "#ACE725"
      },
      "500": {
        "value": "#82DA0F"
      },
      "600": {
        "value": "#47CA05"
      },
      "700": {
        "value": "#379F03"
      },
      "800": {
        "value": "#2D8700"
      },
      "900": {
        "value": "#246802"
      },
      "$description": "New Palette/Secondary scale (Matters 2.0 lime)"
    },
    "info": {
      "0": {
        "value": "#EDF9FF"
      },
      "100": {
        "value": "#DCF3FE"
      },
      "200": {
        "value": "#CAEEFF"
      },
      "300": {
        "value": "#B0E6FF"
      },
      "400": {
        "value": "#85D8FF"
      },
      "500": {
        "value": "#30BEFF"
      },
      "600": {
        "value": "#05AAF6"
      },
      "700": {
        "value": "#028CCC"
      },
      "800": {
        "value": "#006FA3"
      },
      "900": {
        "value": "#015379"
      }
    },
    "attention": {
      "0": {
        "value": "#FFFCE1"
      },
      "100": {
        "value": "#FFF8BC"
      },
      "200": {
        "value": "#FFF27E"
      },
      "300": {
        "value": "#FFEC40"
      },
      "400": {
        "value": "#FCE200"
      },
      "500": {
        "value": "#EED601"
      },
      "600": {
        "value": "#DDC700"
      },
      "700": {
        "value": "#CAB600"
      },
      "800": {
        "value": "#B19F00"
      },
      "900": {
        "value": "#908200"
      }
    },
    "grey": {
      "black": {
        "value": "#333333"
      },
      "greyDarker": {
        "value": "#808080"
      },
      "greyDark": {
        "value": "#999C9D"
      },
      "grey": {
        "value": "#B3B3B3"
      },
      "greyLight": {
        "value": "#DDDDDD"
      },
      "greyHover": {
        "value": "#EDEDED"
      },
      "greyLighter": {
        "value": "#F7F7F7"
      },
      "white": {
        "value": "#FFFFFF"
      },
      "noir": {
        "value": "#000000"
      }
    },
    "function": {
      "positive": {
        "value": "#5C9969"
      },
      "warn": {
        "value": "#DBA34F"
      },
      "negative": {
        "value": "#C85C41"
      },
      "negativeDark": {
        "value": "#A04A34"
      },
      "heart": {
        "value": "#E95656"
      },
      "topUp": {
        "value": "#FFF4DC"
      },
      "topUpDarker": {
        "value": "#FFE9B8"
      },
      "insufficient": {
        "value": "#FFE8E8"
      }
    },
    "freewrite": {
      "background": {
        "value": "#F0F9FE"
      },
      "text": {
        "value": "#1999D0"
      },
      "textDark": {
        "value": "#045898"
      },
      "label": {
        "value": "#83BAD1"
      }
    },
    "decorative": {
      "$description": "Legacy tag / decorative swatches for articles & tag chips.",
      "brown": {
        "value": "#C58463"
      },
      "orange": {
        "value": "#F19B50"
      },
      "yellow": {
        "value": "#E0B402"
      },
      "green": {
        "value": "#70B388"
      },
      "purple": {
        "value": "#A578D1"
      },
      "pink": {
        "value": "#D577AA"
      },
      "red": {
        "value": "#DC7871"
      }
    },
    "external": {
      "likeCoin": {
        "value": "#40BFA5"
      }
    }
  },
  "typography": {
    "fontFamily": {
      "ui": {
        "value": "PingFang TC",
        "description": "UI / System text — headings, body, labels"
      },
      "reading": {
        "value": "Noto Serif TC",
        "description": "Article title + summary only"
      }
    },
    "system": {
      "$description": "UI-wide type scale. PingFang TC. Format: {fontSize}/{lineHeight}.",
      "money": {
        "semibold": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "36px",
          "lineHeight": "48px",
          "letterSpacing": "0"
        },
        "medium": {
          "fontFamily": "PingFang TC",
          "fontWeight": 500,
          "fontSize": "36px",
          "lineHeight": "48px",
          "letterSpacing": "0"
        },
        "regular": {
          "fontFamily": "PingFang TC",
          "fontWeight": 400,
          "fontSize": "36px",
          "lineHeight": "48px",
          "letterSpacing": "0"
        }
      },
      "h1": {
        "semibold": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "24px",
          "lineHeight": "36px",
          "letterSpacing": "0"
        },
        "medium": {
          "fontFamily": "PingFang TC",
          "fontWeight": 500,
          "fontSize": "24px",
          "lineHeight": "36px",
          "letterSpacing": "0"
        },
        "regular": {
          "fontFamily": "PingFang TC",
          "fontWeight": 400,
          "fontSize": "24px",
          "lineHeight": "36px",
          "letterSpacing": "0"
        }
      },
      "h2": {
        "semibold": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "20px",
          "lineHeight": "30px",
          "letterSpacing": "0"
        },
        "medium": {
          "fontFamily": "PingFang TC",
          "fontWeight": 500,
          "fontSize": "20px",
          "lineHeight": "30px",
          "letterSpacing": "0"
        },
        "regular": {
          "fontFamily": "PingFang TC",
          "fontWeight": 400,
          "fontSize": "20px",
          "lineHeight": "30px",
          "letterSpacing": "0"
        }
      },
      "h3": {
        "semibold": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "18px",
          "lineHeight": "28px",
          "letterSpacing": "0"
        },
        "medium": {
          "fontFamily": "PingFang TC",
          "fontWeight": 500,
          "fontSize": "18px",
          "lineHeight": "28px",
          "letterSpacing": "0"
        },
        "regular": {
          "fontFamily": "PingFang TC",
          "fontWeight": 400,
          "fontSize": "18px",
          "lineHeight": "28px",
          "letterSpacing": "0"
        }
      },
      "body1": {
        "semibold": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "16px",
          "lineHeight": "24px",
          "letterSpacing": "0"
        },
        "medium": {
          "fontFamily": "PingFang TC",
          "fontWeight": 500,
          "fontSize": "16px",
          "lineHeight": "24px",
          "letterSpacing": "0"
        },
        "regular": {
          "fontFamily": "PingFang TC",
          "fontWeight": 400,
          "fontSize": "16px",
          "lineHeight": "24px",
          "letterSpacing": "0"
        }
      },
      "body2": {
        "semibold": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "14px",
          "lineHeight": "22px",
          "letterSpacing": "0"
        },
        "medium": {
          "fontFamily": "PingFang TC",
          "fontWeight": 500,
          "fontSize": "14px",
          "lineHeight": "22px",
          "letterSpacing": "0"
        },
        "regular": {
          "fontFamily": "PingFang TC",
          "fontWeight": 400,
          "fontSize": "14px",
          "lineHeight": "22px",
          "letterSpacing": "0"
        }
      },
      "small": {
        "semibold": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "12px",
          "lineHeight": "18px",
          "letterSpacing": "0"
        },
        "medium": {
          "fontFamily": "PingFang TC",
          "fontWeight": 500,
          "fontSize": "12px",
          "lineHeight": "18px",
          "letterSpacing": "0"
        },
        "regular": {
          "fontFamily": "PingFang TC",
          "fontWeight": 400,
          "fontSize": "12px",
          "lineHeight": "18px",
          "letterSpacing": "0"
        }
      }
    },
    "article": {
      "$description": "Article reading context. Title/summary use Noto Serif TC; body/header/comment use PingFang TC. Responsive desktop/mobile variants where applicable.",
      "title": {
        "desktop": {
          "fontFamily": "Noto Serif TC",
          "fontWeight": 600,
          "fontSize": "32px",
          "lineHeight": "54px",
          "letterSpacing": "1.2"
        },
        "mobile": {
          "fontFamily": "Noto Serif TC",
          "fontWeight": 600,
          "fontSize": "24px",
          "lineHeight": "36px",
          "letterSpacing": "1.2"
        }
      },
      "summary": {
        "desktop": {
          "fontFamily": "Noto Serif TC",
          "fontWeight": 400,
          "fontSize": "20px",
          "lineHeight": "35px",
          "letterSpacing": "0"
        },
        "mobile": {
          "fontFamily": "Noto Serif TC",
          "fontWeight": 400,
          "fontSize": "18px",
          "lineHeight": "30px",
          "letterSpacing": "0"
        }
      },
      "header": {
        "desktopH2": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "28px",
          "lineHeight": "1.7",
          "letterSpacing": "0"
        },
        "mobileH2": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "21px",
          "lineHeight": "1.7",
          "letterSpacing": "0"
        },
        "desktopH3": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "22px",
          "lineHeight": "1.7",
          "letterSpacing": "0"
        },
        "mobileH3": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "19px",
          "lineHeight": "1.7",
          "letterSpacing": "0"
        }
      },
      "body": {
        "semibold": {
          "fontFamily": "PingFang TC",
          "fontWeight": 600,
          "fontSize": "17px",
          "lineHeight": "1.75",
          "letterSpacing": "0"
        },
        "medium": {
          "fontFamily": "PingFang TC",
          "fontWeight": 500,
          "fontSize": "17px",
          "lineHeight": "1.75",
          "letterSpacing": "0"
        },
        "regular": {
          "fontFamily": "PingFang TC",
          "fontWeight": 400,
          "fontSize": "17px",
          "lineHeight": "1.75",
          "letterSpacing": "0"
        }
      },
      "comment": {
        "medium": {
          "fontFamily": "PingFang TC",
          "fontWeight": 500,
          "fontSize": "15px",
          "lineHeight": "1.75",
          "letterSpacing": "0"
        },
        "regular": {
          "fontFamily": "PingFang TC",
          "fontWeight": 400,
          "fontSize": "15px",
          "lineHeight": "1.75",
          "letterSpacing": "0"
        }
      }
    }
  },
  "spacing": {
    "$description": "8-point grid with 2-unit fine-grain. Use sp{n} where n = px value.",
    "sp0": {
      "value": "0px"
    },
    "sp2": {
      "value": "2px"
    },
    "sp4": {
      "value": "4px"
    },
    "sp6": {
      "value": "6px"
    },
    "sp8": {
      "value": "8px"
    },
    "sp10": {
      "value": "10px"
    },
    "sp12": {
      "value": "12px"
    },
    "sp14": {
      "value": "14px"
    },
    "sp16": {
      "value": "16px"
    },
    "sp32": {
      "value": "32px"
    }
  },
  "effect": {
    "$description": "Drop shadows + blur effects from DS 1.5.",
    "shadow1": {
      "value": "0 4px 8px 0 rgba(0,0,0,0.08)",
      "description": "Generic soft shadow"
    },
    "drawer": {
      "value": "-8px 0 56px 0 rgba(0,0,0,0.08)",
      "extras": "backdrop-filter: blur(24px)"
    },
    "dropdown": {
      "value": "0 4px 16px 0 rgba(0,0,0,0.12)"
    },
    "dropdownNew": {
      "value": "0 12px 24px 0 rgba(0,0,0,0.12), 0 2px 12px 0 rgba(0,0,0,0.06)"
    },
    "actionBar": {
      "value": "0 2px 4px 0 rgba(0,0,0,0.14), 0 -2px 12px 0 rgba(0,0,0,0.05)",
      "extras": "backdrop-filter: blur(24px)"
    },
    "collection": {
      "value": "inset 0 2px 2px 0 rgba(255,255,255,0.5), inset 0 -2px 4px 0 rgba(0,0,0,0.18), 0 1px 2px 0 rgba(37,19,10,0.11), 0 2px 4px 0 rgba(55,35,35,0.05), 0 4px 8px 0 rgba(55,55,55,0.03), 0 8px 16px 0 rgba(55,55,55,0.03)",
      "description": "Complex collection card shadow"
    }
  }
};
const colorByPath = {
  "color.brand.legacy.green": "#0D6763",
  "color.brand.legacy.greenHover": "#0A524F",
  "color.brand.legacy.greenPress": "#074643",
  "color.brand.legacy.greenLighter": "#F2FAF7",
  "color.brand.legacy.gold": "#C0A46B",
  "color.brand.legacy.goldHover": "#AB8840",
  "color.brand.legacy.goldPress": "#8A6B2C",
  "color.brand.legacy.yellowLighter": "#FAF7F0",
  "color.brand.new.purple": "#7258FF",
  "color.brand.new.green": "#C3F432",
  "color.primary.0": "#F5F3FF",
  "color.primary.100": "#EAE7FF",
  "color.primary.200": "#DFDAFF",
  "color.primary.300": "#D5CFFE",
  "color.primary.400": "#B9AEF4",
  "color.primary.500": "#9280F5",
  "color.primary.600": "#735BF3",
  "color.primary.700": "#5A43E5",
  "color.primary.800": "#4B0AD6",
  "color.primary.900": "#32009B",
  "color.secondary.0": "#F2FBD9",
  "color.secondary.100": "#E8F8B7",
  "color.secondary.200": "#DAF48E",
  "color.secondary.300": "#C8EB62",
  "color.secondary.400": "#ACE725",
  "color.secondary.500": "#82DA0F",
  "color.secondary.600": "#47CA05",
  "color.secondary.700": "#379F03",
  "color.secondary.800": "#2D8700",
  "color.secondary.900": "#246802",
  "color.info.0": "#EDF9FF",
  "color.info.100": "#DCF3FE",
  "color.info.200": "#CAEEFF",
  "color.info.300": "#B0E6FF",
  "color.info.400": "#85D8FF",
  "color.info.500": "#30BEFF",
  "color.info.600": "#05AAF6",
  "color.info.700": "#028CCC",
  "color.info.800": "#006FA3",
  "color.info.900": "#015379",
  "color.attention.0": "#FFFCE1",
  "color.attention.100": "#FFF8BC",
  "color.attention.200": "#FFF27E",
  "color.attention.300": "#FFEC40",
  "color.attention.400": "#FCE200",
  "color.attention.500": "#EED601",
  "color.attention.600": "#DDC700",
  "color.attention.700": "#CAB600",
  "color.attention.800": "#B19F00",
  "color.attention.900": "#908200",
  "color.grey.black": "#333333",
  "color.grey.greyDarker": "#808080",
  "color.grey.greyDark": "#999C9D",
  "color.grey.grey": "#B3B3B3",
  "color.grey.greyLight": "#DDDDDD",
  "color.grey.greyHover": "#EDEDED",
  "color.grey.greyLighter": "#F7F7F7",
  "color.grey.white": "#FFFFFF",
  "color.grey.noir": "#000000",
  "color.function.positive": "#5C9969",
  "color.function.warn": "#DBA34F",
  "color.function.negative": "#C85C41",
  "color.function.negativeDark": "#A04A34",
  "color.function.heart": "#E95656",
  "color.function.topUp": "#FFF4DC",
  "color.function.topUpDarker": "#FFE9B8",
  "color.function.insufficient": "#FFE8E8",
  "color.freewrite.background": "#F0F9FE",
  "color.freewrite.text": "#1999D0",
  "color.freewrite.textDark": "#045898",
  "color.freewrite.label": "#83BAD1",
  "color.decorative.brown": "#C58463",
  "color.decorative.orange": "#F19B50",
  "color.decorative.yellow": "#E0B402",
  "color.decorative.green": "#70B388",
  "color.decorative.purple": "#A578D1",
  "color.decorative.pink": "#D577AA",
  "color.decorative.red": "#DC7871",
  "color.external.likeCoin": "#40BFA5",
};
module.exports = { tokens, colorByPath };
module.exports.tokens = tokens;
module.exports.colorByPath = colorByPath;
