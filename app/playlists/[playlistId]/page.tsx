import PageContainer from "@/app/_components/PageContainer";
import { Params } from "next/dist/server/request/params";
import SinglePlaylistHeading from "./_components/SinglePlaylistHeading";
import { getPlaylistById } from "@/app/api/playlistApi";
import { IPlaylist } from "@/app/_types/playlistTypes";

async function Page({ params }: { params: Params }) {
  const id = await params.playlistId;
  const playlistData = await getPlaylistById(id as string);
  const playlist = playlistData as IPlaylist;
  return (
    <PageContainer extraStyles="px-5 xsm:px-6 md:px-8 xl:px-11">
      <SinglePlaylistHeading
        length={playlist.movies.length}
        title={playlist.title}
        playlistId={playlist._id}
      />
    </PageContainer>
  );
}

export default Page;
