---
title: Google Gemini
draft: false
date: 2025-03-31
tags:
  - ai
  - 5dgai
  - google
  - llms
---
TODO -- WRITE INTRO

## Python API

Google provides the [Google Gen AI Python SDK](https://pypi.org/project/google-genai/) for interacting with the Gemini developer API (as well as for interacting with Vertex AI)

You can install it via

```bash
pip install google-genai
```

and you can use it in a [[Python]] script via

```python
from google import genai
from google.genai import types
```

To create a client using the Gemini API, you need a Gemini API key, which you then pass to a constructor function:

```python
# replace the string with the actual key
client = genai.Client(api_key="GEMINI_API_KEY")
```

### View available models

To see which models are available:

```python
for model in client.models.list():
	print(model.name)
```

### Uploading Documents

We might want to upload a document to a client. To do this, we can do the following:

```python
document_file = client.files.upload(file='my_pdf.pdf')
```

And then if we wanted to, for example, summarize this document, we could do so via:

```python
prompt = 'Summarize the following document'

cnfg = types.GenerateContentConfig(temperature=0.0) # setting a low temperature to preclude any creativity

response = client.models.generate_content(
	model = 'gemini-2.0-flash',
	config=cnfg,
	contents = [prompt, document_file]
)

print(response.text)
```

### Further Reading

- [[Prompt Engineering#Python Examples|Prompting Examples]]
