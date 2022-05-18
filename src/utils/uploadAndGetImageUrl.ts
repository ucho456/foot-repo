import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const uploadAndGetImageUrl = async (storagePath: string, imageFile: File): Promise<string> => {
  const storage = getStorage()
  const storageRef = ref(storage, storagePath)
  await uploadBytes(storageRef, imageFile)
  const imageUrl = await getDownloadURL(storageRef)
  return imageUrl
}

export default uploadAndGetImageUrl
