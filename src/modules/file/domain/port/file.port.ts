export const FILE_PORT = 'FILE_PORT';

export interface FilePort {
  upload(files: string[], postIdentifier: number): Promise<number | undefined>;
}
