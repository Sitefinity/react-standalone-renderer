'use client';

import React from 'react';

type Props = {};

const StructureSubFooter = (props: Props) => {
    return (
        <div>
            <h2>StructureSubFooter</h2>
            <p className="developer">
                Components within the StructureSubFooter are always <strong>Client Side Rendered</strong> for SEO
                purposes.
            </p>
        </div>
    );
};

export default StructureSubFooter;
