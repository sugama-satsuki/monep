import React, { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import './Map.css';


declare global {
    interface Window {
      geolonia: {
        Popup: new (options?: maplibregl.PopupOptions) => maplibregl.Popup;
        Map: new (options: maplibregl.MapOptions) => maplibregl.Map;
        GeolocateControl: new (options: maplibregl.GeolocateControlOptions) => maplibregl.GeolocateControl;
        NavigationControl: new (options?: maplibregl.NavigationControlOptions) => maplibregl.NavigationControl;
        Marker: new (options?: maplibregl.MarkerOptions) => maplibregl.Marker;
      }
    }
}

const Map: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        // MapLibreのインスタンスを作成
        const map = new window.geolonia.Map({
            container: mapContainer.current, // 地図を描画するコンテナ
            style: "https://geoloniamaps.github.io/basic-v1/style.json", // スタイルURL
            center: [139.6917, 35.6895], // 初期の中心座標（東京）
            zoom: 10, // 初期のズームレベル
        });

        // クリーンアップ処理
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div
            className='map'
            ref={mapContainer}
            data-lang="ja"
            data-gesture-handling="off"
            data-navigation-control="off"
            data-scale-control="on"
        />
    );
};

export default Map;
