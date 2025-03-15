import PageContainer from "@/app/_components/PageContainer";
import { IActor } from "@/app/_types/actorTypes";
import { getActorById } from "@/app/api/actorApi";
import { Params } from "next/dist/server/request/params";
import ActorBiographySection from "./_components/ActorBiographySection";
import MovieArraysWrapper from "@/app/_components/MovieArraysWrapper/MovieArraysWrapper";
import { Suspense } from "react";
import ActorBiographySectionSkeleton from "./_components/ActorBiographySectionSkeleton";

export async function generateMetadata({ params }: { params: Params }) {
  const actorId = (await params).actorId;
  const actor = await getActorById(actorId as string);

  return {
    title: `بیوگرافی ${(actor as IActor).name} | نماوا تماشای آنلاین فیلم و سریال`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const actorId = (await params).actorId;
  const actor = await getActorById(actorId as string);

  return (
    <PageContainer topPadding>
      <Suspense fallback={<ActorBiographySectionSkeleton />}>
        <ActorBiographySection actorId={actorId as string} />
      </Suspense>
      <div className="px-6 xsm:px-4 md:px-8 xl:px-11">
        <h3 className="align-middle font-bold text-white">
          فیلم های {(actor as IActor).name}
        </h3>
      </div>
      <MovieArraysWrapper movies={(actor as IActor).movies} deletable={false} />
    </PageContainer>
  );
}
