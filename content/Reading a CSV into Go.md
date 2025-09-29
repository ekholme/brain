---
title: Reading a csv into go
draft: false
date: 2025-09-29
tags:
  - go
---
The general approach for reading a csv into [[Go]] is to:
1. Open a file;
2. Create a new `*csv.Reader` object;
3. Read the file in

This can basically be accomplished like this:

```go
p := "my_csv.csv"

f, err := os.Open(p)

//handle error

defer f.Close()

reader := csv.NewReader(f)

```

There are two approaches at this point. The first is to use the `ReadAll()` method to read everything in at once as a `[][]string`:

```go
data := reader.ReadAll()
```

This works pretty well if the csv *doesn't* have headers.

Another approach is to loop over each row of the csv, which is better if the csv does have headers that we need to process.

## Reading Data in as []map[string]string:

If we want to read the contents of a csv in as `[]map[string]string` (a slice of maps), where the headers are the keys in our map, we can do this as follows:

```go
p := "my_csv.csv"

f, err := os.Open(p)

//handle error

defer f.Close()

reader := csv.NewReader(f)

//read in just the first row as headers
headers, err := reader.Read()
//nb that the internal cursor is now positioned at the 2nd row of the csv

//handle error

var data []map[string]string

for {
	row, err := reader.Read()
	
	if err == io.EOF {
		break
	}

	//handle not end-of-file error

	if len(row) != len(headers) {
		fmt.Println("Skipping row with incorrect number of fields")	
		continue
	}
	
	d := make(map[string]string, len(headers))

	for i := range headers {
		d[headers[i]] = row[i]	
	}
	
	data = append(data, d)
}
```