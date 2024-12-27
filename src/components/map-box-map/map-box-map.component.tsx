import { Component, Element, getAssetPath, h, Prop } from '@stencil/core';
import mapboxgl, { Map } from 'mapbox-gl';
import { createMap, createMarker } from './map-config';

@Component({
  tag: 'map-box-map',
  styleUrl: 'map-box-map.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class MapBoxMap {
  /**
   * Keeps reference to Map Box object
   */
  private map: Map | undefined;

  @Element() el: HTMLElement;

  /**
   * Lifecycle method that gets called after the component has been rendered.
   * Initializes the map element inside the shadow DOM using Mapbox library.
   * Sets up the map with the provided access token and displays a marker on the map.
   *
   * @return {void} Does not return a value.
   */
  componentDidLoad() {
    const elementInShadow = this.el.shadowRoot.querySelector('#map');
    mapboxgl.accessToken = this.accessToken;
    this.map = this.showMap(elementInShadow as HTMLElement);
    this.showMarker(this.map);
  }


  /**
   * Represents the height of a map.
   * Supported all CSS values.
   * Default value: '100%'
   * @type {string}
   */
  @Prop() height: string = '100%';


  /**
   * Represents the width of a map.
   * Supported all CSS values.
   * Default value: '100%'
   * @type {string}
   */
  @Prop() width: string = '100%';

  /**
   * To use Mapbox GL JS, you need to have a Mapbox access token.
   * https://docs.mapbox.com/mapbox-gl-js/guides/install/#:~:text=have%20a%20Mapbox-,access%20token,-.%20This%20access%20token
   * @type {string}
   */
  @Prop() accessToken: string | undefined;

  /**
   * Url to your Map Box style
   * https://docs.mapbox.com/help/dive-deeper/map-design/
   * @type {string}
   */
  @Prop() mapStyle: string | undefined;

  /**
   * Represents the longitude coordinate of a geographical location.
   * @type {number}
   */
  @Prop() lng: number = 19.457216;

  /**
   * Represents the latitude coordinate of a geographical location.
   * @type {number}
   */
  @Prop() lat: number = 51.759445;

  /**
   * Initial zoom level min 0, max 15
   * @type {number}
   */
  @Prop() zoom: number = 11;

  /**
   * Represents the URL of the marker icon to be used in a map.
   * If no url there will be used default icon.
   *
   * Sometimes the default icon can be restricted like in VitVe https://vite.dev/config/server-options.html#server-fs-allow
   * @type {string}
   */
  @Prop() markerUrl: string | undefined;

  /**
   * Set width in pixels for marker
   * @type {string}
   */
  @Prop() markerWidth: string = '50px';

  /**
   * Set height in pixels for marker
   * @type {string}
   */
  @Prop() markerHeight: string = '50px';


  render() {
    return <div style={{
      width: this.width,
      height: this.height,
    }} class="map" id="map"></div>;
  }

  /**
   * Creates and displays a map on the specified HTML element within a shadow DOM.
   *
   * @param {HTMLElement} elementInShadow - The HTML element within the shadow DOM where the map should be rendered.
   * @return {Object} A map instance created and rendered on the provided HTML element.
   */
  private showMap(elementInShadow: HTMLElement) {
    return createMap(
      elementInShadow,
      this.lng,
      this.lat,
      this.zoom,
      this.mapStyle);
  }

  private showMarker(map: Map) {
    console.log('ASSETS', getAssetPath('./assets/marker.svg'));
    const marker = createMarker(getAssetPath('./assets/marker.svg'), this.markerUrl, this.markerWidth, this.markerHeight);
    new mapboxgl.Marker({ element: marker }).setLngLat([this.lng, this.lat]).addTo(map);
  }
}
