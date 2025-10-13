// Helper type to extract actual types from Playwright matchers
export type ExtractType<T> = T extends { asymmetricMatch: (value: infer U) => boolean } ? U : T;

// Helper type to transform schema object to actual data types
export type SchemaToData<T> = {
  [K in keyof T]: ExtractType<T[K]>;
};
