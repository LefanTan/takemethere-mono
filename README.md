# takemethere-mono

# Deploy Cloud Functions

1. Cloud Run Warmer
   To keep our instances warm and reduce cold start time, a cloud scheduler is running every 2 minutes invoking a dummy endpoint on `Blog` and `WebApi`.

**To deploy**
`gcloud functions deploy run-warmer --region=us-central1 --runtime=nodejs16 --source=./cloud/functions/run-warmer --entry-point=invokeGoogleRun --trigger-topic=cron-warmer`
