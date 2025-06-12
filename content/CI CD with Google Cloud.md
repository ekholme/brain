---
title: CI CD with Google Cloud
draft: false
date: 2025-06-12
tags:
  - gcp
  - software_dev
---
[Continuous Integration/Continuous Deployment (CI/CD)](https://en.wikipedia.org/wiki/CI/CD) refers to a process of automating and continually developing software that prioritizes frequent merging, testing, and deployment of small changes.

Cloud providers such as [[Google Cloud (GCP)]] offer tooling to facilitate CI/CD.

A general approach to CI/CD using GCP is something like this:

1. Push code to a [[Git]] repo that's connected to a GCP project
2. Build a Docker image (via Cloud Build) with all of the necessary software installed
3. Test the Docker image using whatever testing functionality the application requires (e.g. `go test`, `pytest` or `devtools::test()`)
4. Push the resulting image to Google Artifact Registry
5. Deploy the image from Artifact Registry to Cloud Run

I've ignored some of the housekeeping pieces here like ensuring all of the GCP services have the correct permissions and whatnot.

For the most part, this is all managed via a `cloudbuild.yaml` file that orchestrates the CI/CD process.

An example `cloudbuild.yaml` file looks like this:

```yaml
substitutions:
  _REPO_NAME: 'my-app-repo'
  _IMAGE_NAME: 'my-app'
  _REGION: 'us-east4'
  _TAG: 'prod'

steps:
  #docker build
  - name: 'gcr.io/cloud-builders/docker'
    id: 'Build'
    args: ['build', '-t', '${_REGION}-docker.pkg.dev/${PROJECT_ID}/${_REPO_NAME}/${_IMAGE_NAME}:${_TAG}', '.']

# Run tests using the built image 
  - name: 'gcr.io/cloud-builders/docker' 
    id: 'Test' 
  - args: 
      - 'run' 
      - '--rm' # Clean up the container after running 
      - '${_REGION}-docker.pkg.dev/${PROJECT_ID}/${_REPO_NAME}/${_IMAGE_NAME}:${_TAG}' 
# Replace the following with your actual test command and arguments. # This command will be executed inside your freshly built Docker container. # For example: # If you use npm: ['npm', 'test'] # If you have a script: ['./scripts/run-tests.sh'] # If you use pytest: ['pytest', 'tests/']
      - 'your-test-command-and-args-here' # e.g., 'npm', 'test' or './run_tests.sh'

  #push to artifact registry
  - name: 'gcr.io/cloud-builders/docker'
    id: 'Push'
    args: ['push', '${_REGION}-docker.pkg.dev/${PROJECT_ID}/${_REPO_NAME}/${_IMAGE_NAME}:${_TAG}']
 
  #deploy app
  - name: 'gcr.io/cloud-builders/gcloud'
    id: 'Deploy'
    args:
      - 'run'
      - 'deploy'
      - 'my-app'
      - '--image=${_REGION}-docker.pkg.dev/${PROJECT_ID}/${_REPO_NAME}/${_IMAGE_NAME}:${_TAG}'
      - '--region=${_REGION}'
      - '--max-instances=1'
      - '--min-instances=0'
      - '--tag=${_TAG}'
      - '--cpu=2'
      - '--memory=8Gi'
      - '--allow-unauthenticated'
      - '--set-secrets=/path_to_secret/MY_SECRET=MY_SECRET:latest'
      - '--concurrency=80'
      - '--port=8080'
timeout: 3600s

options:
  logging: CLOUD_LOGGING_ONLY
```
