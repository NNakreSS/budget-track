import { vars } from "nativewind";

export const themes = {
  light: vars({
    "--primary": "76 250 49",
    "--primary-foreground": "250 250 250",

    "--secondary": "245 245 245",
    "--secondary-foreground": "23 23 23",

    "--muted": "245 245 245",
    "--muted-foreground": "115 115 115",

    "--accent": "245 245 245",
    "--accent-foreground": "23 23 23",

    "--destructive": "220 38 38",
    "--destructive-foreground": "250 250 250",

    "--background": "255 255 255",
    "--foreground": "10 10 10",

    "--card": "255 255 255",
    "--card-foreground": "10 10 10",

    "--border": "230 230 230",
    "--input": "230 230 230",
    "--ring": "10 10 10",
  }),

  dark: vars({
    "--primary": "76 250 49",
    "--primary-foreground": "23 23 23",

    "--secondary": "38 38 38",
    "--secondary-foreground": "250 250 250",

    "--muted": "38 38 38",
    "--muted-foreground": "163 163 163",

    "--accent": "38 38 38",
    "--accent-foreground": "250 250 250",

    "--destructive": "127 29 29",
    "--destructive-foreground": "250 250 250",

    "--background": "10 10 10",
    "--foreground": "250 250 250",

    "--card": "10 10 10",
    "--card-foreground": "250 250 250",

    "--input": "38 38 38",
    "--border": "38 38 38",
    "--ring": "212 212 212",
  }),
};
