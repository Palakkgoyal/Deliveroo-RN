import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const sanityClient = createClient({
  projectId: '5xbnahun',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}

export default sanityClient
