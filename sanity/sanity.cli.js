import {defineCliConfig} from 'sanity/cli'
import imageUrlBuilder from '@sanity/image-url'

export default defineCliConfig({
  api: {
    projectId: '5xbnahun',
    dataset: 'production'
  }
})

const builder = imageUrlBuilder(defineCliConfig)

export function urlFor(source) {
  return builder.image(source)
}
