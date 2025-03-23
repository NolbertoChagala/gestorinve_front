import { genericRequestAuthenticated } from "@/util/genericRequest";

//Obtener todo los Roles
export const getRoles = async () => {
    const response = await genericRequestAuthenticated('/roles', 'GET');
    return response.data;
}

//Obtener un Rol por ID
export const getRolById = async (id: number) =>{
  const response = await genericRequestAuthenticated(`/roles/${id}`, 'GET');
  return response.data;
}

//Crear un Rol
export const createRol = async (data: any) => {
    const response = await genericRequestAuthenticated('/roles', 'POST', data);
    return response.data;
}

//Editar un Rol
export const updateRol = async (id: number, data: any) => {
  const response = await genericRequestAuthenticated(`/roles/${id}`, "PUT", data);
  console.log("📩 Respuesta completa de la API:", response);
  if (!response || !response.success) {
      console.error("❌ Error: La API no devolvió datos válidos.");
      return null;
  }
  return { id_rol: id, ...data };
};


//Eliminar un Rol por ID
export const deleteRol = async (id: number) => {
    const response = await genericRequestAuthenticated(`/roles/${id}`, 'DELETE');
    return response.data
}
