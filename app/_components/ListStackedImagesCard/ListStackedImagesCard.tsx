import cls from "classnames";
import Image from "next/image";
import { IPlaylist } from "../../_types/playlistTypes";
import { FILE_BASE_URL } from "../../_utils/constants";
import styles from "./ListStackedImagesCard.module.css";
import EmptyItem from "./EmptyItem";

type Props = { playlist: IPlaylist; extraStyles?: string };

function ListStackedImagesCard({ playlist, extraStyles }: Props) {
  return (
    <div className={cls("relative w-full", extraStyles)}>
      {playlist?.movies
        .slice(0, 5)
        .map((movie, index) => (
          <Image
            key={movie._id}
            src={`${FILE_BASE_URL}/${movie.posterUrl}`}
            alt={movie.englishName}
            width={114}
            height={168}
            className={cls(
              styles.item,
              styles[`item-${index + 1}`],
              "object-cover",
            )}
            unoptimized
          />
        ))}
      <EmptyItem filledCardsLength={playlist.movies.length} />
    </div>
  );
}

export default ListStackedImagesCard;
