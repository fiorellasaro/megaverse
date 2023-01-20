import axios from "axios";
import rateLimit from "axios-rate-limit";
import {
  SoloonsData,
  PolyanetsData,
  ComethsData,
} from "../interfaces/Megaverse";

const megaverseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_MEGAVERSE_API_URL}/api`,
});

const http = rateLimit(megaverseApi, {
  maxRequests: 1,
  perMilliseconds: 1000,
  maxRPS: 1,
});

export const addPolyanets = async (polyanetsData: PolyanetsData) => {
  http.getMaxRPS();

  try {
    const { data } = await megaverseApi.post("/polyanets", polyanetsData);
    return data;
  } catch (error) {
    return error;
  }
};

export const deletePolyanets = async (polyanetsData: PolyanetsData) => {
  const { data } = await megaverseApi.delete("/polyanets", {
    data: polyanetsData,
  });
  return data;
};

export const soloons = async (soloonsData: SoloonsData) => {
  http.getMaxRPS();
  const { data } = await megaverseApi.post("/soloons", soloonsData);

  return data;
};

export const comeths = async (comethsData: ComethsData) => {
  http.getMaxRPS();
  const { data } = await megaverseApi.post("/comeths", comethsData);

  return data;
};

export const map = async () => {
  const { data } = await megaverseApi.get(
    `/map/${process.env.NEXT_PUBLIC_CANDIDATE_ID}/goal`
  );
  return data;
};
