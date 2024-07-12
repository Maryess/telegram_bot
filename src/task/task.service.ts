import { Injectable } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  create(status: boolean, name: string) {
    return [{ name: name, complete: status }];
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
