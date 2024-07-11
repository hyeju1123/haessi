interface Theme {
  [key: string]: {
    background: string;
    tagBg: string;
    hoverTagBg: string;
    codeBg: string;
    text: string;
    textEmph: string;
  };
}

export const theme: Theme = {
  light: {
    background: "#FFFFFF",
    tagBg: "#E4F0FB",
    hoverTagBg: "#d3e7f8",
    codeBg: "#212121",
    text: "#486084",
    textEmph: "#F8F1AE",
  },
  dark: {
    background: "#22303d",
    tagBg: "#485b7c",
    hoverTagBg: "#394863",
    codeBg: "#24272f",
    text: "#ecd9d8",
    textEmph: "#3c3a36",
  },
};
