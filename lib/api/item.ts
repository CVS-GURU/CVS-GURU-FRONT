import axios from '.';
import { UserTypeRes, SingUpAPIParams } from 'types/user';
import { encryptPassword } from 'lib/helpers';

type WriteItemCommentParams = {
  item_id: string;
  item_score: string;
  item_comment: string;
};
/* comment */
export const writeItemComment = (body: WriteItemCommentParams) => {
  return axios.put('/api/item/write-item-comment', body);
};

type GetItemCommnetParams = {
  contentsId: string;
};
export const getItemComment = async (body: GetItemCommnetParams) => {
  const { data } = await axios.get(
    `/api/item/get-item-comment?item_id=${body.contentsId}`
  );
  return data.data;
};
