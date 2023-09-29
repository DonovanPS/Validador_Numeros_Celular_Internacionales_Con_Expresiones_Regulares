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
const indexService_1 = __importDefault(require("../src/services/indexService"));
describe('IndexService', () => {
    const indexService = new indexService_1.default();
    it('should return a valid result for a valid phone number', () => __awaiter(void 0, void 0, void 0, function* () {
        const phoneNumber = '+573144391482';
        const result = yield indexService.validatePhoneNumber(phoneNumber);
        expect(result.isValid).toBe(true);
        const typedResult = result;
        if (typedResult.countryName && typedResult.countryId) {
            expect(typedResult.countryName).toBe('Colombia');
            expect(typedResult.countryId).toBe(91);
        }
    }));
    it('should return a valid result for a phone number with a valid callsign', () => __awaiter(void 0, void 0, void 0, function* () {
        const phoneNumber = '+57314';
        const result = yield indexService.validatePhoneNumber(phoneNumber);
        expect(result.isValid).toBe(false);
        const typedResult = result;
        if (typedResult.countryName && typedResult.countryId) {
            expect(typedResult.countryName).toBe('Colombia');
            expect(typedResult.countryId).toBe(91);
        }
    }));
    it('should return all records from the specified table', () => __awaiter(void 0, void 0, void 0, function* () {
        const tableName = 'phonenumber';
        const records = yield indexService.getAll(tableName);
        // Asegurarse de que records no sea null o indefinido
        expect(records).toBeDefined();
        expect(Array.isArray(records)).toBe(true);
    }));
    it('should return all records from the specified table', () => __awaiter(void 0, void 0, void 0, function* () {
        const tableName = 'regexpattern';
        const records = yield indexService.getAll(tableName);
        // Asegurarse de que records no sea null o indefinido
        expect(records).toBeDefined();
        expect(Array.isArray(records)).toBe(true);
    }));
    it('should create a new record in the specified table', () => __awaiter(void 0, void 0, void 0, function* () {
        const tableName = 'phonenumber';
        const testData = {
            CountryID: 1,
            PhoneNumber: '+1234567890',
        };
        const result = yield indexService.create(tableName, testData);
        // Asegurarse de que result no sea null o indefinido
        expect(result).toBeDefined();
        expect(result.success).toBe(true);
        expect(result.message).toBe('Dato insertado correctamente');
    }));
    it('should not create a new record in the specified table with existing data', () => __awaiter(void 0, void 0, void 0, function* () {
        const tableName = 'phonenumber';
        const testData = {
            CountryID: 1,
            PhoneNumber: '+1234567890',
        };
        const result = yield indexService.create(tableName, testData);
        // Asegurarse de que result no sea null o indefinido
        expect(result).toBeDefined();
        expect(result.success).toBe(false);
        expect(result.message).toBe('El número de teléfono ya existe en la base de datos');
    }));
    it('should delete a phone number by number', () => __awaiter(void 0, void 0, void 0, function* () {
        const phoneNumberToDelete = '+1234567890';
        const deleteResult = yield indexService.deletePhoneNumberByNumber(phoneNumberToDelete);
        // Verifica que se haya eliminado correctamente
        expect(deleteResult.success).toBe(true);
        expect(deleteResult.message).toBe('Número de teléfono eliminado correctamente');
    }));
    it('should return an error if the phone number does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const phoneNumberToDelete = '987654321';
        const deleteResult = yield indexService.deletePhoneNumberByNumber(phoneNumberToDelete);
        // Verifica que se haya retornado un error
        expect(deleteResult.success).toBe(false);
        expect(deleteResult.message).toBe('El número de teléfono no existe en la base de datos');
    }));
    /* it('should return an invalid result for an invalid phone number', async () => {
       const phoneNumber = 'invalidPhoneNumber'; // Proporciona un número de teléfono no válido para la prueba
       const result = await indexService.validatePhoneNumber(phoneNumber);
       expect(result.isValid).toBe(false);
      
     });*/
});
