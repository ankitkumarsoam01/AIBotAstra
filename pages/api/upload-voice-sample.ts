import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs/promises';
import fetch from 'node-fetch';

export const config = {
  api: {
    bodyParser: false,
  },
};

const backendUrl = 'http://localhost:8000/upload-voice-sample/';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB limit
  });

  try {
    // Convert form.parse to Promise
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileData = await fs.readFile(file.filepath);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: fileData,
      headers: {
        'Content-Type': 'audio/webm',
        'Accept': 'application/json',
      },
    });

    // Clean up temporary file
    await fs.unlink(file.filepath).catch(console.error);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      return res.status(response.status).json({ 
        error: 'Backend error',
        details: errorText
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Failed to upload voice sample',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
