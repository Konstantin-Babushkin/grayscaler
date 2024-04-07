import React, { useEffect } from 'react'

import { Wrapper, Title, Description, Input } from './Main.styles'

export default function Main() {
  function toGrayscale(imageData) {
    const { data } = imageData
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = avg // Red
      data[i + 1] = avg // Green
      data[i + 2] = avg // Blue
    }
    return imageData
  }

  function adjustBrightness(imageData, adjustment) {
    const { data } = imageData
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, Math.max(0, data[i] + adjustment))
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + adjustment))
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + adjustment))
    }
    return imageData
  }

  function truncate(value) {
    return Math.min(255, Math.max(0, value))
  }

  function enhanceContrast(imageData, factor) {
    const { data } = imageData
    const adjustedFactor = (259 * (factor + 255)) / (255 * (259 - factor))
    for (let i = 0; i < data.length; i += 4) {
      data[i] = truncate(adjustedFactor * (data[i] - 128) + 128)
      data[i + 1] = truncate(adjustedFactor * (data[i + 1] - 128) + 128)
      data[i + 2] = truncate(adjustedFactor * (data[i + 2] - 128) + 128)
    }
    return imageData
  }

  function applyGaussianBlur(imageData) {
    const { data, width, height } = imageData
    const kernel = [
      [1, 2, 1],
      [2, 4, 2],
      [1, 2, 1],
    ]
    const kernelSum = 16 // Sum of the kernel values
    const result = new ImageData(width, height)

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        let r = 0
        let g = 0
        let b = 0
        for (let ky = -1; ky <= 1; ky += 1) {
          for (let kx = -1; kx <= 1; kx += 1) {
            const px = (y + ky) * width + (x + kx)
            const pIdx = px * 4
            if (px >= 0 && px < width * height) {
              // Check boundaries
              r += data[pIdx] * kernel[ky + 1][kx + 1]
              g += data[pIdx + 1] * kernel[ky + 1][kx + 1]
              b += data[pIdx + 2] * kernel[ky + 1][kx + 1]
            }
          }
        }
        const idx = (y * width + x) * 4
        result.data[idx] = r / kernelSum
        result.data[idx + 1] = g / kernelSum
        result.data[idx + 2] = b / kernelSum
        result.data[idx + 3] = data[idx + 3] // Preserve alpha channel
      }
    }

    return result
  }

  function grayscaleListener(event) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = function (loadEvent) {
      const img = new Image()
      img.onload = function () {
        const canvas = document.getElementById('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)

        let imageData = ctx.getImageData(0, 0, img.width, img.height)
        imageData = toGrayscale(imageData)
        imageData = adjustBrightness(imageData, 20) // Example adjustment
        imageData = enhanceContrast(imageData, 1.2) // Example enhancement
        imageData = applyGaussianBlur(imageData) // Apply Gaussian Blur
        ctx.putImageData(imageData, 0, 0)
      }
      img.src = loadEvent.target.result
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    const inputElement = document.getElementById('imageInput')
    inputElement.addEventListener('change', grayscaleListener)
    return () => inputElement.removeEventListener('change', grayscaleListener)
  }, [])

  return (
    <Wrapper>
      <Title>WASM integration example</Title>
      <Description>Grayscale an Image</Description>
      <Input type="file" id="imageInput" />
      <canvas id="canvas" />
    </Wrapper>
  )
}
