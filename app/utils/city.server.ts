import { prisma } from "./prisma.server";
import { json } from "@remix-run/node";
import { CityData } from "~/types/definedType";

export const addCity = async ({ city, postedBy, userId }: CityData) => {
  const userLength = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      city: true,
    },
  });

  if (userLength.city.length === 5) {
    return { exception: true, msg: "Cannot able to add cities more than five" };
  }
  const cityById = await prisma.city.create({
    data: { city, postedBy },
  });

  return json({
    message: "City added successful",
    success: true,
    payload: cityById,
  });
};

export const getAllCitiesByUser = async (userId: string) => {
  const userWithCities = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      city: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return userWithCities;
};

export const deleteCity = async (id: string | null) => {
  const cityById = await prisma.city.delete({
    where: {
      id,
    },
  });
  if (!cityById) {
    return json({ error: "could not able to delete" });
  }
  return json({
    success: true,
    message: `${cityById.city} city is delted`,
    payload: id,
  });
};
