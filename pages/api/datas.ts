import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  try {
    /* test data */
    const response = {
      data: {
        cardList: [
          {
            number: 1,
            title: 'number 1',
          },
          {
            number: 2,
            title: 'number 2',
          },
          {
            number: 3,
            title: 'number 3',
          },
          {
            number: 4,
            title: 'number 4',
          },
          {
            number: 5,
            title: 'number 5',
          },
        ],
      },
    };
    res.status(200).json(response.data);
  } catch ({ response: { status, data } }) {
    res.status(status).json(data);
  }
};
