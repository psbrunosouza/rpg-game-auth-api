import { AuthDTO } from '../dtos/auth.dto';

export interface IAuthRepository {
  authenticate(data: AuthDTO): Promise<AuthDTO>;
}
