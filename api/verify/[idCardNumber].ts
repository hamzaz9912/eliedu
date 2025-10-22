import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { idCardNumber } = req.query;

    if (!idCardNumber || typeof idCardNumber !== 'string') {
      return res.status(400).json({ error: 'ID card number is required' });
    }

    // Since all data is handled in the frontend, return 404 for all API requests
    return res.status(404).json({ error: 'Student record not found' });
  } catch (error) {
    console.error('Error verifying student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
