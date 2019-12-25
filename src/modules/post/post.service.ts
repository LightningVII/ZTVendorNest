import { Injectable, HttpService } from '@nestjs/common';
import { Post } from './post.entity';
import { map } from 'rxjs/operators';
import { ObjectID } from 'mongodb';

@Injectable()
export class PostService {
  constructor(private readonly httpService: HttpService) {}
  async test(data) {
    const entity = new Post();
    entity.ref = new ObjectID('5dd33f8aa1225e379eeb1016');
    entity.kind = data.kind;
    entity.field = data.field;
    return {
      ...entity,
      _id: new ObjectID(),
    };
  }

  async checkAuthorization(token) {
    const headersRequest = {
      Authorization: token,
    };
    const { id } =
      (await this.httpService
        .get('http://localhost:1337/users/me', {
          headers: headersRequest,
        })
        .pipe(map(res => res.data))
        .toPromise()
        .catch(e => e.data)) || {};
    return id;
  }
}
