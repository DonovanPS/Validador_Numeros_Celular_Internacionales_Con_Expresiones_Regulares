import pool from "../database";


class IndexService {


  public findRecords() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM registros', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }



  public async findCountryCode(phoneNumber: string) {

    const countryCodeMatch = phoneNumber.match(/^\+(\d{1,3})/);


    if (countryCodeMatch && countryCodeMatch[1]) {
      const countryCode = countryCodeMatch[1];


      // Crear un arreglo para almacenar las promesas de las consultas
      const queryPromises = [];

      // Realizar consultas para longitudes de código de país desde 2 hasta 4 dígitos
      for (let length = 2; length <= 4; length++) {
        const countryCodeSubstring = countryCode.substring(0, length);

        // Consulta SQL para buscar el indicativo en la base de datos
        const query = `SELECT CountryID, CountryName, CountryCode FROM Country WHERE CountryCode = '${countryCodeSubstring}'`;

        // Agregar la promesa de la consulta al arreglo
        queryPromises.push(
          new Promise((resolve, reject) => {
            pool.query(query, (err, result) => {
              if (err) {
                console.error("Error al buscar el indicativo en la base de datos:", err);
                resolve(null); // Resolvemos con null en caso de error
              } else {
                if (result.length > 0) {
                  resolve(result[0]); // Resolvemos con el primer resultado encontrado
                } else {
                  resolve(null); // Resolvemos con null si no se encuentra ningún resultado
                }
              }
            });
          })
        );
      }

      // Usar Promise.all para esperar a que todas las consultas se completen
      const results = await Promise.all(queryPromises);

      // Filtrar resultados para eliminar valores nulos (resultados de consultas fallidas o sin resultados)
      const filteredResults = results.filter((result) => result !== null);
      return filteredResults;
    } else {
      console.log("No se pudo encontrar el código del país en el número de teléfono.");
      return Promise.resolve([]);
    }
  }


  public async getregexPattern(phoneNumber: string) {
    interface CountryInfo {
      CountryID: number;
      CountryName: string;
      CountryCode: string;
    }

    try {
      const regexPatterns = await this.findCountryCode(phoneNumber) as CountryInfo[];


      const promises = regexPatterns.map((obj) => {
        const countryID = obj.CountryID;


        // Retornar una promesa para la consulta SQL
        return new Promise((resolve, reject) => {
          pool.query(`SELECT * FROM regexpattern INNER JOIN Country ON RegexPattern.CountryID = Country.CountryID WHERE Country.CountryID='${countryID}'`, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      });

      // Esperar a que todas las promesas se resuelvan
      const results = await Promise.all(promises);

      return results;
    } catch (error) {
      console.error("Error al obtener el patrón regex:", error);
      throw error;
    }
  }



  public async validatePhoneNumber(phoneNumber: string) {
    try {
      const regexPatterns = await this.getregexPattern(phoneNumber);
      const regexPatternsJSON = JSON.stringify(regexPatterns, null, 2);

      if (!regexPatternsJSON) {
        // No se encontró un patrón regex válido, devuelve un resultado inválido
        return {
          isValid: false,
          countryName: null,
        };
      }

      const countryName = JSON.parse(regexPatternsJSON)[0][0].CountryName;
      const countryId = JSON.parse(regexPatternsJSON)[0][0].CountryID;
      const regexPatternString = JSON.parse(regexPatternsJSON)[0][0].RegexPattern;
      const regexPattern = new RegExp(regexPatternString);

      const isValid = regexPattern.test(phoneNumber);

      const result = {
        isValid,
        countryName,
        countryId,
      };

      return result;
    } catch (error) {
      console.error("Error al validar el número de teléfono:", error);
      throw error;
    }
  }





  public async getAll(table: string) {
    let query: string;

    if (table === 'phonenumber') {
      query = `
      SELECT PhoneNumberID, CountryName, CountryCode, PhoneNumber, RegexPattern FROM ${table}
      INNER JOIN country ON ${table}.CountryID = country.CountryID
      INNER JOIN regexpattern ON regexpattern.CountryID = country.CountryID
      `;
    } else if (table === 'regexpattern') {
      query = `
      SELECT * FROM ${table}
      INNER JOIN country ON ${table}.CountryID = country.CountryID
      `;
    }

    return new Promise((resolve, reject) => {
      pool.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }


  // Función para verificar si un dato existe en una tabla
  public async doesDataExist(table: string, field: string, value: string) {
    const query = `SELECT COUNT(*) AS count FROM ${table} WHERE ${field} = ?`;

    return new Promise((resolve, reject) => {
      pool.query(query, [value], (err, result) => {
        if (err) {
          reject(err);
        } else {
          const count = result[0].count;
          resolve(count > 0);
        }
      });
    });
  }


  public async create(table: string, data: any) {
    let query: string;


    try {

      const exists = await this.doesDataExist(table, 'PhoneNumber', data.PhoneNumber);

      console.log(exists);

      if (exists) {

        return {
          success: false,
          message: 'El número de teléfono ya existe en la base de datos',
        };

      }

      if (table === 'phonenumber') {
        query = `
      INSERT INTO ${table} (CountryID, PhoneNumber) VALUES ('${data.CountryID}', '${data.PhoneNumber}')
      `;
      } else if (table === 'regexpattern') {
        query = `
      INSERT INTO ${table} (CountryID, RegexPattern) VALUES (${data[0]}, '${data[1]}')
      `;
      }


      // Continuar con la inserción si el dato no existe
      const result = await new Promise((resolve, reject) => {
        pool.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });

      return {
        success: true,
        message: 'Dato insertado correctamente',
        result,
      };


    } catch (error) {
      throw error;
    }
  }



  public async deletePhoneNumberByNumber(phoneNumber: string) {
    try {
      // Verificar si el número de teléfono existe en la tabla 'phonenumber'
      const phoneNumberExists = await this.doesDataExist('phonenumber', 'PhoneNumber', phoneNumber);
  
      if (!phoneNumberExists) {
        return {
          success: false,
          message: 'El número de teléfono no existe en la base de datos',
        };
      }
  
      // Query SQL para eliminar el número de teléfono por su valor
      const deleteQuery = `DELETE FROM phonenumber WHERE PhoneNumber = ?`;
  
      // Ejecutar la consulta SQL para eliminar el número de teléfono
      const result: any = await new Promise((resolve, reject) => {
        pool.query(deleteQuery, [phoneNumber], (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
  
      if (result.affectedRows > 0) {
        return {
          success: true,
          message: 'Número de teléfono eliminado correctamente',
        };
      } else {
        return {
          success: false,
          message: 'No se pudo eliminar el número de teléfono',
        };
      }
    } catch (error) {
      throw error;
    }
  }
  

}

export default IndexService;