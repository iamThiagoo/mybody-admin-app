import type { TQueryPagination } from "./@types";
import api from "./config/axios";

export const getPagination = async (params: TQueryPagination) => {
  const response = await api.get("/avaliacoes-fisicas/pagination", { params });
  return response.data;
};

export const getById = async (id: number) => {
  const response = await api.get(`/avaliacoes-fisicas/${id}`);
  return response.data;
};

export const create = async (data: any) => {
  const response = await api.post("/avaliacoes-fisicas", data);
  return response.data;
}

export const update = async (id: number, data: any) => {
  const response = await api.patch(`/avaliacoes-fisicas/${id}`, data);
  return response.data;
}

export const remove = async (id: number) => {
  const response = await api.delete(`/avaliacoes-fisicas/${id}`);
  return response.data;
}