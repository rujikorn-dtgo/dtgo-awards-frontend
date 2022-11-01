import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div({
  textAlign: 'center',

  '.App-header': {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  '.App-logo': {
    height: '40vmin',
    pointerEvents: 'none',
    animation:` ${AppLogoSpin} infinite 20s linear`
  },
  '.App-link': {
    color: '#61dafb'
  }
})