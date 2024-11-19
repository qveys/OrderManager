import React, {act} from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import OrderManager from './components/OrderManager';

// Mock fetch to control API calls in tests
const originalFetch = global.fetch;

describe('OrderManager Component', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it('renders OrderNew and OrderList components', async () => {
        await act(async () => {
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: () => Promise.resolve([])
            });

            render(<OrderManager/>);
        });

        expect(screen.getByText('Nouvelle Commande')).toBeInTheDocument();
        expect(screen.getByText('Liste des Commandes')).toBeInTheDocument();
    });

    it('creates a new order successfully', async () => {
        (fetch as jest.Mock)
            .mockImplementationOnce(() => Promise.resolve({
                ok: true,
                json: () => Promise.resolve([])
            }))
            .mockImplementationOnce(() => Promise.resolve({
                ok: true,
                json: () => Promise.resolve([])
            }));

        await act(async () => {
            render(<OrderManager/>);
        });

        // Fill out the form
        const productNameInput = screen.getByPlaceholderText('Nom du produit');
        const quantityInput = screen.getByPlaceholderText('Quantité');
        const submitButton = screen.getByText('Créer la commande');

        await act(async () => {
            fireEvent.change(productNameInput, {target: {value: 'Test Product'}});
            fireEvent.change(quantityInput, {target: {value: '5'}});
            fireEvent.click(submitButton);
        });

        // Wait for fetch calls
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(2);
        });
    });

    it('filters orders by search term', async () => {
        const mockOrders = [
            {id: '1', productName: 'Apple', quantity: 10, orderDate: new Date().toISOString()},
            {id: '2', productName: 'Banana', quantity: 5, orderDate: new Date().toISOString()}
        ];

        // Mock fetch to return orders
        (global.fetch as jest.Mock)
            .mockImplementationOnce(() => Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockOrders)
            }))
            .mockImplementationOnce(() => Promise.resolve({
                ok: true,
                json: () => Promise.resolve(
                    mockOrders.filter(order => order.productName.toLowerCase().includes('apple'))
                )
            }));

        await act(async () => {
            render(<OrderManager/>);
        });

        // Initially, both orders should be visible
        await waitFor(() => {
            expect(screen.getByText(/Apple - 10/)).toBeInTheDocument();
            expect(screen.getByText(/Banana - 5/)).toBeInTheDocument();
        });

        // Search for 'Apple'
        const searchInput = screen.getByPlaceholderText('Rechercher par nom de produit...');

        await act(async () => {
            fireEvent.change(searchInput, {target: {value: 'Apple'}});
        });

        // Wait for orders to be filtered
        await waitFor(() => {
            expect(screen.getByText(/Apple - 10/)).toBeInTheDocument();
            expect(screen.queryByText(/Banana - 5/)).not.toBeInTheDocument();
        });
    });

    it('handles error when fetching orders', async () => {
        // Simulate a network error
        (global.fetch as jest.Mock).mockImplementation(() => Promise.reject(new Error('Network error')));

        // Spy on console.error to check error handling
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });

        await act(async () => {
            render(<OrderManager/>);
        });

        // Wait for error to be logged
        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching orders:', expect.any(Error));
        });

        consoleErrorSpy.mockRestore();
    });
});