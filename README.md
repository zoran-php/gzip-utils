# Gzip and Gunzip Utility Functions

This module provides functions for compressing and decompressing data in browser using gzip compression. It leverages the browser's built-in `CompressionStream` and `DecompressionStream` for efficient gzip operations.

## Installation

To use this module, you can import the necessary functions from the `gzip-utils` module:

```javascript
import {
  gzipString,
  gzipFile,
  gzipBlob,
  gzipUint8Array,
  gzipStream,
  gunzipString,
  gunzipFile,
  gunzipBlob,
  gunzipUint8Array,
  gunzipStream,
} from 'gzip-utils';
```

## Functions

### `gzipString`

Compresses a string using gzip compression.
Output formats are base64, base64url, hex, file, blob and raw.
Default is 'raw' format which returns Uint8Array.

```javascript
async function gzipString(text: string, output: 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw'): Promise<string | Uint8Array | File | Blob>;
```

### `gzipFile`

Compresses a file using gzip compression.
Output formats are base64, base64url, hex, file, blob and raw.
Default is 'raw' format which returns Uint8Array.

```javascript
async function gzipFile(file: File, output: 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw'): Promise<string | Uint8Array | File | Blob>;
```

### `gzipBlob`

Compresses a Blob using gzip compression.
Output formats are base64, base64url, hex, file, blob and raw.
Default is 'raw' format which returns Uint8Array.

```javascript
async function gzipBlob(blob: Blob, output: 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw'): Promise<string | Uint8Array | File | Blob>;
```

### `gzipUint8Array`

Compresses a Uint8Array using gzip compression.
Output formats are base64, base64url, hex, file, blob and raw.
Default is 'raw' format which returns Uint8Array.

```javascript
async function gzipUint8Array(uint8Array: Uint8Array, output: 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw'): Promise<string | Uint8Array | File | Blob>;
```

### `gzipStream`

Compresses a ReadableStream using gzip compression.
Output formats are base64, base64url, hex, file, blob and raw.
Default is 'raw' format which returns Uint8Array.

```javascript
async function gzipStream(stream: ReadableStream, output: 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw'): Promise<string | Uint8Array | File | Blob>;
```

### `gunzipString`

Decompresses a string using gzip compression.
Input formats are base64, base64url and hex.
Output formats are utf8, base64, base64url, hex, file, blob and raw.
Default is 'raw' format which returns Uint8Array.

```javascript
async function gunzipString(text: string, input: 'base64' | 'base64url' | 'hex', output: 'utf8' | 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw');
```

### `gunzipFile`

Decompresses a file using gzip compression.
Output formats are utf8, base64, base64url, hex, file, blob and raw.
Default is 'raw' format which returns Uint8Array.

```javascript
async function gunzipFile(file: File, output: 'utf8' | 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw');
```

### `gunzipBlob`

Decompresses a Blob using gzip compression.
Output formats are utf8, base64, base64url, hex, file, blob and raw.
Default is 'raw' format which returns Uint8Array.

```javascript
async function gunzipBlob(blob: Blob, output: 'utf8' | 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw');
```

### `gunzipUint8Array`

Decompresses a Uint8Array using gzip compression.
Output formats are utf8, base64, base64url, hex, file, blob and raw.
Default is 'raw' format which returns Uint8Array.

```javascript
async function gunzipUint8Array(uint8Array: Uint8Array, output: 'utf8' | 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw');
```

### `gunzipStream`

Decompresses a ReadableStream using gzip compression.
Output formats are utf8, base64, base64url, hex, file, blob and raw.
Default is 'raw' format which returns Uint8Array.

```javascript
async function gunzipStream(stream: ReadableStream, output: 'utf8' | 'base64' | 'base64url' | 'hex' | 'file' | 'blob' | 'raw' = 'raw', outputMimeType: string = 'text/plain', outputFileExtension: string = 'txt');
```

## Usage

Here's an example of how you can use the `gzipString` function:

```javascript
const compressedData = await gzipString('Hello, World!', 'base64');
console.log(compressedData);
const decompressedData = await gunzipString(compressedData, 'base64', 'utf8');
console.log(decompressedData);
```

Feel free to explore other functions provided by this module for your compression and decompression needs.
