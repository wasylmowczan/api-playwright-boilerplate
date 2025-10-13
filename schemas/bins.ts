import { expect } from '@playwright/test';

const createBinSchema = () => ({
    record: expect.any(Object),
    metadata: {
        id: expect.any(String),
        createdAt: expect.any(String),
        private: expect.any(Boolean)
    }
});

// Export schema
export const binsSchema = createBinSchema;

// Export type
export type BinType = ReturnType<typeof binsSchema>;