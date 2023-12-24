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
} from '../src/utils';

import { TextEncoder } from 'node:util';
import { ReadableStream } from 'web-streams-polyfill/ponyfill';
global.TextEncoder = TextEncoder;

describe('Utils', () => {
  it('should convert text to Blob', () => {
    const text = 'Hello, World!';
    const blob = textToBlob(text);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBe(text.length);
  });

  it('should convert Uint8Array to Blob', () => {
    const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
    const blob = uint8ArrayToBlob(uint8Array);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBe(uint8Array.length);
  });

  it('should convert Uint8Array to base64', () => {
    const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
    const base64 = uint8ArrayToBase64(uint8Array);
    expect(base64).toBe('SGVsbG8=');
  });

  it('should convert base64 to Uint8Array', () => {
    const base64 = 'SGVsbG8=';
    const uint8Array = base64ToUint8Array(base64);
    expect(uint8Array).toEqual(new Uint8Array([72, 101, 108, 108, 111]));
  });

  it('should convert base64url to Uint8Array', () => {
    const base64url = 'SGVsbG8';
    const uint8Array = base64urlToUint8Array(base64url);
    expect(uint8Array).toEqual(new Uint8Array([72, 101, 108, 108, 111]));
  });

  it('should convert Uint8Array to base64url', () => {
    const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
    const base64url = uint8ArrayToBase64Url(uint8Array);
    expect(base64url).toBe('SGVsbG8');
  });

  it('should convert Uint8Array to hex', () => {
    const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
    const hex = uint8ArrayToHex(uint8Array);
    expect(hex).toBe('48656c6c6f');
  });

  it('should convert hex to Uint8Array', () => {
    const hex = '48656c6c6f';
    const uint8Array = hexToUint8Array(hex);
    expect(uint8Array).toEqual(new Uint8Array([72, 101, 108, 108, 111]));
  });

  it('should convert ReadableStream to Uint8Array', async () => {
    const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(uint8Array);
        controller.close();
      },
    });
    const result = await streamToUint8Array(stream);
    expect(result).toEqual(uint8Array);
  });
});
