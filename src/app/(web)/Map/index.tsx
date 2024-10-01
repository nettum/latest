import dynamic from "next/dynamic";
import Leaflet from "./leaflet";

export default dynamic(() => Promise.resolve(Leaflet), { ssr: false });
