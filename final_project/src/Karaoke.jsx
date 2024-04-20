import React, { useState } from 'react';

import './Karaoke.css';

function Karaoke() {

    return (
        <><div>
            <h1>Karaoke</h1>
        </div>
        <div class="oval">
            <input type="text" class="oval-input" placeholder="Search for your favorite songs!" />
        </div>
        <div class="upperOval">
            <input type="text" class="upperOval-input" placeholder="Join a Party" />
        </div>
        </>
    );
}

export default Karaoke;