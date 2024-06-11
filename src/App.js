// src/App.js
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import FormulaInput from './components/FormulaInput';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg h-[90vh] shadow-lg w-[50%]">
          <h1 className="text-2xl font-bold mb-4">Formula Input</h1>
          <FormulaInput />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
