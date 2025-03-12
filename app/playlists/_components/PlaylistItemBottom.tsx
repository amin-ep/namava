import { IPlaylist } from "@/app/_types/playlistTypes";
import PlaylistItemBottomButton from "./PlaylistItemBottomButton";

type Props = { playlist: IPlaylist };

function PlaylistItemBottom({ playlist }: Props) {
  return (
    <div className="relative mt-2 flex w-full items-center justify-between md:mt-3">
      <div className="flex items-center justify-start text-right align-middle text-xs font-normal leading-5 md:text-sm md:leading-6">
        <span className="text-white">{playlist.title}</span>
        <span className="mr-[5px] text-gray-400">
          ({playlist.movies.length})
        </span>
      </div>
      <PlaylistItemBottomButton playlist={playlist} />
    </div>
  );
}

export default PlaylistItemBottom;
