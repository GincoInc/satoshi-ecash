/**
 * @module satoshi-ecash
 */

var Big = require('big.js')

// @private
var conversion = 100

// es6 polyfill
if (!Number.isInteger) {
  Number.isInteger = function (num) {
    return typeof num === 'number' && num % 1 === 0
  }
}

// @private
function toNumber(notNum) {
  return Number(notNum)
}

module.exports = {
  /**
   * Convert Satoshi to eCash
   * @param {number|string} satoshi Amount of Satoshi to convert. Must be a whole number
   * @throws {TypeError} Thrown if input is not a number or string
   * @throws {TypeError} Thrown if input is not a whole number or string format whole number
   * @returns {number}
   */
  toECash: function (satoshi) {
    //validate arg
    var satoshiType = typeof satoshi
    if (satoshiType === 'string') {
      satoshi = toNumber(satoshi)
      satoshiType = 'number'
    }
    if (satoshiType !== 'number') {
      throw new TypeError(
        'toECash must be called on a number or string, got ' + satoshiType
      )
    }
    if (!Number.isInteger(satoshi)) {
      throw new TypeError(
        'toECash must be called on a whole number or string format whole number'
      )
    }

    var bigSatoshi = new Big(satoshi)
    return Number(bigSatoshi.div(conversion))
  },

  /**
   * Convert eCash to Satoshi
   * @param {number|string} eCash Amount of eCash to convert
   * @throws {TypeError} Thrown if input is not a number or string
   * @returns {number}
   */
  toSatoshi: function (eCash) {
    //validate arg
    var eCashType = typeof eCash
    if (eCashType === 'string') {
      eCash = toNumber(eCash)
      eCashType = 'number'
    }
    if (eCashType !== 'number') {
      throw new TypeError(
        'toSatoshi must be called on a number or string, got ' + eCashType
      )
    }

    var bigECash = new Big(eCash)
    return Number(bigECash.times(conversion))
  },
}
