import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const valueAsNumber = parseInt(value, 10);
    if (isNaN(valueAsNumber)) {
      throw new BadRequestException('Value is not a number - custom pipe');
    }
    return valueAsNumber;
  }
}
