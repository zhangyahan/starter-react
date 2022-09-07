function defaultValue(a: any, b: any) {
  if (a !== undefined && a !== null)
    return a
  return b
}

/**
 * 参考 Cesium 源码的 Cartesian3 代码, 坐标系参考默认使用 WGS84 坐标系.
 */
export default class Cartesian3 {
  x: number
  y: number
  z: number

  K: Cartesian3
  N: Cartesian3
  WGS84RadiiSquared: Cartesian3

  /**
   * @param x
   * @param y
   * @param z
   */
  constructor(x?: number, y?: number, z?: number) {
    this.x = defaultValue(x, 0.0)
    this.y = defaultValue(y, 0.0)
    this.z = defaultValue(z, 0.0)

    this.K = new Cartesian3()
    this.N = new Cartesian3()
    this.WGS84RadiiSquared = new Cartesian3(
      6378137.0 * 6378137.0, // WGS84 坐标系, 长半轴.
      6378137.0 * 6378137.0,
      6356752.3142451793 * 6356752.3142451793, // WGS84 坐标系, 短半轴.
    )
  }

  /**
   * @param cartesian3
   * @returns
   */
  magnitudeSquared(cartesian3: Cartesian3): number {
    return (
      cartesian3.x * cartesian3.x
      + cartesian3.y * cartesian3.y
      + cartesian3.z * cartesian3.z
    )
  }

  /**
   * @param cartesian3
   * @returns
   */
  magnitude(cartesian3: Cartesian3): number {
    return Math.sqrt(this.magnitudeSquared(cartesian3))
  }

  /**
   * @param cartesian3
   * @returns
   */
  normalize(cartesian3: Cartesian3): Cartesian3 {
    const magnitude = this.magnitude(cartesian3)
    const result = new Cartesian3()

    result.x = cartesian3.x / magnitude
    result.y = cartesian3.y / magnitude
    result.z = cartesian3.z / magnitude

    return result
  }

  /**
   * @param left
   * @param right
   * @returns
   */
  multiplyComponents(left: Cartesian3, right: Cartesian3): Cartesian3 {
    const result = new Cartesian3()
    result.x = left.x * right.x
    result.y = left.y * right.y
    result.z = left.z * right.z
    return result
  }

  /**
   * @param left
   * @param right
   * @returns
   */
  dot(left: Cartesian3, right: Cartesian3): number {
    return left.x * right.x + left.y * right.y + left.z * right.z
  }

  /**
   * @param cartesian
   * @param scalar
   * @returns
   */
  divideByScalar(cartesian: Cartesian3, scalar: number): Cartesian3 {
    const result = new Cartesian3()
    result.x = cartesian.x / scalar
    result.y = cartesian.y / scalar
    result.z = cartesian.z / scalar
    return result
  }

  /**
   * @param cartesian
   * @param scalar
   * @returns
   */
  multiplyByScalar(cartesian: Cartesian3, scalar: number): Cartesian3 {
    const result = new Cartesian3()
    result.x = cartesian.x * scalar
    result.y = cartesian.y * scalar
    result.z = cartesian.z * scalar
    return result
  }

  /**
   * @param left
   * @param right
   * @returns
   */
  add(left: Cartesian3, right: Cartesian3): Cartesian3 {
    const result = new Cartesian3()
    result.x = left.x + right.x
    result.y = left.y + right.y
    result.z = left.z + right.z
    return result
  }

  /**
   * @param longitude
   * @param latitude
   * @param height
   * @returns
   */
  fromRadians(longitude: number, latitude: number, height: number): Cartesian3 {
    height = defaultValue(height, 0.0)

    const cosLatitude = Math.cos(latitude)
    this.N.x = cosLatitude * Math.cos(longitude)
    this.N.y = cosLatitude * Math.sin(longitude)
    this.N.z = Math.sin(latitude)
    this.N = this.normalize(this.N)

    this.K = this.multiplyComponents(this.WGS84RadiiSquared, this.N)
    const gamma = Math.sqrt(this.dot(this.N, this.K))
    this.K = this.divideByScalar(this.K, gamma)
    this.N = this.multiplyByScalar(this.N, height)

    return this.add(this.K, this.N)
  }

  /**
   * @param longitude
   * @param latitude
   * @param height
   * @returns
   */
  fromDegrees(longitude: number, latitude: number, height: number): Cartesian3 {
    longitude = longitude * (Math.PI / 180.0)
    latitude = latitude * (Math.PI / 180.0)
    return this.fromRadians(longitude, latitude, height)
  }
}

const cartesian3 = new Cartesian3()
console.log(cartesian3.fromDegrees(114.123, 36.123, 10))
