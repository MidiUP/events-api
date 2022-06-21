export interface Validator {
  validate: (body: any) => Promise<Error>
}
