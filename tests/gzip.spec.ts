import { TextEncoder } from 'node:util';
import { ReadableStream, TransformStream } from 'web-streams-polyfill/ponyfill';
global.TextEncoder = TextEncoder;
global.TransformStream = TransformStream;

import {
  gunzipBlob,
  gunzipFile,
  gunzipStream,
  gunzipString,
  gunzipUint8Array,
  gzipBlob,
  gzipFile,
  gzipStream,
  gzipString,
  gzipUint8Array,
} from '../src/Gzip';

import { textToBlob } from '../src/utils';

describe('Gzip', () => {
  it('should gzip and gunzip a string', async () => {
    const text = 'Hello, World!';
    const gzipped = await gzipString(text, 'base64');
    const gunzipped = await gunzipString(gzipped as string, 'base64', 'utf8');
    expect(gunzipped).toBe(text);
  });

  it('should gzip and gunzip a file', async () => {
    const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
    const file = new File([uint8Array], 'hello.txt');
    const gzipped = await gzipFile(file, 'file');
    const gunzipped = await gunzipFile(gzipped as File, 'utf8');
    expect(gunzipped).toBe(file.toString());
  });

  it('should gzip and gunzip a blob', async () => {
    const text = 'Hello, World!';
    const blob = textToBlob(text);
    const gzipped = await gzipBlob(blob, 'blob');
    const gunzipped = await gunzipBlob(gzipped as Blob, 'utf8');
    expect(gunzipped).toBe(text);
  });

  it('should gzip and gunzip a Uint8Array', async () => {
    const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
    const gzipped = await gzipUint8Array(uint8Array, 'raw');
    const gunzipped = await gunzipUint8Array(gzipped as Uint8Array, 'raw');
    expect(gunzipped).toEqual(uint8Array);
  });

  it('should gzip and gunzip a stream', async () => {
    const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(uint8Array);
        controller.close();
      },
    });
    const gzipped = await gzipStream(stream, 'raw');
    const compressedStream = new ReadableStream({
      start(controller) {
        controller.enqueue(gzipped);
        controller.close();
      },
    });
    const gunzipped = await gunzipStream(compressedStream, 'raw');
    expect(gunzipped).toEqual(uint8Array);
  });
});
