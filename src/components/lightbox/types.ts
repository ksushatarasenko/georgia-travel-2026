export interface LightboxImageItem {
  src: string
  alt: string
}

export interface OpenLightboxOptions {
  images: LightboxImageItem[]
  index?: number
}
