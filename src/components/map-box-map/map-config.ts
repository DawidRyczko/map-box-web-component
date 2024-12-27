import mapboxgl from 'mapbox-gl';

export function createMap(mapContainer: HTMLElement, lng: number, lat: number, zoom: number, mapStyle: string) {
  return new mapboxgl.Map({
    container: mapContainer,
    center: [lng, lat],
    zoom: zoom,
    style: mapStyle,
  });
}


export function createMarker(defaultMarkerImage: string, markerUrl: string, width: string, height: string) {
  const marker = markerUrl ?? defaultMarkerImage;
  const markerEl = document.createElement('div');
  markerEl.style.backgroundImage = `url(${marker})`;
  markerEl.style.width = width;
  markerEl.style.height = height;
  markerEl.style.backgroundSize = 'cover';
  markerEl.style.borderRadius = '50%';
  return markerEl;
}
