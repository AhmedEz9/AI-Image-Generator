import { Request, Response, NextFunction } from 'express';
import fetchData from '../../lib/fetchData';

type OpenAIImageResponse = {
  data: { url: string }[];
};

const commentPost = async (
  req: Request<{}, {}, { text: string; style: string }>,
  res: Response<{ response: string }>,
  next: NextFunction
) => {
  try {
    const prompt = `Respond to the following comment in a ${req.body.style} style: "${req.body.text}"`;
    const response = await fetchData<{ choices: { message: { content: string } }[] }>(
      process.env.OPENAI_API_URL + '/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: `You are responding as a YouTube commenter.` },
            { role: 'user', content: prompt },
          ],
        }),
      }
    );

    const aiResponse = response.choices[0]?.message?.content || "No response generated";
    res.json({ response: aiResponse });
  } catch (error) {
    next(error);
  }
};

const generateThumbnail = async (
  req: Request<{}, {}, { prompt: string }>,
  res: Response<{ url: string }>,
  next: NextFunction
) => {
  try {
    const response = await fetchData<OpenAIImageResponse>(
      process.env.OPENAI_API_URL + '/v1/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 
        },
        body: JSON.stringify({
          prompt: req.body.prompt,
          n: 1,
          size: '1024x1024',
        }),
      }
    );

    const imageUrl = response.data[0]?.url || 'No image generated';
    res.json({ url: imageUrl });
  } catch (error) {
    next(error);
  }
};

export { commentPost, generateThumbnail };
