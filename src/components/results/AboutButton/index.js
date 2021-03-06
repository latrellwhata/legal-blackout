import * as React from 'react'

import { navigate } from 'gatsby'
import styled from 'styled-components'
import styledMap from 'styled-map'

import { DESKTOP, MOBILE, TABLET } from '../../../constants'

const Button = styled.button`
  width: ${styledMap('format', {
  [DESKTOP]: '450px',
  [TABLET]: '260px',
  [MOBILE]: '260px'
})};
  height: 58px;
  border-radius: 5px;
  border: solid 3px #ffffff;
  font-family: 'Museo Sans Cyrl 900', sans-serif;
  font-size: 16px;
`

export default function AboutButton({ format }) {
  return (
    <Button format={format}
      onClick={() => {
        navigate('http://www.wclc.org.nz/about-us/')
      }}
    >
      About Community Law
    </Button>
  )
}
