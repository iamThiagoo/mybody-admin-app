import type { TQueryPagination } from "./@types";
import api from "./config/axios";

export const getPagination = async (params: TQueryPagination) => {
  const response = await api.get("/instrutores/pagination", { params });
  return response.data;
};

export const getById = async (id: number) => {
  const response = await api.get(`/instrutores/${id}`);
  return response.data;
};

export const create = async (data: any) => {
  const response = await api.post("/instrutores", data);
  return response.data;
}

export const update = async (id: number, data: any) => {
  const response = await api.patch(`/instrutores/${id}`, data);
  return response.data;
}

export const remove = async (id: number) => {
  const response = await api.delete(`/instrutores/${id}`);
  return response.data;
}