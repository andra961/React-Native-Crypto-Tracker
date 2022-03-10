import 'react-native';
import React from 'react';
import FilteredComponent from './';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import {render, fireEvent} from '@testing-library/react-native';

describe('Filtered Component test(renderer)', () => {
  it('should render correctly', () => {
    renderer.create(
      <FilteredComponent
        filterDay=""
        filterText=""
        selectedRange=""
        setSelectedRange={() => {}}
      />,
    );
  });
});

describe('Filtered Component test(testing-library)', () => {
  it('should render correctly', () => {
    const mockFn = jest.fn();

    const filtered = render(
      <FilteredComponent
        filterDay="28"
        filterText="28D"
        selectedRange="28"
        setSelectedRange={mockFn}
      />,
    );

    const text = filtered.getByText('28D');

    expect(text).not.toBeNull();

    fireEvent.press(text);

    expect(mockFn).toBeCalledWith('28');

    expect(filtered).toMatchSnapshot();
  });
});
