import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query'] });
  try {
    const sightings = await prisma.sighting.findMany();
    res.status(200).json({ sightings });
  } catch (err) {
    res.status(500).json({ error: `${err} และ ไม่สามารถเข้าถึงข้อมูลในขณะนี้` });
  } finally {
    await prisma.$disconnect();
  }
}
