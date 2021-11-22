import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import store from '../store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

const setup = () => {
    const utils = render(<Provider store={store}><App /></Provider>);
    const input = utils.getByTestId('searchInput');
    const title = utils.getByTestId('searchedWord');

    return {
      input,
      title,
      ...utils,
    }
  }

test('App renders correctly', () => {
    render(<Provider store={store}><App /></Provider>);
    screen.debug();
});

test('Search renders correctly', () => {
    const {getByPlaceholderText} = render(<Provider store={store}><App /></Provider>);
    const searchInput = getByPlaceholderText(/25 milyon' dan fazla ürün içerisinde ara/i);
    expect(searchInput.type).toEqual('text');
});

test('Search input change event trigger correctly', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')
});

it('Change on search input word causes headers title', async () => {
    await act(async () => {
        const { input, title } = setup();
        const inputWord = "test";

        await fireEvent.change(input, {target: { value : inputWord }});
        expect(title.innerHTML).toBe(inputWord)
    });
});