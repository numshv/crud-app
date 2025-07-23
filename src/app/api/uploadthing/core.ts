import { stackServerApp } from "@/stack";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {

    postImage: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        }
    })

    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await stackServerApp.getUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try{
        console.log("Upload complete for userid: ", metadata.userId)
        console.log("File url: ", file.ufsUrl)
      } catch(error){
        console.error("error in onuploadcomplete: ", error)
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
