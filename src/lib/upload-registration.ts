// Sends the registration form with XMLHttpRequest so upload progress can be reported.
// onProgress receives 0-100 for bytes sent. It reaches 100 once the upload is complete
// and the server is saving the record.
export function uploadRegistration(
  body: FormData,
  onProgress: (percent: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/registrations");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      let payload: { success?: boolean; error?: string } = {};
      try {
        payload = JSON.parse(xhr.responseText);
      } catch {
        // Non-JSON response is handled below.
      }
      if (xhr.status >= 200 && xhr.status < 300 && payload.success) {
        resolve();
      } else {
        reject(new Error(payload.error ?? "Something went wrong. Please try again."));
      }
    };

    xhr.onerror = () => reject(new Error("Network error. Check your connection and try again."));
    xhr.onabort = () => reject(new Error("Upload was cancelled."));

    xhr.send(body);
  });
}
