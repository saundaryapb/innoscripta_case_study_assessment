import { Issue } from '../types';

export const mockFetchIssues = (): Promise<Issue[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         import('../data/issues.json').then((module) => resolve(module.default as Issue[]));
      }, 500);
   });
};

interface MockApiOptions<T> {
   response: T;
   delay?: number;
   shouldFail?: boolean;
   errorMessage?: string;
}

export const mockApiCall = <T>(options: MockApiOptions<T>): Promise<T> => {
   const { response, delay = 1000, shouldFail = false, errorMessage = 'Mock API Error' } = options;

   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (shouldFail) {
            reject(new Error(errorMessage));
         } else {
            resolve(response);
         }
      }, delay);
   });
};
