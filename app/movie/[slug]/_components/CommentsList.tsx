import { IComment } from "@/app/_types/commentTypes";
import { getMovieComments } from "@/app/api/commentApi";
import CommentListItem from "./CommentListItem";

type Props = { movieId: string };

async function CommentsList({ movieId }: Props) {
  const commentsData = await getMovieComments(movieId);
  const comments = commentsData as IComment[];

  return (
    <ul className="flex flex-col gap-10 text-xs">
      {comments.map((comment) => (
        <CommentListItem key={comment._id} comment={comment} />
      ))}
    </ul>
  );
}

export default CommentsList;
