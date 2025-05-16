import cloudinary from "../../config/cloudinaryConfig.js"

export const uploadToCloudinary = async (file, resourceType, folderName) => {
  // console.log("file", file, "resourcetype", resourceType, "folderName", folderName)
  try {
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            resource_type: resourceType,
            folder: folderName,
          },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          },
        )
        .end(file.buffer)
    })
    return uploadResponse.secure_url
  } catch (error) {
    console.error(`Error uploading ${resourceType}:`, error)
    throw error
  }
}

export const deleteFromCloudinary = async (publicId, resourceType) => {
  try {
    console.log("public id:", publicId)
    const deleteResponse = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.destroy(publicId, { resource_type: resourceType }, (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error)
          return reject(error)
        }
        resolve(result)
      })
    })

    console.log("deleteResponse:", deleteResponse)

    if (deleteResponse.result === "ok" || deleteResponse.result === "not found") {
      return true // Successfully deleted or already not found
    } else {
      throw new Error("Failed to delete the asset. Response: " + JSON.stringify(deleteResponse))
    }
  } catch (error) {
    console.error("Error deleting asset:", error)
    throw error
  }
}

export const getPublicIdFromUrl = url => {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)\.[a-zA-Z0-9]+$/)
  return match ? match[1] : null
}


 // Helper function for safe Cloudinary deletion in delete Course/Module/Chapters
 export const safeDelete = async (url, resourceType) => {
  try {
    const publicId = getPublicIdFromUrl(url)
    if (publicId) {
      await deleteFromCloudinary(publicId, resourceType)
    }
  } catch (error) {
    console.error(`Failed to delete ${resourceType} from Cloudinary:`, error)
  }
}