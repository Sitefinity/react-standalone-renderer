'use client';

import React from 'react';

type Props = {};

const StructureSubHeader = (props: Props) => {
    return (
        <div>
            <h2>StructureSubHeader</h2>
            <p className="developer">
                Components within the StructureSubHeader are always <strong>Client Side Rendered</strong> for SEO
                purposes.
            </p>
        </div>
    );
};

export default StructureSubHeader;
