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
const indexService_1 = __importDefault(require("../server/src/services/indexService")); // Ajusta la ruta según tu estructura de directorios
const database_1 = __importDefault(require("../server/src/database"));
// Mock pool.query para simular las consultas a la base de datos
jest.mock('../server/src/database', () => ({
    query: jest.fn(),
}));
describe('indexService', () => {
    let indexService;
    beforeEach(() => {
        indexService = new indexService_1.default();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('findCountryCode', () => {
        it('should return an array of results for the phone number "+57 3125051822"', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mockear pool.query para simular consultas exitosas con resultados
            database_1.default.query.mockImplementationOnce((query, callback) => {
                callback(null, [{ CountryID: 91, CountryName: 'Colombia', CountryCode: '57' }]);
            }).mockImplementationOnce((query, callback) => {
                callback(null, [{ CountryID: 2, CountryName: 'AnotherCountry', CountryCode: '57' }]);
            });
            const phoneNumber = '+57 3125051822';
            const results = yield indexService.findCountryCode(phoneNumber);
            expect(results).toEqual([
                { CountryID: 91, CountryName: 'Colombia', CountryCode: '57' },
                { CountryID: 2, CountryName: 'AnotherCountry', CountryCode: '57' },
            ]);
        }));
        it('should handle the case where no country code is found for the phone number', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mockear pool.query para simular una consulta exitosa sin resultados
            database_1.default.query.mockImplementationOnce((query, callback) => {
                callback(null, []);
            });
            const phoneNumber = 'invalidPhoneNumber';
            const results = yield indexService.findCountryCode(phoneNumber);
            expect(results).toEqual([]);
        }));
    });
    describe('getregexPattern', () => {
        it('should resolve with regex patterns for the phone number "57 3125051822"', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mockear pool.query para simular consultas exitosas con resultados
            database_1.default.query.mockImplementationOnce((query, callback) => {
                callback(null, [{ CountryID: 1, RegexPattern: '\\d+' }]);
            });
            const phoneNumber = '57 3125051822';
            const results = yield indexService.getregexPattern(phoneNumber);
            expect(results).toEqual([{ CountryID: 1, RegexPattern: '\\d+' }]);
        }));
    });
    describe('validatePhoneNumber', () => {
        it('should validate the phone number "57 3125051822"', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mockear pool.query según sea necesario para simular consultas exitosas y obtener patrones regex para la validación
            const regexPatternsJSON = '[[{"CountryID": 91, "RegexPattern": "^\+57\s?3\d{2}\s?\d{3}\s?\d{4}$"}]]';
            const phoneNumber = '57 3125051822';
            const result = yield indexService.validatePhoneNumber(phoneNumber);
            expect(result.isValid).toBe(true);
            expect(result.countryName).toBe('Colombia');
            // Realiza una comprobación antes de acceder a la propiedad countryId
            if ('countryId' in result) {
                expect(result.countryId).toBe(91);
            }
            else {
                // Maneja el caso en el que countryId no está presente
                fail('countryId is not defined');
            }
        }));
        it('should handle the case of an invalid phone number', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mockear pool.query según sea necesario para simular consultas exitosas o fallidas
            const phoneNumber = 'invalidPhoneNumber';
            const result = yield indexService.validatePhoneNumber(phoneNumber);
            expect(result.isValid).toBe(false);
            expect(result.countryName).toBe(null);
            // Realiza una comprobación antes de acceder a la propiedad countryId
            if ('countryId' in result) {
                expect(result.countryId).toBe(91);
            }
            else {
                // Maneja el caso en el que countryId no está presente
                fail('countryId is not defined');
            }
        }));
    });
});
