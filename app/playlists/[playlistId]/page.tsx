import PageContainer from "@/app/_components/PageContainer";
import { Params } from "next/dist/server/request/params";
import SinglePlaylistHeading from "./_components/SinglePlaylistHeading";
import { getPlaylistById } from "@/app/api/playlistApi";
import { IPlaylist } from "@/app/_types/playlistTypes";
import { SinglePlaylistProvider } from "@/app/_contexts/SinglePlaylistContext";
import MovieWrapper from "./_components/MovieWrapper";
import EmptyPlaylist from "./_components/EmptyPlaylist";

export const metadata = {
  title: "لیست ها",
};

async function Page({ params }: { params: Params }) {
  const { playlistId } = await params;
  const playlistData = await getPlaylistById(playlistId as string);
  const playlist = playlistData as IPlaylist;
  return (
    <SinglePlaylistProvider>
      <PageContainer extraStyles="px-5 xsm:px-6 md:px-8 xl:px-11">
        <SinglePlaylistHeading
          length={playlist.movies.length}
          title={playlist.title}
          playlist={playlist}
        />
      </PageContainer>
      {playlist.movies.length > 0 ? (
        <MovieWrapper movies={playlist.movies} />
      ) : (
        <EmptyPlaylist />
      )}
    </SinglePlaylistProvider>
  );
}

export default Page;
