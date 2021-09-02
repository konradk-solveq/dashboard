import { createContext } from 'react';

export interface FetchStatus<T> {
    data: T | null;
    ready: boolean;
    error: string;
}
export interface ApiContextProps {
    host: string;
}
export interface ApiContextInterface {}
const context = createContext<ApiContextInterface>(null!);

export const ApiContextContainer: React.FC<ApiContextProps> = ({ children, host }) => {
    return <context.Provider value={{}}></context.Provider>;
};

export default context;
