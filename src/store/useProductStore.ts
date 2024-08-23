import { create } from 'zustand';

type ProductSelection = {
	[key: number]: { selected: boolean; quantity: number };
};

interface ProductStore {
	productSelections: ProductSelection;
	setProductSelections: (selections: ProductSelection) => void;
	updateProductSelection: (productId: number, selected: boolean) => void;
	updateProductQuantity: (productId: number, quantity: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
	productSelections: {},
	setProductSelections: (selections) => set({ productSelections: selections }),
	updateProductSelection: (productId, selected) =>
		set((state) => ({
			productSelections: {
				...state.productSelections,
				[productId]: { ...state.productSelections[productId], selected },
			},
		})),
	updateProductQuantity: (productId, quantity) =>
		set((state) => ({
			productSelections: {
				...state.productSelections,
				[productId]: { ...state.productSelections[productId], quantity },
			},
		})),
}));
