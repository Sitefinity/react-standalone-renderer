import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import ClientSide from '@/app/components/ClientSide/ClientSide';

describe('ClientSide', () => {
    it('renders without crashing', () => {
        const {container} = render(<ClientSide />);
        expect(container).not.toBeNull();
    });

    it('contains the text "ClientSide"', () => {
        render(<ClientSide />);
        expect(screen.queryByText('ClientSide')).toBeInTheDocument();
    });
});
