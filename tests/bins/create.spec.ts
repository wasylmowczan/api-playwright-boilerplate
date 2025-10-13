import { expect, test } from '@playwright/test';
import { binsSchema } from '../../schemas/bins';

const apiPath = '/v3/b';

test.describe('When creating a new bin', () => {
    // Positive test
    test('then it should create a new bin', async ({ request }) => {
        // Given
        const newBin = {
            sample: 'Hello World'
        };

        // When
        const response = await request.post(apiPath, {
            data: newBin
        });

        // Then
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject(binsSchema());
        // checking that record is the same as the new bin object
        expect(responseBody.record.sample).toBe(newBin.sample);
    });

    // Negative test
    test('then it should return an 400 error if body is empty', async ({ request }) => {
        // Given
        const newBin = {};
        // When
        const response = await request.post(apiPath, {
            data: newBin
        });

        // Then
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.message).toBe('Bin cannot be blank');
    });
});