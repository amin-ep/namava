import {
  createTheme,
  FormControlLabel,
  Radio,
  ThemeProvider,
} from "@mui/material";
import localFont from "next/font/local";
import React from "react";
import styles from "./CustomRadio.module.css";

const customFont = localFont({
  src: "../../_fonts/Qs_Iranyekan.ttf",
});

const theme = createTheme({
  typography: {
    fontFamily: customFont.style.fontFamily,
  },
});

type Props = {
  value: string;
  label: string;
  themeColor: "dark" | "light";
  onChange?: (e: React.SyntheticEvent<Element>) => void;
};

function CustomRadio({ label, value, themeColor, onChange }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        {...(onChange && { onChange: onChange })}
        value={value}
        control={
          <Radio
            classes={{
              root: styles[`radio-root-${themeColor}`],
              checked: styles[`radio-checked-${themeColor}`],
              colorPrimary: styles[`radio-color-primary-${themeColor}`],
            }}
            size="small"
          />
        }
        label={label}
        classes={{
          root: styles[`form-control-root-${themeColor}`],
          label: styles[`form-control-label-${themeColor}`],
        }}
      />
    </ThemeProvider>
  );
}

export default CustomRadio;
