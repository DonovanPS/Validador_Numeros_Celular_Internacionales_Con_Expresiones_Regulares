import axios from 'axios';
import { environment } from '../environment/environment';

// Definir la URL del backend
const API_BASE_URL = environment.apiUrl;

export async function validatePhoneNumber(phone: string): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/validatePhoneNumber`, {
      headers: {
        phone: phone,
      },
    });

    // La respuesta del servidor se encuentra en response.data
    return response.data;
  } catch (error: any) { // Especifica el tipo como 'any' o el tipo específico que esperas
    // Manejo de errores, por ejemplo, lanzar una excepción o devolver un objeto de error personalizado
    throw new Error('Error al realizar la solicitud GET: ' + error.message);
  }
}
