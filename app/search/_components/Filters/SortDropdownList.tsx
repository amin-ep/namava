"use client";

import CustomRadio from "@/app/_components/CustomRadio/CustomRadio";
import { SortBy, useSearch } from "@/app/_contexts/SearchContext";
import { createTheme, RadioGroup, ThemeProvider } from "@mui/material";
import localFont from "next/font/local";
import DropDownContainer from "./DropdownContainer";

const customFont = localFont({
  src: "../../../_fonts/Qs_Iranyekan.ttf",
});

type Props = { isOpen: boolean };

const theme = createTheme({
  typography: {
    fontFamily: customFont.style.fontFamily,
  },
});

function SortDropdownList({ isOpen }: Props) {
  const { handleSortBy, filters } = useSearch();

  return (
    <DropDownContainer isOpen={isOpen}>
      <ThemeProvider theme={theme}>
        <RadioGroup
          sx={{
            color: "white",
            fontFamily: customFont.className,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          onChange={(e) => {
            handleSortBy(e.target.value as SortBy);
          }}
          value={filters.sortBy}
        >
          <CustomRadio
            value="none"
            label="پیش فرض(مرتبط ترین)"
            themeColor="light"
          />
          <CustomRadio
            value="imdbRating"
            label="امتیاز IMDB"
            themeColor="light"
          />
          <CustomRadio
            value="newest"
            themeColor="light"
            label="سال ساخت (جدیدترین)"
          />
          <CustomRadio
            value="oldest"
            themeColor="light"
            label="سال ساخت (قدیمی ترین)"
          />
        </RadioGroup>
      </ThemeProvider>
    </DropDownContainer>
  );
}

export default SortDropdownList;
