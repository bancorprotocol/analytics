import React, { useRef, useEffect } from 'react';
import {isMobile} from 'react-device-detect';

const { tableau } = window;

function MainDashboard() {
    const ref = useRef(null);
    const url = 'https://public.tableau.com/views/Bancor3PublicDashboard/Bancor3Dashboard';
    let timezoneOffsetHrs = -(new Date().getTimezoneOffset());

    let device = 'desktop';
    if(isMobile) {
        device = 'phone';
    }

    const options = {
        hideToolbar: true,
        hideTabs: true,
        device: device,
        width: "100vw",
        height: "100vh",
        "Timezone_offset": timezoneOffsetHrs,
        onFirstInteractive: function () {
            console.log("Loaded Main Dashboard.");
            console.log("Time offset from UTC: %d hours", timezoneOffsetHrs);
        },
    };

    const initViz = () => {
        // Dispose of previous Vizzes
        let viz = window.tableau.VizManager.getVizs()[0];
        if (viz) {
            viz.dispose();
        }

        viz = new tableau.Viz(ref.current, url, options);
    };

    useEffect(initViz, []);

    return (
        <div ref={ref} />
    );
};

export default MainDashboard;