var should = require('chai').should()
var sb = require('../index.js')

describe('#toECash', function () {
  it('converts simple integer amounts', function () {
    sb.toECash(100000000).should.equal(1000000)
    sb.toECash(123456789012345).should.equal(1234567890123.45)
  })
  it('converts simple string amounts', function () {
    sb.toECash('100000000').should.equal(1000000)
    sb.toECash('123456789012345').should.equal(1234567890123.45)
  })

  it('converts to eCash, not to Satoshi', function () {
    sb.toECash(98765).should.not.equal(9876500)
  })

  it('converts and handles corner case rounding', function () {
    sb.toECash(46).should.equal(0.46)
  })

  it('handles TypeError input', function () {
    sb.toECash
      .bind(this, true)
      .should.throw('toECash must be called on a number or string')
    sb.toECash
      .bind(this, 1.1)
      .should.throw(
        'toECash must be called on a whole number or string format whole number'
      )
  })
})

describe('#toSatoshi', function () {
  it('converts simple integer amounts', function () {
    sb.toSatoshi(0.01).should.equal(1)
    sb.toSatoshi(98765).should.equal(9876500)
  })
  it('converts simple string amounts', function () {
    sb.toSatoshi('0.01').should.equal(1)
    sb.toSatoshi('98765').should.equal(9876500)
  })

  it('converts to Satoshi, not to eCash', function () {
    sb.toSatoshi(123456789012345).should.not.equal(1234567890123.45)
  })

  it('converts and handles corner case rounding', function () {
    sb.toSatoshi(4.6).should.equal(460)
  })

  it('handles TypeError input', function () {
    sb.toSatoshi
      .bind(this, true)
      .should.throw('toSatoshi must be called on a number or string')
  })
})
