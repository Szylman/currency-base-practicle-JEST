import { cleanup, render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';



describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100}/>);
    });

    const testCasesPLNToUSD = [
        { amount: 100, converted: 'PLN 100.00 = $28.57' },
        { amount: 20, converted: 'PLN 20.00 = $5.71' },
        { amount: 200, converted: 'PLN 200.00 = $57.14' },
        { amount: 345, converted: 'PLN 345.00 = $98.57' },
    ];
    const testCasesUSDToPLN = [
        { amount: 100, expected: '$100.00 = PLN 350.00' },
        { amount: 200, expected: '$200.00 = PLN 700.00' },
        { amount: 150, expected: '$150.00 = PLN 525.00' },
        { amount: 17, expected: '$17.00 = PLN 59.50' },
    ];

    for (const testObj of testCasesPLNToUSD) {

        it('should render proper info about conversion when PLN -> USD', () => {
            
            render(<ResultBox from="PLN" to="USD" amount={testObj.amount}/>);

            const div = screen.getByTestId('div');

            expect(div).toHaveTextContent(testObj.converted);
        });
        cleanup();
    }

    for (const testObj of testCasesUSDToPLN) {
        it('should render proper info about conversion when USD -> PLN', () => {
            render(<ResultBox from='USD' to='PLN' amount={testObj.amount} />);
            const div = screen.getByTestId('div');
            expect(div).toHaveTextContent(testObj.expected);
        });
        cleanup();
    }

    it('should render proper info about conversion when PLN -> PLN', () => {
        render(<ResultBox from='PLN' to='PLN' amount={100} />);
        const div = screen.getByTestId('div');
        expect(div).toHaveTextContent('PLN 100.00 = PLN 100.00');
    });

    it('should render proper info about conversion when USD -> USD', () => {
        render(<ResultBox from='USD' to='USD' amount={100} />);
        const div = screen.getByTestId('div');
        expect(div).toHaveTextContent('$100.00 = $100.00');
    });

    it('should render proper "Wrong value…" about conversion when amount is degree 0', () => {
        render(<ResultBox from='PLN' to='USD' amount={-1} />);
        const div = screen.getByTestId('div');
        expect(div).toHaveTextContent('Wrong value…');
    });
});