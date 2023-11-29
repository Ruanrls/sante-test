export type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;

export type Pagination = {
  take?: number;
  skip?: number;
};
