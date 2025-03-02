import { LayersControl, MapContainer, Pane } from 'react-leaflet';
import Leaflet from 'leaflet';
import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { Follow, Share } from 'react-twitter-widgets';
import { MapInitializer } from './handler/MapInitializer';
import { MapEventHandler } from './handler/MapEventHandler';
import { AdditionalControls } from './controls/AdditionalControls';
import { OSMBaseLayer } from './layers/BaseLayers/OSMBaseLayer';
import { GSIBaseLayer } from './layers/BaseLayers/GSIBaseLayer';
import { JapanPrefOverlayLayer } from './layers/GeoJSONLayers/JapanPrefOverlayLayer';
import { JapanCityOverlayLayer } from './layers/GeoJSONLayers/JapanCityOverlayLayer';
import { NowcastOverlayLayer } from './layers/OverlayLayers/NowcastOverlayLayer';
import { GSIReliefLayer } from './layers/OverlayLayers/GSIReliefLayer';
import { PopulationLayer } from './layers/OverlayLayers/PopulationLayer';
import { FireDeptLayers } from './layers/MarkerLayers/FireDeptMarkerLayers';
import { RiverLevelLayer } from './layers/MarkerLayers/RiverLevelMarkerLayer';
import { NewsCrisis } from './layers/MarkerLayers/NewsMarkerLayers';
import { LinkControl } from './controls/LinkControl';
import { CommonMapStyle } from './CommonMapStyle';
import { GSIHazardMapLayers } from './layers/OverlayLayers/GSIHazardMapLayers';
import { JMABaseLayer } from './layers/BaseLayers/JMABaseLayer';
import { LandslideRiskLayer } from './layers/OverlayLayers/JMARiskLayers';

const CrisisMap = () => {
  useEffect(() => {
    delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: 'images/marker-icon-2x.png',
      iconUrl: 'images/marker-icon.png',
      shadowUrl: 'images/marker-shadow.png',
    });
  }, []);
  return (
    <div className='map' css={CommonMapStyle}>
      <Follow username='yuiseki_' />
      <Share url='https://crisis.yuiseki.net/' />
      <LinkControl path='/covid19' title='新型コロナウイルス情報地図' />
      <MapContainer
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <MapInitializer />
        <MapEventHandler />
        <AdditionalControls />
        <LayersControl position='topright'>
          <OSMBaseLayer />
          <GSIBaseLayer />
          <JMABaseLayer />
          <Pane name='pref-city-overlay' style={{ zIndex: 500 }}>
            <JapanPrefOverlayLayer />
            <JapanCityOverlayLayer />
          </Pane>
          <Pane name='stat-overlay' style={{ zIndex: 500 }}>
            <GSIReliefLayer />
            <GSIHazardMapLayers />
            <PopulationLayer />
          </Pane>
          <Pane name='jma-overlay' style={{ zIndex: 600 }}>
            <LandslideRiskLayer />
          </Pane>
          <Pane name='rain-overlay' style={{ zIndex: 600 }}>
            <NowcastOverlayLayer />
          </Pane>
          <Pane name='marker-overlay' style={{ zIndex: 800 }}>
            <FireDeptLayers />
            <NewsCrisis />
            <RiverLevelLayer />
          </Pane>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default CrisisMap;
