import { render, screen } from '@testing-library/react'
import { FELLOWSHIP_VALUES } from 'types/shared'
import { MockedProvider } from '@apollo/client/testing'
import Home from '../../pages/index'
import { setupIntersectionObserverMock } from 'test/mocks'

describe('Home', () => {
  beforeEach(() => {
    setupIntersectionObserverMock()
  })

  it('renders a fellowship selector', () => {
    render(<MockedProvider mocks={[]} addTypename={false}>
      <Home />
    </MockedProvider>)

    for (const fellowship of FELLOWSHIP_VALUES) {
      expect(screen.queryByText(fellowship)).toBeTruthy()
    }
  })
})