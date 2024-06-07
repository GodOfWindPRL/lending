import styled from 'styled-components'

const BallLight = () => {
    return (
        <Wrap>
        </Wrap >
    )
}

export default BallLight

const Wrap = styled.div`
    width: 200%;
    padding-top: 200%;
    background: #5EB5F7;
    filter: blur(65px);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`