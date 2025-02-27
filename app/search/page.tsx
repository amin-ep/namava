import { SearchProvider } from "../_contexts/SearchContext";
import FilterModal from "./_components/FilterModal";
import FilterModalButton from "./_components/FilterModalButton/FilterModalButton";
import MovieWrapper from "./_components/MovieWrapper/MovieWrapper";
import Search from "./_components/Search";
import Sidebar from "./_components/Filters/Filters";
import styles from "./styles.module.css";

export const metadata = {
  title: "جستجو",
};

function page() {
  return (
    <SearchProvider>
      <div className={styles.layout}>
        <aside className={styles.aside}>
          <Sidebar />
        </aside>
        <div className={styles.content}>
          <div className={styles["content-header"]}>
            <FilterModalButton />
            <FilterModal />
            <Search />
          </div>
          <MovieWrapper />
        </div>
      </div>
    </SearchProvider>
  );
}

export default page;
