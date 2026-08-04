---
title: Reading a file
draft: false
date: 2026-08-04
tags:
  - programming/go
  - programming/fundamentals
---
Reading a file from disk into a computer program involves the following steps:

1. **System Call:** The program asks the OS for permission to open the file;
2. **Buffer Allocation:** The program sets aside RAM to temporarily store the incoming chunks of data;
3. **Byte Transfer:** The OS transfers bytes into the RAM buffer;
4. **Data Decoding:** The program translates bytes into a higher-level data type (e.g. strings, JSON, custom structs, etc.)
5. **Cleanup:** The connection to the file is closed.

## Reading a Text File into Go

One of the simplest versions of this might be reading a text file with a single word ("Hello") into a [[Go]] program. This could be done via the following program:

```go
package main

import (
    "fmt"
    "log"
    "os"
)

func main() {

	//open the demo_txt file
    f, err := os.Open("demo_txt.txt")

    if err != nil {
        log.Fatal("couldn't open file")
    }
	
	defer f.Close()

    l := 10

	//allocate a slice of bytes of length l
    buf := make([]byte, l)

	//read the bytes into the buffer; return the number of bytes read and an error
    n, err := f.Read(buf)

	//create a new slice header pointing at buf
    j := buf[:n]

	//parse the slice of bytes as a string
    k := string(j)
  
    fmt.Printf("Contents of buf through n bytes as string: %v\n", k)

}
```

The above version assumes that the entire content of the file can be read into the buffer. This won't always be true, so a more robust version would be:

```go
package main

import (
	"fmt"
	"io"
	"log"
	"os"
)

func main() {
	// 1. Open the file (registers file descriptor with OS)
	f, err := os.Open("demo_txt.txt")
	if err != nil {
		log.Fatal(err)
	}
	// Always clean up file descriptors
	defer f.Close()

	// 2. Prepare buffer
	buf := make([]byte, 10)
	var content []byte

	// 3. Iteratively read until End Of File (EOF)
	for {
		n, err := f.Read(buf)
		if n > 0 {
			// Append only the freshly read bytes to our accumulator
			content = append(content, buf[:n]...)
		}
		if err == io.EOF {
			break // System reached the end of the file safely
		}
		if err != nil {
			log.Fatalf("error reading file: %v", err)
		}
	}

	// 4. Convert accumulated bytes to useful data structure (string)
	k := string(content)
	fmt.Printf("File content: %s\n", k)
}
```