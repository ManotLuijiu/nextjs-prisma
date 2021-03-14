import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query']})

  try {

  } catch (err) {
    res.status(500);
    res.json({ error: err })
  } finally {
    await prisma.$disconnect();
  }
  
  
res.status(201);
  res.json({sighting: 'saved'})
}