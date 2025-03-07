export interface ApiResponse<T> {
    total: number;
    page: number;
    totalPages: number;
    data: T[];
}