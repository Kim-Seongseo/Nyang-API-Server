import * as bcrypt from 'bcryptjs';

export function encryptToHash(prevPlainText: string): Promise<string> {
  const BCRYPT_ROUNDS = 10;
  const nextHash = bcrypt.hash(prevPlainText, BCRYPT_ROUNDS);
  return nextHash;
}
