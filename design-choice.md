# Design Choices

## 1. Future Improvements: Video Upload Verification API

To enhance the video upload process, a new API will be developed with the following characteristics:

*   **Purpose:** Allow users and testing teams to verify the successful completion of video uploads initiated via pre-signed URLs.
*   **Trigger Mechanism:** This API should be called *after* a video has been uploaded using the pre-signed URL.
*   **Input:** The user will need to provide the `filename` of the uploaded video.
*   **Verification Method:** The API will perform an S3 HEAD request on the specified filename.
*   **Benefit:** Provides an easy and programmatic way to confirm upload status, eliminating the need for manual checks via the AWS S3 console.