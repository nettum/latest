import dynamic from "next/dynamic";

export default dynamic(() => import("./leaflet"), { ssr: false });
