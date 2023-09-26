'use client';

import React from 'react';

type Props = {};

const StructureHeader = (props: Props) => {
    return (
        <div>
            <h2>StructureHeader</h2>
            <p className="developer">
                Components within the StructureHeader are always <strong>Client Side Rendered</strong> for SEO purposes.
            </p>
        </div>
    );
};

export default StructureHeader;
