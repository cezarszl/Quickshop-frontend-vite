import { create } from 'zustand';
import axiosInstance from '@/helpers/axiosInstance';

export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    categoryName: string;
    categoryId: number;
}

export interface MinPrice {
    categoryId: number;
    minPrice: number;
}

export interface ProductFilter {
    name?: string;
    categoryId?: number;
    brandIds?: number[];
    colorId?: number;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
    offset?: number;
}

interface ProductState {
    products: Product[],
    randomProducts: Product[],
    minPrices: MinPrice[],
    filters: ProductFilter,
    selectedBrands: number[];
    sortOption: string;
    itemsPerPage: number;
    totalCount: number;
    toogleBrand: (brandId: number) => void;
    setFilter: (key: keyof ProductFilter, value: any) => void;
    setSortOption: (option: string) => void,
    setItemsPerPage: (count: number) => void,
    resetFilters: () => void;
    fetchProducts: () => Promise<void>,
    fetchRandomProducts: () => Promise<void>
    fetchMinPrices: () => Promise<void>
    fetchFilteredProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    randomProducts: [],
    minPrices: [],
    selectedBrands: [],
    filters: {
        minPrice: 10,
        maxPrice: 1000,
    },
    sortOption: 'name-asc',
    itemsPerPage: 10,
    totalCount: 0,

    toogleBrand: (brandId: number) => {
        const { selectedBrands } = get();
        const updatedBrands = selectedBrands.includes(brandId)
            ? selectedBrands.filter(id => id !== brandId)
            : [...selectedBrands, brandId];

        set({ selectedBrands: updatedBrands });

        set(state => ({
            filters: {
                ...state.filters,
                brandIds: updatedBrands.length > 0 ? updatedBrands : undefined
            }
        }));

        get().fetchFilteredProducts();
    },

    setFilter: (key, value) => set((state) => ({
        filters: {
            ...state.filters,
            [key]: value,
        },
    })),

    setSortOption: (option) => set({ sortOption: option }),
    setItemsPerPage: (count) => set({ itemsPerPage: count }),

    resetFilters: () => set({
        filters: {
            minPrice: 10,
            maxPrice: 1000,
        },
    }),

    fetchProducts: async () => {
        try {
            const { itemsPerPage } = get(); // Pobierz `itemsPerPage` z aktualnego stanu
            const params = new URLSearchParams();
            params.append('limit', itemsPerPage.toString()); // Dodaj parametr `limit`

            const response = await axiosInstance.get(`/products`, { params });
            const { products, totalCount } = response.data;
            set({ products, totalCount });
        } catch (err) {
            console.error('Error fetching products', err);
        }
    },

    fetchRandomProducts: async () => {
        try {
            const response = await axiosInstance.get(`/products/random-products`);
            set({ randomProducts: response.data })
        } catch (err) {
            console.error('Error fetching random products', err);
        }
    },
    fetchMinPrices: async () => {
        try {
            const response = await axiosInstance.get(`/categories/min-prices`);
            set({ minPrices: response.data })
        } catch (err) {
            console.error('Error fetching minimum prices for each category', err);
        }
    },

    fetchFilteredProducts: async () => {
        try {
            const { filters, sortOption, itemsPerPage } = get();
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    if (key === 'brandIDs' && Array.isArray(value)) {
                        params.append(key, value.join(','));
                    } else {
                        params.append(key, value.toString());
                    }
                }
            });

            const [sortBy, order] = sortOption.split('-');
            params.append('sortBy', sortBy);
            params.append('order', order.toUpperCase());
            params.append('limit', itemsPerPage.toString());

            const response = await axiosInstance.get(`/products`, { params });
            const { products, totalCount } = response.data;
            set({ products, totalCount });
        } catch (err) {
            console.error('Error fetching filtered products', err);
        }
    }
}));