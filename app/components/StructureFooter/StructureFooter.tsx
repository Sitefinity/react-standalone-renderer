'use client';

import React from 'react';

type Props = {};

const StructureFooter = (props: Props) => {
    return (
        <div>
            <h2>StructureFooter</h2>
            <p className="developer">
                Components within the StructureFooter are always <strong>Client Side Rendered</strong> for SEO purposes.
            </p>
        </div>
    );
};

export default StructureFooter;
