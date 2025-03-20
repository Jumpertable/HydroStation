import { PartialType } from '@nestjs/mapped-types';
import { CreateInvAlertDto } from './create-inv-alert.dto';

export class UpdateInvAlertDto extends PartialType(CreateInvAlertDto) {}
