"use client";

import LinkButton from "@/app/_components/LinkButton";
import styles from "./FilterModalButton.module.css";
import { useSearch } from "@/app/_contexts/SearchContext";

function FilterModalButton() {
  const { openModal } = useSearch();
  return (
    <LinkButton
      onClick={openModal}
      extraStyles={styles.button}
      color="white"
      buttonType="button"
      variation="button"
    >
      فیلتر
    </LinkButton>
  );
}

export default FilterModalButton;
