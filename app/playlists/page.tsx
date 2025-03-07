import PageContainer from "../_components/PageContainer";
import Playlists from "./_components/Playlists";
import PlaylistHeading from "./_components/PlaylistHeading";

export const metadata = {
  title: "لیست ها",
};

function Page() {
  return (
    <PageContainer extraStyles="px-5 xsm:px-6 md:px-8 xl:px-11">
      <PlaylistHeading />
      <Playlists />
    </PageContainer>
  );
}

export default Page;
