import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import React from "react";

type ImageUploadProps = {
  endpoint: keyof OurFileRouter;
  value?: string;
  onChange: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
};

function ImageUpload({ endpoint, value, onChange, onUploadingChange }: ImageUploadProps) {
  return (
    <div className="w-full flex items-center">
      <UploadDropzone<OurFileRouter>
        endpoint={endpoint}
        className="w-full max-h-48"
        onUploadBegin={() => {
          onUploadingChange?.(true);
        }}
        onClientUploadComplete={(res) => {
          console.log("✅ Upload complete", res);
          if (res && res[0]) {
            const url = res[0].url;
            console.log("📷 URL:", url);
            onChange(url);
          }
          onUploadingChange?.(false);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
          onUploadingChange?.(false);
        }}
      />
    </div>
  );
}
export default ImageUpload;
