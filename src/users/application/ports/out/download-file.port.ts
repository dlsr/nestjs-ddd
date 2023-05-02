export const DOWNLOAD_FILE_PORT = 'DOWNLOAD_FILE_PORT';
export interface DownloadFilePort {
  download(url: string): Promise<string>;
}
