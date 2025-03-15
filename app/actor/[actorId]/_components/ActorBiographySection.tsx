import { IActor } from "@/app/_types/actorTypes";
import { FILE_BASE_URL } from "@/app/_utils/constants";
import Image from "next/image";
import styles from "./ActorBiographySection.module.css";
import { getActorById } from "@/app/api/actorApi";

type Props = { actorId: string };

async function ActorBiographySection({ actorId }: Props) {
  const actor = await getActorById(actorId);
  return (
    <div className={styles.container}>
      <div className={styles["image-wrapper"]}>
        <Image
          src={`${FILE_BASE_URL}/${(actor as IActor).imageUrl}`}
          alt={(actor as IActor).name}
          width={150}
          height={150}
          className={styles.image}
        />
      </div>
      <div className={styles["text-container"]}>
        <h2 className={styles.heading}>بیوگرافی {(actor as IActor).name}</h2>
        <p className={styles.text}>{(actor as IActor).biography}</p>
      </div>
    </div>
  );
}

export default ActorBiographySection;
