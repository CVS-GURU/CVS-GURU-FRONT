import { useQueryClient, useQuery, useMutation } from 'react-query';
import { getItemComment } from 'lib/api/item';
import Comment from 'components/contents/Comment';
type CommentListProps = {
  contentsId: string;
};
type CommentProps = {
  USER_ID: string;
  ITEM_SCORE: number;
  ITEM_COMMENT: string;
  INSERT_DATE: string;
  UPDATE_DATE: string;
};
const CommentList = ({ contentsId }: CommentListProps) => {
  const { isLoading, error, data } = useQuery<any, Error>(
    'get-item-comment',
    () => getItemComment({ contentsId }),
    { staleTime: 10000 }
  );

  console.log('data =', data);
  return (
    <div>
      {data?.CONTENTS?.map((commentInfo: CommentProps) => {
        return <Comment commentInfo={commentInfo} />;
      })}
    </div>
  );
};

export default CommentList;
