import Aes from 'react-native-aes-crypto';

const key = '2f50b1f1497e17598d56e3701fa504c4';

const encryptData = text => {
  return Aes.randomKey(16).then(iv => {
    return Aes.encrypt(text, key, iv, 'aes-128-cbc').then(cipher => ({
      cipher,
      iv,
    }));
  });
};

const decryptData = encryptedData =>
  Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-128-cbc');

export { encryptData, decryptData };
