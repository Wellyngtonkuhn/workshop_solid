// abstração (Os módulos de alto nível dependem desta abstração/interface) isso é o D do SOLID
export interface UserRepository {
  findByEmail(email: string): Promise<any>
  createUser(body: any): Promise<any>
}