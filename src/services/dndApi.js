const BASE_URL = 'https://www.dnd5eapi.co';

async function getJson(path, errorMessage) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) throw new Error(errorMessage);
  return response.json();
}

export const getMonstersList = async () => {
  const data = await getJson('/api/monsters', 'Error al obtener la lista de monstruos');
  return data.results;
};

export const getMonsterDetail = (index) =>
  getJson(`/api/monsters/${index}`, `Error al obtener detalle de ${index}`);

export const getEquipmentList = async () => {
  const data = await getJson('/api/equipment', 'Error al obtener el equipo');
  return data.results;
};

export const getMagicItemsList = async () => {
  const data = await getJson('/api/magic-items', 'Error al obtener objetos mágicos');
  return data.results;
};

// urlPath viene de la API, por ejemplo: /api/equipment/club
export const getItemDetail = (urlPath) =>
  getJson(urlPath, 'Error al obtener detalle del objeto');