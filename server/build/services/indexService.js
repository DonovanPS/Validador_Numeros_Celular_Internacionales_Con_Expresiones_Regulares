"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class IndexService {
    findRecords() {
        return new Promise((resolve, reject) => {
            database_1.default.query('SELECT * FROM registros', (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    findCountryCode(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const countryCodeMatch = phoneNumber.match(/^\+(\d{4})/);
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
                    queryPromises.push(new Promise((resolve, reject) => {
                        database_1.default.query(query, (err, result) => {
                            if (err) {
                                console.error("Error al buscar el indicativo en la base de datos:", err);
                                resolve(null); // Resolvemos con null en caso de error
                            }
                            else {
                                if (result.length > 0) {
                                    resolve(result[0]); // Resolvemos con el primer resultado encontrado
                                }
                                else {
                                    resolve(null); // Resolvemos con null si no se encuentra ningún resultado
                                }
                            }
                        });
                    }));
                }
                // Usar Promise.all para esperar a que todas las consultas se completen
                const results = yield Promise.all(queryPromises);
                // Filtrar resultados para eliminar valores nulos (resultados de consultas fallidas o sin resultados)
                const filteredResults = results.filter((result) => result !== null);
                return filteredResults;
            }
            else {
                console.log("No se pudo encontrar el código del país en el número de teléfono.");
                return Promise.resolve([]);
            }
        });
    }
    getregexPattern(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const regexPatterns = yield this.findCountryCode(phoneNumber);
                const promises = regexPatterns.map((obj) => {
                    const countryID = obj.CountryID;
                    // Retornar una promesa para la consulta SQL
                    return new Promise((resolve, reject) => {
                        database_1.default.query(`SELECT * FROM regexpattern INNER JOIN Country ON RegexPattern.CountryID = Country.CountryID WHERE Country.CountryID='${countryID}'`, (err, result) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    });
                });
                // Esperar a que todas las promesas se resuelvan
                const results = yield Promise.all(promises);
                return results;
            }
            catch (error) {
                console.error("Error al obtener el patrón regex:", error);
                throw error;
            }
        });
    }
    validatePhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const regexPatterns = yield this.getregexPattern(phoneNumber);
                const regexPatternsJSON = JSON.stringify(regexPatterns, null, 2);
                if (JSON.parse(regexPatternsJSON)[0][0] === undefined) {
                    return {
                        isValid: false,
                        countryName: null,
                    };
                }
                else {
                    const countryName = JSON.parse(regexPatternsJSON)[0][0].CountryName;
                    const regexPatternString = JSON.parse(regexPatternsJSON)[0][0].RegexPattern;
                    const regexPattern = new RegExp(regexPatternString);
                    const isValid = regexPattern.test(phoneNumber);
                    const result = {
                        isValid,
                        countryName,
                    };
                    return result;
                }
            }
            catch (error) {
                console.error("Error al validar el número de teléfono:", error);
                throw error;
            }
        });
    }
}
exports.default = IndexService;
