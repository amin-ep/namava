import { cookies } from "next/headers";
import CommentForm from "./CommentForm";
import CommentUnauthorizedSection from "./CommentUnauthorizedSection";
import CommentsList from "./CommentsList";
import { getMovieComments } from "@/app/api/commentApi";
import { IComment } from "@/app/_types/commentTypes";

type Props = { movieId: string };

async function Comments({ movieId }: Props) {
  const authToken = await (
    await cookies()
  ).get(process.env.JWT_SECRET_KEY as string)?.value;
  const commentsData = await getMovieComments(movieId);
  const comments = commentsData as IComment[];

  return (
    <div className="bg-gray-900 px-5 py-8 xsm:px-6 md:px-8 md:py-10 xl:mx-auto xl:max-w-[1000px] xl:rounded-xl">
      <div className="mb-4 text-center md:mb-8 xl:mb-12">
        <span className="text-base font-bold xl:text-lg">نظرات کاربران</span>
      </div>
      <div className="flex flex-col gap-8 md:gap-12 xl:gap-14">
        <div>
          {authToken ? (
            <CommentForm movieId={movieId} />
          ) : (
            <CommentUnauthorizedSection />
          )}
        </div>
        <CommentsList comments={comments} />
      </div>
    </div>
  );
}

export default Comments;
