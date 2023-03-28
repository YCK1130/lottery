import React from 'react'
import Particles from 'react-tsparticles'

const Lottery = () => {
  const particleSize = 90
  return (
    <div className='border border-white border-5 rounded lottery-box' style={{height:"170px", width:"900px"}}>
      <Particles
        params={{
          fullScreen: {
            enable: false,
          },
          particles: {
            number: {
              value: particleSize,
              density: {
                enable: true,
                value_area: 400,
              },
            },
            color: {
              value: [
                '#00ffcf',
                '#2cffd9',
                '#81f7ee',
                '#00dee6',
                '#00d3ec',
                '#06caf1',
                '#22bff7',
                '#32b1fd',
                '#a2d6fe',
              ],
            },
            opacity: {
              value: 1,
            },
            size: {
              value: 20,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: true,
              speed: 30,
              straight: false,
            },
            line_linked: {
              width: 2.5,
              color: {
                value: [
                  '#00ffcf',
                  '#2cffd9',
                  '#81f7ee',
                  '#00dee6',
                  '#00d3ec',
                  '#06caf1',
                  '#22bff7',
                  '#32b1fd',
                  '#a2d6fe',
                ],
              },
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onClick: {
                enable: true,
                mode: ['attract', 'fast'],
              },
            },
          },
        }}
      />
    </div>
  )
}

export default React.memo(Lottery)
