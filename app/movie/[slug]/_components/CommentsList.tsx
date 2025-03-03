import { IComment } from "@/app/_types/commentTypes";
import CommentListItem from "./CommentListItem";

type Props = { comments: IComment[] };

async function CommentsList({ comments }: Props) {
  return (
    <ul className="flex flex-col gap-10 text-xs">
      {comments?.map((comment) => (
        <CommentListItem key={comment._id} comment={comment} />
      ))}
    </ul>
  );
}

export default CommentsList;
