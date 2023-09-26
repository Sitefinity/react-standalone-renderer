import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import ServerSide from '@/app/components/ServerSide/ServerSide';

describe('ServerSide', () => {
    it('renders without crashing', () => {
        const {container} = render(<ServerSide />);
        expect(container).not.toBeNull();
    });

    it('contains the text "ServerSide"', () => {
        render(<ServerSide />);
        expect(screen.queryByText('ServerSide')).toBeInTheDocument();
    });
});
