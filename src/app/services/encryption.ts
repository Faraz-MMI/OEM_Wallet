import CryptoJS from "crypto-js";
import MD5 from 'crypto-js/md5';
import { IV, SECRET } from "../../core/config/env";


export const encrypt = (plainText: string) => {
  const key = CryptoJS.enc.Utf8.parse(SECRET);
  const iv = CryptoJS.enc.Utf8.parse(IV);

  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Utf8);
};

export const decrypt = (cipherText: string) => {

  const key = CryptoJS.enc.Utf8.parse(SECRET);
  const iv = CryptoJS.enc.Utf8.parse(IV);

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText),
  });

  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  console.log(decrypted);

  const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
  console.log("decrypted", decryptedString);

  return decryptedString;
};

export const md5 = (text: string): string => {
  return MD5(text).toString();
};
