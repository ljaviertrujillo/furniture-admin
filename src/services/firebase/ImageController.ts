import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '.'
import { v4 } from 'uuid'

export async function uploadTempFile (files: File[]) {
    const urls: string[] = []
    for (const file of files) {
        const storageRef = ref(storage, `temp/${v4()}`)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        urls.push(url)
    }
    return urls
}