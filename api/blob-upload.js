// /api/blob-upload — issues a client-upload token for Vercel Blob.
// The browser uploads the PDF directly to Blob storage (so large newspaper
// files are not limited by the serverless request body size). This route only
// authorizes the upload and never receives the file bytes itself.
import { handleUpload } from '@vercel/blob/client';
import { ADMIN_TOKEN, applyCors } from './_lib/config.js';

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const jsonResponse = await handleUpload({
      request: req,
      body: req.body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Authorize: the admin token must match.
        let token = '';
        try {
          token = JSON.parse(clientPayload || '{}').token || '';
        } catch {
          token = '';
        }
        if (token !== ADMIN_TOKEN) {
          throw new Error('Unauthorized: admin token mismatch');
        }
        return {
          allowedContentTypes: ['application/pdf'],
          maximumSizeInBytes: 50 * 1024 * 1024, // 50 MB
        };
      },
      // Required by handleUpload; nothing extra to do on completion.
      onUploadCompleted: async () => {},
    });

    return res.status(200).json(jsonResponse);
  } catch (err) {
    console.error('/api/blob-upload failed:', err);
    return res.status(400).json({ error: err.message });
  }
}
