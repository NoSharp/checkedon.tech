import { Prisma, PrismaClient } from ".prisma/client";

const prismaClient = new PrismaClient();

export async function addLocation(
  userId: number,
  niceName: string,
  lat: number,
  lon: number
) {
  return await prismaClient.userLocations.create({
    data: {
      userId: userId,
      latitude: lat,
      longitude: lon,
      niceName: niceName,
    },
  });
}

export async function getLocations(userId: number) {
  return await prismaClient.userLocations.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function setPhoneNumber(userId: number, phoneNumber: string) {
  return await prismaClient.userAlertMethod.create({
    data: {
      method: "sms",
      userId: userId,
      methodMetaData: phoneNumber,
    },
  });
}

export async function deletePhoneNumber(userId: number, phoneNumber: string) {
  return await prismaClient.userAlertMethod.deleteMany({
    where: {
      userId: userId,
      methodMetaData: phoneNumber,
    },
  });
}

export async function getSMSConnections(userId: number) {
  return await prismaClient.userAlertMethod.findMany({
    where: {
      method: "sms",
      userId: userId,
    },
  });
}

export async function addSMSConnection(userId: number, phoneNumber: string) {
  return await prismaClient.userAlertMethod.create({
    data: {
      userId: userId,
      method: "sms",
      methodMetaData: phoneNumber,
    },
  });
}

export async function deleteSMSConnection(userId: number, phoneNumber: string) {
  return await prismaClient.userAlertMethod.deleteMany({
    where: {
      userId: userId,
      method: "sms",
      methodMetaData: phoneNumber,
    },
  });
}

export async function deleteLocation(userid: number, locationId: string) {
  return await prismaClient.userLocations.deleteMany({
    where: {
      niceName: locationId,
      userId: userid,
    },
  });
}

export default {
  create: prismaClient.user.create,
  update: prismaClient.user.update,
  findFirst: prismaClient.user.findFirst,
  deleteLocation: deleteLocation,
  getLocations: getLocations,
  addLocation: addLocation,
};
