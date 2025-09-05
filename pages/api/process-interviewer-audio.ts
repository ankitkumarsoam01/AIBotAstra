import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import fetch from 'node-fetch';

export const config = {
  api: {
    bodyParser: false,
  },
};

const backendUrl = 'http://localhost:8000/process-interviewer-audio/';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form data' });
      return;
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    try {
      const fileData = fs.readFileSync(file.filepath);
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: fileData,
        headers: {
          'Content-Type': 'audio/webm',
        },
      });

      if (!response.ok) {
        res.status(response.status).json({ error: 'Backend error' });
        return;
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process interviewer audio on backend' });
    }
  });
}
