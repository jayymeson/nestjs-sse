/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Sse, MessageEvent, Res } from '@nestjs/common';
import { Response } from 'express';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, '..', 'index.html')).toString());
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: JSON.stringify({ hello: 'Hello world' }) })),
    );
  }
}
