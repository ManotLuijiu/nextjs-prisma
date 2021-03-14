import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query'] });

  try {
    const { sighting: sightingData } = req.body;
    const sighting = await prisma.sighting.create({
      data: {
        latitude: sightingData.latitude,
        longitude: sightingData.longitude,
      },
    });

    res.status(201);
    res.json({ sighting });
  } catch (err) {
    res.status(500).json({ error: `${err} และ ไม่สามารถบันทึกข้อมูล กรุณาตรวจสอบข้อมูลอีกครั้ง` });
    // res.json({ error: `${err} and "Sorry unable to save sighting to database"` });
  } finally {
    await prisma.$disconnect();
  }
}
