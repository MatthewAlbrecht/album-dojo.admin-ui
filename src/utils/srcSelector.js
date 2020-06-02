export const getImageSrc = (size, images) => {
  if (!images || !images.length) return 'https://via.placeholder.com/300' // TODO: Make default "no album artwork img"
  let srcUrl = sortByKey(images, 'width').reduce((imageUrl, image) => {
    if (!imageUrl && image.width > size && image.height > size) {
      return image.url
    } else {
      return image.url
    }
  }, '')
  srcUrl = srcUrl ? srcUrl : images[0].url

  return srcUrl
}

export const sortByKey = (array, key) => {
  function compare(a, b) {
    if (a[key] < b[key]) {
      return -1
    }
    if (a[key] > b[key]) {
      return 1
    }
    return 0
  }
  return array.sort(compare)
}
