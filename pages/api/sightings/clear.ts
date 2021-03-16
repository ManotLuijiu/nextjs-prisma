import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query'] });

  try {
    await prisma.sighting.deleteMany({});

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: `${err} และ ไม่สามารถลบข้อมูลได้` });
  } finally {
    await prisma.$disconnect();
  }
}
