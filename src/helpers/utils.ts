/**
 * Create a new array with randomized indices of an input array
 */
export const randomizeIndices = (array: unknown[]): number[] => {
  return array.map((_, index) => index).sort(() => Math.random() - 0.5)
}

/**
 * Convert seconds to hh:mm:ss format
 */
export const secondsToTime = (seconds: number): string => {
  const roundedSeconds = Math.round(seconds)
  const hours = Math.floor(roundedSeconds / 3600)
  const minutes = Math.floor((roundedSeconds % 3600) / 60)
  const secs = roundedSeconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`
}
