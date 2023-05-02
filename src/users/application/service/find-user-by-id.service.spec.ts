import { Test } from '@nestjs/testing';
import {
  FindUserByExternalIdPort,
  FIND_USER_BY_EXTERNAL_ID_PORT,
} from '../ports/out/find-user-by-external-id.port';
import { FindUserByExternalIdService } from './find-user-by-external-id.service';
import { UserTestFactory } from '../../../../test/factories/user-test.factory';
import { ExternalIdTestFactory } from '../../../../test/factories/external-id-test.factory';

describe('Find User By Id Service', () => {
  let service: FindUserByExternalIdService;
  let findUserByExternalIdPort: FindUserByExternalIdPort;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindUserByExternalIdService,
        {
          provide: FIND_USER_BY_EXTERNAL_ID_PORT,
          useValue: {
            findUserByExternalId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<FindUserByExternalIdService>(
      FindUserByExternalIdService,
    );
    findUserByExternalIdPort = moduleRef.get<FindUserByExternalIdPort>(
      FIND_USER_BY_EXTERNAL_ID_PORT,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(findUserByExternalIdPort).toBeDefined();
  });

  describe('when call findUserById method', () => {
    it('should should return a new user correctly', async () => {
      const externalId = ExternalIdTestFactory.create();
      const foundUser = UserTestFactory.create({ externalId: externalId });
      jest
        .spyOn(findUserByExternalIdPort, 'findUserByExternalId')
        .mockResolvedValue(UserTestFactory.create());

      const result = await service.findUserByExternalId(externalId);
      expect(result).toMatchObject(foundUser);
      expect(
        findUserByExternalIdPort.findUserByExternalId,
      ).toHaveBeenCalledTimes(1);
    });

    it('should throw an expection', () => {
      const externalId = ExternalIdTestFactory.create();
      jest
        .spyOn(findUserByExternalIdPort, 'findUserByExternalId')
        .mockRejectedValueOnce(new Error());
      const result = () => service.findUserByExternalId(externalId);
      expect(result).rejects.toThrowError();
    });
  });
});
