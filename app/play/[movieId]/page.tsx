import { Params } from "next/dist/server/request/params";
import Video from "./_components/Video";
import { getMovieById } from "@/app/api/movieApi";
import { IMovie } from "@/app/_types/movieTypes";
import { VideoProvider } from "@/app/_contexts/VideoContext";

export const metadata = {
  title: "نماوا پلیر",
};

async function Page({ params }: { params: Params }) {
  const id = (await params).movieId;
  const movie = await getMovieById(id as string);
  return (
    <VideoProvider>
      <Video movie={movie as IMovie} />
    </VideoProvider>
  );
}

export default Page;
