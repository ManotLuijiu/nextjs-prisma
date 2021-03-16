import { render, screen } from '@testing-library/react';
import Header from './components/Header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByRole('heading', { name: 'แหล่งน้ำจืดในจังหวัดภูเก็ต' })).toBeInTheDocument();
  });
});

// const queryClient = new QueryClient();
// const wrapper = ({ children }) => (
//   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// );

// const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper });

// await waitFor(() => result.current.isSuccess);

// expect(result.current.data).toEqual('Hello')

// const expectation = nock('http');
