import { Injectable } from '@nestjs/common';
import { CreateQnaDto } from './dto/create-qna.dto';

@Injectable()
export class QnaService {
  create(createQnaDto: CreateQnaDto) {
    return 'This action adds a new qna';
  }

  findAll() {
    return `This action returns all qna`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qna`;
  }

  // update(id: number, updateQnaDto: UpdateQnaDto) {
  //   return `This action updates a #${id} qna`;
  // }

  remove(id: number) {
    return `This action removes a #${id} qna`;
  }
}
