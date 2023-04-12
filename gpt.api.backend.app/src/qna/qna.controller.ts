import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QnaService } from './qna.service';


@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Get()
  findAll() {
    return this.qnaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qnaService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQnaDto: UpdateQnaDto) {
  //   return this.qnaService.update(+id, updateQnaDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qnaService.remove(+id);
  }
}
