"use client";

import React from "react";
import styles from "./map.module.css";

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";
import polyline from "@mapbox/polyline";

export default function Leaflet({ poster }: { poster: string }) {
  const coordinates = polyline.decode(poster);
  const bounds = L.latLngBounds(coordinates);
  const center = L.LineUtil.polylineCenter(coordinates, L.CRS.Simple);

  return (
    <MapContainer center={[center.lng, center.lat]} bounds={bounds} dragging={false} scrollWheelZoom={false} boxZoom={false} className={styles.map}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline pathOptions={{ color: "red" }} positions={coordinates} />
    </MapContainer>
  );
}
