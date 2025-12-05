export interface User {
    id: string;
    email: string;
    name: string;
    role: 'customer' | 'shopkeeper';
}

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    unit: string; // e.g., 'kg', 'pcs', 'pack'
    imageUrl?: string;
    description?: string;
    inStock: boolean;
}

export interface ListItem {
    id: string;
    productId: string;
    product: Product;
    quantity: number;
    isPurchased: boolean;
}

export interface GroceryList {
    id: string;
    name: string;
    userId: string;
    items: ListItem[];
    createdAt: string;
    updatedAt: string;
    status: 'active' | 'archived';
    shareId?: string; // If shared
}

export interface ShareLink {
    id: string;
    listId: string;
    list: GroceryList;
    expiresAt?: string;
    isActive: boolean;
}

// For Kanban Board
export type KanbanStatus = 'to-buy' | 'in-progress' | 'done';

export interface KanbanItem extends ListItem {
    status: KanbanStatus;
}

export interface KanbanColumn {
    id: KanbanStatus;
    title: string;
    items: KanbanItem[];
}
