import ListStackedImagesCard from "@/app/_components/ListStackedImagesCard/ListStackedImagesCard";
import { getCurrentUserList } from "@/app/api/playlistApi";
import Link from "next/link";
import PlaylistItemBottom from "./PlaylistItemBottom";
import { IPlaylist } from "@/app/_types/playlistTypes";
import React from "react";

async function Playlists() {
  const playlists = await getCurrentUserList();

  return (
    <div className="flex flex-wrap justify-start">
      {(playlists as IPlaylist[])?.map((pl) => (
        <div
          key={pl._id}
          className="w-full px-1.5 xsm:mb-12 xsm:w-1/2 md:mb-16 xl:w-1/3 xl:px-3"
        >
          <Link href={`/playlists/${pl._id}`} className="w-full">
            <div className="mb-10">
              <ListStackedImagesCard extraStyles="pb-[60%]" playlist={pl} />
            </div>
          </Link>
          <PlaylistItemBottom playlist={pl} />
        </div>
      ))}
    </div>
  );
}

export default Playlists;
