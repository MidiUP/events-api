
export const throwErrorFunction = async (): Promise<Error> => {
  return new Promise((resolve, reject) => reject(new Error()))
}
