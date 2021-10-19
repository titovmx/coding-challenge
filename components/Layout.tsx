import Head from 'next/head'
import styled from 'styled-components'

export default function Layout({ children }: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <Container>
      <Main>
        <Head>
          <title>On Deck Newsfeed</title>
        </Head>
        {children}
      </Main>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Main = styled.div`
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 600px;
  max-width: 600px;
`
