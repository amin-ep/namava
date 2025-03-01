import {
  createTheme,
  ThemeProvider,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import styles from "./TooltipIconButton.module.css";
import localFont from "next/font/local";

const customFont = localFont({
  src: "../../_fonts/Qs_Iranyekan.ttf",
});

type Props = {
  children: React.ReactNode;
  tooltipTitle: string;
  disabled?: boolean;
  onClick: () => void;
};

const theme = createTheme({
  typography: {
    fontFamily: customFont.style.fontFamily,
  },
});

function TooltipIconButton({
  children,
  tooltipTitle,
  disabled,
  onClick,
}: Props) {
  const matches = useMediaQuery("(min-width:768px)");
  return (
    <div className="flex flex-col items-center gap-1">
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
          <button
            {...(disabled && { disabled: disabled })}
            className="flex aspect-square w-[42px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.2)] text-xl font-extrabold text-white hover:bg-primary-default"
            onClick={onClick}
          >
            {children}
          </button>
        </Tooltip>
      </ThemeProvider>
      <span className="block text-xs text-gray-400 md:hidden">
        {tooltipTitle}
      </span>
    </div>
  );
}

export default TooltipIconButton;
