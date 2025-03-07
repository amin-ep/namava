import styles from "./ListStackedImagesCard.module.css";
import cls from "classnames";
import Image from "next/image";

type Props = { filledCardsLength: number };

function EmptyItem({ filledCardsLength }: Props) {
  const emptyCardsLength: number = 4 - filledCardsLength;

  return (
    <>
      {Array(emptyCardsLength)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className={cls(
              "bg-gray-700",
              styles[`item-${index + 1 + filledCardsLength}`],
              styles.item,
              "flex items-center justify-center",
            )}
          >
            {index === 0 && filledCardsLength === 0 && (
              <Image
                src="/icons/empty-playlist-icon.svg"
                alt="empty-playlist"
                width={48}
                height={48}
                className="aspect-square w-12 md:w-20"
              />
            )}
          </div>
        ))}
    </>
  );
}

export default EmptyItem;
