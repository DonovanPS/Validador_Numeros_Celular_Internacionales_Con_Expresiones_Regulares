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


      if (JSON.parse(regexPatternsJSON)[0][0] === undefined) {
        return {
          isValid: false,
          countryName: null,
        };
      } else {


        const countryName = JSON.parse(regexPatternsJSON)[0][0].CountryName;
        const countrId = JSON.parse(regexPatternsJSON)[0][0].CountryID;
        const regexPatternString = JSON.parse(regexPatternsJSON)[0][0].RegexPattern;
        const regexPattern = new RegExp(regexPatternString);


        const isValid = regexPattern.test(phoneNumber);

        const result = {
          isValid,
          countryName,
          countrId

        };

        return result;
      }
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


  public async create(table: string, data: any){
    let query: string;

    console.log(data);
    

    if (table === 'phonenumber') {
      query = `
      INSERT INTO ${table} (CountryID, PhoneNumber) VALUES ('${data.CountryID}', '${data.PhoneNumber}')
      `;
    } else if (table === 'regexpattern') {
      query = `
      INSERT INTO ${table} (CountryID, RegexPattern) VALUES (${data[0]}, '${data[1]}')
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




}

export default IndexService;