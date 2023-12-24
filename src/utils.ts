// Description: Utility functions

/**
 * Converts a text input to a Blob
 *
 * @param text Text input that will be converted to a Blob
 * @returns Blob from the text input
 */
export function textToBlob(text: string) {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(text);
  return new Blob([uint8Array], { type: 'text/plain' });
}

/**
 * Converts a uint8Array input to a Blob
 *
 * @param uint8Array Uint8Array input that will be converted to a Blob
 * @returns Blob from the Uint8Array
 */
export function uint8ArrayToBlob(uint8Array: Uint8Array) {
  return new Blob([uint8Array]);
}

/**
 * Converts a uint8Array input to a base64 string
 * @param uint8Array Uint8Array input that will be converted to a base64 string
 * @returns Base64 string from the Uint8Array
 */
export function uint8ArrayToBase64(uint8Array: Uint8Array) {
  let binaryString = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
}

/**
 * Converts a base64 string to a Uint8Array
 * @param base64 Base64 string that will be converted to a Uint8Array
 * @returns Uint8Array from the base64 string
 */
export function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Converts a base64url string to a Uint8Array
 * @param base64url Base64url string that will be converted to a Uint8Array
 * @returns Uint8Array from the base64url string
 */
export function base64urlToUint8Array(base64url: string): Uint8Array {
  while (base64url.length % 4) {
    base64url += '=';
  }
  return Uint8Array.from(
    atob(base64url.replace(/_/g, '/').replace(/-/g, '+')),
    (c) => c.charCodeAt(0)
  );
}

/**
 * Converts a Uint8Array to a base64url string
 * @param bytes Uint8Array that will be converted to a base64url string
 * @returns Base64url string from the Uint8Array
 */
export function uint8ArrayToBase64Url(bytes: Uint8Array): string {
  let chars: string[] = [];
  bytes.forEach((byte) => {
    chars.push(String.fromCharCode(byte));
  });
  return btoa(chars.join(''))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Converts a Uint8Array to a hex string
 * @param uint8Array Uint8Array that will be converted to a hex string
 * @returns Hex string from the Uint8Array
 */
export function uint8ArrayToHex(uint8Array: Uint8Array) {
  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Converts a hex string to a Uint8Array
 * @param hex Hex string that will be converted to a Uint8Array
 * @returns Uint8Array from the hex string
 */
export function hexToUint8Array(hex: string) {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substring(i, i + 2), 16));
  }
  return new Uint8Array(bytes);
}

/**
 * Converts a ReadableStream to a Uint8Array
 * @async
 * @param stream ReadableStream that will be converted to a Uint8Array
 * @returns Uint8Array from the ReadableStream
 */
export async function streamToUint8Array(
  stream: ReadableStream
): Promise<Uint8Array> {
  const chunks: any = [];
  const reader = stream.getReader();
  let totalLength = 0;

  return new Promise<Uint8Array>((resolve, reject) => {
    function readNextChunk() {
      reader
        .read()
        .then(({ done, value }) => {
          if (done) {
            let mergedArray = new Uint8Array(totalLength);
            let offset = 0;
            chunks.forEach((item: Uint8Array) => {
              mergedArray.set(item, offset);
              offset += item.length;
            });
            resolve(mergedArray);
            return;
          }

          chunks.push(value);
          totalLength += value.length;
          readNextChunk();
        })
        .catch(reject);
    }
    readNextChunk();
  });
}
