import { Prisma, PrismaClient } from ".prisma/client";

const prismaClient = new PrismaClient();

export async function addLocation(userId: number, niceName: string, lat: number, lon: number) {
  return await prismaClient.userLocations.create({
    data: {
      userId: userId,
      latitude: lat,
      longitude: lon,
      niceName: niceName
    }
  })
}

export async function getLocations(userId: number) {
  return await prismaClient.userLocations.findMany({
    where: {
      userId: userId
    }
  });
}

export async function deleteLocation(userid: number, locationId: string) {
  return await prismaClient.userLocations.deleteMany({
    where: {
      niceName: locationId,
      userId: userid
    }
  });
}

export default {
  create: prismaClient.user.create,
  update: prismaClient.user.update,
  findFirst: prismaClient.user.findFirst,
  deleteLocation: deleteLocation,
  getLocations: getLocations,
  addLocation: addLocation
};
