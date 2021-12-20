import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { CreateSuperUserRequest } from '../../types/CreateSuperUserRequest';
import { CreateSuperUserResponse } from '../../types/CreateSuperUserResponse';
import { ReadSuperusersRequest } from '../../types/ReadSuperUsersRequest';
import { ReadSuperUsersResponse } from '../../types/ReadSuperUsersResponse';
import { UpdateSuperUserSalaryRequest } from '../../types/UpdateSuperUserSalaryRequest';

@Injectable({
  providedIn: 'root'
})
export class SuperUserService {

  constructor(
    private http: HttpClient
  ) { }

  create(request: CreateSuperUserRequest): Observable<CreateSuperUserResponse> {
    return this.http.post<CreateSuperUserResponse>(`backend/api/super-users`, request);
  }

  read(page: number, size: number, params: ReadSuperusersRequest): Observable<PaginatedResponse<ReadSuperUsersResponse>> {
    return this.http.get<PaginatedResponse<ReadSuperUsersResponse>>(`backend/api/super-users`, {
      params: {
        ...params,
        page: page,
        size: size,
        sort: 'id,asc'
      }
    })
  }

  updateSalary(id: number, request: UpdateSuperUserSalaryRequest): Observable<void> {
    return this.http.put<void>(`backend/api/super-users/${id}/salary`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`backend/api/super-users/${id}`);
  }
}
