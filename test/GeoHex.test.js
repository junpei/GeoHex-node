var vows = require('vows')
  , suite = vows.describe('GeoHex')
  , assert = require('assert')
  , GeoHex = require('../index')
  , fixtures = require('./fixtures')
  ;

suite
.addBatch({
  'instance': {
    topic: function () { return new GeoHex(); }
    , 'of': function (topic) { assert.instanceOf(topic, GeoHex); }
  }
})

.addBatch({
  'getZoneByLocation()': {
    topic: fixtures
    , 'Zone': function (topic) {
      for (var i = 0; i < topic.length; ++i) {
        var fixture = topic[i]
            zone = GeoHex.getZoneByLocation(
              fixture.latitude, fixture.longitude, fixture.level);
        assert.isObject(zone);
        assert.equal(zone.code, fixture.code);
        assert.isNumber(zone.x);
        assert.isNumber(zone.y);
        assert.isNumber(zone.lat);
        assert.isNumber(zone.lon);
      }
    }
  }
})

.addBatch({
  'Zone#getCodesAround()': {
    topic: fixtures
    , 'lengthOf': function (topic) {
      for (var i = 0; i < topic.length; ++i) {
        var fixture = topic[i]
          , zone = GeoHex.getZoneByLocation(
              fixture.latitude, fixture.longitude, fixture.level)
          , codes = zone.getCodesAround();
        assert.lengthOf(codes, 7);
      }
    }
  }
})

.export(module);
