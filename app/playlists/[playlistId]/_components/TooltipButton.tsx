"use client";

import {
  createTheme,
  ThemeProvider,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import localFont from "next/font/local";
import styles from "./TooltipButton.module.css";
import Image from "next/image";

type Props = {
  onClick: () => void;
  tooltipTitle: string;
  img: { src: string; alt: string };
};

const customFont = localFont({
  src: "../../../_fonts/Qs_Iranyekan.ttf",
});

const theme = createTheme({
  typography: {
    fontFamily: customFont.style.fontFamily,
  },
});

function TooltipButton({ onClick, tooltipTitle, img }: Props) {
  const matches = useMediaQuery("(min-width:768px)");

  return (
    <ThemeProvider theme={theme}>
      <Tooltip
        title={tooltipTitle}
        classes={{
          tooltip: styles.tooltip,
          arrow: styles["tooltip-arrow"],
        }}
        arrow
        disableHoverListener={!matches}
      >
        <button onClick={onClick} className="flex items-center justify-center">
          <Image
            src={img.src}
            alt={img.alt}
            width={32}
            height={32}
            className="aspect-square w-8 xl:w-10"
          />
        </button>
      </Tooltip>
    </ThemeProvider>
  );
}

export default TooltipButton;
