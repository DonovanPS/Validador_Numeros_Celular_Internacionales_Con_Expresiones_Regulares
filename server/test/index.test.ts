import IndexService from '../src/services/indexService';

describe('IndexService', () => {
    const indexService = new IndexService();

    it('should return a valid result for a valid phone number', async () => {
        const phoneNumber = '+573144391482';
        const result = await indexService.validatePhoneNumber(phoneNumber);


        expect(result.isValid).toBe(true);


        const typedResult = result as {
            isValid: boolean;
            countryName: string | null;
            countryId: string | null;
        };


        if (typedResult.countryName && typedResult.countryId) {
            expect(typedResult.countryName).toBe('Colombia');
            expect(typedResult.countryId).toBe(91);
        }
    });



    it('should return a valid result for a phone number with a valid callsign', async () => {
        const phoneNumber = '+57314';
        const result = await indexService.validatePhoneNumber(phoneNumber);


        expect(result.isValid).toBe(false);


        const typedResult = result as {
            isValid: boolean;
            countryName: string | null;
            countryId: string | null;
        };


        if (typedResult.countryName && typedResult.countryId) {
            expect(typedResult.countryName).toBe('Colombia');
            expect(typedResult.countryId).toBe(91);
        }
    });




    it('should return all records from the specified table', async () => {
        const tableName = 'phonenumber';

        const records = await indexService.getAll(tableName);

        // Asegurarse de que records no sea null o indefinido
        expect(records).toBeDefined();


        expect(Array.isArray(records)).toBe(true);

    });


    it('should return all records from the specified table', async () => {
        const tableName = 'regexpattern';

        const records = await indexService.getAll(tableName);

        // Asegurarse de que records no sea null o indefinido
        expect(records).toBeDefined();


        expect(Array.isArray(records)).toBe(true);

    });


    it('should create a new record in the specified table', async () => {
        const tableName = 'phonenumber';
        const testData = {
            CountryID: 1,
            PhoneNumber: '+1234567890',
        };

        const result = await indexService.create(tableName, testData);

        // Asegurarse de que result no sea null o indefinido
        expect(result).toBeDefined();

        expect(result.success).toBe(true);
        expect(result.message).toBe('Dato insertado correctamente');

    });



    it('should not create a new record in the specified table with existing data', async () => {
        const tableName = 'phonenumber';
        const testData = {
            CountryID: 1,
            PhoneNumber: '+1234567890',
        };

        const result = await indexService.create(tableName, testData);

        // Asegurarse de que result no sea null o indefinido
        expect(result).toBeDefined();

        expect(result.success).toBe(false);
        expect(result.message).toBe('El número de teléfono ya existe en la base de datos');

    });




    it('should delete a phone number by number', async () => {
        const phoneNumberToDelete = '+1234567890';
        const deleteResult = await indexService.deletePhoneNumberByNumber(phoneNumberToDelete);

        // Verifica que se haya eliminado correctamente
        expect(deleteResult.success).toBe(true);
        expect(deleteResult.message).toBe('Número de teléfono eliminado correctamente');
    });


    it('should return an error if the phone number does not exist', async () => {
        const phoneNumberToDelete = '987654321';
        const deleteResult = await indexService.deletePhoneNumberByNumber(phoneNumberToDelete);

        // Verifica que se haya retornado un error
        expect(deleteResult.success).toBe(false);
        expect(deleteResult.message).toBe('El número de teléfono no existe en la base de datos');
    });

    /* it('should return an invalid result for an invalid phone number', async () => {
       const phoneNumber = 'invalidPhoneNumber'; // Proporciona un número de teléfono no válido para la prueba
       const result = await indexService.validatePhoneNumber(phoneNumber);
       expect(result.isValid).toBe(false);
      
     });*/


});
