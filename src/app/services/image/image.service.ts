import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient, private imageCompress: NgxImageCompressService) { }

  upload(formData: FormData) {
    return this.httpClient.post(`${environment.BASE_URL}/api/image`, formData, {
      responseType: 'text',
    });
  }

  // changePhoto, deletes the previous photo
  // formData should include both image and oldPath
  changePhoto(formData: FormData) {
    return this.httpClient.post(`${environment.BASE_URL}/api/image/changePhoto`, formData, {
      responseType: 'text',
    });
  }

  compressFile() {
    this.imageCompress.uploadFile().then(
      ({ image, orientation }) => {

        // this.imgResultBeforeCompression = image;
        console.log("Size in bytes of the uploaded image was:", this.imageCompress.byteCount(image));

        this.imageCompress
          .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
          .then(
            (compressedImage) => {
              // this.imgResultAfterCompression = compressedImage;
              console.log("Size in bytes after compression is now:", this.imageCompress.byteCount(compressedImage));
            }
          );
      }
    );
  }

  youtube_parser(url: string) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    let video_id = match && match[7].length == 11 ? match[7] : false;
    return `https://img.youtube.com/vi/${video_id}/mqdefault.jpg`;
  }
}
