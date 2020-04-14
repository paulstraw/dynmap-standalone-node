<template>
  <div class="hello">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      :crs="crs"
      @update:zoom="handleUpdateZoom"
    >
      <l-tile-layer
        :url="tileLayerUrl"
        :tile-size="tileSize"
        :options="{ zoomReverse }"
      />
    </l-map>
  </div>
</template>

<script>
// :tile-layer-class="tileLayerClass"
import { CRS, LatLng, Point, Transformation } from 'leaflet'
import { extend } from 'leaflet/src/core/Util'
import { LMap, LTileLayer } from 'vue2-leaflet'
import DynmapTileLayer from '../DynmapTileLayer'

const maxZoom = 18
const mapzoomin = 1

export default {
  name: 'HelloWorld',
  components: {
    LMap,
    LTileLayer
  },
  data: () => {
    return {
      tileLayerClass() {
        return new DynmapTileLayer()
      },
      tileSize: 128,
      zoom: maxZoom,
      zoomReverse: true,
      crs: extend({}, CRS.Simple, {
        projection: {
          project: function(latlng) {
            // Direct translation of lat -> x, lng -> y.
            return new Point(latlng.lat, latlng.lng)
          },
          unproject: function(point) {
            // Direct translation of x -> lat, y -> lng.
            return new LatLng(point.x, point.y)
          }
        },
        // a = 1; b = 2; c = 1; d = 0
        // x = a * x + b; y = c * y + d
        // End result is 1:1 values during transformation.
        transformation: new Transformation(1, 0, 1, 0),
        scale: function(zoom) {
          // Equivalent to 2 raised to the power of zoom, but faster.
          return 1 << zoom
        }
      }),
      center: new LatLng(0, 0),
      mapOptions: {},
      tileLayerUrl: '/mysql-tiles?tile=fixedblade2/flat/0/{z}_{x}_{y}.png'
    }
  },
  methods: {
    handleUpdateZoom(zoom) {
      // zoomoutlevel: 0 when izoom > mapzoomin, else mapzoomin - izoom (which ranges from 0 till mapzoomin)
      const izoom = maxZoom - zoom
      const zoominlevel = Math.max(0, izoom)
      this.tileSize = 128 << zoominlevel
      console.log('zoomUpdate', zoom, izoom, zoominlevel, this.tileSize)
    }
  },
  props: {
    msg: String
  },
  mounted: () => {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 500px;
  height: 500px;
}
</style>
