import { Injectable } from '@nestjs/common';

@Injectable()
export class QnaService {
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
