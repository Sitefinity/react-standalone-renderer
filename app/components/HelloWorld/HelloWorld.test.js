import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import HelloWorld from '@/app/components/HelloWorld/HelloWorld';

describe('HelloWorld', () => {
    it('renders without crashing', () => {
        const {container} = render(<HelloWorld />);
        expect(container).not.toBeNull();
    });

    it('contains the text "HelloWorld"', () => {
        render(<HelloWorld />);
        expect(screen.queryByText('HelloWorld')).toBeInTheDocument();
    });
});
