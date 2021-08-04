import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}

  upload(formData: FormData) {
    return this.httpClient.post(`${environment.BASE_URL}/image`, formData, {
      responseType: 'text',
    });
  }

  youtube_parser(url: string) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    let video_id = match && match[7].length == 11 ? match[7] : false;
    return `https://img.youtube.com/vi/${video_id}/mqdefault.jpg`;
  }
}
