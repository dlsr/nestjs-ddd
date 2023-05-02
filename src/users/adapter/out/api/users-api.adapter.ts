import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { FindUserByExternalIdPort } from '../../../application/ports/out/find-user-by-external-id.port';
import { DownloadFilePort } from '../../../application/ports/out/download-file.port';
import Email from '../../../domain/email';
import ExternalId from '../../../domain/external-id';
import User from '../../../domain/user';

const REGRES_BASE_URL = 'https://reqres.in/api/';

@Injectable()
export class UsersApiAdapter
  implements FindUserByExternalIdPort, DownloadFilePort
{
  public constructor(private readonly httpService: HttpService) {}

  public async findUserByExternalId(externalId: ExternalId): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(`${REGRES_BASE_URL}users/${externalId.id}`)
        .pipe(
          catchError((error: any) => {
            console.log('An error happened!');
            throw error;
          }),
        ),
    );

    const result = data.data;
    return new User(
      new Email(result.email),
      null,
      new ExternalId(result.id),
      result.first_name,
      result.last_name,
      result.avatar,
    );
  }

  public async download(url: string): Promise<string> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ArrayBuffer>(url, {
          responseType: 'arraybuffer',
        })
        .pipe(
          catchError((error: any) => {
            console.log('An error happened!');
            throw error;
          }),
        ),
    );
    return Buffer.from(data).toString('base64');
  }
}
