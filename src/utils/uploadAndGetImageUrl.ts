import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'

const uploadAndGetImageUrl = async (storagePath: string, image: string): Promise<string> => {
  const storage = getStorage()
  const storageRef = ref(storage, storagePath)
  await uploadString(storageRef, image, 'data_url')
  const imageUrl = await getDownloadURL(storageRef)
  return imageUrl
}

export default uploadAndGetImageUrl
