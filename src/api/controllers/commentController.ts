import {Request, Response, NextFunction} from 'express';

const commentPost = async (
  req: Request<{}, {}, {text: string}>,
  res: Response<{response: string}>,
  next: NextFunction
) => {
  try {
    try {
      // TODO: Generate a sarcastic, hostile AI response to a Youtube comment, imitating an 18th-century English aristocrat, and return it as a JSON response.
      // Use the text from the request body to generate the response.
      // Instead of using openai library, use fetchData to make a post request to the server.
      // see https://platform.openai.com/docs/api-reference/chat/create for more information
      // You don't need an API key if you use the URL provided in .env.sample and Metropolia VPN
      // Example: instad of https://api.openai.com/v1/chat/completions use process.env.OPENAI_API_URL + '/v1/chat/completions'
      /* curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
    ]
  }'
  */
      const response = await fetch(
        process.env.OPENAI_API_URL + '/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant.',
              },
              {
                role: 'user',
                content: req.body.text,
              },
            ],
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      res.json({response: result.choices[0].message.content});

    } catch (error) {
    next(error);
  }
} catch (error) {
  next(error);
}}

export {commentPost};
