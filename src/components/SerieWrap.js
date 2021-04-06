import React from 'react';
import {useParams} from "react-router-dom";

import Serie from './Serie';

function SerieWrap(props) {

    const { season } = useParams();
    return (
        <div>
            <Serie {...props} season={season} />
        </div>
    );
}

export default SerieWrap;