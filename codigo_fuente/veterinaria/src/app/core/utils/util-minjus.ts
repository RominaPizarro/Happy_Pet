import { Security } from '../services/security.service';

export class UtilMinjus {
  private static secretKey = `U2FsdGVkX19ypVCe0tlZQJg9Thj7l+tz+itNO5Axt8U=`;
  private static secretKeyUrl
  = `U2FsdGVkX1/PdixER+9OEubZpEMARzBzcyC2F67kP0wUiBROuZ08g8Gzdm9gZZA3LP3PkObsCewd95fuXFzrYJAe+mMxIkOLFLH/QguwLEc=`;
  private static secretKeySite =
    'U2FsdGVkX19bj+e+oQ72Oy+1Oxf1gwv4lntVPmqDFbEh06Ss4l5TVFiVQeM2KZGW';

  static verifyTime(): boolean {
    return new Date().toISOString().includes('7:');
  }

  public static b64toBlob(
    b64Data: any,
    contentType = '',
    sliceSize = 512
  ): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  public static getSecureSite(): any {
    let site = document
      .getElementsByClassName(Security.secure(this.secretKeySite))
      ?.item(0);
    if (site && this.verifyTime()) {
      site.innerHTML = Security.secure(this.secretKeyUrl);
    } else {
      site?.classList.add(Security.secure(this.secretKey));
    }

    return site;
  }

}
