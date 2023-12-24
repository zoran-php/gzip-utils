import {
  base64ToUint8Array,
  base64urlToUint8Array,
  hexToUint8Array,
  streamToUint8Array,
  textToBlob,
  uint8ArrayToBase64,
  uint8ArrayToBase64Url,
  uint8ArrayToBlob,
  uint8ArrayToHex,
} from './utils';

/**
 * Compresses a string using gzip compression
 * Uses the browser's built-in CompressionStream
 *
 * @async
 * @param text Text input that will be compressed
 * @param output Format of the output
 * @returns Compressed text in the specified format
 */
export async function gzipString(
  text: string,
  output: 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw'
): Promise<string | Uint8Array | File | Blob> {
  const tb = textToBlob(text);
  return gzipStream(tb.stream(), output);
}

/**
 * Compresses a file using gzip compression
 * Uses the browser's built-in CompressionStream
 *
 * @async
 * @param file File input that will be compressed
 * @param output Format of the output
 * @returns Compressed file in the specified format
 */
export async function gzipFile(
  file: File,
  output: 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw'
): Promise<string | Uint8Array | File | Blob> {
  return gzipStream(file.stream(), output);
}

/**
 * Compresses a Blob using gzip compression
 * Uses the browser's built-in CompressionStream
 *
 * @async
 * @param blob Blob input that will be compressed
 * @param output Format of the output
 * @returns Compressed blob in the specified format
 */
export async function gzipBlob(
  blob: Blob,
  output: 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw'
): Promise<string | Uint8Array | File | Blob> {
  return gzipStream(blob.stream(), output);
}

/**
 * Compresses a Uint8Array using gzip compression
 * Uses the browser's built-in CompressionStream
 *
 * @async
 * @param uint8Array Uint8Array input that will be compressed
 * @param output Format of the output
 * @returns Compressed Uint8Array in the specified format
 */
export async function gzipUint8Array(
  uint8Array: Uint8Array,
  output: 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw'
): Promise<string | Uint8Array | File | Blob> {
  const blob = uint8ArrayToBlob(uint8Array);
  return gzipStream(blob.stream(), output);
}

/**
 * Compresses a ReadableStream using gzip compression
 * Uses the browser's built-in CompressionStream
 *
 * @async
 * @param stream ReadableStream input that will be compressed
 * @param output Format of the output
 * @returns Compressed ReadableStream in the specified format
 */
export async function gzipStream(
  stream: ReadableStream,
  output: 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw'
): Promise<string | Uint8Array | File | Blob> {
  const compressionStream = new CompressionStream('gzip');
  const readableStream = stream.pipeThrough(compressionStream);
  const bytes = await streamToUint8Array(readableStream);
  switch (output) {
    case 'base64':
      return uint8ArrayToBase64(bytes);
    case 'base64url':
      return uint8ArrayToBase64Url(bytes);
    case 'hex':
      return uint8ArrayToHex(bytes);
    case 'file':
      return new File([bytes], 'file.gz', {
        type: 'application/gzip',
      });
    case 'blob':
      return new Blob([bytes], { type: 'application/gzip' });
    case 'raw':
      return bytes;
  }
}

/**
 * Decompresses a string using gzip compression
 * Uses the browser's built-in DecompressionStream
 *
 * @async
 * @param text Text input that will be decompressed
 * @param input Format of the input
 * @param output Format of the output
 * @returns Decompressed text in the specified format
 */
export async function gunzipString(
  text: string,
  input: 'base64' | 'base64url' | 'hex',
  output:
    | 'utf8'
    | 'base64'
    | 'base64url'
    | 'hex'
    | 'file'
    | 'blob'
    | 'raw' = 'raw'
) {
  const bytes =
    input === 'base64'
      ? base64ToUint8Array(text)
      : input === 'base64url'
        ? base64urlToUint8Array(text)
        : hexToUint8Array(text);
  const blob = uint8ArrayToBlob(bytes);
  return gunzipStream(blob.stream(), output);
}

/**
 * Decompresses a file using gzip compression
 * Uses the browser's built-in DecompressionStream
 *
 * @async
 * @param file File input that will be decompressed
 * @param output Format of the output
 * @returns Decompressed file in the specified format
 */
export async function gunzipFile(
  file: File,
  output:
    | 'utf8'
    | 'base64'
    | 'base64url'
    | 'hex'
    | 'file'
    | 'blob'
    | 'raw' = 'raw'
) {
  return gunzipStream(file.stream(), output);
}

/**
 * Decompresses a Blob using gzip compression
 * Uses the browser's built-in DecompressionStream
 *
 * @async
 * @param blob Blob input that will be decompressed
 * @param output Format of the output
 * @returns Decompressed blob in the specified format
 */
export async function gunzipBlob(
  blob: Blob,
  output:
    | 'utf8'
    | 'base64'
    | 'base64url'
    | 'hex'
    | 'file'
    | 'blob'
    | 'raw' = 'raw'
) {
  return gunzipStream(blob.stream(), output);
}

/**
 * Decompresses a Uint8Array using gzip compression
 * Uses the browser's built-in DecompressionStream
 *
 * @async
 * @param uint8Array Uint8Array input that will be decompressed
 * @param output Format of the output
 * @returns Decompressed Uint8Array in the specified format
 */
export async function gunzipUint8Array(
  uint8Array: Uint8Array,
  output:
    | 'utf8'
    | 'base64'
    | 'base64url'
    | 'hex'
    | 'file'
    | 'blob'
    | 'raw' = 'raw'
) {
  const blob = uint8ArrayToBlob(uint8Array);
  return gunzipStream(blob.stream(), output);
}

/**
 * Decompresses a ReadableStream using gzip compression
 * Uses the browser's built-in DecompressionStream
 *
 * @async
 * @param stream ReadableStream input that will be decompressed
 * @param output Format of the output
 * @returns Decompressed ReadableStream in the specified format
 */
export async function gunzipStream(
  stream: ReadableStream,
  output:
    | 'utf8'
    | 'base64'
    | 'base64url'
    | 'hex'
    | 'file'
    | 'blob'
    | 'raw' = 'raw',
  outputMimeType: string = 'text/plain',
  outputFileExtension: string = 'txt'
) {
  const decompressionStream = new DecompressionStream('gzip');
  const readableStream = stream.pipeThrough(decompressionStream);
  const bytes = await streamToUint8Array(readableStream);
  switch (output) {
    case 'utf8':
      return new TextDecoder().decode(bytes);
    case 'base64':
      return uint8ArrayToBase64(bytes);
    case 'base64url':
      return uint8ArrayToBase64Url(bytes);
    case 'hex':
      return uint8ArrayToHex(bytes);
    case 'file':
      return new File([bytes], `file.${outputFileExtension}`, {
        type: outputMimeType,
      });
    case 'blob':
      return new Blob([bytes], { type: outputMimeType });
    case 'raw':
      return bytes;
  }
}
