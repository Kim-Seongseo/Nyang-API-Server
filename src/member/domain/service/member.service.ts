import { Injectable } from '@nestjs/common';
export type Member = any;

@Injectable()
export class MemberService {
  private readonly members = [
    {
      identifier: 1,
      id: 'john',
      password: 'changeme',
    },
    {
      identifier: 2,
      id: 'maria',
      password: 'guess',
    },
  ];

  async findOne(id: string): Promise<Member | undefined> {
    return this.members.find((member) => member.id === id);
  }
}
